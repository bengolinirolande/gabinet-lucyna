import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { handleRouteLinkClick, type PageId } from '../types/navigation';
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
  const { ui, routes } = usePreferences();

  return (
    <section className="relative border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] pt-22 pb-7 md:pt-26 md:pb-10">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-3">
          <a
            href={routes.home.hash}
            onClick={(e) => handleRouteLinkClick(e, onBackHome)}
            className="editorial-link text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-emphasis)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{ui.subpages.backHome}</span>
          </a>
          <span className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-amber)]">
            {ui.chapterLabel} {chapter}
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.65, delay: 0.04, ease: EASE_EDITORIAL }}
              className="eyebrow mb-3"
            >
              {eyebrow}
            </motion.p>
            <h1 className="font-editorial text-[clamp(2.35rem,4.4vw,4.15rem)] font-light leading-[1.01] tracking-[-0.025em] text-[var(--text-ink)]">
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
              transition={{ duration: 0.72, delay: 0.18, ease: EASE_EDITORIAL }}
              className="max-w-[460px] text-[15px] font-light leading-[1.78] text-[var(--text-secondary)] lg:ml-auto"
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

export const NextChapterBridge: React.FC<NextChapterBridgeProps> = ({
  nextPage,
  teaser,
  tone = 'light',
  onNavigate,
}) => {
  const { ui, routes } = usePreferences();
  const meta = routes[nextPage];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      className={`relative py-10 md:py-14 ${
        tone === 'sand' ? 'bg-[var(--bg-surface-soft)]' : 'bg-[var(--bg-canvas)]'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <a
          href={meta.hash}
          data-cursor={ui.cursors.next}
          onMouseMove={handleMouseMove}
          onClick={(e) => handleRouteLinkClick(e, () => onNavigate(nextPage))}
          className="group relative flex w-full flex-col items-start justify-between gap-6 overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-paper)] p-6 text-left transition-all duration-500 hover:border-[var(--border-accent)] hover:shadow-[var(--shadow-card)] sm:flex-row sm:items-center md:p-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
            style={{
              background:
                'radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), var(--spotlight-glow), transparent 65%)',
            }}
          />
          <div className="relative z-10">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-amber)]">
              {ui.subpages.nextChapterPrefix} · {meta.chapter}
            </p>
            <p className="font-editorial mt-1.5 text-3xl font-light text-[var(--text-ink)] transition-colors group-hover:text-[var(--accent-emphasis)] md:text-[34px]">
              {meta.curtainTitle}
            </p>
            <p className="mt-1.5 text-[14px] font-light text-[var(--text-secondary)]">{teaser}</p>
          </div>
          <span className="relative z-10 inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[var(--btn-primary-bg)] px-6 py-3.5 text-[12.5px] font-medium text-[var(--btn-primary-text)] transition-colors group-hover:bg-[var(--btn-primary-hover)]">
            <SlotRollText label={ui.subpages.nextChapterCta} italicHover />
            <KineticArrow className="h-4 w-4" />
          </span>
        </a>
      </div>
    </section>
  );
};
