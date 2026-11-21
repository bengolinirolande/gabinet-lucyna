import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_EDITORIAL } from './MotionPrimitives';
import { PRACTICE } from '../../data/practice';

interface PreloaderProps {
  onComplete: () => void;
}

const SESSION_KEY = 'lucyna_curtain_seen';

/**
 * Brief, serene Awwwards editorial opening curtain (~0.62s on first visit; instant skip on repeat).
 * Uses a single mount effect so timers never self-cancel when curtain begins lifting.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const shouldPlay = useRef<boolean>(
    typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      (() => {
        try {
          return !window.sessionStorage.getItem(SESSION_KEY);
        } catch {
          return true;
        }
      })()
  );

  const [visible, setVisible] = useState<boolean>(shouldPlay.current);
  const completedRef = useRef(false);

  useEffect(() => {
    const finishOnce = () => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    };

    if (!shouldPlay.current) {
      finishOnce();
      return;
    }

    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable
    }

    const liftTimer = window.setTimeout(() => {
      setVisible(false);
    }, 600);

    // Overlap Hero / SubpageHeader masked entrance smoothly right as curtain lifts
    const readyTimer = window.setTimeout(finishOnce, 680);

    return () => {
      window.clearTimeout(liftTimer);
      window.clearTimeout(readyTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="editorial-preloader"
          aria-hidden="true"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', pointerEvents: 'none' }}
          transition={{ duration: 0.74, ease: EASE_EDITORIAL }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1A2723] text-[#F6F3EE]"
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-110%' }}
                transition={{ duration: 0.56, ease: EASE_EDITORIAL }}
                className="font-editorial block text-5xl font-light tracking-tight md:text-6xl"
              >
                {PRACTICE.shortName}
              </motion.span>
            </div>

            <div className="h-px w-36 overflow-hidden bg-[#F6F3EE]/15">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.58, ease: EASE_EDITORIAL }}
                style={{ transformOrigin: 'left center' }}
                className="h-full w-full bg-[#C9A484]"
              />
            </div>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.48, delay: 0.1, ease: EASE_EDITORIAL }}
              className="text-[10px] uppercase tracking-[0.26em] text-[#F6F3EE]/75"
            >
              Psycholog · Gdańsk · Gdynia · Online
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
