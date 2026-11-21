import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
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
  const { practice, ui } = usePreferences();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-[var(--bg-canvas)] py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Editorial Intro + Portrait Anchor */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <p className="eyebrow mb-4">{ui.faq.eyebrow}</p>
              </Reveal>
              <h2 className="font-editorial text-[clamp(2.2rem,3.7vw,3.35rem)] font-light leading-[1.06] tracking-[-0.02em] text-[var(--text-ink)]">
                <MaskedLines
                  lines={ui.faq.lines}
                  italicSubstring={ui.faq.italicSubstring}
                />
              </h2>

              {/* Compact Human Reassurance Card */}
              <Reveal delay={0.14}>
                <div className="mt-5 flex items-center gap-4 border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4">
                  <img
                    src={practice.images.portrait}
                    alt={ui.faq.avatarAlt}
                    width={48}
                    height={48}
                    loading="eager"
                    decoding="async"
                    className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
                  />
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-[var(--text-ink)]">
                      {ui.faq.doubtTitle}
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenBooking(undefined, 'consultation')}
                      className="group editorial-link mt-0.5 text-[12px] font-normal text-[var(--accent-emphasis)]"
                    >
                      <span>{ui.faq.doubtCta}</span>
                      <KineticArrow className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </Reveal>

              <div className="mt-5 hidden max-w-[205px] lg:block">
                <CurtainImage
                  src={practice.images.sanctuaryCorner}
                  alt={ui.faq.cornerAlt}
                  aspectClass="aspect-[4/5]"
                  className="rounded-[2px] shadow-[var(--shadow-card)]"
                  parallaxStrength={12}
                  cursorLabel={ui.cursors.office}
                />
              </div>
            </div>
          </div>

          {/* Right Editorial Accordion */}
          <div
            onMouseLeave={() => setHoveredIdx(null)}
            className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] lg:col-span-8"
          >
            {practice.faq.map((item, idx) => {
              const isOpen = openIndex === idx;
              const isHovered = hoveredIdx === idx;
              const panelId = `faq-panel-${idx}`;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`relative transition-colors duration-500 ${
                    isOpen ? 'bg-[var(--bg-paper-elevated)]' : ''
                  }`}
                >
                  {isHovered && !isOpen && (
                    <motion.div
                      layoutId="faq-hover-wash"
                      transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                      className="pointer-events-none absolute inset-0 bg-[var(--bg-surface-soft)]"
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
                        <span className="font-editorial text-base italic text-[var(--accent-amber)]">
                          0{idx + 1}
                        </span>
                        <span className="font-editorial text-[22px] font-normal leading-snug text-[var(--text-ink)] transition-colors duration-300 group-hover:text-[var(--accent-emphasis)] md:text-[26px]">
                          {item.question}
                        </span>
                      </span>

                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isOpen
                            ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                            : 'border-[var(--border-medium)] text-[var(--text-ink)] group-hover:border-[var(--border-accent)] group-hover:text-[var(--accent-emphasis)]'
                        }`}
                      >
                        <Plus className="h-4 w-4 stroke-[1.4]" />
                      </motion.span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    aria-hidden={!isOpen}
                    className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[660px] pb-7 pl-9 pr-4 text-[15px] font-light leading-[1.82] text-[var(--text-secondary)] sm:pl-14">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
