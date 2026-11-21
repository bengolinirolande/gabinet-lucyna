import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Copy, Mail, Phone } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import { NAV_ORDER, ROUTES, type PageId } from '../types/navigation';
import { useLenis } from './motion/LenisProvider';
import {
  HairlineDivider,
  KineticArrow,
  MagneticButton,
  MaskedLines,
  Reveal,
  SlotRollText,
} from './motion/MotionPrimitives';

interface FooterSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenPrivacy: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenPrivacy,
}) => {
  const { scrollTo } = useLenis();
  const reduced = useReducedMotion();
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const wordmarkY = useTransform(scrollYProgress, [0.35, 1], reduced ? [0, 0] : [54, 0]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0.35, 1], reduced ? [0.12, 0.12] : [0.06, 0.14]);

  const copyTimerRef = useRef<number | null>(null);

  const copyToClipboard = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      setCopiedField(field);
      copyTimerRef.current = window.setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Clipboard API unavailable in insecure contexts
    }
  };

  return (
    <footer
      ref={footerRef}
      data-dark-surface="true"
      className="relative overflow-hidden bg-[#1A2723] pt-14 pb-8 text-[#F6F3EE] md:pt-18"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,164,132,0.08)_0%,rgba(26,39,35,0)_72%)]"
      />

      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        {/* Closing Serene Invitation */}
        <div className="grid grid-cols-1 items-end gap-8 pb-10 lg:grid-cols-12 md:pb-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#C9A484]">
                Pierwszy krok
              </p>
            </Reveal>
            <h2 className="font-editorial mt-4 text-[clamp(2.1rem,4vw,3.6rem)] font-light leading-[1.03] tracking-[-0.02em] text-[#F6F3EE]">
              <MaskedLines
                lines={[
                  'Nie musisz mieć wszystkiego',
                  'poukładanego, żeby zacząć.',
                ]}
              />
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <MagneticButton
              onClick={onOpenBooking}
              cursorLabel="Start"
              className="group inline-flex items-center gap-3 rounded-full bg-[#F6F3EE] px-8 py-4 text-[13.5px] font-medium text-[#1A2723] transition-colors duration-300 hover:bg-[#EFEAE1]"
            >
              <SlotRollText label="Umów konsultację" italicHover />
              <KineticArrow className="h-4 w-4" />
            </MagneticButton>
            <p className="text-[12px] font-light text-[#F6F3EE]/55">
              Odpowiadam zwykle w ciągu 24h w dni robocze.
            </p>
          </div>
        </div>

        <HairlineDivider light />

        {/* Structured Footer Columns */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Contact Direct with One-Click Copy Spell */}
          <div className="space-y-4 lg:col-span-4">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C9A484]">
              Kontakt bezpośredni
            </p>

            <div className="flex items-center gap-3">
              <a
                href={PRACTICE.phoneHref}
                className="editorial-link inline-flex items-center gap-2.5 text-[16px] font-light text-[#F6F3EE]"
              >
                <Phone className="h-4 w-4 stroke-[1.4] text-[#C9A484]" />
                <span>{PRACTICE.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(PRACTICE.phoneDisplay, 'phone')}
                aria-label="Kopiuj numer telefonu"
                className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#F6F3EE]/15 px-2.5 text-[11px] text-[#F6F3EE]/70 transition-colors hover:border-[#C9A484] hover:text-[#F6F3EE]"
              >
                <AnimatePresence mode="wait">
                  {copiedField === 'phone' ? (
                    <motion.span
                      key="copied-phone"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="inline-flex items-center gap-1 text-[#C9A484]"
                    >
                      <Check className="h-3 w-3" />
                      <span>Skopiowano</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy-phone"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Copy className="h-3 w-3" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${PRACTICE.email}`}
                className="editorial-link inline-flex items-center gap-2.5 text-[15px] font-light text-[#F6F3EE]/85"
              >
                <Mail className="h-4 w-4 stroke-[1.4] text-[#C9A484]" />
                <span>{PRACTICE.email}</span>
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(PRACTICE.email, 'email')}
                aria-label="Kopiuj adres e-mail"
                className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#F6F3EE]/15 px-2.5 text-[11px] text-[#F6F3EE]/70 transition-colors hover:border-[#C9A484] hover:text-[#F6F3EE]"
              >
                <AnimatePresence mode="wait">
                  {copiedField === 'email' ? (
                    <motion.span
                      key="copied-email"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="inline-flex items-center gap-1 text-[#C9A484]"
                    >
                      <Check className="h-3 w-3" />
                      <span>Skopiowano</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy-email"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Copy className="h-3 w-3" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <p className="pt-2 text-[12.5px] font-light leading-relaxed text-[#F6F3EE]/55">
              Jeśli nie odbieram telefonu, najprawdopodobniej prowadzę sesję. Skorzystaj z formularza
              lub oficjalnych kalendarzy online:
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-[12px] text-[#C9A484]">
              <a
                href={PRACTICE.znanyLekarzUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link hover:text-[#F6F3EE]"
              >
                ZnanyLekarz
              </a>
              <a
                href={PRACTICE.twojPsychologUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link hover:text-[#F6F3EE]"
              >
                TwójPsycholog
              </a>
              <a
                href={PRACTICE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link hover:text-[#F6F3EE]"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Gabinety — derived from PRACTICE.locations single source of truth */}
          <div className="space-y-4 lg:col-span-3">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C9A484]">
              Lokalizacje
            </p>
            <div className="space-y-3.5 text-[13.5px] font-light text-[#F6F3EE]/78">
              {PRACTICE.locations.map((loc) => (
                <div key={loc.id}>
                  <p className="font-normal text-[#F6F3EE]">
                    {loc.city} {loc.id !== 'online' ? `· ${loc.district.split('·')[0].trim()}` : '· Wideo'}
                  </p>
                  <p className="text-[12.5px] text-[#F6F3EE]/65">
                    {loc.id === 'online' ? loc.district : loc.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Page Navigation */}
          <div className="space-y-4 lg:col-span-2">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C9A484]">
              Nawigacja
            </p>
            <ul className="space-y-2.5 text-[13.5px] font-light text-[#F6F3EE]/75">
              {NAV_ORDER.map((pageId) => (
                <li key={pageId}>
                  <button
                    type="button"
                    onClick={() => onNavigate(pageId)}
                    className="editorial-link transition-colors hover:text-[#F6F3EE]"
                  >
                    {ROUTES[pageId].navLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Crisis Resources (Essential Ethical Standard) */}
          <div className="space-y-4 lg:col-span-3">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C9A484]">
              Pilna pomoc w kryzysie
            </p>
            <p className="text-[12.5px] font-light leading-relaxed text-[#F6F3EE]/60">
              Gabinet nie prowadzi całodobowego dyżuru interwencyjnego. W sytuacji nagłego kryzysu
              psychicznego skontaktuj się bezpłatnie:
            </p>
            <ul className="space-y-2 text-[12.5px]">
              {PRACTICE.crisisHelp.map((line) => (
                <li key={line.number} className="flex items-baseline justify-between gap-2 border-b border-[#F6F3EE]/10 pb-1.5">
                  <span className="font-light text-[#F6F3EE]/70">{line.label}</span>
                  <a
                    href={`tel:${line.number.replace(/\s+/g, '')}`}
                    className="shrink-0 font-medium text-[#C9A484] hover:underline"
                  >
                    {line.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HairlineDivider light />

        {/* Quiet Editorial Legal Row */}
        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-[12px] font-light text-[#F6F3EE]/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {PRACTICE.fullName} · Gabinet Psychologiczny · Gdynia &amp; Online
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="editorial-link text-[#F6F3EE]/65 hover:text-[#F6F3EE]"
            >
              Polityka prywatności i RODO
            </button>
            <button
              type="button"
              onClick={() => scrollTo(0, 0)}
              className="editorial-link text-[#F6F3EE]/65 hover:text-[#F6F3EE]"
            >
              Powrót na górę ↑
            </button>
          </div>
        </div>

        {/* Monumental Scroll-Rising Editorial Wordmark (Proportional Closing Signature) */}
        <div aria-hidden="true" className="mt-6 overflow-hidden select-none">
          <motion.p
            style={{ y: wordmarkY, opacity: wordmarkOpacity }}
            className="font-editorial text-center text-[clamp(2.8rem,9.5vw,8.5rem)] font-light leading-[0.88] tracking-[-0.03em] text-[#F6F3EE]"
          >
            {PRACTICE.shortName}
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
