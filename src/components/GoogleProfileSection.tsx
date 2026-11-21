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
 * Refined Google Business Profile showcase + Accessible Stylized Interactive Trójmiasto Coastal Map.
 */
export const GoogleProfileSection: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<'gdansk' | 'gdynia'>('gdansk');
  const reduced = useReducedMotion();

  const activeLocation =
    PRACTICE.locations.find((l) => l.id === selectedPin) ?? PRACTICE.locations[0];

  const mapsUrl =
    selectedPin === 'gdansk'
      ? PRACTICE.googleProfile.mapsGdanskUrl
      : PRACTICE.googleProfile.mapsGdyniaUrl;

  const skmPill =
    selectedPin === 'gdansk' ? 'SKM Wrzeszcz · 4 min pieszo' : 'SKM Gdynia · 6 min pieszo';

  return (
    <section id="wizytowka-google" className="relative bg-[#EFEAE1]/65 py-16 md:py-22">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-end gap-8 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">Wizytówka Google · Trójmiasto</p>
            </Reveal>
            <h2 className="font-editorial text-[clamp(2.25rem,3.9vw,3.55rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#1D2220]">
              <MaskedLines
                lines={['Zweryfikowana praktyka', 'i zaufanie pacjentów w Google.']}
                italicSubstring="w Google."
              />
            </h2>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <Reveal delay={0.12}>
              <p className="text-[14.5px] font-light leading-[1.78] text-[#4E5551] lg:ml-auto lg:max-w-[420px]">
                Sprawdź zweryfikowane opinie, dokładny dojazd SKM oraz godziny przyjęć obu gabinetów
                bezpośrednio na wizytówce Google Maps i portalu ZnanyLekarz.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Cols: Google Business Profile Summary + Verified Review Snippets */}
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
                        {PRACTICE.googleProfile.reviewCount} zweryfikowanych opinii w Google
                      </p>
                      <p className="mt-0.5 text-[12px] font-light text-[#5D6560]">
                        {PRACTICE.fullName} · Gabinet Psychologiczny Gdańsk &amp; Gdynia
                      </p>
                    </div>
                  </div>

                  {/* Localized Google Profile Emblem */}
                  <div className="flex items-center gap-2.5 rounded-full border border-[#1D2220]/10 bg-[#F6F3EE] px-4 py-2">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                      />
                    </svg>
                    <span className="text-[11.5px] font-medium text-[#1D2220]">
                      Profil Firmy w Google
                    </span>
                  </div>
                </div>

                {/* Actionable Direct Google Links */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={PRACTICE.googleProfile.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#2B423B] px-5 py-2.5 text-[12.5px] font-medium text-[#F6F3EE] transition-colors hover:bg-[#1A2723]"
                  >
                    <SlotRollText label="Zobacz wizytówkę w Google" />
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={PRACTICE.googleProfile.writeReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#1D2220]/16 bg-[#F6F3EE] px-5 py-2.5 text-[12.5px] font-medium text-[#1D2220] transition-colors hover:border-[#2B423B] hover:text-[#2B423B]"
                  >
                    <SlotRollText label="Dodaj opinię w Google" />
                    <KineticArrow className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={PRACTICE.znanyLekarzUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group editorial-link ml-1 text-[12.5px] font-medium text-[#4E5551] hover:text-[#2B423B]"
                  >
                    <span>Profil ZnanyLekarz</span>
                    <KineticArrow className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* 3 Verified Google Review Snippet Cards */}
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
                        <span className="text-[10.5px] text-[#5D6560]">{rev.dateLabel}</span>
                      </div>
                      <p className="mt-3.5 text-[13px] font-light leading-[1.7] text-[#3F4642]">
                        „{rev.text}”
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#1D2220]/8 pt-3">
                      <span className="text-[12px] font-medium text-[#1D2220]">{rev.author}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[#2B423B]">
                        <ShieldCheck className="h-3 w-3" />
                        Google
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Accessible Stylized Interactive Trójmiasto Coastal Map Card */}
          <Reveal delay={0.14} className="lg:col-span-5">
            <div
              data-dark-surface="true"
              className="flex h-full flex-col justify-between overflow-hidden border border-[#1D2220]/12 bg-[#1A2723] text-[#F6F3EE] shadow-[0_28px_60px_-34px_rgba(26,39,35,0.4)]"
            >
              <div className="relative h-[300px] w-full overflow-hidden bg-[#1D2C27] sm:h-[320px]">
                {/* role="group" keeps interactive SVG pins exposed to screen readers & keyboard */}
                <svg
                  viewBox="0 0 460 320"
                  className="h-full w-full"
                  role="group"
                  aria-label="Interaktywna mapa gabinetów w Gdańsku Wrzeszczu i Gdyni Śródmieściu nad Zatoką Gdańską"
                >
                  <title>Mapa lokalizacji gabinetów — Gdańsk Wrzeszcz i Gdynia Śródmieście</title>

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

                  {/* Subtle Trójmiejski Park Krajobrazowy contour lines on west side */}
                  <path
                    d="M 0 120 C 48 110, 82 145, 112 185 C 138 220, 122 278, 86 320"
                    fill="none"
                    stroke="rgba(246,243,238,0.06)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 0 175 C 36 168, 64 196, 82 230 C 98 260, 74 295, 48 320"
                    fill="none"
                    stroke="rgba(246,243,238,0.05)"
                    strokeWidth="1"
                  />

                  {/* Zatoka Gdańska sea fill */}
                  <path
                    d="M 220 0 L 460 0 L 460 250 C 400 242, 348 232, 305 204 C 266 178, 244 134, 224 88 C 212 60, 214 28, 220 0 Z"
                    fill="rgba(201, 164, 132, 0.065)"
                  />

                  {/* Animated Baltic Coastline contour */}
                  <motion.path
                    d="M 220 0 C 214 28, 212 60, 224 88 C 244 134, 266 178, 305 204 C 348 232, 400 242, 460 250"
                    fill="none"
                    stroke="rgba(201, 164, 132, 0.44)"
                    strokeWidth="1.5"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: EASE_EDITORIAL }}
                  />

                  {/* Secondary sea depth contour */}
                  <path
                    d="M 258 0 C 254 34, 256 68, 272 98 C 292 136, 318 168, 362 188 C 398 204, 430 212, 460 216"
                    fill="none"
                    stroke="rgba(246, 243, 238, 0.09)"
                    strokeDasharray="3 6"
                    strokeWidth="1"
                  />

                  {/* SKM Trójmiasto Rapid Rail Axis */}
                  <motion.path
                    d="M 188 74 C 194 118, 206 160, 232 218 L 260 284"
                    fill="none"
                    stroke="#C9A484"
                    strokeOpacity="0.68"
                    strokeWidth="1.4"
                    strokeDasharray="4 4"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.35, delay: 0.25, ease: EASE_EDITORIAL }}
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
                    x="302"
                    y="128"
                    fill="rgba(246,243,238,0.28)"
                    fontSize="9.5"
                    letterSpacing="3.2"
                  >
                    ZATOKA GDAŃSKA
                  </text>
                  <text
                    x="130"
                    y="148"
                    fill="rgba(246,243,238,0.38)"
                    fontSize="9"
                    letterSpacing="2"
                  >
                    SOPOT · SKM
                  </text>
                  <circle cx="204" cy="145" r="2.5" fill="rgba(246,243,238,0.42)" />

                  {/* Interactive Pin: Gdynia Śródmieście */}
                  <g
                    onClick={() => setSelectedPin('gdynia')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPin('gdynia');
                      }
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label="Wybierz gabinet Gdynia Śródmieście"
                    aria-pressed={selectedPin === 'gdynia'}
                  >
                    {/* Generous 48px invisible hit target */}
                    <circle cx="188" cy="74" r="24" fill="transparent" />
                    {selectedPin === 'gdynia' && (
                      <motion.circle
                        cx="188"
                        cy="74"
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
                      cx="188"
                      cy="74"
                      r={selectedPin === 'gdynia' ? 7 : 5}
                      fill={selectedPin === 'gdynia' ? '#C9A484' : '#F6F3EE'}
                      stroke="#1A2723"
                      strokeWidth="2"
                    />
                    <text
                      x="30"
                      y="78"
                      fill={selectedPin === 'gdynia' ? '#C9A484' : 'rgba(246,243,238,0.75)'}
                      fontSize="10.5"
                      fontWeight={selectedPin === 'gdynia' ? '600' : '400'}
                      letterSpacing="1.6"
                    >
                      GDYNIA ŚRÓDMIEŚCIE
                    </text>
                  </g>

                  {/* Interactive Pin: Gdańsk Wrzeszcz */}
                  <g
                    onClick={() => setSelectedPin('gdansk')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPin('gdansk');
                      }
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label="Wybierz gabinet Gdańsk Wrzeszcz"
                    aria-pressed={selectedPin === 'gdansk'}
                  >
                    <circle cx="232" cy="218" r="24" fill="transparent" />
                    {selectedPin === 'gdansk' && (
                      <motion.circle
                        cx="232"
                        cy="218"
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
                      cx="232"
                      cy="218"
                      r={selectedPin === 'gdansk' ? 7 : 5}
                      fill={selectedPin === 'gdansk' ? '#C9A484' : '#F6F3EE'}
                      stroke="#1A2723"
                      strokeWidth="2"
                    />
                    <text
                      x="74"
                      y="222"
                      fill={selectedPin === 'gdansk' ? '#C9A484' : 'rgba(246,243,238,0.75)'}
                      fontSize="10.5"
                      fontWeight={selectedPin === 'gdansk' ? '600' : '400'}
                      letterSpacing="1.6"
                    >
                      GDAŃSK WRZESZCZ
                    </text>
                  </g>
                </svg>

                {/* Positioned top-right over open sea so city labels remain completely unobstructed */}
                <div className="absolute right-4 top-4 flex gap-1.5">
                  {(['gdansk', 'gdynia'] as const).map((cityId) => (
                    <button
                      key={cityId}
                      type="button"
                      aria-pressed={selectedPin === cityId}
                      onClick={() => setSelectedPin(cityId)}
                      className={`rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.06em] backdrop-blur-md transition-colors ${
                        selectedPin === cityId
                          ? 'bg-[#C9A484] text-[#1A2723]'
                          : 'bg-[#1A2723]/75 text-[#F6F3EE]/80 hover:text-[#F6F3EE]'
                      }`}
                    >
                      {cityId === 'gdansk' ? 'Gdańsk' : 'Gdynia'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Gabinet Navigation Details with Smooth AnimatePresence */}
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
                          {skmPill}
                        </p>
                        <p className="font-editorial mt-1 text-2xl font-normal text-[#F6F3EE]">
                          {activeLocation.city} — {activeLocation.district.split('·')[0].trim()}
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
