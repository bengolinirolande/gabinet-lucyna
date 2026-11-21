import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import {
  CurtainImage,
  EASE_EDITORIAL,
  KineticArrow,
  MaskedLines,
  Reveal,
} from './motion/MotionPrimitives';

interface FaqSectionProps {
  onOpenBooking: (presetTopic?: string, presetType?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-[#F6F3EE] py-16 md:py-22">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Editorial Intro + Warm Human Portrait Anchor + Sanctuary Corner Photo */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <p className="eyebrow mb-4">Pytania i odpowiedzi</p>
              </Reveal>
              <h2 className="font-editorial text-[clamp(2.2rem,3.7vw,3.35rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#1D2220]">
                <MaskedLines
                  lines={['Wszystko, o co', 'możesz chcieć', 'zapytać przed wizytą.']}
                  italicSubstring="przed wizytą."
                />
              </h2>

              {/* Compact Human Reassurance Card with Portrait */}
              <Reveal delay={0.14}>
                <div className="mt-5 flex items-center gap-4 border border-[#1D2220]/10 bg-[#FAF8F4] p-4">
                  <img
                    src={PRACTICE.images.portrait}
                    alt={PRACTICE.fullName}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
                  />
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-[#1D2220]">
                      Masz jeszcze wątpliwości?
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenBooking(undefined, 'Bezpłatna rozmowa telefoniczna (15 min)')
                      }
                      className="group editorial-link mt-0.5 text-[12px] font-normal text-[#2B423B]"
                    >
                      <span>Porozmawiajmy bezpłatnie 15 min</span>
                      <KineticArrow className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Warm Sanctuary Corner Editorial Frame (sized cleanly for 768px+ laptops) */}
              <div className="mt-5 hidden max-w-[205px] lg:block">
                <CurtainImage
                  src={PRACTICE.images.sanctuaryCorner}
                  alt="Kameralny fotel i stolik z trawertynu w popołudniowym świetle gabinetu"
                  aspectClass="aspect-[4/5]"
                  className="rounded-[2px] shadow-[0_24px_55px_-30px_rgba(26,39,35,0.22)]"
                  parallaxStrength={12}
                  cursorLabel="Gabinet"
                />
              </div>
            </div>
          </div>

          {/* Right Editorial Accordion with Liquid Hover Wash & Index Numbers */}
          <div
            onMouseLeave={() => setHoveredIdx(null)}
            className="divide-y divide-[#1D2220]/11 border-y border-[#1D2220]/11 lg:col-span-8"
          >
            {PRACTICE.faq.map((item, idx) => {
              const isOpen = openIndex === idx;
              const isHovered = hoveredIdx === idx;
              const panelId = `faq-panel-${idx}`;

              return (
                <div
                  key={item.question}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`relative transition-colors duration-500 ${
                    isOpen ? 'bg-[#FAF8F4]/90' : ''
                  }`}
                >
                  {isHovered && !isOpen && (
                    <motion.div
                      layoutId="faq-hover-wash"
                      transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                      className="pointer-events-none absolute inset-0 bg-[#EFEAE1]/60"
                    />
                  )}

                  <h3 className="relative z-10">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="group flex w-full items-center justify-between gap-5 px-2 py-7 text-left sm:px-4"
                    >
                      <span className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-editorial text-base italic text-[#8C5E3E]">
                          0{idx + 1}
                        </span>
                        <span className="font-editorial text-[22px] font-normal leading-snug text-[#1D2220] transition-colors duration-300 group-hover:text-[#2B423B] md:text-[26px]">
                          {item.question}
                        </span>
                      </span>

                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isOpen
                            ? 'border-[#2B423B] bg-[#2B423B] text-[#F6F3EE]'
                            : 'border-[#1D2220]/15 text-[#1D2220] group-hover:border-[#2B423B] group-hover:text-[#2B423B]'
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
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                        className="relative z-10 overflow-hidden"
                      >
                        <motion.p
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.42, delay: 0.06, ease: EASE_EDITORIAL }}
                          className="max-w-[660px] pb-7 pl-9 pr-4 text-[15px] font-light leading-[1.82] text-[#4E5551] sm:pl-14"
                        >
                          {item.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
