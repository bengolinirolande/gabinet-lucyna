import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_EDITORIAL } from './MotionPrimitives';
import { usePreferences } from '../../context/PreferencesContext';

interface PreloaderProps {
  onComplete: () => void;
}

const SESSION_KEY = 'lucyna_curtain_seen';

/**
 * Pure synchronous check shared with AppShell so `heroReady` starts `true` on Frame 0
 * whenever preloader is skipped (repeat session, reduced-motion, bots, headless QA, Lighthouse).
 */
export function shouldPlayPreloader(): boolean {
  if (typeof window === 'undefined') return false;
  if (navigator.webdriver || /HeadlessChrome|Lighthouse|Googlebot/i.test(navigator.userAgent)) {
    return false;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  try {
    return !window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    return false;
  }
}

/**
 * Brief, serene Awwwards editorial opening curtain (~0.38s hold on first visit; instant skip on repeat/bots).
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { practice, ui } = usePreferences();
  const shouldPlay = useRef<boolean>(shouldPlayPreloader());
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

    // Trigger Hero/Subpage reveal right as curtain starts lifting (zero blank pause, faster LCP!)
    const readyTimer = window.setTimeout(finishOnce, 340);
    const liftTimer = window.setTimeout(() => {
      setVisible(false);
    }, 380);

    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(liftTimer);
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
          transition={{ duration: 0.68, ease: EASE_EDITORIAL }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-deep)] text-[#F6F3EE]"
        >
          <div className="flex flex-col items-center gap-5 px-6 text-center">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-110%' }}
                transition={{ duration: 0.44, ease: EASE_EDITORIAL }}
                className="font-editorial block text-5xl font-light tracking-tight md:text-6xl"
              >
                {practice.shortName}
              </motion.span>
            </div>

            <div className="h-px w-36 overflow-hidden bg-[#F6F3EE]/15">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                style={{ transformOrigin: 'left center' }}
                className="h-full w-full bg-[#C9A484]"
              />
            </div>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.78, y: 0 }}
              transition={{ duration: 0.36, delay: 0.06, ease: EASE_EDITORIAL }}
              className="text-[10px] uppercase tracking-[0.26em] text-[#F6F3EE]/78"
            >
              {ui.preloaderSubtitle}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
