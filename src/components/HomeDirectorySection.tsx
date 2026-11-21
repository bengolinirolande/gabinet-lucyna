import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, ShieldCheck, Star, Wind } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import { handleRouteLinkClick, ROUTES, type PageId } from '../types/navigation';
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
  imageAlt: string;
  imagePosition?: string;
  cta: string;
}[] = [
  {
    page: 'terapia',
    num: '01',
    eyebrow: 'Psychoterapia i konsultacje',
    title: 'Terapia i obszary wsparcia',
    summary:
      'Gdy lęk, żal, ślady traumy czy napięcie w bliskości odbierają codzienny oddech. Zobacz, z czym możesz przyjść i jak łagodnie zaczynamy wspólną pracę.',
    image: PRACTICE.images.gdynia,
    imageAlt: 'Spokojne wnętrze gabinetu psychoterapeutycznego w Gdyni',
    cta: 'Zobacz, w czym pomagam',
  },
  {
    page: 'o-mnie',
    num: '02',
    eyebrow: 'Kliniczna uważność',
    title: 'O mnie i doświadczenie',
    summary:
      'Od poradni i oddziałów szpitalnych po kameralny gabinet w Gdyni. Poznaj moją drogę zawodową, zweryfikowane dyplomy oraz pracę pod stałą superwizją.',
    image: PRACTICE.images.officePortrait,
    imageAlt: 'mgr Lucyna Grochowska — psycholog i psychotraumatolog w swoim gabinecie w Gdyni',
    imagePosition: 'object-top',
    cta: 'Poznaj moją drogę',
  },
  {
    page: 'gabinety',
    num: '03',
    eyebrow: 'Gdynia i online · PL / RU',
    title: 'Gabinety i cennik',
    summary:
      'Dwa spokojne adresy w Gdyni — na Witominie i w Śródmieściu — sesje online oraz wizyty domowe. Sprawdź dojazd, warunki spotkań i odpowiedzi na pytania.',
    image: PRACTICE.images.gdansk,
    imageAlt: 'Jasne wnętrze gabinetu konsultacyjnego w centrum Gdyni',
    cta: 'Sprawdź dojazd i cennik',
  },
];

export const HomeDirectorySection: React.FC<HomeDirectorySectionProps> = ({
  onNavigate,
  onOpenBreathing,
}) => {
  return (
    <section id="przewodnik" className="relative bg-[#EFEAE1]/55 py-10 md:py-14">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        {/* Compact Header Row */}
        <div className="flex flex-col justify-between gap-4 pb-6 md:pb-8 lg:flex-row lg:items-end">
          <div className="max-w-[600px]">
            <Reveal>
              <p className="eyebrow mb-2.5">Przewodnik po praktyce</p>
            </Reveal>
            <h2 className="font-editorial text-[clamp(2rem,3.4vw,3.1rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#1D2220]">
              <MaskedLines
                lines={['Wszystko, czego potrzebujesz,', 'uporządkowane w spokoju.']}
                italicSubstring="w spokoju."
              />
            </h2>
          </div>

          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={onOpenBreathing}
              data-cursor="Oddech"
              className="group inline-flex items-center gap-3 rounded-full border border-[#1D2220]/14 bg-[#FAF8F4]/90 px-4 py-2 text-left transition-colors hover:border-[#2B423B]/50 hover:bg-[#FAF8F4]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2B423B]/10 text-[#2B423B]">
                <Wind className="h-3.5 w-3.5 stroke-[1.5]" />
              </span>
              <span>
                <span className="block text-[12px] font-medium text-[#1D2220]">
                  Chwila oddechu (4–4–6)
                </span>
                <span className="block text-[10.5px] font-light text-[#5D6560]">
                  30 sekund na wyciszenie i spokój
                </span>
              </span>
            </button>
          </Reveal>
        </div>

        {/* 3 Tight, Symmetrical Crawlable Editorial Chapter Portals */}
        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
          {CHAPTER_CARDS.map((card, idx) => (
            <motion.a
              key={card.page}
              href={ROUTES[card.page].hash}
              data-cursor="Otwórz"
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
              className="group flex flex-col justify-between overflow-hidden border border-[#1D2220]/11 bg-[#FAF8F4] text-left transition-[border-color,box-shadow] duration-500 hover:border-[#2B423B]/45 hover:shadow-[0_24px_52px_-32px_rgba(26,39,35,0.26)]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E5DDD1]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${card.imagePosition ?? 'object-center'}`}
                  />
                  <span className="font-editorial absolute left-3.5 top-3.5 rounded-full bg-[#1A2723]/82 px-3 py-0.5 text-sm italic text-[#F6F3EE] backdrop-blur-md">
                    {card.num}
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C5E3E]">
                    {card.eyebrow}
                  </p>
                  <h3 className="font-editorial mt-1.5 text-[25px] font-normal leading-[1.15] text-[#1D2220] transition-colors group-hover:text-[#2B423B]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] font-light leading-[1.72] text-[#4E5551]">
                    {card.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#1D2220]/10 px-5 py-3.5 text-[12.5px] font-medium text-[#2B423B] md:px-6">
                <SlotRollText label={card.cta} />
                <KineticArrow className="h-4 w-4" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Compact Verified Profiles & Trust Strip */}
        <Reveal delay={0.1} className="mt-5 md:mt-6">
          <div className="grid grid-cols-1 items-center gap-4 border border-[#1D2220]/11 bg-[#FAF8F4] px-5 py-4 shadow-[0_18px_44px_-32px_rgba(26,39,35,0.2)] md:px-6 lg:grid-cols-12">
            <div className="flex items-center gap-3.5 lg:col-span-5">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full border border-[#1D2220]/10 bg-[#F6F3EE]">
                <span className="font-editorial text-[22px] font-medium leading-none text-[#1D2220]">
                  {PRACTICE.googleProfile.rating.toFixed(1).replace('.', ',')}
                </span>
                <div className="mt-0.5 flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-2 w-2 fill-[#C4924A] text-[#C4924A]" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#1D2220]">
                  ZnanyLekarz · {PRACTICE.googleProfile.reviewCount} zweryfikowanych opinii
                </p>
                <p className="mt-0.5 text-[12px] font-light text-[#4E5551]">
                  „Nie ocenia, a wspiera. Czuję się bezpiecznie i mam odwagę do zmian.”
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[#1D2220]/10 py-3 text-[12px] font-light text-[#4E5551] lg:col-span-4 lg:border-x lg:border-y-0 lg:px-5 lg:py-0">
              <span className="inline-flex items-center gap-1.5 text-[#1D2220]">
                <MapPin className="h-3.5 w-3.5 text-[#2B423B]" />
                Gdynia (2 gabinety) · Online
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#2B423B]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Dyplomy zweryfikowane · PL / RU
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:col-span-3 lg:justify-end">
              <a
                href={ROUTES.gabinety.hash}
                onClick={(e) => handleRouteLinkClick(e, () => onNavigate('gabinety'))}
                className="group inline-flex items-center gap-1.5 rounded-full bg-[#2B423B] px-4 py-2 text-[12px] font-medium text-[#F6F3EE] transition-colors hover:bg-[#1A2723]"
              >
                <SlotRollText label="Mapa i cennik" />
                <KineticArrow className="h-3.5 w-3.5" />
              </a>
              <a
                href={PRACTICE.znanyLekarzUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Otwórz profil ZnanyLekarz w nowej karcie"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#1D2220]/14 px-3.5 py-2 text-[12px] text-[#4E5551] transition-colors hover:border-[#2B423B] hover:text-[#2B423B]"
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
