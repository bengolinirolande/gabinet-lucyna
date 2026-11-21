import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ROUTES, type PageId } from '../types/navigation';
import {
  EASE_EDITORIAL,
  KineticArrow,
  MaskedLines,
  SlotRollText,
} from './motion/MotionPrimitives';

interface SubpageHeaderProps {
  chapter: string;
  eyebrow: string;
  lines: string[];
  italicSubstring: string;
  lead: string;
  ready?: boolean;
  onBackHome: () => void;
}

export const SubpageHeader: React.FC<SubpageHeaderProps> = ({
  chapter,
  eyebrow,
  lines,
  italicSubstring,
  lead,
  ready = true,
  onBackHome,
}) => {
  return (
    <section className="relative border-b border-[#1D2220]/9 bg-[#F6F3EE] pt-24 pb-8 md:pt-30 md:pb-12">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="mb-7 flex items-center justify-between gap-4 border-b border-[#1D2220]/10 pb-3.5">
          <button
            type="button"
            onClick={onBackHome}
            className="editorial-link text-[12px] font-medium text-[#4E5551] transition-colors hover:text-[#2B423B]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Powrót na stronę główną</span>
          </button>
          <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#8C5E3E]">
            Rozdział {chapter}
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.65, delay: 0.04, ease: EASE_EDITORIAL }}
              className="eyebrow mb-3.5"
            >
              {eyebrow}
            </motion.p>
            <h1 className="font-editorial text-[clamp(2.45rem,4.6vw,4.35rem)] font-light leading-[1.0] tracking-[-0.025em] text-[#1D2220]">
              <MaskedLines
                lines={lines}
                italicSubstring={italicSubstring}
                immediate
                ready={ready}
                delay={0.08}
              />
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.75, delay: 0.22, ease: EASE_EDITORIAL }}
              className="max-w-[460px] text-[15px] font-light leading-[1.8] text-[#4E5551] lg:ml-auto"
            >
              {lead}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface NextChapterBridgeProps {
  nextPage: PageId;
  teaser: string;
  tone?: 'light' | 'sand';
  onNavigate: (page: PageId) => void;
}

/**
 * Editorial "Next Chapter" closing bridge with surface-alternation support
 * and zero-re-render warm radial cursor spotlight sheen.
 */
export const NextChapterBridge: React.FC<NextChapterBridgeProps> = ({
  nextPage,
  teaser,
  tone = 'light',
  onNavigate,
}) => {
  const meta = ROUTES[nextPage];

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      className={`relative py-12 md:py-16 ${
        tone === 'sand' ? 'bg-[#EFEAE1]/55' : 'bg-[#F6F3EE]'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <button
          type="button"
          data-cursor="Dalej"
          onMouseMove={handleMouseMove}
          onClick={() => onNavigate(nextPage)}
          className="group relative flex w-full flex-col items-start justify-between gap-6 overflow-hidden border border-[#1D2220]/11 bg-[#FAF8F4] p-7 text-left transition-all duration-500 hover:border-[#2B423B]/45 hover:shadow-[0_24px_55px_-34px_rgba(26,39,35,0.24)] sm:flex-row sm:items-center md:p-9"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
            style={{
              background:
                'radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(201,164,132,0.14), transparent 65%)',
            }}
          />
          <div className="relative z-10">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#8C5E3E]">
              Następny rozdział · {meta.chapter}
            </p>
            <p className="font-editorial mt-1.5 text-3xl font-light text-[#1D2220] transition-colors group-hover:text-[#2B423B] md:text-[34px]">
              {meta.curtainTitle}
            </p>
            <p className="mt-1.5 text-[14px] font-light text-[#4E5551]">{teaser}</p>
          </div>
          <span className="relative z-10 inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#2B423B] px-6 py-3.5 text-[12.5px] font-medium text-[#F6F3EE] transition-colors group-hover:bg-[#1A2723]">
            <SlotRollText label="Przejdź dalej" italicHover />
            <KineticArrow className="h-4 w-4" />
          </span>
        </button>
      </div>
    </section>
  );
};
