import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Car, Clock, ExternalLink, MapPin, Train } from 'lucide-react';
import { PRACTICE, type LocationItem } from '../data/practice';
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
  ready = true,
  onOpenBooking,
}) => {
  const [selectedId, setSelectedId] = useState<LocationItem['id']>('gdansk');
  const [hasSwitched, setHasSwitched] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectLocation = (id: LocationItem['id']) => {
    setHasSwitched(true);
    setSelectedId(id);
  };

  const current =
    PRACTICE.locations.find((loc) => loc.id === selectedId) ?? PRACTICE.locations[0];

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const count = PRACTICE.locations.length;
    let nextIdx = idx;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % count;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + count) % count;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = count - 1;
    else return;

    e.preventDefault();
    const nextLoc = PRACTICE.locations[nextIdx];
    selectLocation(nextLoc.id);
    tabRefs.current[nextIdx]?.focus();
  };

  return (
    <section
      id="gabinety"
      className={`relative bg-[#EFEAE1]/55 ${
        compactHeader ? 'pt-10 pb-16 md:pt-12 md:pb-20' : 'py-16 md:py-24'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        {!compactHeader && <HairlineDivider className="mb-12 md:mb-16" />}

        {/* Header + Interactive Location Switcher */}
        <div
          className={`flex flex-col justify-between gap-5 lg:flex-row ${
            compactHeader ? 'lg:items-center' : 'lg:items-end'
          }`}
        >
          {compactHeader ? (
            <div>
              <p className="eyebrow">Wybierz lokalizację · Gdańsk, Gdynia lub Online</p>
            </div>
          ) : (
            <div>
              <Reveal>
                <p className="eyebrow mb-4">Gabinety w Trójmieście i online</p>
              </Reveal>
              <h2 className="font-editorial text-[clamp(2.3rem,4.1vw,3.75rem)] font-light leading-[1.04] tracking-[-0.02em] text-[#1D2220]">
                <MaskedLines
                  lines={['Kameralne przestrzenie', 'w Gdańsku i Gdyni.']}
                  italicSubstring="Gdańsku i Gdyni."
                />
              </h2>
            </div>
          )}

          {/* Spring FLIP Segmented Control with Full WAI-ARIA Arrow Navigation */}
          <Reveal delay={0.08}>
            <div
              role="tablist"
              aria-label="Wybierz lokalizację gabinetu"
              className="inline-flex rounded-full border border-[#1D2220]/12 bg-[#FAF8F4] p-1.5"
            >
              {PRACTICE.locations.map((loc, idx) => {
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
                    onClick={() => selectLocation(loc.id)}
                    className={`relative rounded-full px-5 py-2 text-[13px] font-medium transition-colors duration-300 md:px-6 ${
                      active ? 'text-[#F6F3EE]' : 'text-[#4E5551] hover:text-[#1D2220]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="location-active-pill"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#2B423B]"
                      />
                    )}
                    <span className="relative z-10">{loc.city}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Dynamic Curtain-Transition Diptych Location Showcase (items-start anchors diptych tightly!) */}
        <div className={compactHeader ? 'mt-7 md:mt-9' : 'mt-10 md:mt-14'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              id={`loc-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`loc-tab-${current.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.36, ease: EASE_EDITORIAL }}
              className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10"
            >
              {/* Layered Architectural Diptych Collage — relative wrapper scoped strictly to main photo */}
              <div className="lg:col-span-7">
                <div className="relative">
                  <motion.div
                    initial={{ clipPath: 'inset(10% 0% 0% 0%)', opacity: 0.01 }}
                    animate={
                      ready
                        ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                        : { clipPath: 'inset(10% 0% 0% 0%)', opacity: 0.01 }
                    }
                    transition={{
                      duration: 0.78,
                      delay: compactHeader && !hasSwitched ? 0.1 : 0,
                      ease: EASE_EDITORIAL,
                    }}
                    data-cursor={current.city}
                    className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#E5DDD1] shadow-[0_28px_65px_-32px_rgba(26,39,35,0.28)]"
                  >
                    <motion.img
                      src={current.image}
                      alt={`Gabinet psychologiczny — ${current.city} ${current.district}`}
                      loading="lazy"
                      decoding="async"
                      initial={{ scale: 1.07 }}
                      animate={ready ? { scale: 1 } : { scale: 1.07 }}
                      transition={{
                        duration: 0.9,
                        delay: compactHeader && !hasSwitched ? 0.1 : 0,
                        ease: EASE_EDITORIAL,
                      }}
                      className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />

                    {/* Diagonal Top-Left Architectural Coordinates */}
                    <div className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-3 bg-[#1A2723]/82 px-4 py-2 text-[#F6F3EE] backdrop-blur-md">
                      <span className="truncate text-[10.5px] uppercase tracking-[0.2em]">
                        {current.city} · {current.district}
                      </span>
                      <span className="hidden text-[10px] tracking-[0.16em] text-[#C9A484] xl:inline">
                        {current.coordinates}
                      </span>
                    </div>
                  </motion.div>

                  {/* Overlapping Secondary Editorial Plate — anchored strictly to photo corner */}
                  <motion.figure
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.12, ease: EASE_EDITORIAL }}
                    className="mt-4 border border-[#1D2220]/10 bg-[#FAF8F4] p-2 shadow-[0_20px_50px_-24px_rgba(26,39,35,0.32)] sm:absolute sm:bottom-5 sm:right-5 sm:mt-0 sm:w-[200px] md:w-[224px]"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#E5DDD1]">
                      <img
                        src={current.secondaryImage}
                        alt={current.secondaryCaption}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <figcaption className="px-1.5 pt-2 pb-1 text-[10.5px] font-light leading-snug text-[#4E5551]">
                      {current.secondaryCaption}
                    </figcaption>
                  </motion.figure>
                </div>
              </div>

              {/* Practical Logistics Editorial Card */}
              <div className="flex flex-col justify-between border border-[#1D2220]/11 bg-[#FAF8F4] p-7 md:p-9 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#8C5E3E]">
                      {current.badge}
                    </span>
                    <span className="h-px flex-1 bg-[#1D2220]/10" />
                  </div>

                  <h3 className="font-editorial mt-4 text-3xl font-normal text-[#1D2220] md:text-[34px]">
                    {current.city} — {current.district.split('·')[0].trim()}
                  </h3>

                  <p className="mt-3.5 text-[14.5px] font-light leading-[1.78] text-[#4E5551]">
                    {current.ambiance}
                  </p>

                  <ul className="mt-6 space-y-3.5 border-t border-[#1D2220]/10 pt-5 text-[13.5px] font-light text-[#3F4642]">
                    {[
                      { icon: MapPin, text: current.address, bold: true },
                      { icon: Train, text: current.transit, bold: false },
                      { icon: Car, text: current.parking, bold: false },
                      { icon: Clock, text: current.hours, bold: false },
                    ].map((row, idx) => {
                      const Icon = row.icon;
                      return (
                        <motion.li
                          key={row.text}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.06 + idx * 0.04,
                            duration: 0.42,
                            ease: EASE_EDITORIAL,
                          }}
                          className="flex items-start gap-3.5"
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.5] text-[#2B423B]" />
                          <span className={row.bold ? 'font-normal text-[#1D2220]' : ''}>
                            {row.text}
                          </span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#1D2220]/10 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking(
                        undefined,
                        undefined,
                        current.id === 'gdansk'
                          ? 'Gdańsk Wrzeszcz'
                          : current.id === 'gdynia'
                            ? 'Gdynia Śródmieście'
                            : 'Online (wideo)'
                      )
                    }
                    className="group editorial-link-persistent text-[13.5px] font-medium text-[#2B423B] hover:text-[#1A2723]"
                  >
                    <SlotRollText label={`Zapytaj o termin (${current.city})`} />
                    <KineticArrow className="h-3.5 w-3.5" />
                  </button>

                  {current.mapUrl && (
                    <a
                      href={current.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link text-[12px] font-normal text-[#5D6560] hover:text-[#2B423B]"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
