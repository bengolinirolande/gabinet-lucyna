import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Copy, Mail, Phone } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { handleRouteLinkClick, NAV_ORDER, type PageId } from '../types/navigation';
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
  const { practice, ui, routes } = usePreferences();
  const f = ui.footer;
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
      // Clipboard API unavailable
    }
  };

  return (
    <footer
      ref={footerRef}
      data-dark-surface="true"
      className="relative overflow-hidden border-t border-[#F6F3EE]/8 bg-[var(--bg-deep)] pt-14 pb-8 text-[#F6F3EE] md:pt-18"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,164,132,0.08)_0%,rgba(26,39,35,0)_72%)]"
      />

      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        {/* Closing Serene Invitation */}
        <div className="grid grid-cols-1 items-end gap-8 pb-10 lg:grid-cols-12 md:pb-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#C9A484]">
                {f.eyebrow}
              </p>
            </Reveal>
            <h2 className="font-editorial mt-4 text-[clamp(2.1rem,4vw,3.6rem)] font-light leading-[1.03] tracking-[-0.02em] text-[#F6F3EE]">
              <MaskedLines lines={f.lines} />
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <MagneticButton
              onClick={onOpenBooking}
              cursorLabel={ui.cursors.start}
              className="group inline-flex items-center gap-3 rounded-full bg-[#F6F3EE] px-8 py-4 text-[13.5px] font-medium text-[#1A2723] transition-colors duration-300 hover:bg-[#EFEAE1]"
            >
              <SlotRollText label={f.cta} italicHover />
              <KineticArrow className="h-4 w-4" />
            </MagneticButton>
            <p className="text-[12px] font-light text-[#F6F3EE]/55">{f.replyNote}</p>
          </div>
        </div>

        <HairlineDivider light />

        {/* Structured Footer Columns */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Contact Direct */}
          <address className="space-y-4 not-italic lg:col-span-4">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C9A484]">
              {f.contactHeading}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={practice.phoneHref}
                className="editorial-link inline-flex items-center gap-2.5 text-[16px] font-light text-[#F6F3EE]"
              >
                <Phone className="h-4 w-4 stroke-[1.4] text-[#C9A484]" />
                <span>{practice.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(practice.phoneDisplay, 'phone')}
                aria-label={f.copyPhoneAria}
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
                      <span>{f.copied}</span>
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
                href={`mailto:${practice.email}`}
                className="editorial-link inline-flex items-center gap-2.5 text-[15px] font-light text-[#F6F3EE]/85"
              >
                <Mail className="h-4 w-4 stroke-[1.4] text-[#C9A484]" />
                <span>{practice.email}</span>
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(practice.email, 'email')}
                aria-label={f.copyEmailAria}
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
                      <span>{f.copied}</span>
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

            <p className="pt-1 text-[12px] font-light leading-relaxed text-[#F6F3EE]/55">
              {f.clinicNoteBefore}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-[12px] text-[#C9A484]">
              <a
                href={practice.znanyLekarzUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link hover:text-[#F6F3EE]"
              >
                ZnanyLekarz
              </a>
              <a
                href={practice.twojPsychologUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link hover:text-[#F6F3EE]"
              >
                TwójPsycholog
              </a>
              <a
                href={practice.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link hover:text-[#F6F3EE]"
              >
                Facebook
              </a>
            </div>
          </address>

          {/* Locations */}
          <address className="space-y-4 not-italic lg:col-span-3">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C9A484]">
              {f.locationsHeading}
            </p>
            <div className="space-y-3.5 text-[13.5px] font-light text-[#F6F3EE]/78">
              {practice.locations.map((loc) => (
                <div key={loc.id}>
                  <p className="font-normal text-[#F6F3EE]">
                    {loc.city}{' '}
                    {loc.id !== 'online'
                      ? `· ${loc.district.split('·')[0].trim()}`
                      : `· ${f.onlineLabel}`}
                  </p>
                  <p className="text-[12.5px] text-[#F6F3EE]/65">
                    {loc.id === 'online' ? f.onlineSub : loc.address}
                  </p>
                </div>
              ))}
            </div>
            <p lang={f.bilingualNoteLang} className="pt-1 text-[11.5px] font-light text-[#F6F3EE]/55">
              {f.bilingualNote}
            </p>
          </address>

          {/* Navigation */}
          <nav aria-label={f.navAria} className="space-y-4 lg:col-span-2">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C9A484]">
              {f.navHeading}
            </p>
            <ul className="space-y-2.5 text-[13.5px] font-light text-[#F6F3EE]/75">
              {NAV_ORDER.map((pageId) => (
                <li key={pageId}>
                  <a
                    href={routes[pageId].hash}
                    onClick={(e) => handleRouteLinkClick(e, () => onNavigate(pageId))}
                    className="editorial-link transition-colors hover:text-[#F6F3EE]"
                  >
                    {routes[pageId].navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Crisis Resources */}
          <div className="space-y-4 lg:col-span-3">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C9A484]">
              {f.crisisHeading}
            </p>
            <p className="text-[12.5px] font-light leading-relaxed text-[#F6F3EE]/60">
              {f.crisisIntro}
            </p>
            <ul className="space-y-2 text-[12.5px]">
              {practice.crisisHelp.map((line) => (
                <li
                  key={line.number}
                  className="flex items-baseline justify-between gap-2 border-b border-[#F6F3EE]/10 pb-1.5"
                >
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
            © {new Date().getFullYear()} {practice.fullName} · {f.copyrightSuffix}
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="editorial-link text-[#F6F3EE]/65 hover:text-[#F6F3EE]"
            >
              {f.privacyBtn}
            </button>
            <button
              type="button"
              onClick={() => scrollTo(0, 0)}
              className="editorial-link text-[#F6F3EE]/65 hover:text-[#F6F3EE]"
            >
              {f.backToTop}
            </button>
          </div>
        </div>

        {/* Monumental Scroll-Rising Editorial Wordmark */}
        <div aria-hidden="true" className="mt-6 overflow-hidden select-none">
          <motion.p
            style={{ y: wordmarkY, opacity: wordmarkOpacity }}
            className="font-editorial text-center text-[clamp(2.8rem,9.5vw,8.5rem)] font-light leading-[0.88] tracking-[-0.03em] text-[#F6F3EE]"
          >
            {practice.shortName}
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
