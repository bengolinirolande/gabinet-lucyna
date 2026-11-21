import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, MapPin, Navigation, ShieldCheck, Star } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import {
  EASE_EDITORIAL,
  KineticArrow,
  MaskedLines,
  Reveal,
  SlotRollText,
} from './motion/MotionPrimitives';

const RatingScore: React.FC<{ target: number }> = ({ target }) => (
  <span className="font-editorial text-6xl font-light leading-none tracking-tight text-[var(--text-ink)] md:text-7xl">
    {target.toFixed(1).replace('.', ',')}
  </span>
);

export const GoogleProfileSection: React.FC = () => {
  const { lang, practice, ui } = usePreferences();
  const [selectedPin, setSelectedPin] = useState<'witomino' | 'srodmiescie'>('witomino');
  const reduced = useReducedMotion();

  const activeLocation =
    practice.locations.find((l) => l.id === selectedPin) ?? practice.locations[0];

  const mapsUrl =
    selectedPin === 'witomino'
      ? practice.googleProfile.mapsWitominoUrl
      : practice.googleProfile.mapsSrodmiescieUrl;

  const transitPill =
    selectedPin === 'witomino'
      ? ui.googleProfile.transitWitomino
      : ui.googleProfile.transitSrodmiescie;

  return (
    <section id="wizytowka-google" className="relative bg-[var(--bg-surface-strong)] py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-end gap-4 pb-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">{ui.googleProfile.eyebrow}</p>
            </Reveal>
            <h2 className="font-editorial text-[clamp(2.25rem,3.9vw,3.55rem)] font-light leading-[1.06] tracking-[-0.02em] text-[var(--text-ink)]">
              <MaskedLines
                lines={ui.googleProfile.lines}
                italicSubstring={ui.googleProfile.italicSubstring}
              />
            </h2>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <Reveal delay={0.12}>
              <p className="text-[14.5px] font-light leading-[1.78] text-[var(--text-secondary)] lg:ml-auto lg:max-w-[420px]">
                {ui.googleProfile.lead}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Cols: Official Profiles Summary + Real Verified Review Snippets */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal>
              <div className="border border-[var(--border-subtle)] bg-[var(--bg-paper)] p-7 shadow-[var(--shadow-card)] md:p-9">
                <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[var(--border-hairline)] pb-7">
                  <div className="flex items-center gap-5">
                    <RatingScore target={practice.googleProfile.rating} />
                    <div>
                      <div className="flex items-center gap-1" aria-label={ui.googleProfile.starsAria}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>
                            <Star className="h-4.5 w-4.5 fill-[#C4924A] text-[#C4924A]" />
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-[13.5px] font-medium text-[var(--text-ink)]">
                        {practice.googleProfile.reviewCount} {ui.googleProfile.reviewsCountSuffix}
                      </p>
                      <p className="mt-0.5 text-[12px] font-light text-[var(--text-muted)]">
                        {practice.fullName} · {ui.googleProfile.diplomasSubtitleSuffix}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-[var(--border-accent-soft)] bg-[var(--bg-canvas)] px-3.5 py-1.5">
                    <ShieldCheck className="h-4 w-4 text-[var(--accent-emphasis)]" />
                    <span className="text-[11.5px] font-medium text-[var(--text-ink)]">
                      {ui.googleProfile.verifiedBadge}
                    </span>
                  </div>
                </div>

                {/* Actionable Direct Official Profile Links */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <a
                    href={practice.znanyLekarzUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-4 py-2.5 text-[12px] font-medium text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
                  >
                    <SlotRollText label={ui.googleProfile.znanyBtn} />
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={practice.twojPsychologUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-canvas)] px-4 py-2.5 text-[12px] font-medium text-[var(--text-ink)] transition-colors hover:border-[var(--border-accent)] hover:text-[var(--accent-emphasis)]"
                  >
                    <SlotRollText label={ui.googleProfile.twojBtn} />
                    <KineticArrow className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={practice.googleProfile.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group editorial-link ml-1 text-[12.5px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent-emphasis)]"
                  >
                    <span>{ui.googleProfile.mapsLink}</span>
                    <KineticArrow className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={practice.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group editorial-link ml-1 text-[12.5px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent-emphasis)]"
                  >
                    <span>{ui.googleProfile.fbLink}</span>
                    <KineticArrow className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* 3 Real Verified Review Snippet Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {practice.googleProfile.featuredReviews.map((rev, idx) => (
                <Reveal key={rev.author} delay={0.08 * idx}>
                  <article className="flex h-full flex-col justify-between border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-[var(--border-accent)]">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-0.5" aria-label={ui.googleProfile.star5Aria}>
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="h-3 w-3 fill-[#C4924A] text-[#C4924A]" />
                          ))}
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {rev.dateLabel.split('·')[0].trim()}
                        </span>
                      </div>
                      <p className="mt-3.5 text-[13px] font-light leading-[1.7] text-[var(--text-body)]">
                        {lang === 'ru' ? `«${rev.text}»` : `„${rev.text}”`}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[var(--border-hairline)] pt-3">
                      <span className="text-[12px] font-medium text-[var(--text-ink)]">{rev.author}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-[var(--accent-emphasis)]">
                        <ShieldCheck className="h-3 w-3" />
                        ZnanyLekarz
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Interactive Gdynia & Zatoka Gdańska Coastal Map */}
          <Reveal delay={0.14} className="lg:col-span-5">
            <div
              data-dark-surface="true"
              className="flex h-full flex-col justify-between overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-deep)] text-[#F6F3EE] shadow-[var(--shadow-card-lg)]"
            >
              <div className="relative h-[300px] w-full overflow-hidden bg-[var(--bg-deep-soft)] sm:h-[320px]">
                <svg
                  viewBox="0 0 460 320"
                  className="h-full w-full"
                  role="group"
                  aria-label={ui.googleProfile.mapAria}
                >
                  <title>{ui.googleProfile.mapTitle}</title>

                  {[60, 120, 180, 240, 300, 360, 420].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="320"
                      stroke="rgba(246,243,238,0.04)"
                      strokeWidth="1"
                    />
                  ))}
                  {[64, 128, 192, 256].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="460"
                      y2={y}
                      stroke="rgba(246,243,238,0.04)"
                      strokeWidth="1"
                    />
                  ))}

                  <path
                    d="M 0 90 C 42 84, 78 118, 98 164 C 118 210, 102 272, 68 320"
                    fill="none"
                    stroke="rgba(246,243,238,0.065)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 0 150 C 32 146, 56 175, 68 215 C 80 250, 58 288, 34 320"
                    fill="none"
                    stroke="rgba(246,243,238,0.05)"
                    strokeWidth="1"
                  />

                  <path
                    d="M 278 0 L 460 0 L 460 320 L 320 320 C 296 270, 286 226, 276 176 C 266 126, 268 62, 278 0 Z"
                    fill="rgba(201, 164, 132, 0.065)"
                  />

                  <motion.path
                    d="M 278 0 C 268 62, 266 126, 276 176 C 286 226, 296 270, 320 320"
                    fill="none"
                    stroke="rgba(201, 164, 132, 0.46)"
                    strokeWidth="1.5"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: EASE_EDITORIAL }}
                  />

                  <path
                    d="M 314 0 C 306 64, 306 128, 318 182 C 330 232, 342 276, 366 320"
                    fill="none"
                    stroke="rgba(246, 243, 238, 0.09)"
                    strokeDasharray="3 6"
                    strokeWidth="1"
                  />

                  <motion.path
                    d="M 218 28 C 228 84, 236 142, 248 208 L 274 304"
                    fill="none"
                    stroke="#C9A484"
                    strokeOpacity="0.65"
                    strokeWidth="1.4"
                    strokeDasharray="4 4"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.35, delay: 0.25, ease: EASE_EDITORIAL }}
                  />

                  <path
                    d="M 102 184 C 148 176, 186 154, 232 132"
                    fill="none"
                    stroke="rgba(246,243,238,0.22)"
                    strokeWidth="1.1"
                  />

                  <g opacity="0.4" transform="translate(414, 274)">
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#F6F3EE" strokeWidth="1" />
                    <line x1="-10" y1="0" x2="10" y2="0" stroke="#F6F3EE" strokeWidth="1" />
                    <text x="-3.5" y="-16" fill="#C9A484" fontSize="8" letterSpacing="1">
                      N
                    </text>
                  </g>

                  <text
                    x="306"
                    y="156"
                    fill="rgba(246,243,238,0.32)"
                    fontSize="8.5"
                    letterSpacing="2"
                  >
                    {ui.googleProfile.mapBay}
                  </text>
                  <text
                    x="130"
                    y="272"
                    fill="rgba(246,243,238,0.42)"
                    fontSize="9"
                    letterSpacing="1.8"
                  >
                    {ui.googleProfile.mapOrlowo}
                  </text>
                  <circle cx="264" cy="268" r="2.5" fill="rgba(246,243,238,0.42)" />

                  {/* Pin: Śródmieście */}
                  <g
                    onClick={() => setSelectedPin('srodmiescie')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPin('srodmiescie');
                      }
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={ui.googleProfile.pinSrodmiescieAria}
                    aria-pressed={selectedPin === 'srodmiescie'}
                  >
                    <circle cx="236" cy="126" r="24" fill="transparent" />
                    {selectedPin === 'srodmiescie' && (
                      <motion.circle
                        cx="236"
                        cy="126"
                        r="16"
                        fill="rgba(201,164,132,0.24)"
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        animate={
                          reduced
                            ? undefined
                            : { scale: [1, 1.45, 1], opacity: [0.55, 0.14, 0.55] }
                        }
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <circle
                      cx="236"
                      cy="126"
                      r={selectedPin === 'srodmiescie' ? 7 : 5}
                      fill={selectedPin === 'srodmiescie' ? '#C9A484' : '#F6F3EE'}
                      stroke="#1A2723"
                      strokeWidth="2"
                    />
                    <text
                      x="58"
                      y="112"
                      fill={selectedPin === 'srodmiescie' ? '#C9A484' : 'rgba(246,243,238,0.75)'}
                      fontSize="10.5"
                      fontWeight={selectedPin === 'srodmiescie' ? '600' : '400'}
                      letterSpacing="1.4"
                    >
                      {ui.googleProfile.mapSrodmiescie}
                    </text>
                  </g>

                  {/* Pin: Witomino */}
                  <g
                    onClick={() => setSelectedPin('witomino')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPin('witomino');
                      }
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={ui.googleProfile.pinWitominoAria}
                    aria-pressed={selectedPin === 'witomino'}
                  >
                    <circle cx="144" cy="176" r="24" fill="transparent" />
                    {selectedPin === 'witomino' && (
                      <motion.circle
                        cx="144"
                        cy="176"
                        r="16"
                        fill="rgba(201,164,132,0.24)"
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        animate={
                          reduced
                            ? undefined
                            : { scale: [1, 1.45, 1], opacity: [0.55, 0.14, 0.55] }
                        }
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <circle
                      cx="144"
                      cy="176"
                      r={selectedPin === 'witomino' ? 7 : 5}
                      fill={selectedPin === 'witomino' ? '#C9A484' : '#F6F3EE'}
                      stroke="#1A2723"
                      strokeWidth="2"
                    />
                    <text
                      x="24"
                      y="214"
                      fill={selectedPin === 'witomino' ? '#C9A484' : 'rgba(246,243,238,0.75)'}
                      fontSize="10.5"
                      fontWeight={selectedPin === 'witomino' ? '600' : '400'}
                      letterSpacing="1.3"
                    >
                      {ui.googleProfile.mapWitomino}
                    </text>
                  </g>
                </svg>

                <div className="absolute right-4 top-4 flex gap-1.5">
                  {(['witomino', 'srodmiescie'] as const).map((pinId) => (
                    <button
                      key={pinId}
                      type="button"
                      aria-pressed={selectedPin === pinId}
                      onClick={() => setSelectedPin(pinId)}
                      className={`rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.06em] backdrop-blur-md transition-colors ${
                        selectedPin === pinId
                          ? 'bg-[#C9A484] text-[#1A2723]'
                          : 'bg-[#1A2723]/75 text-[#F6F3EE]/80 hover:text-[#F6F3EE]'
                      }`}
                    >
                      {pinId === 'witomino'
                        ? ui.googleProfile.tabWitomino
                        : ui.googleProfile.tabSrodmiescie}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedPin}-${activeLocation.city}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.32, ease: EASE_EDITORIAL }}
                    className="space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A484]">
                          {transitPill}
                        </p>
                        <p className="font-editorial mt-1 text-2xl font-normal text-[#F6F3EE]">
                          {activeLocation.city}
                        </p>
                      </div>
                      <MapPin className="mt-1 h-5 w-5 shrink-0 stroke-[1.4] text-[#C9A484]" />
                    </div>

                    <p className="text-[13px] font-light text-[#F6F3EE]/78">
                      {activeLocation.address}
                      <br />
                      <span className="text-[#F6F3EE]/55">{activeLocation.hours}</span>
                    </p>

                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#F6F3EE]/22 bg-[#F6F3EE]/8 px-5 py-3 text-[12.5px] font-medium text-[#F6F3EE] transition-colors hover:border-[#C9A484] hover:bg-[#C9A484] hover:text-[#1A2723]"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      <SlotRollText label={ui.googleProfile.routeBtn} />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
