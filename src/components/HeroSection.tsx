import React, { useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Star } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getRouteHref, handleRouteLinkClick, type PageId } from '../types/navigation';
import { useLenis } from './motion/LenisProvider';
import { AmbientLightCanvas } from './motion/AmbientLightCanvas';
import {
  CurtainImage,
  EASE_EDITORIAL,
  KineticArrow,
  MagneticButton,
  MaskedLines,
  SlotRollText,
} from './motion/MotionPrimitives';

function getTodayClinicLabel(weekendLabel: string, weekdayLabel: string): string {
  try {
    const weekday = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Warsaw',
      weekday: 'short',
    }).format(new Date());

    if (weekday === 'Sat' || weekday === 'Sun') {
      return weekendLabel;
    }
    return weekdayLabel;
  } catch {
    return weekdayLabel;
  }
}

interface HeroSectionProps {
  ready: boolean;
  onNavigate: (page: PageId, anchor?: string) => void;
  onOpenBooking: (presetTopic?: string, presetType?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  ready,
  onNavigate,
  onOpenBooking,
}) => {
  const { practice, ui } = usePreferences();
  const { scrollTo } = useLenis();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const todayClinicLabel = useMemo(
    () => getTodayClinicLabel(ui.hero.todayWeekend, ui.hero.todayWeekday),
    [ui.hero.todayWeekend, ui.hero.todayWeekday]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const badgeParallaxY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -28]);
  const copyDepartureY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 20]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-x-clip pb-8 pt-20 md:pb-10 md:pt-22 lg:pt-22"
    >
      {/* Interactive HTML5 Canvas Baltic Morning / Midnight Light Field */}
      <AmbientLightCanvas />

      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        {/* Top Metadata Editorial Strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.65, delay: 0.02, ease: EASE_EDITORIAL }}
          className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-3 md:mb-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-emphasis)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-emphasis)]" />
            </span>
            <span className="text-[11.5px] font-medium tracking-[0.04em] text-[var(--text-secondary)]">
              {practice.availabilityStatus}
            </span>
          </div>
          <span className="hidden text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:inline">
            {todayClinicLabel}
          </span>
        </motion.div>

        {/* Main 12-Column Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left Narrative Column */}
          <motion.div
            style={{ y: copyDepartureY }}
            className="flex flex-col justify-between lg:col-span-7 lg:pt-1"
          >
            <h1 className="text-[var(--text-ink)]">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.65, delay: 0.05, ease: EASE_EDITORIAL }}
                className="eyebrow mb-3.5 block"
              >
                {practice.hero.eyebrow}
              </motion.span>
              <span className="font-editorial block text-[clamp(2.2rem,4.1vw,4.25rem)] font-light leading-[1.02] tracking-[-0.025em]">
                <MaskedLines
                  lines={practice.hero.headlineLines}
                  italicSubstring={practice.hero.italicWord}
                  delay={0.08}
                  stagger={0.08}
                  immediate
                  ready={ready}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.78, delay: 0.28, ease: EASE_EDITORIAL }}
              className="mt-5 max-w-[560px] text-[15px] font-light leading-[1.78] text-[var(--text-secondary)] md:text-[16px]"
            >
              {practice.hero.subheadline}
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.78, delay: 0.36, ease: EASE_EDITORIAL }}
              className="mt-6 flex flex-wrap items-center gap-6"
            >
              <MagneticButton
                onClick={() => onOpenBooking()}
                cursorLabel={ui.cursors.book}
                className="group inline-flex items-center gap-3.5 rounded-full bg-[var(--btn-primary-bg)] px-8 py-4 text-[13.5px] font-medium tracking-[0.03em] text-[var(--btn-primary-text)] shadow-[var(--shadow-card)] transition-colors duration-300 hover:bg-[var(--btn-primary-hover)]"
              >
                <SlotRollText label={practice.hero.primaryCta} italicHover />
                <KineticArrow className="h-4 w-4" />
              </MagneticButton>

              <a
                href={getRouteHref('o-mnie')}
                onClick={(e) => handleRouteLinkClick(e, () => onNavigate('o-mnie'))}
                className="group editorial-link-persistent py-1 text-[13.5px] font-medium text-[var(--text-ink)] transition-colors hover:text-[var(--accent-emphasis)]"
              >
                <SlotRollText label={practice.hero.secondaryCta} />
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5] text-[var(--accent-amber)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Editorial Credentials Footer Strip */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.78, delay: 0.44, ease: EASE_EDITORIAL }}
              className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--border-subtle)] pt-5 sm:flex sm:flex-wrap sm:items-start sm:justify-between lg:mt-8"
            >
              {practice.hero.trustStats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="font-editorial text-[20px] font-medium leading-tight tracking-tight text-[var(--text-ink)] sm:text-[22px] xl:text-[24px]">
                    {stat.value}
                  </p>
                  <p className="text-[12px] font-light tracking-[0.02em] text-[var(--text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}

              <a
                href={getRouteHref('gabinety')}
                onClick={(e) =>
                  handleRouteLinkClick(e, () => onNavigate('gabinety', '#wizytowka-google'))
                }
                className="group space-y-1 text-left"
              >
                <p className="font-editorial flex items-center gap-1.5 text-[20px] font-medium leading-tight tracking-tight text-[var(--text-ink)] transition-colors group-hover:text-[var(--accent-emphasis)] sm:text-[22px] xl:text-[24px]">
                  <span>{practice.googleProfile.rating.toFixed(1).replace('.', ',')}</span>
                  <Star className="h-4 w-4 fill-[#C4924A] text-[#C4924A]" />
                </p>
                <p className="text-[12px] font-light tracking-[0.02em] text-[var(--text-muted)] underline decoration-[var(--border-medium)] underline-offset-4 group-hover:text-[var(--accent-emphasis)]">
                  {practice.googleProfile.reviewCount} {ui.hero.reviewsSuffix}
                </p>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Portrait Column — Zero Crown Cropping */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-[385px] lg:ml-auto lg:mr-0 xl:max-w-[405px]">
              <a
                href={getRouteHref('o-mnie')}
                onClick={(e) => handleRouteLinkClick(e, () => onNavigate('o-mnie'))}
                aria-label={ui.hero.portraitAria}
                className="block w-full text-left"
              >
                <CurtainImage
                  src={practice.images.portrait}
                  alt={ui.hero.portraitAlt}
                  aspectClass="aspect-[15/16]"
                  className="rounded-[2px] shadow-[var(--shadow-card-lg)]"
                  imgClassName="object-top"
                  parallaxStrength={0}
                  width={749}
                  height={800}
                  immediate
                  ready={ready}
                  priority
                  cursorLabel={ui.cursors.about}
                />
              </a>

              {/* Floating Editorial Identity Plate */}
              <motion.div
                style={{ y: badgeParallaxY }}
                className="relative -mt-9 ml-3 mr-3 sm:-ml-8 sm:mr-6 sm:max-w-[368px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.78, delay: 0.36, ease: EASE_EDITORIAL }}
                  className="border border-[var(--border-subtle)] bg-[var(--bg-paper-elevated)] px-5 py-4 backdrop-blur-md shadow-[var(--shadow-card)]"
                >
                  <p className="text-[9px] uppercase tracking-[0.09em] text-[var(--accent-amber)]">
                    {practice.role}
                  </p>
                  <p className="font-editorial mt-0.5 text-[23px] font-normal text-[var(--text-ink)]">
                    {practice.fullName}
                  </p>
                  <p className="mt-1.5 text-[12px] font-light leading-relaxed text-[var(--text-secondary)]">
                    {ui.hero.locationsLine}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Quiet Editorial Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="mt-5 hidden items-center justify-between lg:flex"
        >
          <button
            type="button"
            onClick={() => scrollTo('#przewodnik', -72)}
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent-emphasis)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-medium)] transition-transform duration-500 group-hover:translate-y-1">
              <ArrowDown className="h-3.5 w-3.5 stroke-[1.4]" />
            </span>
            <span>{ui.hero.scrollCue}</span>
          </button>

          <span className="text-[11px] tracking-[0.14em] text-[var(--text-muted)]">
            {ui.hero.confidentiality}
          </span>
        </motion.div>
      </div>
    </section>
  );
};
