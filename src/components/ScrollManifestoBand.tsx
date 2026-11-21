import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const MANIFESTO_TEXT =
  'Terapia nie polega na tym, by stać się kimś innym. Polega na tym, by w bezpiecznej relacji odzyskać spokój, jasność i kontakt z samym sobą.';

const ScrubbedWord: React.FC<{
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  highlight: boolean;
  reduced: boolean;
}> = ({ word, range, progress, highlight, reduced }) => {
  const opacity = useTransform(progress, range, reduced ? [1, 1] : [0.16, 1]);
  const y = useTransform(progress, range, reduced ? [0, 0] : [6, 0]);

  return (
    <span className="relative mr-[0.26em] inline-block">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block ${highlight ? 'italic text-[#2B423B]' : 'text-[#1D2220]'}`}
      >
        {word}
      </motion.span>
    </span>
  );
};

export const ScrollManifestoBand: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 82%', 'end 42%'],
  });

  const words = MANIFESTO_TEXT.split(' ');
  const highlightWords = new Set(['bezpiecznej', 'relacji', 'spokój,', 'jasność', 'sobą.']);
  const flankingScale = useTransform(scrollYProgress, [0.62, 0.98], reduced ? [1, 1] : [0.15, 1]);

  return (
    <section
      ref={containerRef}
      aria-label="Manifest terapeutyczny"
      className="relative overflow-hidden bg-[#F6F3EE] py-16 md:py-24"
    >
      <motion.div
        aria-hidden="true"
        animate={
          reduced
            ? undefined
            : {
              scale: [1, 1.08, 1],
              x: [0, 24, 0],
              opacity: [0.45, 0.7, 0.45],
            }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(169,120,86,0.11)_0%,rgba(43,66,59,0.05)_45%,rgba(246,243,238,0)_74%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1140px] px-6 text-center md:px-10">
        <p className="eyebrow mb-9">Sedno spotkania</p>

        <p className="font-editorial text-[clamp(2rem,4.3vw,4.15rem)] font-light leading-[1.16] tracking-[-0.02em]">
          {words.map((word, idx) => {
            const start = idx / words.length;
            const end = Math.min(1, start + 1 / words.length + 0.08);
            return (
              <ScrubbedWord
                key={`${word}-${idx}`}
                word={word}
                range={[start * 0.88, Math.min(1, end * 0.94)]}
                progress={scrollYProgress}
                highlight={highlightWords.has(word)}
                reduced={reduced}
              />
            );
          })}
        </p>

        <div className="mt-14 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.24em] text-[#5D6560]">
          <motion.span
            style={{ scaleX: flankingScale, transformOrigin: 'right center' }}
            className="h-px w-12 bg-[#1D2220]/25"
          />
          <span>Gdańsk · Sopot · Gdynia · Online</span>
          <motion.span
            style={{ scaleX: flankingScale, transformOrigin: 'left center' }}
            className="h-px w-12 bg-[#1D2220]/25"
          />
        </div>
      </div>
    </section>
  );
};
