import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { PRACTICE } from '../data/practice';
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
  step: (typeof PRACTICE.journey.steps)[number];
  index: number;
  total: number;
  parentProgress: MotionValue<number>;
  enableStack: boolean;
}

/**
 * Codrops / Awwwards Sticky Stacking Card (Desktop/Tablet `md:sticky` only —
 * mobile cards remain full scale & full brightness without phantom shrinking!).
 */
const StackingStepCard: React.FC<StackCardProps> = ({
  step,
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
        className="relative overflow-hidden border border-[#1D2220]/12 bg-[#FAF8F4] shadow-[0_28px_65px_-34px_rgba(26,39,35,0.28)] origin-top"
      >
        {/* Pure GPU depth scrim as newer cards glide over */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: dimOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-[#1A2723]"
        />

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Editorial Photography Half */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#E5DDD1] md:col-span-5 md:aspect-auto md:min-h-[290px]">
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
            <span className="font-editorial absolute left-4 top-4 rounded-full bg-[#1A2723]/82 px-3.5 py-1 text-base italic text-[#F6F3EE] backdrop-blur-md">
              Krok {step.number}
            </span>
          </div>

          {/* Crisp Editorial Copy Half */}
          <div className="flex flex-col justify-between p-7 sm:p-9 md:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-editorial text-4xl font-light italic text-[#8C5E3E]">
                  {step.number}
                </span>
                <span className="rounded-full border border-[#1D2220]/10 bg-[#F6F3EE] px-3.5 py-1 text-[11px] font-normal text-[#4E5551]">
                  {step.duration}
                </span>
              </div>

              <h3 className="font-editorial mt-5 text-[28px] font-normal leading-[1.16] text-[#1D2220] md:text-[32px]">
                {step.title}
              </h3>

              <p className="mt-4 text-[14.5px] font-light leading-[1.82] text-[#4E5551]">
                {step.description}
              </p>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-[#1D2220]/10 pt-4 text-[11px] uppercase tracking-[0.18em] text-[#5D6560]">
              <span>Gdynia · Online (PL / RU)</span>
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
    <section id="jak-zaczac" className="relative bg-[#F6F3EE] py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Sticky Editorial Intro + Drawn Botanical Line Art */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-4">{PRACTICE.journey.eyebrow}</p>
            </Reveal>

            <h2 className="font-editorial text-[clamp(2.2rem,3.7vw,3.5rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#1D2220]">
              <MaskedLines
                lines={[
                  'Pierwszy krok bywa',
                  'najtrudniejszy.',
                  'Dalej idziemy spokojnie.',
                ]}
                italicSubstring="Dalej idziemy spokojnie."
              />
            </h2>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[420px] text-[15px] font-light leading-[1.82] text-[#4E5551]">
                Nie musisz mieć gotowych odpowiedzi ani sprecyzowanego planu. Pierwsze konsultacje
                służą temu, byśmy mogli spokojnie zrozumieć, z czym się mierzysz.
              </p>
            </Reveal>

            <Reveal delay={0.22} className="mt-8">
              <MagneticButton
                onClick={() => onOpenBooking(undefined, 'Konsultacja psychologiczna')}
                cursorLabel="Umów"
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#2B423B] bg-transparent px-7 py-3.5 text-[13px] font-medium text-[#2B423B] transition-colors duration-300 hover:bg-[#2B423B] hover:text-[#F6F3EE]"
              >
                <SlotRollText label="Umów pierwszą konsultację" italicHover />
                <KineticArrow className="h-4 w-4" />
              </MagneticButton>
            </Reveal>

            <div className="mt-10 hidden lg:block">
              <BotanicalDrawSvg className="h-44 w-36 opacity-80" />
            </div>
          </div>

          {/* Right Sticky Stacking Photographic Card Deck */}
          <div ref={stackRef} className="relative pb-6 lg:col-span-7">
            {PRACTICE.journey.steps.map((step, idx) => (
              <StackingStepCard
                key={step.number}
                step={step}
                index={idx}
                total={PRACTICE.journey.steps.length}
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
