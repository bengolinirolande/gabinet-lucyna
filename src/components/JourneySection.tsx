import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext';
import type { PracticeData } from '../data/practice.ru';
import {
  BotanicalDrawSvg,
  EASE_EDITORIAL,
  KineticArrow,
  MagneticButton,
  MaskedLines,
  Reveal,
  SlotRollText,
} from './motion/MotionPrimitives';

interface JourneySectionProps {
  onOpenBooking: (presetTopic?: string, presetType?: string) => void;
}

interface StackCardProps {
  step: PracticeData['journey']['steps'][number];
  stepPrefix: string;
  cardFooter: string;
  index: number;
  total: number;
  parentProgress: MotionValue<number>;
  enableStack: boolean;
}

const StackingStepCard: React.FC<StackCardProps> = ({
  step,
  stepPrefix,
  cardFooter,
  index,
  total,
  parentProgress,
  enableStack,
}) => {
  const reduced = useReducedMotion();
  const active = enableStack && !reduced;
  const start = index / total;
  const end = 1;
  const depthSteps = total - 1 - index;
  const targetScale = 1 - depthSteps * 0.042;
  const targetDim = depthSteps * 0.055;

  const scale = useTransform(parentProgress, [start, end], active ? [1, targetScale] : [1, 1]);
  const dimOpacity = useTransform(parentProgress, [start, end], active ? [0, targetDim] : [0, 0]);

  return (
    <div style={{ top: `${102 + index * 24}px` }} className="mb-8 last:mb-0 md:sticky">
      <motion.article
        style={{ scale }}
        className="relative origin-top overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-paper)] shadow-[var(--shadow-card-lg)]"
      >
        <motion.div
          aria-hidden="true"
          style={{ opacity: dimOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-[#0A100E]"
        />

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Editorial Photography Half */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-img-frame)] md:col-span-5 md:aspect-auto md:min-h-[290px]">
            <motion.img
              src={step.image}
              alt={step.imageAlt}
              loading="eager"
              decoding="async"
              initial={reduced ? { scale: 1 } : { scale: 1.07 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.15, ease: EASE_EDITORIAL }}
              className={`h-full w-full object-cover ${
                index === 1
                  ? 'object-top'
                  : index === 2
                    ? 'object-[50%_55%]'
                    : 'object-center'
              }`}
            />
            <span className="font-editorial absolute left-4 top-4 rounded-full bg-[#1A2723]/84 px-3.5 py-1 text-base italic text-[#F6F3EE] backdrop-blur-md">
              {stepPrefix} {step.number}
            </span>
          </div>

          {/* Crisp Editorial Copy Half */}
          <div className="flex flex-col justify-between p-7 sm:p-9 md:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-editorial text-4xl font-light italic text-[var(--accent-amber)]">
                  {step.number}
                </span>
                <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-1 text-[11px] font-normal text-[var(--text-secondary)]">
                  {step.duration}
                </span>
              </div>

              <h3 className="font-editorial mt-5 text-[28px] font-normal leading-[1.16] text-[var(--text-ink)] md:text-[32px]">
                {step.title}
              </h3>

              <p className="mt-4 text-[14.5px] font-light leading-[1.82] text-[var(--text-secondary)]">
                {step.description}
              </p>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <span>{cardFooter}</span>
              <span>
                {step.number} / 0{total}
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export const JourneySection: React.FC<JourneySectionProps> = ({ onOpenBooking }) => {
  const { practice, ui } = usePreferences();
  const stackRef = useRef<HTMLDivElement>(null);
  const [isDesktopStack, setIsDesktopStack] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setIsDesktopStack(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start 25%', 'end 88%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.25,
  });

  return (
    <section id="jak-zaczac" className="relative bg-[var(--bg-canvas)] py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Sticky Editorial Intro + Drawn Botanical Line Art */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-4">{practice.journey.eyebrow}</p>
            </Reveal>

            <h2 className="font-editorial text-[clamp(2.2rem,3.7vw,3.5rem)] font-light leading-[1.06] tracking-[-0.02em] text-[var(--text-ink)]">
              <MaskedLines
                lines={ui.journey.lines}
                italicSubstring={ui.journey.italicSubstring}
              />
            </h2>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[420px] text-[15px] font-light leading-[1.82] text-[var(--text-secondary)]">
                {ui.journey.lead}
              </p>
            </Reveal>

            <Reveal delay={0.22} className="mt-8">
              <MagneticButton
                onClick={() => onOpenBooking(undefined, 'consultation')}
                cursorLabel={ui.cursors.book}
                className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--accent-emphasis)] bg-transparent px-7 py-3.5 text-[13px] font-medium text-[var(--accent-emphasis)] transition-colors duration-300 hover:bg-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-text)]"
              >
                <SlotRollText label={ui.journey.cta} italicHover />
                <KineticArrow className="h-4 w-4" />
              </MagneticButton>
            </Reveal>

            <div className="mt-10 hidden lg:block">
              <BotanicalDrawSvg className="h-44 w-36 opacity-80" />
            </div>
          </div>

          {/* Right Sticky Stacking Photographic Card Deck */}
          <div ref={stackRef} className="relative pb-6 lg:col-span-7">
            {practice.journey.steps.map((step, idx) => (
              <StackingStepCard
                key={step.number}
                step={step}
                stepPrefix={ui.journey.stepPrefix}
                cardFooter={ui.journey.cardFooter}
                index={idx}
                total={practice.journey.steps.length}
                parentProgress={smoothProgress}
                enableStack={isDesktopStack}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
