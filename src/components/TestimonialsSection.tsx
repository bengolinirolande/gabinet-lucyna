import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, BadgeCheck } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import { EASE_EDITORIAL, Reveal } from './motion/MotionPrimitives';

interface ReflectionQuote {
  id: string;
  quote: string;
  author: string;
  context: string;
  location: string;
}

const REFLECTIONS: ReflectionQuote[] = [
  {
    id: 'r1',
    quote:
      'Serdecznie polecam Panią psycholog. Akceptuje Pani moje dziwactwa, nie ocenia, a wspiera. Czuję się bezpiecznie i mam dzięki temu odwagę do zmian koniecznych do lepszego życia. Pani z dużą wiedzą i doświadczeniem, co da się odczuć. Dziękuję.',
    author: 'Anita',
    context: 'Psychoterapia · maj 2026 · ZnanyLekarz.pl',
    location: 'Wizyta zweryfikowana · 5,0',
  },
  {
    id: 'r2',
    quote:
      'Pani psycholog słuchała mnie z uwagą i z takim głębokim zainteresowaniem, jakiego nigdy wcześniej nie zaznałam. Pani Lucyna nie jest osobą kogokolwiek oceniającą, tylko wspierającą i naprawdę głęboko rozumiejącą. Polecam ją każdemu, kto czuje, że potrzebuje pomocy — zazna wyłącznie wsparcia i prawdziwego zrozumienia.',
    author: 'Monika',
    context: 'Konsultacja psychologiczna · czerwiec 2025 · ZnanyLekarz.pl',
    location: 'Wizyta zweryfikowana · 5,0',
  },
  {
    id: 'r3',
    quote:
      'Swobodna atmosfera i profesjonalne podejście. Szukanie rozwiązań, nic nie jest narzucane! Na pewno Pani Lucyna pomoże odnaleźć odpowiednią drogę — tę z uśmiechem.',
    author: 'Joanna',
    context: 'Badania psychologiczne · maj 2025 · ZnanyLekarz.pl',
    location: 'Wizyta zweryfikowana · 5,0',
  },
  {
    id: 'r4',
    quote:
      'Jestem bardzo zadowolony z wizyty i na pewno umówię się kolejny raz. Długo nie mogłem się zdecydować, ale odważyłem się i jestem bardzo zadowolony.',
    author: 'P.K.',
    context: 'Konsultacja psychologiczna · lipiec 2025 · ZnanyLekarz.pl',
    location: 'Wizyta zweryfikowana · 5,0',
  },
];

// Dynamic Framer Motion variants keyed off live `custom` direction (zero stale exit direction!)
const counterVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { y: '0%', opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const quoteVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 28,
    clipPath: dir > 0 ? 'inset(0% 0% 0% 8%)' : 'inset(0% 8% 0% 0%)',
  }),
  center: {
    opacity: 1,
    x: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -24,
    clipPath: dir > 0 ? 'inset(0% 8% 0% 0%)' : 'inset(0% 0% 0% 8%)',
  }),
};

export const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  });

  // Opposing vertical editorial parallax across the triptych (zero horizontal clipping!)
  const colLeftY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, -14]);
  const colMidY = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const colRightY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-14, 14]);
  const triptychMotion = [colLeftY, colMidY, colRightY];

  const navigate = (step: number) => {
    setDirection(step);
    setIndex((prev) => (prev + step + REFLECTIONS.length) % REFLECTIONS.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -45 || info.velocity.x < -300) {
      navigate(1);
    } else if (info.offset.x > 45 || info.velocity.x > 300) {
      navigate(-1);
    }
  };

  const current = REFLECTIONS[index];

  return (
    <section aria-label="Słowa pacjentów" className="relative bg-[#F6F3EE] py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Editorial Intro & Controls */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-4">
            <div>
              <Reveal>
                <p className="eyebrow mb-4">Głosy pacjentów</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-editorial text-[clamp(2rem,3.3vw,3rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#1D2220]">
                  Doświadczenie osób, które zdecydowały się{' '}
                  <em className="italic text-[#2B423B]">zrobić pierwszy krok.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-light text-[#5D6560]">
                  <BadgeCheck className="h-4 w-4 stroke-[1.5] text-[#2B423B]" />
                  <span>Zweryfikowane opinie 5,0 / 5 z portalu ZnanyLekarz.pl</span>
                </div>
              </Reveal>
            </div>

            {/* Tactile Circular Navigation Buttons + Directional Vertical Slot-Roll Counter */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Poprzednia opinia"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1D2220]/15 bg-[#FAF8F4] text-[#1D2220] transition-all duration-300 hover:border-[#2B423B] hover:bg-[#2B423B] hover:text-[#F6F3EE]"
              >
                <ArrowLeft className="h-4 w-4 stroke-[1.5]" />
              </button>
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="Następna opinia"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1D2220]/15 bg-[#FAF8F4] text-[#1D2220] transition-all duration-300 hover:border-[#2B423B] hover:bg-[#2B423B] hover:text-[#F6F3EE]"
              >
                <ArrowRight className="h-4 w-4 stroke-[1.5]" />
              </button>

              <div className="ml-2 flex items-baseline gap-1 font-editorial text-lg text-[#4E5551]">
                <span className="relative inline-block h-[1.25em] w-[1.3em] overflow-hidden align-bottom text-[#1D2220]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.span
                      key={index}
                      custom={direction}
                      variants={counterVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                      className="block"
                    >
                      0{index + 1}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-sm text-[#5D6560]">/ 0{REFLECTIONS.length}</span>
              </div>
            </div>
          </div>

          {/* Right Animated Editorial Quote Canvas with Swipe & Directional Curtain Wipe */}
          <div className="lg:col-span-8">
            <div
              aria-live="polite"
              className="relative overflow-hidden border border-[#1D2220]/11 bg-[#FAF8F4] p-8 shadow-[0_24px_60px_-38px_rgba(26,39,35,0.22)] md:p-12 lg:p-14"
            >
              <span
                aria-hidden="true"
                className="font-editorial pointer-events-none absolute right-8 top-4 select-none text-[120px] leading-none text-[#2B423B]/[0.06]"
              >
                „
              </span>

              <div className="min-h-[220px] sm:min-h-[200px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    variants={quoteVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag={reduced ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={handleDragEnd}
                    transition={{ duration: 0.52, ease: EASE_EDITORIAL }}
                    className="flex cursor-grab flex-col justify-between gap-8 active:cursor-grabbing"
                  >
                    <blockquote className="font-editorial text-[24px] font-light italic leading-[1.42] text-[#1D2220] md:text-[30px]">
                      „{current.quote}”
                    </blockquote>

                    <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[#1D2220]/10 pt-6">
                      <div>
                        <p className="text-[14px] font-medium text-[#1D2220]">{current.author}</p>
                        <p className="mt-0.5 text-[12.5px] font-light text-[#4E5551]">
                          {current.context}
                        </p>
                      </div>
                      <span className="rounded-full border border-[#1D2220]/10 bg-[#F6F3EE] px-3.5 py-1 text-[11px] uppercase tracking-[0.16em] text-[#5D6560]">
                        {current.location}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive Progress Segmented Bars with 28px accessible touch targets */}
              <div className="mt-5 flex items-center gap-2">
                {REFLECTIONS.map((item, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Pokaż opinię ${i + 1}`}
                      aria-pressed={active}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className="flex-1 py-3"
                    >
                      <span className="relative block h-1 w-full overflow-hidden bg-[#1D2220]/12">
                        {active && (
                          <motion.span
                            layoutId="testimonial-active-bar"
                            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                            className="absolute inset-0 bg-[#2B423B]"
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Opposing Vertical Parallax Editorial Triptych (Zero Edge Clipping on Any Breakpoint) */}
        <div ref={stripRef} className="mt-10 py-4 md:mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                src: PRACTICE.images.officePortrait,
                pos: 'object-top',
                alt: 'mgr Lucyna Grochowska w gabinecie psychologicznym w Gdyni na Witominie',
                caption: 'Gdynia Witomino · gabinet przy ul. Chwarznieńskiej',
              },
              {
                src: PRACTICE.images.sanctuaryTea,
                pos: 'object-center',
                alt: 'Ceramiczna filiżanka herbaty na drewnianym stoliku w świetle dziennym',
                caption: 'Spokojny rytm spotkania w nurcie psychodynamicznym',
              },
              {
                src: PRACTICE.images.gdynia,
                pos: 'object-center',
                alt: 'Wnętrze gabinetu w Przychodni Medyczna Gdynia w Śródmieściu',
                caption: 'Gdynia Śródmieście · Przychodnia Medyczna Gdynia',
              },
            ].map((frame, i) => (
              <motion.figure
                key={frame.caption}
                style={{ y: triptychMotion[i] }}
                className="group space-y-2.5"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[2px] bg-[#E5DDD1]">
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${frame.pos}`}
                  />
                </div>
                <figcaption className="text-[11px] uppercase tracking-[0.16em] text-[#5D6560]">
                  {frame.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
