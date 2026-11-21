import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { PRACTICE } from '../data/practice';
import {
  EASE_EDITORIAL,
  KineticArrow,
  MagneticButton,
  SlotRollText,
} from './motion/MotionPrimitives';

interface BalticGalleryInterludeProps {
  onOpenBooking: (presetTopic?: string) => void;
}

const MOOD_PROMPTS = [
  {
    id: 'spokoj',
    label: 'Chcę odetchnąć od lęku i smutku',
    topic: 'Stany lękowe, nerwice i depresja',
    title: 'Kiedy napięcie, lęk lub przygnębienie odbierają codzienny oddech.',
    response:
      'Pierwszym krokiem nie jest „wzięcie się w garść”, ale pozwolenie sobie na przyjęcie pomocy. Podczas konsultacji spokojnie poznajemy źródła cierpienia, aby krok po kroku mogła pojawić się prawdziwa ulga.',
  },
  {
    id: 'trauma',
    label: 'Niosę trudne doświadczenia',
    topic: 'Psychotraumatologia, przemoc i strata',
    title: 'Kiedy bolesne przeżycia lub doświadczenie przemocy wciąż dają o sobie znać.',
    response:
      'Jako psychotraumatolog towarzyszę w uważnym, stopniowym oswajaniu śladów traumy, straty oraz zachwianego poczucia bezpieczeństwa — bez pośpiechu, bez oceniania i z pełnym szacunkiem dla Twoich granic.',
  },
  {
    id: 'relacje',
    label: 'Chcę zdrowszych relacji i bliskości',
    topic: 'Relacje, terapia par i młodzież',
    title: 'Kiedy trudno o bezpieczną bliskość, zaufanie lub poczucie własnej wartości.',
    response:
      'Praca w nurcie psychodynamicznym oraz konsultacje dla par i seksuologiczne pomagają zrozumieć powtarzalne mechanizmy w związkach i budować relację ze sobą oraz z bliskimi na solidniejszym fundamencie.',
  },
];

/**
 * Full-bleed cinematic Baltic Coast scroll-expanding photograph (Apple / Awwwards SOTD scale-out frame)
 * paired with an intimate tactile 3-pill emotional self-check micro-interaction.
 */
export const BalticGalleryInterlude: React.FC<BalticGalleryInterludeProps> = ({ onOpenBooking }) => {
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [activeMood, setActiveMood] = useState(MOOD_PROMPTS[0]);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });
  const imgScale = useTransform(smooth, [0, 0.55, 1], reduced ? [1, 1, 1] : [1.18, 1.03, 1.0]);
  const frameScale = useTransform(smooth, [0, 0.35], reduced ? [1, 1] : [0.94, 1]);
  const overlayY = useTransform(smooth, [0, 1], reduced ? [0, 0] : [26, -26]);

  return (
    <section
      id="baltic-sanctuary"
      ref={wrapRef}
      data-dark-surface="true"
      aria-label="Przestrzeń spokoju nad Zatoką Gdańską"
      className="relative bg-[#F6F3EE] py-10 md:py-14"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <motion.div
          style={{ scale: frameScale }}
          className="relative min-h-[460px] overflow-hidden rounded-[3px] bg-[#1A2723] shadow-[0_36px_90px_-42px_rgba(26,39,35,0.45)] md:min-h-[520px]"
        >
          {/* Full-bleed Baltic Sea Morning Mist Image with Cinematic Parallax Zoom */}
          <motion.img
            src={PRACTICE.images.balticShore}
            alt="Spokojny poranek nad Zatoką Gdańską w okolicach Gdyni Orłowa"
            loading="eager"
            decoding="async"
            style={{ scale: imgScale }}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          {/* Warm Baltic Pine Editorial Vignette Gradient (high contrast on both sky & ground) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#1A2723]/64 via-[#1A2723]/48 to-[#1A2723]/92"
          />

          {/* Floating Interactive Self-Reflection Card */}
          <motion.div
            style={{ y: overlayY }}
            className="relative z-10 flex min-h-[460px] flex-col justify-between p-6 sm:p-10 md:min-h-[520px] md:p-12 lg:p-14"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#E4C5A6]">
                Zatoka Gdańska · Moment zatrzymania
              </span>
              <span className="text-[11px] tracking-[0.18em] text-[#F6F3EE]/82">
                Gdynia · Trójmiasto · Online
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 items-end gap-8 md:mt-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#F6F3EE]/65">
                  Z czym dziś tu zaglądasz? Wybierz zdanie najbliższe Tobie:
                </p>

                {/* Tactile Spring Pill Switcher */}
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {MOOD_PROMPTS.map((m) => {
                    const active = m.id === activeMood.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setActiveMood(m)}
                        className={`relative rounded-full px-4 py-2 text-[12.5px] transition-colors duration-300 ${active
                          ? 'text-[#1A2723] font-medium'
                          : 'border border-[#F6F3EE]/25 bg-[#1A2723]/35 text-[#F6F3EE]/85 backdrop-blur-md hover:border-[#C9A484]'
                          }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="baltic-mood-pill"
                            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                            className="absolute inset-0 rounded-full bg-[#F6F3EE]"
                          />
                        )}
                        <span className="relative z-10">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7 min-h-[155px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMood.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
                    >
                      <h2 className="font-editorial text-[28px] font-light leading-[1.15] text-[#F6F3EE] md:text-[38px]">
                        {activeMood.title}
                      </h2>
                      <p className="mt-4 max-w-[600px] text-[14.5px] font-light leading-[1.8] text-[#F6F3EE]/80">
                        {activeMood.response}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:items-end">
                <MagneticButton
                  onClick={() => onOpenBooking(activeMood.topic)}
                  cursorLabel="Porozmawiajmy"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F6F3EE] px-7 py-3.5 text-[13px] font-medium text-[#1A2723] transition-colors hover:bg-[#EFEAE1]"
                >
                  <SlotRollText label="Umów pierwszą rozmowę" italicHover />
                  <KineticArrow className="h-4 w-4" />
                </MagneticButton>
                <span className="text-[11.5px] font-light text-[#F6F3EE]/65">
                  Wybrany temat pojawi się od razu w formularzu.
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
