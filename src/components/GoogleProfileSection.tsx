import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ExternalLink, MapPin, Navigation, ShieldCheck, Star } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import {
  EASE_EDITORIAL,
  KineticArrow,
  MaskedLines,
  Reveal,
  SlotRollText,
} from './motion/MotionPrimitives';

/**
 * Animated count-up score (0,0 -> 5,0) triggered once in view; instant under reduced motion.
 */
const AnimatedRating: React.FC<{ target: number }> = ({ target }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setVal(target);
      return;
    }
    if (!inView) return;
    const duration = 1050;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced]);

  return (
    <span
      ref={ref}
      className="font-editorial text-6xl font-light leading-none tracking-tight text-[#1D2220] md:text-7xl"
    >
      {val.toFixed(1).replace('.', ',')}
    </span>
  );
};

/**
 * Official Verified Profiles Showcase (ZnanyLekarz 5,0 · TwójPsycholog Verified Diplomas · Google Maps)
 * + Accessible Stylized Interactive Gdynia & Zatoka Gdańska Coastal Map.
 */
export const GoogleProfileSection: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<'witomino' | 'srodmiescie'>('witomino');
  const reduced = useReducedMotion();

  const activeLocation =
    PRACTICE.locations.find((l) => l.id === selectedPin) ?? PRACTICE.locations[0];

  const mapsUrl =
    selectedPin === 'witomino'
      ? PRACTICE.googleProfile.mapsWitominoUrl
      : PRACTICE.googleProfile.mapsSrodmiescieUrl;

  const transitPill =
    selectedPin === 'witomino'
      ? 'Witomino · Gabinet prywatny · ZKM / Obwodnica'
      : 'Śródmieście · Medyczna Gdynia · 7 min od SKM';

  return (
    <section id="wizytowka-google" className="relative bg-[#EFEAE1]/65 py-16 md:py-22">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-end gap-8 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">Zweryfikowane profile · ZnanyLekarz · TwójPsycholog</p>
            </Reveal>
            <h2 className="font-editorial text-[clamp(2.25rem,3.9vw,3.55rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#1D2220]">
              <MaskedLines
                lines={['Zweryfikowane dyplomy', 'i 5,0 zaufania pacjentów.']}
                italicSubstring="zaufania pacjentów."
              />
            </h2>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <Reveal delay={0.12}>
              <p className="text-[14.5px] font-light leading-[1.78] text-[#4E5551] lg:ml-auto lg:max-w-[420px]">
                Sprawdź potwierdzone opinie pacjentów na portalu ZnanyLekarz, zweryfikowane dyplomy
                w serwisie TwójPsycholog oraz lokalizacje obu gabinetów w Gdyni.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Cols: Official Profiles Summary + Real Verified Review Snippets */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal>
              <div className="border border-[#1D2220]/12 bg-[#FAF8F4] p-7 shadow-[0_24px_55px_-35px_rgba(26,39,35,0.22)] md:p-9">
                <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[#1D2220]/10 pb-7">
                  <div className="flex items-center gap-5">
                    <AnimatedRating target={PRACTICE.googleProfile.rating} />
                    <div>
                      <div className="flex items-center gap-1" aria-label="Ocena 5 na 5 gwiazdek">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.span
                            key={i}
                            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: reduced ? 0 : 0.14 + i * 0.08,
                              duration: 0.45,
                              ease: EASE_EDITORIAL,
                            }}
                          >
                            <Star className="h-4.5 w-4.5 fill-[#C4924A] text-[#C4924A]" />
                          </motion.span>
                        ))}
                      </div>
                      <p className="mt-2 text-[13.5px] font-medium text-[#1D2220]">
                        {PRACTICE.googleProfile.reviewCount} zweryfikowanych opinii · ZnanyLekarz.pl
                      </p>
                      <p className="mt-0.5 text-[12px] font-light text-[#5D6560]">
                        {PRACTICE.fullName} · Dyplomy zweryfikowane przez TwójPsycholog.pl
                      </p>
                    </div>
                  </div>

                  {/* Verified Diplomas Emblem */}
                  <div className="flex items-center gap-2 rounded-full border border-[#2B423B]/20 bg-[#F6F3EE] px-4 py-2">
                    <ShieldCheck className="h-4 w-4 text-[#2B423B]" />
                    <span className="text-[11.5px] font-medium text-[#1D2220]">
                      Dyplomy zweryfikowane
                    </span>
                  </div>
                </div>

                {/* Actionable Direct Official Profile Links */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={PRACTICE.znanyLekarzUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#2B423B] px-5 py-2.5 text-[12.5px] font-medium text-[#F6F3EE] transition-colors hover:bg-[#1A2723]"
                  >
                    <SlotRollText label="Profil ZnanyLekarz (5,0)" />
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={PRACTICE.twojPsychologUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#1D2220]/16 bg-[#F6F3EE] px-5 py-2.5 text-[12.5px] font-medium text-[#1D2220] transition-colors hover:border-[#2B423B] hover:text-[#2B423B]"
                  >
                    <SlotRollText label="Profil TwójPsycholog" />
                    <KineticArrow className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={PRACTICE.googleProfile.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group editorial-link ml-1 text-[12.5px] font-medium text-[#4E5551] hover:text-[#2B423B]"
                  >
                    <span>Google Maps</span>
                    <KineticArrow className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={PRACTICE.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group editorial-link ml-1 text-[12.5px] font-medium text-[#4E5551] hover:text-[#2B423B]"
                  >
                    <span>Facebook</span>
                    <KineticArrow className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* 3 Real Verified Review Snippet Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PRACTICE.googleProfile.featuredReviews.map((rev, idx) => (
                <Reveal key={rev.author} delay={0.08 * idx}>
                  <article className="flex h-full flex-col justify-between border border-[#1D2220]/10 bg-[#FAF8F4]/90 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-[#2B423B]/35">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-0.5" aria-label="5 gwiazdek">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="h-3 w-3 fill-[#C4924A] text-[#C4924A]" />
                          ))}
                        </div>
                        <span className="text-[10px] text-[#5D6560]">
                          {rev.dateLabel.split('·')[0].trim()}
                        </span>
                      </div>
                      <p className="mt-3.5 text-[13px] font-light leading-[1.7] text-[#3F4642]">
                        „{rev.text}”
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#1D2220]/8 pt-3">
                      <span className="text-[12px] font-medium text-[#1D2220]">{rev.author}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-[#2B423B]">
                        <ShieldCheck className="h-3 w-3" />
                        ZnanyLekarz
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Accessible Stylized Interactive Gdynia & Zatoka Gdańska Coastal Map */}
          <Reveal delay={0.14} className="lg:col-span-5">
            <div
              data-dark-surface="true"
              className="flex h-full flex-col justify-between overflow-hidden border border-[#1D2220]/12 bg-[#1A2723] text-[#F6F3EE] shadow-[0_28px_60px_-34px_rgba(26,39,35,0.4)]"
            >
              <div className="relative h-[300px] w-full overflow-hidden bg-[#1D2C27] sm:h-[320px]">
                <svg
                  viewBox="0 0 460 320"
                  className="h-full w-full"
                  role="group"
                  aria-label="Interaktywna mapa gabinetów mgr Lucyny Grochowskiej w Gdyni Witominie i Gdyni Śródmieściu"
                >
                  <title>Mapa gabinetów — Gdynia Witomino i Gdynia Śródmieście</title>

                  {/* Architectural lat/lon grid */}
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

                  {/* Trójmiejski Park Krajobrazowy green hills contour (west of Witomino) */}
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

                  {/* Zatoka Gdańska sea fill */}
                  <path
                    d="M 278 0 L 460 0 L 460 320 L 320 320 C 296 270, 286 226, 276 176 C 266 126, 268 62, 278 0 Z"
                    fill="rgba(201, 164, 132, 0.065)"
                  />

                  {/* Animated Gdynia Coastline contour */}
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

                  {/* Secondary sea depth contour */}
                  <path
                    d="M 314 0 C 306 64, 306 128, 318 182 C 330 232, 342 276, 366 320"
                    fill="none"
                    stroke="rgba(246, 243, 238, 0.09)"
                    strokeDasharray="3 6"
                    strokeWidth="1"
                  />

                  {/* SKM Trójmiasto Rapid Rail Axis (Gdynia Główna -> Wzgórze -> Orłowo -> Sopot) */}
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

                  {/* ul. Chwarznieńska / Witomino connector road */}
                  <path
                    d="M 102 184 C 148 176, 186 154, 232 132"
                    fill="none"
                    stroke="rgba(246,243,238,0.22)"
                    strokeWidth="1.1"
                  />

                  {/* Compass rose & Cartographic Labels */}
                  <g opacity="0.4" transform="translate(414, 274)">
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#F6F3EE" strokeWidth="1" />
                    <line x1="-10" y1="0" x2="10" y2="0" stroke="#F6F3EE" strokeWidth="1" />
                    <text x="-3.5" y="-16" fill="#C9A484" fontSize="8" letterSpacing="1">
                      N
                    </text>
                  </g>

                  <text
                    x="324"
                    y="156"
                    fill="rgba(246,243,238,0.28)"
                    fontSize="9.5"
                    letterSpacing="3"
                  >
                    ZATOKA GDAŃSKA
                  </text>
                  <text
                    x="194"
                    y="272"
                    fill="rgba(246,243,238,0.38)"
                    fontSize="9"
                    letterSpacing="2"
                  >
                    ORŁOWO · SOPOT
                  </text>
                  <circle cx="264" cy="268" r="2.5" fill="rgba(246,243,238,0.42)" />

                  {/* Interactive Pin: Gdynia Śródmieście (Medyczna Gdynia, ul. Bema 16/2) */}
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
                    aria-label="Wybierz gabinet Gdynia Śródmieście — ul. Bema 16/2"
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
                      letterSpacing="1.5"
                    >
                      ŚRÓDMIEŚCIE · BEMA 16/2
                    </text>
                  </g>

                  {/* Interactive Pin: Gdynia Witomino (ul. Chwarznieńska 136-138) */}
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
                    aria-label="Wybierz gabinet Gdynia Witomino — ul. Chwarznieńska 136-138"
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
                      letterSpacing="1.4"
                    >
                      WITOMINO · CHWARZNIEŃSKA
                    </text>
                  </g>
                </svg>

                {/* Positioned top-right over open sea so city labels remain unobstructed */}
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
                      {pinId === 'witomino' ? 'Witomino' : 'Śródmieście'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Gabinet Navigation Details */}
              <div className="p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPin}
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
                      <SlotRollText label={`Wyznacz trasę (${activeLocation.city}) w Google Maps`} />
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
