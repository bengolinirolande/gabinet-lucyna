import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, BadgeCheck } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { EASE_EDITORIAL, Reveal } from './motion/MotionPrimitives';

const counterVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { y: '0%', opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const quoteVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 28,
    clipPath: dir > 0 ? 'inset(0% 0% 0% 8%)' : 'inset(0% 8% 0% 0%)',
  }),
  center: {
    opacity: 1,
    x: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -24,
    clipPath: dir > 0 ? 'inset(0% 8% 0% 0%)' : 'inset(0% 0% 0% 8%)',
  }),
};

export const TestimonialsSection: React.FC = () => {
  const { ui, lang } = usePreferences();
  const reflections = ui.testimonials.reflections;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  });

  const colLeftY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, -14]);
  const colMidY = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const colRightY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-14, 14]);
  const triptychMotion = [colLeftY, colMidY, colRightY];

  const navigate = (step: number) => {
    setDirection(step);
    setIndex((prev) => (prev + step + reflections.length) % reflections.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -45 || info.velocity.x < -300) {
      navigate(1);
    } else if (info.offset.x > 45 || info.velocity.x > 300) {
      navigate(-1);
    }
  };

  const current = reflections[index] ?? reflections[0];
  const openQuote = lang === 'ru' ? '«' : '„';
  const closeQuote = lang === 'ru' ? '»' : '”';

  return (
    <section
      aria-label={ui.testimonials.ariaLabel}
      className="relative bg-[var(--bg-canvas)] py-14 md:py-18"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Editorial Intro & Controls */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-4">
            <div>
              <Reveal>
                <p className="eyebrow mb-4">{ui.testimonials.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-editorial text-[clamp(2rem,3.3vw,3rem)] font-light leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)]">
                  {ui.testimonials.headingPrefix}{' '}
                  <em className="italic text-[var(--accent-emphasis)]">
                    {ui.testimonials.headingItalic}
                  </em>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-light text-[var(--text-muted)]">
                  <BadgeCheck className="h-4 w-4 shrink-0 stroke-[1.5] text-[var(--accent-emphasis)]" />
                  <span>{ui.testimonials.verifiedNote}</span>
                </div>
              </Reveal>
            </div>

            {/* Tactile Circular Navigation Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label={ui.testimonials.prevAria}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-medium)] bg-[var(--bg-paper)] text-[var(--text-ink)] transition-all duration-300 hover:border-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-text)]"
              >
                <ArrowLeft className="h-4 w-4 stroke-[1.5]" />
              </button>
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label={ui.testimonials.nextAria}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-medium)] bg-[var(--bg-paper)] text-[var(--text-ink)] transition-all duration-300 hover:border-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-text)]"
              >
                <ArrowRight className="h-4 w-4 stroke-[1.5]" />
              </button>

              <div className="ml-2 flex items-baseline gap-1 font-editorial text-lg text-[var(--text-secondary)]">
                <span className="relative inline-block h-[1.25em] w-[1.3em] overflow-hidden align-bottom text-[var(--text-ink)]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.span
                      key={index}
                      custom={direction}
                      variants={counterVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                      className="block"
                    >
                      0{index + 1}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-sm text-[var(--text-muted)]">/ 0{reflections.length}</span>
              </div>
            </div>
          </div>

          {/* Right Animated Editorial Quote Canvas */}
          <div className="lg:col-span-8">
            <div
              aria-live="polite"
              className="relative overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-paper)] p-8 shadow-[var(--shadow-card)] md:p-12 lg:p-14"
            >
              <span
                aria-hidden="true"
                style={{ color: 'var(--quote-watermark)' }}
                className="font-editorial pointer-events-none absolute right-8 top-4 select-none text-[120px] leading-none"
              >
                {openQuote}
              </span>

              <div className="min-h-[220px] sm:min-h-[200px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${lang}-${current.id}`}
                    custom={direction}
                    variants={quoteVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag={reduced ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={handleDragEnd}
                    transition={{ duration: 0.52, ease: EASE_EDITORIAL }}
                    className="flex cursor-grab flex-col justify-between gap-8 active:cursor-grabbing"
                  >
                    <blockquote className="font-editorial text-[24px] font-light italic leading-[1.42] text-[var(--text-ink)] md:text-[30px]">
                      {openQuote}
                      {current.quote}
                      {closeQuote}
                    </blockquote>

                    <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[var(--border-hairline)] pt-6">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--text-ink)]">
                          {current.author}
                        </p>
                        <p className="mt-0.5 text-[12.5px] font-light text-[var(--text-secondary)]">
                          {current.context}
                        </p>
                      </div>
                      <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        {current.location}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive Progress Segmented Bars */}
              <div className="mt-5 flex items-center gap-2">
                {reflections.map((item, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`${ui.testimonials.showReviewAria} ${i + 1}`}
                      aria-pressed={active}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className="flex-1 py-3"
                    >
                      <span className="relative block h-1 w-full overflow-hidden bg-[var(--border-subtle)]">
                        {active && (
                          <motion.span
                            layoutId="testimonial-active-bar"
                            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                            className="absolute inset-0 bg-[var(--btn-primary-bg)]"
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Opposing Vertical Parallax Editorial Triptych */}
        <div ref={stripRef} className="mt-10 py-4 md:mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {ui.testimonials.triptych.map((frame, i) => (
              <motion.figure
                key={frame.src}
                style={{ y: triptychMotion[i] }}
                className="group space-y-2.5"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[2px] bg-[var(--bg-img-frame)]">
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${frame.pos}`}
                  />
                </div>
                <figcaption className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {frame.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
