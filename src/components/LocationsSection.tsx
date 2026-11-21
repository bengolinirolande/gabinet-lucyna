import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, ExternalLink, MapPin, Train } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import type { LocationItem } from '../data/practice';
import {
  EASE_EDITORIAL,
  HairlineDivider,
  KineticArrow,
  MaskedLines,
  Reveal,
  SlotRollText,
} from './motion/MotionPrimitives';

interface LocationsSectionProps {
  compactHeader?: boolean;
  ready?: boolean;
  onOpenBooking: (presetTopic?: string, presetType?: string, presetLocation?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  compactHeader = false,
  onOpenBooking,
}) => {
  const { practice, ui } = usePreferences();
  const [selectedId, setSelectedId] = useState<LocationItem['id']>('witomino');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const count = practice.locations.length;
    let nextIdx = idx;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % count;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + count) % count;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = count - 1;
    else return;

    e.preventDefault();
    const nextLoc = practice.locations[nextIdx];
    setSelectedId(nextLoc.id);
    tabRefs.current[nextIdx]?.focus();
  };

  return (
    <section
      id="gabinety"
      className={`relative bg-[var(--bg-surface-soft)] ${
        compactHeader ? 'pt-8 pb-14 md:pt-10 md:pb-18' : 'py-14 md:py-18'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        {!compactHeader && <HairlineDivider className="mb-12 md:mb-16" />}

        {/* Header + Interactive Location Switcher */}
        <div
          className={`flex flex-col justify-between gap-5 lg:flex-row ${
            compactHeader ? 'lg:items-center' : 'lg:items-end'
          }`}
        >
          {compactHeader ? (
            <div>
              <h2 className="eyebrow">{ui.locations.compactHeading}</h2>
            </div>
          ) : (
            <div>
              <Reveal>
                <p className="eyebrow mb-4">{ui.locations.eyebrow}</p>
              </Reveal>
              <h2 className="font-editorial text-[clamp(2.3rem,4.1vw,3.75rem)] font-light leading-[1.04] tracking-[-0.02em] text-[var(--text-ink)]">
                <MaskedLines
                  lines={ui.locations.lines}
                  italicSubstring={ui.locations.italicSubstring}
                />
              </h2>
            </div>
          )}

          {/* Spring FLIP Segmented Control */}
          <Reveal delay={0.08}>
            <div
              role="tablist"
              aria-label={ui.locations.tablistAria}
              className="inline-flex max-w-full flex-wrap rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-paper)] p-1 sm:flex-nowrap sm:rounded-full sm:p-1.5"
            >
              {practice.locations.map((loc, idx) => {
                const active = loc.id === selectedId;
                return (
                  <button
                    key={loc.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    id={`loc-tab-${loc.id}`}
                    type="button"
                    role="tab"
                    tabIndex={active ? 0 : -1}
                    aria-selected={active}
                    aria-controls={`loc-panel-${loc.id}`}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    onClick={() => setSelectedId(loc.id)}
                    className={`relative rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-300 sm:px-5 sm:py-2 sm:text-[13px] md:px-6 ${
                      active
                        ? 'text-[var(--btn-primary-text)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-ink)]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="location-active-pill"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[var(--btn-primary-bg)]"
                      />
                    )}
                    <span className="relative z-10">{loc.city}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* All 3 Location Panels Mounted in DOM */}
        <div className={compactHeader ? 'mt-7 md:mt-9' : 'mt-10 md:mt-14'}>
          {practice.locations.map((loc) => {
            const isActive = loc.id === selectedId;
            return (
              <motion.div
                key={loc.id}
                id={`loc-panel-${loc.id}`}
                role="tabpanel"
                aria-labelledby={`loc-tab-${loc.id}`}
                hidden={!isActive}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                transition={{ duration: 0.36, ease: EASE_EDITORIAL }}
                className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10"
              >
                {/* Layered Architectural Diptych Collage */}
                <div className="lg:col-span-7">
                  <div className="relative">
                    <div
                      data-cursor={loc.city}
                      className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[var(--bg-img-frame)] shadow-[var(--shadow-card-lg)]"
                    >
                      <img
                        src={loc.image}
                        alt={`${ui.locations.imgAltPrefix} ${loc.city}, ${loc.district}`}
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />

                      <div className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-3 bg-[#1A2723]/86 px-4 py-2 text-[#F6F3EE] backdrop-blur-md">
                        <span className="truncate text-[10.5px] uppercase tracking-[0.2em]">
                          {loc.city} · {loc.district.split('·')[0].trim()}
                        </span>
                        <span className="hidden text-[10px] tracking-[0.16em] text-[#C9A484] xl:inline">
                          {loc.coordinates}
                        </span>
                      </div>
                    </div>

                    <figure className="mt-4 border border-[var(--border-subtle)] bg-[var(--bg-paper)] p-2 shadow-[var(--shadow-card)] sm:absolute sm:bottom-5 sm:right-5 sm:mt-0 sm:w-[200px] md:w-[224px]">
                      <div className="aspect-[4/3] overflow-hidden bg-[var(--bg-img-frame)]">
                        <img
                          src={loc.secondaryImage}
                          alt={loc.secondaryCaption}
                          loading="eager"
                          decoding="async"
                          className={`h-full w-full object-cover transition-transform duration-700 hover:scale-105 ${
                            loc.id === 'witomino' ? 'object-top' : 'object-center'
                          }`}
                        />
                      </div>
                      <figcaption className="px-1.5 pt-2 pb-1 text-[10.5px] font-light leading-snug text-[var(--text-secondary)]">
                        {loc.secondaryCaption}
                      </figcaption>
                    </figure>
                  </div>
                </div>

                {/* Practical Logistics Editorial Card */}
                <div className="flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--bg-paper)] p-7 md:p-9 lg:col-span-5">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-[var(--accent-amber)]">
                        {loc.badge}
                      </span>
                      <span className="h-px flex-1 bg-[var(--border-hairline)]" />
                    </div>

                    <h3 className="font-editorial mt-4 text-3xl font-normal text-[var(--text-ink)] md:text-[34px]">
                      {loc.city} · {loc.district.split('·')[0].trim()}
                    </h3>

                    <p className="mt-3.5 text-[14.5px] font-light leading-[1.78] text-[var(--text-secondary)]">
                      {loc.ambiance}
                    </p>

                    {loc.id === 'online' && (
                      <p
                        lang={ui.locations.bilingualNoteLang}
                        className="mt-3 text-[13px] font-light text-[var(--text-muted)]"
                      >
                        {ui.locations.bilingualNote}
                      </p>
                    )}

                    <address className="mt-6 not-italic">
                      <ul className="space-y-3.5 border-t border-[var(--border-hairline)] pt-5 text-[13.5px] font-light text-[var(--text-body)]">
                        {[
                          { icon: MapPin, text: loc.address, bold: true },
                          { icon: Train, text: loc.transit, bold: false },
                          { icon: Car, text: loc.parking, bold: false },
                          { icon: Clock, text: loc.hours, bold: false },
                        ].map((row) => {
                          const Icon = row.icon;
                          return (
                            <li key={row.text} className="flex items-start gap-3.5">
                              <Icon className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.5] text-[var(--accent-emphasis)]" />
                              <span className={row.bold ? 'font-normal text-[var(--text-ink)]' : ''}>
                                {row.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </address>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-5">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(undefined, undefined, loc.id)}
                      className="group editorial-link-persistent text-[13.5px] font-medium text-[var(--accent-emphasis)] hover:text-[var(--accent-emphasis-hover)]"
                    >
                      <SlotRollText label={`${ui.locations.askSlotPrefix} (${loc.city})`} />
                      <KineticArrow className="h-3.5 w-3.5" />
                    </button>

                    {loc.mapUrl && (
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="editorial-link text-[12px] font-normal text-[var(--text-muted)] hover:text-[var(--accent-emphasis)]"
                      >
                        <span>{ui.locations.mapsLabel}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
