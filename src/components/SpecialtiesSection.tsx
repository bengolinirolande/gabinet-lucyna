import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
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

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  compactHeader = false,
  onOpenBooking,
}) => {
  const { practice, ui } = usePreferences();
  const [activeId, setActiveId] = useState<string>(practice.specialties[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="obszary"
      className={`relative overflow-x-clip bg-[var(--bg-surface-soft)] ${
        compactHeader ? 'pt-8 pb-12 md:pt-10 md:pb-14' : 'py-14 md:py-18'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        {!compactHeader ? (
          <div className="grid grid-cols-1 items-end gap-8 pb-10 lg:grid-cols-12 md:pb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-4">{ui.specialties.eyebrow}</p>
              </Reveal>
              <h2 className="font-editorial text-[clamp(2.35rem,4.2vw,3.9rem)] font-light leading-[1.03] tracking-[-0.02em] text-[var(--text-ink)]">
                <MaskedLines
                  lines={ui.specialties.lines}
                  italicSubstring={ui.specialties.italicSubstring}
                />
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.14}>
                <p className="max-w-[440px] text-[15px] font-light leading-[1.78] text-[var(--text-secondary)] lg:ml-auto">
                  {ui.specialties.lead}
                </p>
              </Reveal>
            </div>
          </div>
        ) : (
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="eyebrow">{ui.specialties.compactEyebrow}</h2>
            <p className="text-[12.5px] font-light text-[var(--text-muted)]">
              {ui.specialties.compactHint}
            </p>
          </div>
        )}

        <HairlineDivider />

        {/* Architectural Numbered Editorial Index */}
        <div onMouseLeave={() => setHoveredId(null)} className="relative">
          {practice.specialties.map((item) => {
            const isOpen = activeId === item.id;
            const isHovered = hoveredId === item.id;
            const panelId = `specialty-panel-${item.id}`;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`relative border-b border-[var(--border-subtle)] transition-colors duration-500 ${
                  isOpen ? 'bg-[var(--bg-paper-elevated)]' : ''
                }`}
              >
                {isHovered && !isOpen && (
                  <motion.div
                    layoutId="specialty-hover-surface"
                    transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                    className="pointer-events-none absolute inset-0 bg-[var(--bg-paper-soft)]"
                  />
                )}

                <h3 className="relative z-10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    data-cursor={isOpen ? ui.cursors.close : ui.cursors.open}
                    onClick={() => toggle(item.id)}
                    className="group flex w-full items-center justify-between gap-5 px-3 py-5 text-left transition-all md:px-6 md:py-6"
                  >
                    <span className="grid w-full grid-cols-1 items-baseline gap-1.5 md:grid-cols-12 md:gap-6">
                      <span className="font-editorial text-lg italic text-[var(--accent-amber)] md:col-span-1">
                        {item.number}
                      </span>

                      <span className="font-editorial block text-[23px] font-normal leading-[1.15] tracking-[-0.01em] text-[var(--text-ink)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:col-span-7 md:text-[30px]">
                        {item.title}
                      </span>

                      <span className="md:col-span-4">
                        <span className="inline-block text-[13px] font-light text-[var(--text-muted)] transition-colors duration-400 group-hover:text-[var(--accent-emphasis)]">
                          {item.subtitle}
                        </span>
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.42, ease: EASE_EDITORIAL }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isOpen
                          ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                          : 'border-[var(--border-medium)] text-[var(--text-ink)] group-hover:border-[var(--border-accent)]'
                      }`}
                    >
                      <Plus className="h-4 w-4 stroke-[1.4]" />
                    </motion.span>
                  </button>
                </h3>

                {/* Always mounted in DOM for crawlable SEO; silky CSS grid-row reveal */}
                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 items-start gap-7 px-3 pb-7 pt-1 md:grid-cols-12 md:gap-8 md:px-6 md:pb-9">
                      <div className="space-y-4 md:col-span-7 md:col-start-2">
                        <p className="max-w-[650px] text-[15px] font-light leading-[1.8] text-[var(--text-secondary)]">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {item.signals.map((sig) => (
                            <span
                              key={sig}
                              className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-3.5 py-1.5 text-[12px] font-normal text-[var(--text-body)]"
                            >
                              {sig}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-5 border-t border-[var(--border-hairline)] pt-5 md:col-span-4 md:border-l md:border-t-0 md:pl-7 md:pt-0">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            {ui.specialties.approachLabel}
                          </p>
                          <p className="mt-1.5 text-[13.5px] font-medium leading-relaxed text-[var(--accent-emphasis)]">
                            {item.approach}
                          </p>
                        </div>

                        <button
                          type="button"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() => onOpenBooking(item.title)}
                          className="group editorial-link-persistent self-start text-[13px] font-medium text-[var(--text-ink)] transition-colors hover:text-[var(--accent-emphasis)]"
                        >
                          <SlotRollText label={ui.specialties.cta} />
                          <KineticArrow className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
