import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Check,
  Copy,
  Loader2,
  Lock,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import type { Locale } from '../types/navigation';
import { useLenis } from './motion/LenisProvider';
import { EASE_EDITORIAL, SlotRollText } from './motion/MotionPrimitives';

export interface BookingPreset {
  topic?: string;
  sessionType?: string;
  location?: string;
}

interface BookingDrawerProps {
  open: boolean;
  privacyOpen: boolean;
  preset: BookingPreset;
  onClose: () => void;
  onOpenPrivacy: () => void;
}

const WEEKDAYS = [1, 2, 3, 4, 5];

function getUpcomingDaysForLocale(lang: Locale, nearestLabel: string): string[] {
  const days: string[] = [nearestLabel];
  const formatter = new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'pl-PL', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const cursor = new Date();
  let added = 0;

  while (added < 5) {
    cursor.setDate(cursor.getDate() + 1);
    if (WEEKDAYS.includes(cursor.getDay())) {
      const formatted = formatter.format(cursor);
      days.push(formatted.charAt(0).toUpperCase() + formatted.slice(1));
      added++;
    }
  }
  return days;
}

function resolveSessionIndex(raw?: string): number {
  if (!raw) return 0;
  const lower = raw.toLowerCase();
  if (lower === 'phototherapy' || lower.includes('fototerap') || lower.includes('фототерап')) return 5;
  if (lower === 'home-visit' || lower.includes('domow') || lower.includes('дом')) return 4;
  if (
    lower === 'diagnostics-support' ||
    lower.includes('badani') ||
    lower.includes('kryzys') ||
    lower.includes('ocena') ||
    lower.includes('relaks') ||
    lower.includes('psychoeduk') ||
    lower.includes('кризис') ||
    lower.includes('диагност')
  ) {
    return 3;
  }
  if (
    lower.includes('seksuolog') ||
    lower.includes('traum') ||
    lower.includes('par') ||
    lower.includes('сексолог') ||
    lower.includes('травм')
  ) {
    return 2;
  }
  if (
    lower === 'psychotherapy' ||
    lower.includes('psychoterapia') ||
    lower.includes('indywidualn') ||
    lower.includes('психотерап')
  ) {
    return 1;
  }
  return 0;
}

function resolveLocationIndex(raw?: string): number {
  if (!raw) return 0;
  const lower = raw.toLowerCase();
  if (lower === 'srodmiescie' || lower.includes('śródmieśc') || lower.includes('центр')) return 1;
  if (lower === 'online' || lower.includes('онлайн')) return 2;
  return 0;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  open,
  privacyOpen,
  preset,
  onClose,
  onOpenPrivacy,
}) => {
  const { lang, practice, ui } = usePreferences();
  const b = ui.booking;
  const { lockScroll, unlockScroll } = useLenis();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const fetchAbortRef = useRef<AbortController | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  const [sessionIndex, setSessionIndex] = useState(0);
  const [locationIndex, setLocationIndex] = useState(0);

  const dateOptions = useMemo(
    () => getUpcomingDaysForLocale(lang, b.nearestSlot),
    [lang, b.nearestSlot]
  );

  const [preferredDayIndex, setPreferredDayIndex] = useState(0);
  const [preferredTimeIndex, setPreferredTimeIndex] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [note, setNote] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<'email-sent' | 'fallback'>('email-sent');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    lockScroll();

    return () => {
      fetchAbortRef.current?.abort();
      fetchAbortRef.current = null;
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      unlockScroll();
      previousFocusRef.current?.focus?.();
    };
  }, [open, lockScroll, unlockScroll]);

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    setError(null);
    setSending(false);
    setCopiedSummary(false);
    setPreferredDayIndex(0);
    setSessionIndex(resolveSessionIndex(preset.sessionType));

    if (preset.location) {
      setLocationIndex(resolveLocationIndex(preset.location));
    }
    if (preset.topic) {
      setNote(`${b.noteTopicPrefix} ${preset.topic}.`);
    } else {
      setNote((prev) =>
        prev.startsWith('Obszar, o którym chcę porozmawiać:') ||
        prev.startsWith('Тема, которую хотелось бы обсудить:')
          ? ''
          : prev
      );
    }

    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => window.clearTimeout(focusTimer);
  }, [open, preset, b.noteTopicPrefix]);

  useEffect(() => {
    if (!open || privacyOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, privacyOpen, onClose]);

  const sessionType = b.sessionTypes[sessionIndex] ?? b.sessionTypes[0];
  const locationLabel = b.locations[locationIndex] ?? b.locations[0];
  const preferredDay = dateOptions[preferredDayIndex] ?? dateOptions[0];
  const preferredTime = b.timeSlots[preferredTimeIndex] ?? b.timeSlots[2];

  const recipientEmail = practice.bookingRecipientEmail;
  const isHomeVisit = sessionIndex === 4;
  const effectiveLocationLabel = isHomeVisit ? b.homeVisitLocationLabel : locationLabel;
  const trimmedNameDisplay = name.trim();
  const sf = b.summaryFields;

  const summaryPlainText = [
    `${sf.name}: ${trimmedNameDisplay}`,
    phone.trim() ? `${sf.phone}: ${phone.trim()}` : null,
    clientEmail.trim() ? `${sf.email}: ${clientEmail.trim()}` : null,
    `${sf.sessionType}: ${sessionType}`,
    `${sf.location}: ${effectiveLocationLabel}`,
    `${sf.day}: ${preferredDay}`,
    `${sf.time}: ${preferredTime}`,
    `${sf.message}: ${note.trim() || sf.noMessage}`,
  ]
    .filter(Boolean)
    .join('\n');

  const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    `${b.mailtoSubjectPrefix} ${trimmedNameDisplay} — ${sessionType} (${effectiveLocationLabel})`
  )}&body=${encodeURIComponent(`${b.mailtoGreeting}\n\n${summaryPlainText}`)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim().length > 0) {
      setDeliveryMode('email-sent');
      setSubmitted(true);
      return;
    }

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = clientEmail.trim();

    if (!trimmedName) {
      setError(b.errors.name);
      return;
    }
    if (!trimmedPhone && !trimmedEmail) {
      setError(b.errors.contact);
      return;
    }
    if (trimmedPhone && trimmedPhone.replace(/\D/g, '').length < 7) {
      setError(b.errors.phoneShort);
      return;
    }
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError(b.errors.emailInvalid);
      return;
    }
    if (!consent) {
      setError(b.errors.consent);
      return;
    }

    setError(null);
    setSending(true);

    const payload: Record<string, string> = {
      [sf.name]: trimmedName,
      [sf.phone]: trimmedPhone || sf.notProvided,
      [sf.email]: trimmedEmail || sf.notProvided,
      [sf.sessionType]: sessionType,
      [sf.location]: effectiveLocationLabel,
      [sf.day]: preferredDay,
      [sf.time]: preferredTime,
      [sf.message]: note.trim() || sf.noMessage,
      [sf.rodo]: sf.rodoValue,
      _subject: `${b.mailtoSubjectPrefix} ${trimmedName} — ${effectiveLocationLabel}`,
      _template: 'table',
      _captcha: 'false',
      _honey: '',
    };

    if (trimmedEmail) {
      payload._replyto = trimmedEmail;
    }

    fetchAbortRef.current?.abort();
    const controller = new AbortController();
    fetchAbortRef.current = controller;
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 10000);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      if (controller.signal.aborted) return;

      const data = await response.json().catch(() => null);
      const isConfirmed =
        response.ok && (data?.success === true || data?.success === 'true');

      setDeliveryMode(isConfirmed ? 'email-sent' : 'fallback');
      setSubmitted(true);
    } catch {
      if (controller.signal.aborted && !timedOut) return;
      setDeliveryMode('fallback');
      setSubmitted(true);
    } finally {
      window.clearTimeout(timeoutId);
      if (fetchAbortRef.current === controller) {
        fetchAbortRef.current = null;
      }
      setSending(false);
    }
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryPlainText);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      setCopiedSummary(true);
      copyTimerRef.current = window.setTimeout(() => setCopiedSummary(false), 2200);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-drawer-title"
          className="fixed inset-0 z-[80] flex justify-end"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            style={{ backgroundColor: 'var(--backdrop-scrim)' }}
            className="absolute inset-0 backdrop-blur-sm"
          />

          <motion.div
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
            className="relative z-10 flex h-[100dvh] w-full max-w-[580px] flex-col overflow-y-auto overscroll-contain border-l border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-6 pb-10 pt-8 text-[var(--text-ink)] shadow-2xl sm:px-10 sm:py-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
              <div>
                <p className="eyebrow">{b.eyebrow}</p>
                <h2
                  id="booking-drawer-title"
                  className="font-editorial mt-2 text-3xl font-normal text-[var(--text-ink)] sm:text-[34px]"
                >
                  {b.title}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label={b.closeAria}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-medium)] text-[var(--text-ink)] transition-colors hover:border-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-text)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="booking-form"
                  noValidate
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.36, ease: EASE_EDITORIAL }}
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-1 flex-col gap-5"
                >
                  {/* 1. Rodzaj spotkania */}
                  <fieldset className="space-y-2">
                    <legend className="block text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {b.step1}
                    </legend>
                    <div className="grid grid-cols-1 gap-1.5">
                      {b.sessionTypes.map((option, idx) => {
                        const active = sessionIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            aria-pressed={active}
                            onClick={() => {
                              setSessionIndex(idx);
                              setPreferredDayIndex(0);
                            }}
                            className={`flex items-center justify-between border px-4 py-2.5 text-left text-[13px] transition-all duration-300 ${
                              active
                                ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] font-medium text-[var(--btn-primary-text)]'
                                : 'border-[var(--border-subtle)] bg-[var(--bg-paper)] text-[var(--text-ink)] hover:border-[var(--border-accent)]'
                            }`}
                          >
                            <span>{option}</span>
                            {active && <Check className="h-4 w-4 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* 2. Lokalizacja */}
                  {!isHomeVisit && (
                    <fieldset className="space-y-2">
                      <legend className="block text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        {b.step2}
                      </legend>
                      <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
                        {b.locations.map((loc, idx) => {
                          const active = locationIndex === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              aria-pressed={active}
                              onClick={() => {
                                setLocationIndex(idx);
                                setPreferredDayIndex(0);
                              }}
                              className={`border px-2.5 py-2.5 text-center text-[12px] leading-tight transition-all duration-300 ${
                                active
                                  ? 'border-[var(--accent-emphasis)] bg-[var(--accent-tint)] font-medium text-[var(--accent-emphasis)]'
                                  : 'border-[var(--border-subtle)] bg-[var(--bg-paper)] text-[var(--text-secondary)] hover:border-[var(--border-accent)]'
                              }`}
                            >
                              {loc}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {/* 3. Preferowany dzień i pora */}
                  <fieldset className="space-y-2.5">
                    <legend className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      <Calendar className="h-3.5 w-3.5 text-[var(--accent-amber)]" />
                      <span>
                        {isHomeVisit ? '2.' : '3.'} {b.step3}
                      </span>
                    </legend>
                    <p className="text-[11.5px] font-light text-[var(--text-muted)]">
                      {isHomeVisit
                        ? b.homeVisitHint
                        : `${locationLabel}: ${b.locationMeta[locationIndex]}`}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {dateOptions.map((day, idx) => {
                        const active = preferredDayIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setPreferredDayIndex(idx)}
                            className={`rounded-full border px-3 py-1.5 text-[11.5px] transition-all duration-250 ${
                              active
                                ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] font-medium text-[var(--btn-primary-text)]'
                                : 'border-[var(--border-subtle)] bg-[var(--bg-paper)] text-[var(--text-secondary)] hover:border-[var(--border-accent)]'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
                      {b.timeSlots.map((slot, idx) => {
                        const active = preferredTimeIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setPreferredTimeIndex(idx)}
                            className={`border px-2.5 py-2 text-center text-[11.5px] transition-all duration-300 ${
                              active
                                ? 'border-[var(--accent-emphasis)] bg-[var(--accent-tint)] font-medium text-[var(--accent-emphasis)]'
                                : 'border-[var(--border-subtle)] bg-[var(--bg-paper)] text-[var(--text-secondary)] hover:border-[var(--border-accent)]'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* 4. Dane kontaktowe */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="mb-1 block text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
                      >
                        {b.nameLabel}
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        autoComplete="given-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={b.namePlaceholder}
                        className="w-full border border-[var(--border-medium)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-[13.5px] text-[var(--text-ink)] placeholder:text-[var(--text-muted)]/70 focus:border-[var(--accent-emphasis)]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="mb-1 block text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
                      >
                        {b.phoneLabel}
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={b.phonePlaceholder}
                        className="w-full border border-[var(--border-medium)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-[13.5px] text-[var(--text-ink)] placeholder:text-[var(--text-muted)]/70 focus:border-[var(--accent-emphasis)]"
                      />
                    </div>
                  </div>

                  {/* Invisible anti-spam honeypot */}
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label
                      htmlFor="booking-email"
                      className="mb-1 block text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
                    >
                      {b.emailLabel}
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      autoComplete="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder={b.emailPlaceholder}
                      className="w-full border border-[var(--border-medium)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-[13.5px] text-[var(--text-ink)] placeholder:text-[var(--text-muted)]/70 focus:border-[var(--accent-emphasis)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-note"
                      className="mb-1 block text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
                    >
                      {b.noteLabel}
                    </label>
                    <textarea
                      id="booking-note"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={b.notePlaceholder}
                      className="w-full resize-none border border-[var(--border-medium)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-[13.5px] text-[var(--text-ink)] placeholder:text-[var(--text-muted)]/70 focus:border-[var(--accent-emphasis)]"
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3 text-[12px] font-light leading-relaxed text-[var(--text-secondary)]">
                    <input
                      id="booking-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--btn-primary-bg)]"
                    />
                    <div>
                      <label htmlFor="booking-consent" className="cursor-pointer">
                        {b.consentPrefix}{' '}
                      </label>
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="underline decoration-[var(--border-accent)] underline-offset-2 hover:text-[var(--accent-emphasis)]"
                      >
                        {b.consentLink}
                      </button>
                      .
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 border-l-2 border-[var(--accent-amber)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-[12.5px] text-[var(--text-ink)]"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-amber)]" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit & Recipient Transparency */}
                  <div className="mt-auto space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--btn-primary-bg)] px-7 py-4 text-[13.5px] font-medium text-[var(--btn-primary-text)] transition-colors duration-300 hover:bg-[var(--btn-primary-hover)] disabled:opacity-70"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{b.sendingBtn}</span>
                        </>
                      ) : (
                        <>
                          <SlotRollText label={b.submitBtn} />
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 stroke-[1.5]" />
                        <span>
                          {b.recipientPrefix} {recipientEmail}
                        </span>
                      </span>
                      <a
                        href={practice.phoneHref}
                        className="inline-flex items-center gap-1.5 text-[var(--accent-emphasis)] hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5 stroke-[1.5]" />
                        <span>{practice.phoneDisplay}</span>
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-hairline)] pt-2.5 text-[11px] text-[var(--text-muted)]">
                      <span>{b.externalCalendar}</span>
                      <div className="flex items-center gap-3">
                        <a
                          href={practice.twojPsychologUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[var(--accent-emphasis)] underline decoration-[var(--border-accent-soft)] underline-offset-2 hover:text-[var(--accent-emphasis-hover)]"
                        >
                          TwójPsycholog.pl
                        </a>
                        <a
                          href={practice.znanyLekarzUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[var(--accent-emphasis)] underline decoration-[var(--border-accent-soft)] underline-offset-2 hover:text-[var(--accent-emphasis-hover)]"
                        >
                          ZnanyLekarz.pl
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
                  className="my-auto flex flex-col items-start py-8"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${
                      deliveryMode === 'email-sent'
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                        : 'bg-[var(--accent-amber)] text-[#F6F3EE]'
                    }`}
                  >
                    {deliveryMode === 'email-sent' ? (
                      <svg viewBox="0 0 28 28" fill="none" className="h-7 w-7">
                        <motion.path
                          d="M6 14.5L11.5 20L22 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.65, delay: 0.15, ease: EASE_EDITORIAL }}
                        />
                      </svg>
                    ) : (
                      <Mail className="h-6 w-6 stroke-[1.6]" />
                    )}
                  </div>

                  <h3 className="font-editorial mt-7 text-4xl font-light text-[var(--text-ink)]">
                    {deliveryMode === 'email-sent'
                      ? `${b.successTitlePrefix} ${trimmedNameDisplay}.`
                      : `${b.fallbackTitlePrefix} ${trimmedNameDisplay}.`}
                  </h3>

                  {deliveryMode === 'email-sent' ? (
                    <p className="mt-4 text-[15px] font-light leading-[1.82] text-[var(--text-secondary)]">
                      {b.successBodyBefore}
                      <span className="font-normal text-[var(--text-ink)]">{recipientEmail}</span>
                      {b.successBodyAfter}
                    </p>
                  ) : (
                    <p className="mt-4 text-[15px] font-light leading-[1.82] text-[var(--text-secondary)]">
                      {b.fallbackBodyBefore}
                      <span className="font-normal text-[var(--text-ink)]">{recipientEmail}</span>
                      {b.fallbackBodyAfter}
                    </p>
                  )}

                  <div className="mt-6 w-full space-y-2 border border-[var(--border-subtle)] bg-[var(--bg-paper)] p-5 text-[13px]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-amber)]">
                      {b.summaryHeading}
                    </p>
                    <p className="font-medium text-[var(--text-ink)]">{sessionType}</p>
                    <p className="text-[var(--text-secondary)]">
                      {effectiveLocationLabel} · {preferredDay} · {preferredTime}
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      {b.contactLabel} {phone.trim() || clientEmail.trim()}
                      {phone.trim() && clientEmail.trim() ? ` · ${clientEmail.trim()}` : ''}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-5 py-3 text-[12.5px] font-medium text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>{b.sendEmailBtn}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-paper)] px-4 py-3 text-[12.5px] font-medium text-[var(--text-ink)] hover:border-[var(--border-accent)]"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[var(--accent-emphasis)]" />
                          <span>{b.copiedBtn}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>{b.copyBtn}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center gap-6">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="editorial-link text-[13px] font-medium text-[var(--accent-emphasis)]"
                    >
                      {b.editDataBtn}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="editorial-link-persistent text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-ink)]"
                    >
                      {b.backToSiteBtn}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
