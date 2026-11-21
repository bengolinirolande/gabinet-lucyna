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
import { PRACTICE } from '../data/practice';
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

const SESSION_TYPES = [
  'Konsultacja psychologiczna / wstępna (50 min · 200–210 zł)',
  'Psychoterapia indywidualna — psychodynamiczna (50–60 min · 200–210 zł)',
  'Konsultacja psychotraumatologiczna / seksuologiczna (50 min · 200–210 zł)',
  'Terapia dla par · Badania · Wizyta domowa (od 200 zł / 430 zł)',
];

const LOCATIONS = [
  'Gdynia Witomino',
  'Gdynia Śródmieście',
  'Online (wideo / telefon)',
] as const;
type LocationOption = (typeof LOCATIONS)[number];

const TIME_SLOTS = ['Poranek (08:30–12:00)', 'Popołudnie (12:00–16:00)', 'Wieczór (16:00–20:00)'];

const LOCATION_OPEN_WEEKDAYS: Record<LocationOption, { days: number[]; label: string }> = {
  'Gdynia Witomino': {
    days: [1, 2, 3, 4, 5],
    label: 'ul. Chwarznieńska 136–138 · Wizyty umawiane indywidualnie (PL / RU)',
  },
  'Gdynia Śródmieście': {
    days: [1, 2, 3, 4, 5],
    label: 'Przychodnia Medyczna Gdynia, ul. gen. Bema 16/2 · Centrum Gdyni',
  },
  'Online (wideo / telefon)': {
    days: [1, 2, 3, 4, 5],
    label: 'Wideokonsultacja lub rozmowa telefoniczna (język polski / rosyjski)',
  },
};

function getUpcomingDaysForWeekdays(allowedDays: number[]): string[] {
  const days: string[] = ['Najbliższy wolny termin'];
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const cursor = new Date();
  let added = 0;

  while (added < 5) {
    cursor.setDate(cursor.getDate() + 1);
    if (allowedDays.includes(cursor.getDay())) {
      const formatted = formatter.format(cursor);
      days.push(formatted.charAt(0).toUpperCase() + formatted.slice(1));
      added++;
    }
  }
  return days;
}

function resolveSessionPreset(raw?: string): string {
  if (!raw) return SESSION_TYPES[0];
  const lower = raw.toLowerCase();
  if (lower.includes('par') || lower.includes('domow') || lower.includes('badani')) {
    return SESSION_TYPES[3];
  }
  if (lower.includes('seksuolog') || lower.includes('traum')) {
    return SESSION_TYPES[2];
  }
  if (lower.includes('psychoterapia') || lower.includes('indywidualn')) {
    return SESSION_TYPES[1];
  }
  return SESSION_TYPES[0];
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  open,
  privacyOpen,
  preset,
  onClose,
  onOpenPrivacy,
}) => {
  const { lockScroll, unlockScroll } = useLenis();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const fetchAbortRef = useRef<AbortController | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  const [sessionType, setSessionType] = useState(SESSION_TYPES[0]);
  const [location, setLocation] = useState<LocationOption>(LOCATIONS[0]);

  const dateOptions = useMemo(
    () => getUpcomingDaysForWeekdays(LOCATION_OPEN_WEEKDAYS[location].days),
    [location]
  );

  const [preferredDay, setPreferredDay] = useState('Najbliższy wolny termin');
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[2]);
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
    setPreferredDay('Najbliższy wolny termin');
    setSessionType(resolveSessionPreset(preset.sessionType));

    if (preset.location && (LOCATIONS as readonly string[]).includes(preset.location)) {
      setLocation(preset.location as LocationOption);
    }
    if (preset.topic) {
      setNote(`Obszar, o którym chciałbym/chciałabym porozmawiać: ${preset.topic}.`);
    } else {
      setNote((prev) =>
        prev.startsWith('Obszar, o którym chciałbym/chciałabym porozmawiać:') ? '' : prev
      );
    }

    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => window.clearTimeout(focusTimer);
  }, [open, preset]);

  useEffect(() => {
    if (!open || privacyOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, privacyOpen, onClose]);

  const handleSessionTypeChange = (option: string) => {
    setSessionType(option);
    setPreferredDay('Najbliższy wolny termin');
  };

  const handleLocationChange = (loc: LocationOption) => {
    setLocation(loc);
    setPreferredDay('Najbliższy wolny termin');
  };

  const recipientEmail = PRACTICE.bookingRecipientEmail;
  const effectiveLocationLabel = location;
  const trimmedNameDisplay = name.trim();

  const summaryPlainText = [
    `Imię: ${trimmedNameDisplay}`,
    phone.trim() ? `Telefon: ${phone.trim()}` : null,
    clientEmail.trim() ? `E-mail pacjenta: ${clientEmail.trim()}` : null,
    `Rodzaj spotkania: ${sessionType}`,
    `Forma / Lokalizacja: ${effectiveLocationLabel}`,
    `Preferowany dzień: ${preferredDay}`,
    `Preferowana pora: ${preferredTime}`,
    `Wiadomość: ${note.trim() || '(brak dodatkowej wiadomości)'}`,
  ]
    .filter(Boolean)
    .join('\n');

  const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    `[Rezerwacja] ${trimmedNameDisplay} — ${sessionType} (${effectiveLocationLabel})`
  )}&body=${encodeURIComponent(`Dzień dobry,\n\n${summaryPlainText}`)}`;

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
      setError('Proszę podać swoje imię.');
      return;
    }
    if (!trimmedPhone && !trimmedEmail) {
      setError('Proszę podać numer telefonu lub adres e-mail do kontaktu zwrotnego.');
      return;
    }
    if (trimmedPhone && trimmedPhone.replace(/\D/g, '').length < 7) {
      setError('Numer telefonu wydaje się zbyt krótki — sprawdź proszę cyfry lub podaj e-mail.');
      return;
    }
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Proszę sprawdzić poprawność adresu e-mail.');
      return;
    }
    if (!consent) {
      setError('Proszę potwierdzić zgodę na kontakt zwrotny (RODO).');
      return;
    }

    setError(null);
    setSending(true);

    const payload: Record<string, string> = {
      'Imię pacjenta': trimmedName,
      'Telefon kontaktowy': trimmedPhone || 'Nie podano',
      'E-mail pacjenta': trimmedEmail || 'Nie podano',
      'Rodzaj spotkania': sessionType,
      'Forma / Lokalizacja': effectiveLocationLabel,
      'Preferowany dzień': preferredDay,
      'Preferowana pora dnia': preferredTime,
      Wiadomość: note.trim() || 'Brak dodatkowej wiadomości',
      'Zgoda RODO': 'Tak — zgoda na kontakt zwrotny w celu umówienia wizyty',
      _subject: `Nowa rezerwacja: ${trimmedName} — ${effectiveLocationLabel}`,
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
            className="absolute inset-0 bg-[#1A2723]/58 backdrop-blur-sm"
          />

          <motion.div
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
            className="relative z-10 flex h-[100dvh] w-full max-w-[580px] flex-col overflow-y-auto overscroll-contain bg-[#F6F3EE] px-6 pb-10 pt-8 text-[#1D2220] shadow-2xl sm:px-10 sm:py-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#1D2220]/11 pb-6">
              <div>
                <p className="eyebrow">Rezerwacja konsultacji</p>
                <h2
                  id="booking-drawer-title"
                  className="font-editorial mt-2 text-3xl font-normal text-[#1D2220] sm:text-[34px]"
                >
                  Zróbmy spokojny pierwszy krok.
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Zamknij panel rezerwacji"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1D2220]/15 text-[#1D2220] transition-colors hover:border-[#2B423B] hover:bg-[#2B423B] hover:text-[#F6F3EE]"
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
                    <legend className="block text-[10.5px] uppercase tracking-[0.18em] text-[#5D6560]">
                      1. Wybierz formę spotkania
                    </legend>
                    <div className="grid grid-cols-1 gap-1.5">
                      {SESSION_TYPES.map((option) => {
                        const active = sessionType === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={active}
                            onClick={() => handleSessionTypeChange(option)}
                            className={`flex items-center justify-between border px-4 py-2.5 text-left text-[13px] transition-all duration-300 ${
                              active
                                ? 'border-[#2B423B] bg-[#2B423B] text-[#F6F3EE]'
                                : 'border-[#1D2220]/12 bg-[#FAF8F4] text-[#1D2220] hover:border-[#2B423B]/45'
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
                  <fieldset className="space-y-2">
                    <legend className="block text-[10.5px] uppercase tracking-[0.18em] text-[#5D6560]">
                      2. Lokalizacja
                    </legend>
                    <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
                      {LOCATIONS.map((loc) => {
                        const active = location === loc;
                        return (
                          <button
                            key={loc}
                            type="button"
                            aria-pressed={active}
                            onClick={() => handleLocationChange(loc)}
                            className={`border px-2.5 py-2.5 text-center text-[12px] leading-tight transition-all duration-300 ${
                              active
                                ? 'border-[#2B423B] bg-[#2B423B]/10 font-medium text-[#2B423B]'
                                : 'border-[#1D2220]/12 bg-[#FAF8F4] text-[#4E5551] hover:border-[#2B423B]/40'
                            }`}
                          >
                            {loc}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* 3. Preferowany dzień i pora */}
                  <fieldset className="space-y-2.5">
                    <legend className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.18em] text-[#5D6560]">
                      <Calendar className="h-3.5 w-3.5 text-[#8C5E3E]" />
                      <span>3. Preferowany dzień i pora</span>
                    </legend>
                    <p className="text-[11.5px] font-light text-[#5D6560]">
                      {`${location}: ${LOCATION_OPEN_WEEKDAYS[location].label}`}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {dateOptions.map((day) => {
                        const active = preferredDay === day;
                        return (
                          <button
                            key={day}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setPreferredDay(day)}
                            className={`rounded-full border px-3 py-1.5 text-[11.5px] transition-all duration-250 ${
                              active
                                ? 'border-[#2B423B] bg-[#2B423B] text-[#F6F3EE]'
                                : 'border-[#1D2220]/12 bg-[#FAF8F4] text-[#4E5551] hover:border-[#2B423B]/45'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
                      {TIME_SLOTS.map((slot) => {
                        const active = preferredTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setPreferredTime(slot)}
                            className={`border px-2.5 py-2 text-center text-[11.5px] transition-all duration-300 ${
                              active
                                ? 'border-[#2B423B] bg-[#2B423B]/10 font-medium text-[#2B423B]'
                                : 'border-[#1D2220]/12 bg-[#FAF8F4] text-[#4E5551] hover:border-[#2B423B]/40'
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
                        className="mb-1 block text-[10.5px] uppercase tracking-[0.18em] text-[#5D6560]"
                      >
                        Imię *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        autoComplete="given-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="np. Anna"
                        className="w-full border border-[#1D2220]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-[13.5px] text-[#1D2220] placeholder:text-[#5D6560]/60 focus:border-[#2B423B]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="mb-1 block text-[10.5px] uppercase tracking-[0.18em] text-[#5D6560]"
                      >
                        Telefon (lub e-mail) *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="np. 500 000 000"
                        className="w-full border border-[#1D2220]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-[13.5px] text-[#1D2220] placeholder:text-[#5D6560]/60 focus:border-[#2B423B]"
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
                      className="mb-1 block text-[10.5px] uppercase tracking-[0.18em] text-[#5D6560]"
                    >
                      Adres e-mail (do potwierdzenia terminu)
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      autoComplete="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="np. anna@example.pl"
                      className="w-full border border-[#1D2220]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-[13.5px] text-[#1D2220] placeholder:text-[#5D6560]/60 focus:border-[#2B423B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-note"
                      className="mb-1 block text-[10.5px] uppercase tracking-[0.18em] text-[#5D6560]"
                    >
                      Krótka wiadomość (opcjonalnie)
                    </label>
                    <textarea
                      id="booking-note"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Wystarczy jedno zdanie lub preferowane godziny."
                      className="w-full resize-none border border-[#1D2220]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-[13.5px] text-[#1D2220] placeholder:text-[#5D6560]/60 focus:border-[#2B423B]"
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3 text-[12px] font-light leading-relaxed text-[#4E5551]">
                    <input
                      id="booking-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#2B423B]"
                    />
                    <div>
                      <label htmlFor="booking-consent" className="cursor-pointer">
                        Wyrażam zgodę na kontakt zwrotny w celu ustalenia terminu konsultacji.
                        Zapoznałem/am się z{' '}
                      </label>
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="underline decoration-[#2B423B]/50 underline-offset-2 hover:text-[#2B423B]"
                      >
                        Polityką prywatności i RODO
                      </button>
                      .
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 border-l-2 border-[#8C5E3E] bg-[#EFEAE1] px-3.5 py-2.5 text-[12.5px] text-[#1D2220]"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#8C5E3E]" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit & Recipient Transparency */}
                  <div className="mt-auto space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-[#2B423B] px-7 py-4 text-[13.5px] font-medium text-[#F6F3EE] transition-colors duration-300 hover:bg-[#1A2723] disabled:opacity-70"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Wysyłanie rezerwacji do gabinetu…</span>
                        </>
                      ) : (
                        <>
                          <SlotRollText label="Wyślij rezerwację na e-mail gabinetu" />
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5D6560]">
                      <span className="inline-flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 stroke-[1.5]" />
                        <span>Trafia bezpośrednio do {recipientEmail}</span>
                      </span>
                      <a
                        href={PRACTICE.phoneHref}
                        className="inline-flex items-center gap-1.5 text-[#2B423B] hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5 stroke-[1.5]" />
                        <span>{PRACTICE.phoneDisplay}</span>
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#1D2220]/9 pt-2.5 text-[11px] text-[#5D6560]">
                      <span>Wolisz kalendarz zewnętrzny?</span>
                      <div className="flex items-center gap-3">
                        <a
                          href={PRACTICE.twojPsychologUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#2B423B] underline decoration-[#2B423B]/35 underline-offset-2 hover:text-[#1A2723]"
                        >
                          TwójPsycholog.pl
                        </a>
                        <a
                          href={PRACTICE.znanyLekarzUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#2B423B] underline decoration-[#2B423B]/35 underline-offset-2 hover:text-[#1A2723]"
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
                        ? 'bg-[#2B423B] text-[#F6F3EE]'
                        : 'bg-[#8C5E3E] text-[#F6F3EE]'
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

                  <h3 className="font-editorial mt-7 text-4xl font-light text-[#1D2220]">
                    {deliveryMode === 'email-sent'
                      ? `Dziękuję, ${trimmedNameDisplay}.`
                      : `Prawie gotowe, ${trimmedNameDisplay}.`}
                  </h3>

                  {deliveryMode === 'email-sent' ? (
                    <p className="mt-4 text-[15px] font-light leading-[1.82] text-[#4E5551]">
                      Twoja rezerwacja została wysłana bezpośrednio na skrzynkę gabinetu (
                      <span className="font-normal text-[#1D2220]">{recipientEmail}</span>).
                      Odpowiadam osobiście w ciągu 24 godzin w dni robocze z propozycją dokładnej
                      godziny.
                    </p>
                  ) : (
                    <p className="mt-4 text-[15px] font-light leading-[1.82] text-[#4E5551]">
                      Nie udało się potwierdzić automatycznej wysyłki (skrzynka{' '}
                      <span className="font-normal text-[#1D2220]">{recipientEmail}</span> może
                      wymagać jednorazowej aktywacji w FormSubmit lub połączenie jest offline).
                      Wyślij przygotowane zgłoszenie jednym kliknięciem ze swojej poczty lub
                      skopiuj jego treść:
                    </p>
                  )}

                  <div className="mt-6 w-full space-y-2 border border-[#1D2220]/11 bg-[#FAF8F4] p-5 text-[13px]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#8C5E3E]">
                      Podsumowanie zgłoszenia
                    </p>
                    <p className="font-medium text-[#1D2220]">{sessionType}</p>
                    <p className="text-[#4E5551]">
                      {effectiveLocationLabel} · {preferredDay} · {preferredTime}
                    </p>
                    <p className="text-[#4E5551]">
                      Kontakt: {phone.trim() || clientEmail.trim()}
                      {phone.trim() && clientEmail.trim() ? ` · ${clientEmail.trim()}` : ''}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-full bg-[#2B423B] px-5 py-3 text-[12.5px] font-medium text-[#F6F3EE] transition-colors hover:bg-[#1A2723]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Wyślij przez program pocztowy</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 rounded-full border border-[#1D2220]/16 bg-[#FAF8F4] px-4 py-3 text-[12.5px] font-medium text-[#1D2220] hover:border-[#2B423B]"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#2B423B]" />
                          <span>Skopiowano</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Kopiuj treść</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center gap-6">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="editorial-link text-[13px] font-medium text-[#2B423B]"
                    >
                      ← Popraw dane
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="editorial-link-persistent text-[13px] font-medium text-[#4E5551] hover:text-[#1D2220]"
                    >
                      Wróć na stronę
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
