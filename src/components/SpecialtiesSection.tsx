import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { Plus } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import {
  EASE_EDITORIAL,
  HairlineDivider,
  KineticArrow,
  MaskedLines,
  Reveal,
  SlotRollText,
} from './motion/MotionPrimitives';

interface SpecialtiesSectionProps {
  compactHeader?: boolean;
  onOpenBooking: (presetTopic?: string) => void;
}

const CARD_W = 248;
const CARD_H = 192;

/**
 * Codrops / Awwwards SOTD Interactive Editorial Index:
 * - Liquid spring row surface highlight (`layoutId`)
 * - Cursor-following floating photographic plate with snappy non-blocking crossfade
 *   & velocity-driven tilt that cleanly eases back to 0deg
 * - Valid WAI-ARIA Accordion pattern (`<h3><button aria-expanded ...>`)
 */
export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  compactHeader = false,
  onOpenBooking,
}) => {
  const [activeId, setActiveId] = useState<string>(PRACTICE.specialties[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 220, damping: 28, mass: 0.42 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 28, mass: 0.42 });

  const velocityX = useVelocity(rawX);
  const tiltTarget = useTransform(velocityX, [-1100, 0, 1100], [-6.5, 0, 6.5], { clamp: true });
  const springRotate = useSpring(tiltTarget, { stiffness: 240, damping: 24 });

  const computeCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const preferredX = x > rect.width * 0.56 ? x - CARD_W - 28 : x + 32;
    const clampedX = Math.min(Math.max(12, preferredX), Math.max(12, rect.width - CARD_W - 12));
    const clampedY = Math.min(
      Math.max(12, y - CARD_H / 2),
      Math.max(12, rect.height - CARD_H - 12)
    );
    return { clampedX, clampedY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const pos = computeCoords(e);
    if (!pos) return;

    if (!hasEnteredRef.current) {
      hasEnteredRef.current = true;
      rawX.jump(pos.clampedX);
      springX.jump(pos.clampedX);
      rawY.jump(pos.clampedY);
      springY.jump(pos.clampedY);
    } else {
      rawX.set(pos.clampedX);
      rawY.set(pos.clampedY);
    }
  };

  const hoveredItem = PRACTICE.specialties.find((s) => s.id === hoveredId) ?? null;

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="obszary"
      className={`relative overflow-x-clip bg-[#EFEAE1]/55 ${
        compactHeader ? 'pt-10 pb-16 md:pt-12 md:pb-20' : 'py-18 md:py-24'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        {!compactHeader ? (
          <div className="grid grid-cols-1 items-end gap-8 pb-12 lg:grid-cols-12 md:pb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-4">Obszary pracy</p>
              </Reveal>
              <h2 className="font-editorial text-[clamp(2.35rem,4.2vw,3.9rem)] font-light leading-[1.03] tracking-[-0.02em] text-[#1D2220]">
                <MaskedLines
                  lines={['W czym mogę Ci', 'uważnie towarzyszyć.']}
                  italicSubstring="towarzyszyć."
                />
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.14}>
                <p className="max-w-[440px] text-[15px] font-light leading-[1.78] text-[#4E5551] lg:ml-auto">
                  Nie musisz mieć gotowej diagnozy, żeby zgłosić się po wsparcie. Najedź lub kliknij
                  dowolny obszar, aby zobaczyć, jak wspólnie pracujemy.
                </p>
              </Reveal>
            </div>
          </div>
        ) : (
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
            <p className="eyebrow">Główne obszary wsparcia</p>
            <p className="text-[12.5px] font-light text-[#5D6560]">
              Najedź lub rozwiń wybrany temat, aby poznać szczegóły
            </p>
          </div>
        )}

        <HairlineDivider />

        {/* Architectural Numbered Index + Cursor-Following Floating Image Plate */}
        <div
          ref={listRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoveredId(null);
            hasEnteredRef.current = false;
          }}
          className="relative"
        >
          {/* Floating Cursor-Following Editorial Preview Plate (Snappy Overlapping Crossfade) */}
          <AnimatePresence>
            {!reduced && hoveredItem && hoveredItem.id !== activeId && (
              <motion.div
                key="floating-specialty-preview"
                aria-hidden="true"
                style={{
                  x: springX,
                  y: springY,
                  rotate: springRotate,
                  width: CARD_W,
                  height: CARD_H,
                }}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                className="pointer-events-none absolute left-0 top-0 z-30 hidden overflow-hidden rounded-[2px] border border-[#FAF8F4]/75 bg-[#1A2723] shadow-[0_32px_70px_-24px_rgba(26,39,35,0.48)] lg:block"
              >
                <AnimatePresence initial={false}>
                  <motion.img
                    key={hoveredItem.image}
                    src={hoveredItem.image}
                    alt=""
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.24, ease: EASE_EDITORIAL }}
                    className={`absolute inset-0 h-full w-full object-cover ${hoveredItem.imagePosition ?? 'object-center'}`}
                  />
                </AnimatePresence>
                <div className="relative z-10 flex h-full items-end bg-gradient-to-t from-[#1A2723]/88 via-[#1A2723]/25 to-transparent p-3.5">
                  <span className="font-editorial text-sm italic text-[#C9A484]">
                    {hoveredItem.number} · {hoveredItem.approach.split('·')[0].trim()}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {PRACTICE.specialties.map((item) => {
            const isOpen = activeId === item.id;
            const isHovered = hoveredId === item.id;
            const panelId = `specialty-panel-${item.id}`;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`relative border-b border-[#1D2220]/11 transition-colors duration-500 ${
                  isOpen ? 'bg-[#FAF8F4]/95' : ''
                }`}
              >
                {isHovered && !isOpen && (
                  <motion.div
                    layoutId="specialty-hover-surface"
                    transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                    className="pointer-events-none absolute inset-0 bg-[#FAF8F4]/85"
                  />
                )}

                <h3 className="relative z-10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    data-cursor={isOpen ? 'Zwiń' : 'Odkryj'}
                    onClick={() => toggle(item.id)}
                    className="group flex w-full items-center justify-between gap-6 px-3 py-6 text-left transition-all md:px-6 md:py-8"
                  >
                    <span className="grid w-full grid-cols-1 items-baseline gap-2 md:grid-cols-12 md:gap-6">
                      <span className="font-editorial text-lg italic text-[#8C5E3E] md:col-span-1">
                        {item.number}
                      </span>

                      <span className="font-editorial block text-[25px] font-normal leading-[1.15] tracking-[-0.01em] text-[#1D2220] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:col-span-7 md:text-[32px]">
                        {item.title}
                      </span>

                      <span className="md:col-span-4">
                        <span className="inline-block text-[13px] font-light text-[#5D6560] transition-all duration-500 group-hover:-skew-x-6 group-hover:text-[#2B423B]">
                          {item.subtitle}
                        </span>
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isOpen
                          ? 'border-[#2B423B] bg-[#2B423B] text-[#F6F3EE]'
                          : 'border-[#1D2220]/15 text-[#1D2220] group-hover:border-[#2B423B]'
                      }`}
                    >
                      <Plus className="h-4 w-4 stroke-[1.4]" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key={`${item.id}-panel`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 items-center gap-8 px-3 pb-9 pt-2 md:grid-cols-12 md:gap-8 md:px-6 md:pb-11">
                        <div className="md:col-span-4 lg:col-span-3">
                          <motion.div
                            initial={{ clipPath: 'inset(12% 0% 0% 0%)', opacity: 0 }}
                            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                            transition={{ duration: 0.68, ease: EASE_EDITORIAL }}
                            className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#E5DDD1]"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              decoding="async"
                              className={`h-full w-full object-cover ${item.imagePosition ?? 'object-center'}`}
                            />
                          </motion.div>
                        </div>

                        <div className="space-y-5 md:col-span-5 lg:col-span-5">
                          <p className="text-[15.5px] font-light leading-[1.8] text-[#4E5551]">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {item.signals.map((sig) => (
                              <span
                                key={sig}
                                className="rounded-full border border-[#1D2220]/10 bg-[#F6F3EE] px-3.5 py-1.5 text-[12px] font-normal text-[#4E5551]"
                              >
                                {sig}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col justify-between gap-6 border-t border-[#1D2220]/10 pt-5 md:col-span-3 md:border-l md:border-t-0 md:pl-7 md:pt-0 lg:col-span-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#5D6560]">
                              Podejście kliniczne
                            </p>
                            <p className="mt-1.5 text-[13.5px] font-medium text-[#2B423B]">
                              {item.approach}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => onOpenBooking(item.title)}
                            className="group editorial-link-persistent self-start text-[13px] font-medium text-[#1D2220] transition-colors hover:text-[#2B423B]"
                          >
                            <SlotRollText label="Umów konsultację w tym obszarze" />
                            <KineticArrow className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
