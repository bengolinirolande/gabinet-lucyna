import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, ShieldCheck, Star, Wind } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getRouteHref, handleRouteLinkClick, type PageId } from '../types/navigation';
import {
  EASE_EDITORIAL,
  KineticArrow,
  MaskedLines,
  Reveal,
  SlotRollText,
} from './motion/MotionPrimitives';

interface HomeDirectorySectionProps {
  onNavigate: (page: PageId) => void;
  onOpenBreathing: () => void;
}

export const HomeDirectorySection: React.FC<HomeDirectorySectionProps> = ({
  onNavigate,
  onOpenBreathing,
}) => {
  const { practice, ui } = usePreferences();

  return (
    <section id="przewodnik" className="relative bg-[var(--bg-surface-soft)] py-10 md:py-14">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        {/* Compact Header Row */}
        <div className="flex flex-col justify-between gap-4 pb-6 md:pb-8 lg:flex-row lg:items-end">
          <div className="max-w-[600px]">
            <Reveal>
              <p className="eyebrow mb-2.5">{ui.directory.eyebrow}</p>
            </Reveal>
            <h2 className="font-editorial text-[clamp(2rem,3.4vw,3.1rem)] font-light leading-[1.06] tracking-[-0.02em] text-[var(--text-ink)]">
              <MaskedLines
                lines={ui.directory.lines}
                italicSubstring={ui.directory.italicSubstring}
              />
            </h2>
          </div>

          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={onOpenBreathing}
              data-cursor={ui.cursors.breath}
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-paper-elevated)] px-4 py-2 text-left transition-colors hover:border-[var(--border-accent)] hover:bg-[var(--bg-paper)]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent-emphasis)]">
                <Wind className="h-3.5 w-3.5 stroke-[1.5]" />
              </span>
              <span>
                <span className="block text-[12px] font-medium text-[var(--text-ink)]">
                  {ui.directory.breathTitle}
                </span>
                <span className="block text-[10.5px] font-light text-[var(--text-muted)]">
                  {ui.directory.breathSub}
                </span>
              </span>
            </button>
          </Reveal>
        </div>

        {/* 3 Tight, Symmetrical Crawlable Editorial Chapter Portals */}
        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
          {ui.directory.cards.map((card, idx) => (
            <motion.a
              key={card.page}
              href={getRouteHref(card.page)}
              data-cursor={ui.cursors.open}
              onClick={(e) => handleRouteLinkClick(e, () => onNavigate(card.page))}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, delay: idx * 0.08, ease: EASE_EDITORIAL },
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.28, ease: EASE_EDITORIAL },
              }}
              viewport={{ once: true, amount: 'some' }}
              className="group flex flex-col justify-between overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-paper)] text-left transition-[border-color,box-shadow] duration-500 hover:border-[var(--border-accent)] hover:shadow-[var(--shadow-card)]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-img-frame)]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${card.imagePosition ?? 'object-center'}`}
                  />
                  <span className="font-editorial absolute left-3.5 top-3.5 rounded-full bg-[#1A2723]/84 px-3 py-0.5 text-sm italic text-[#F6F3EE] backdrop-blur-md">
                    {card.num}
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent-amber)]">
                    {card.eyebrow}
                  </p>
                  <h3 className="font-editorial mt-1.5 text-[25px] font-normal leading-[1.15] text-[var(--text-ink)] transition-colors group-hover:text-[var(--accent-emphasis)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] font-light leading-[1.72] text-[var(--text-secondary)]">
                    {card.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border-hairline)] px-5 py-3.5 text-[12.5px] font-medium text-[var(--accent-emphasis)] md:px-6">
                <SlotRollText label={card.cta} />
                <KineticArrow className="h-4 w-4" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Compact Verified Profiles & Trust Strip */}
        <Reveal delay={0.1} className="mt-5 md:mt-6">
          <div className="grid grid-cols-1 items-center gap-4 border border-[var(--border-subtle)] bg-[var(--bg-paper)] px-5 py-4 shadow-[var(--shadow-card)] md:px-6 lg:grid-cols-12">
            <div className="flex items-center gap-3.5 lg:col-span-5">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
                <span className="font-editorial text-[22px] font-medium leading-none text-[var(--text-ink)]">
                  {practice.googleProfile.rating.toFixed(1).replace('.', ',')}
                </span>
                <div className="mt-0.5 flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-2 w-2 fill-[#C4924A] text-[#C4924A]" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-medium text-[var(--text-ink)]">
                  {ui.directory.trustTitle}
                </p>
                <p className="mt-0.5 text-[12px] font-light text-[var(--text-secondary)]">
                  {ui.directory.trustQuote}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[var(--border-hairline)] py-3 text-[12px] font-light text-[var(--text-secondary)] lg:col-span-4 lg:border-x lg:border-y-0 lg:px-5 lg:py-0">
              <span className="inline-flex items-center gap-1.5 text-[var(--text-ink)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent-emphasis)]" />
                {ui.directory.trustLocations}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--accent-emphasis)]">
                <ShieldCheck className="h-3.5 w-3.5" />
                {ui.directory.trustDiplomas}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:col-span-3 lg:justify-end">
              <a
                href={getRouteHref('gabinety')}
                onClick={(e) => handleRouteLinkClick(e, () => onNavigate('gabinety'))}
                className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--btn-primary-bg)] px-4 py-2 text-[12px] font-medium text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
              >
                <SlotRollText label={ui.directory.trustMapCta} />
                <KineticArrow className="h-3.5 w-3.5" />
              </a>
              <a
                href={practice.znanyLekarzUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ui.directory.trustZnanyAria}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-medium)] px-3.5 py-2 text-[12px] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-accent)] hover:text-[var(--accent-emphasis)]"
              >
                <span>ZnanyLekarz</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
