import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ROUTES, type PageId } from '../../types/navigation';

interface PageTransitionCurtainProps {
  active: boolean;
  targetPage: PageId;
}

const EASE_CURTAIN_IN = [0.76, 0, 0.24, 1] as const;
const EASE_CURTAIN_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Signature Awwwards / Barba.js-style full-screen editorial curtain transition.
 * Blocks accidental click-through while covering, displays the chapter title,
 * and lifts cleanly upward to relay into the new page's masked headline reveal.
 */
export const PageTransitionCurtain: React.FC<PageTransitionCurtainProps> = ({
  active,
  targetPage,
}) => {
  const reduced = useReducedMotion();
  const meta = ROUTES[targetPage];

  if (reduced) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="awwwards-page-curtain"
          aria-hidden="true"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: { duration: 0.44, ease: EASE_CURTAIN_IN },
          }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            pointerEvents: 'none',
            transition: { duration: 0.52, ease: EASE_CURTAIN_OUT },
          }}
          className="pointer-events-auto fixed inset-0 z-[96] flex flex-col items-center justify-center bg-[#1A2723] px-6 text-center text-[#F6F3EE]"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, delay: 0.08 }}
            className="text-[10px] uppercase tracking-[0.28em] text-[#C9A484]"
          >
            Rozdział {meta.chapter} · {meta.curtainSubtitle}
          </motion.span>

          <div className="mt-3 overflow-hidden">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.38, delay: 0.05, ease: EASE_CURTAIN_OUT }}
              className="font-editorial text-4xl font-light italic tracking-tight sm:text-5xl md:text-6xl"
            >
              {meta.curtainTitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: EASE_CURTAIN_OUT }}
            style={{ transformOrigin: 'center center' }}
            className="mt-6 h-px w-28 bg-[#C9A484]/70"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
