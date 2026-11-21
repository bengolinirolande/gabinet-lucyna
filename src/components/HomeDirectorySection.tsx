import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Star, Wind } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import { type PageId } from '../types/navigation';
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

const CHAPTER_CARDS: {
  page: PageId;
  num: string;
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  imagePosition?: string;
  cta: string;
}[] = [
  {
    page: 'terapia',
    num: '01',
    eyebrow: 'Obszary i proces',
    title: 'Terapia i obszary pomocy',
    summary:
      'Stany lękowe, depresja, psychotraumatologia, relacje i terapia par, seksuologia kliniczna oraz kryzysy. Nurt psychodynamiczny i bezpieczny proces.',
    image: PRACTICE.images.gdynia,
    cta: 'Zobacz obszary pracy',
  },
  {
    page: 'o-mnie',
    num: '02',
    eyebrow: '8 lat praktyki · Superwizja',
    title: 'O mnie i doświadczenie',
    summary:
      'Wykształcenie (UKW, Triada, UAM, Vis Salutis), praktyka szpitalna i prywatna, zweryfikowane dyplomy oraz prawdziwe opinie pacjentów 5,0/5.',
    image: PRACTICE.images.officePortrait,
    imagePosition: 'object-[50%_18%]',
    cta: 'Poznaj moje podejście',
  },
  {
    page: 'gabinety',
    num: '03',
    eyebrow: 'Gdynia · Online · PL / RU',
    title: 'Gabinety, opinie i cennik',
    summary:
      'Gdynia Witomino (ul. Chwarznieńska 136–138), Medyczna Gdynia (ul. Bema 16/2) i sesje online. Mapa Gdyni, profile ZnanyLekarz i TwójPsycholog oraz cennik od 200 zł.',
    image: PRACTICE.images.gdansk,
    cta: 'Sprawdź dojazd i cennik',
  },
];

export const HomeDirectorySection: React.FC<HomeDirectorySectionProps> = ({
  onNavigate,
  onOpenBreathing,
}) => {
  const consultationPrice = PRACTICE.pricing.items[0]?.price ?? '200 zł';

  return (
    <section id="przewodnik" className="relative bg-[#EFEAE1]/55 py-16 md:py-20">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-[640px]">
            <Reveal>
              <p className="eyebrow mb-3.5">Przewodnik po praktyce</p>
            </Reveal>
            <h2 className="font-editorial text-[clamp(2.2rem,3.8vw,3.45rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#1D2220]">
              <MaskedLines
                lines={['Wszystko, czego potrzebujesz,', 'uporządkowane w spokoju.']}
                italicSubstring="w spokoju."
              />
            </h2>
          </div>

          <Reveal delay={0.12}>
            <button
              type="button"
              onClick={onOpenBreathing}
              data-cursor="Oddech"
              className="group inline-flex items-center gap-3 rounded-full border border-[#1D2220]/14 bg-[#FAF8F4]/90 px-4 py-2.5 text-left transition-colors hover:border-[#2B423B]/50 hover:bg-[#FAF8F4]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2B423B]/10 text-[#2B423B]">
                <Wind className="h-3.5 w-3.5 stroke-[1.5]" />
              </span>
              <span>
                <span className="block text-[12px] font-medium text-[#1D2220]">
                  Chwila oddechu (4–4–6)
                </span>
                <span className="block text-[10.5px] font-light text-[#5D6560]">
                  30-sekundowe ćwiczenie na napięcie
                </span>
              </span>
            </button>
          </Reveal>
        </div>

        {/* 3 Curated Exhibition Chapter Portals (pure Framer whileHover — zero Tailwind transition-all conflict!) */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {CHAPTER_CARDS.map((card, idx) => (
            <motion.button
              key={card.page}
              type="button"
              data-cursor="Otwórz"
              onClick={() => onNavigate(card.page)}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.72, delay: idx * 0.08, ease: EASE_EDITORIAL },
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.28, ease: EASE_EDITORIAL },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="group flex flex-col justify-between overflow-hidden border border-[#1D2220]/11 bg-[#FAF8F4] text-left transition-[border-color,box-shadow] duration-500 hover:border-[#2B423B]/45 hover:shadow-[0_28px_60px_-34px_rgba(26,39,35,0.28)]"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E5DDD1]">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${card.imagePosition ?? 'object-center'}`}
                  />
                  <span className="font-editorial absolute left-4 top-4 rounded-full bg-[#1A2723]/82 px-3 py-0.5 text-sm italic text-[#F6F3EE] backdrop-blur-md">
                    {card.num}
                  </span>
                </div>

                <div className="p-6 md:p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C5E3E]">
                    {card.eyebrow}
                  </p>
                  <h3 className="font-editorial mt-2 text-[27px] font-normal leading-[1.15] text-[#1D2220] transition-colors group-hover:text-[#2B423B]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] font-light leading-[1.76] text-[#4E5551]">
                    {card.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#1D2220]/10 px-6 py-4 text-[12.5px] font-medium text-[#2B423B] md:px-7">
                <SlotRollText label={card.cta} />
                <KineticArrow className="h-4 w-4" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Compact Google Business Profile & Quick Practicalities Bar */}
        <Reveal delay={0.12} className="mt-7">
          <div className="grid grid-cols-1 items-center gap-5 border border-[#1D2220]/11 bg-[#FAF8F4] px-6 py-4 shadow-[0_20px_50px_-34px_rgba(26,39,35,0.2)] md:px-7 md:py-5 lg:grid-cols-12">
            <div className="flex items-center gap-4 lg:col-span-4">
              <div className="flex h-13 w-13 shrink-0 flex-col items-center justify-center rounded-full border border-[#1D2220]/10 bg-[#F6F3EE]">
                <span className="font-editorial text-2xl font-medium leading-none text-[#1D2220]">
                  {PRACTICE.googleProfile.rating.toFixed(1).replace('.', ',')}
                </span>
                <div className="mt-0.5 flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-2 w-2 fill-[#C4924A] text-[#C4924A]" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-[#1D2220]">
                  ZnanyLekarz · {PRACTICE.googleProfile.reviewCount} zweryfikowanych opinii
                </p>
                <p className="mt-0.5 text-[12px] font-light text-[#4E5551]">
                  „Nie ocenia, a wspiera. Czuję się bezpiecznie i mam odwagę do zmian.”
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[#1D2220]/10 py-3.5 text-[12.5px] font-light text-[#4E5551] lg:col-span-5 lg:border-x lg:border-y-0 lg:px-6 lg:py-0">
              <span className="inline-flex items-center gap-1.5 text-[#1D2220]">
                <MapPin className="h-3.5 w-3.5 text-[#2B423B]" />
                Gdynia (2 adresy) · Online
              </span>
              <span>
                Wizyty · <strong className="font-medium text-[#1D2220]">{consultationPrice}</strong>
              </span>
              <span>
                Języki: <strong className="font-medium text-[#2B423B]">PL / RU</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:col-span-3 lg:justify-end">
              <button
                type="button"
                onClick={() => onNavigate('gabinety')}
                className="group inline-flex items-center gap-1.5 rounded-full bg-[#2B423B] px-5 py-2.5 text-[12px] font-medium text-[#F6F3EE] transition-colors hover:bg-[#1A2723]"
              >
                <SlotRollText label="Mapa i cennik" />
                <KineticArrow className="h-3.5 w-3.5" />
              </button>
              <a
                href={PRACTICE.znanyLekarzUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Otwórz profil ZnanyLekarz w nowej karcie"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#1D2220]/14 px-3.5 py-2.5 text-[12px] text-[#4E5551] transition-colors hover:border-[#2B423B] hover:text-[#2B423B]"
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
