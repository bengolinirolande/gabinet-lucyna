import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Lenis from 'lenis';

interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  force?: boolean;
}

interface LenisContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: number | ScrollToOptions) => void;
  resetScrollTop: () => void;
  resize: () => void;
  lockScroll: () => void;
  unlockScroll: () => void;
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
  resetScrollTop: () => {},
  resize: () => {},
  lockScroll: () => {},
  unlockScroll: () => {},
});

export const useLenis = () => useContext(LenisContext);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const lockCountRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.22,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;
    if (lockCountRef.current > 0) lenis.stop();
    setReady(true);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.overflow = '';
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options: number | ScrollToOptions = -76) => {
      const opts: ScrollToOptions =
        typeof options === 'number' ? { offset: options } : options;
      const offset = opts.offset ?? -76;
      const immediate = opts.immediate ?? false;
      const force = opts.force ?? false;

      if (lenisRef.current) {
        lenisRef.current.resize();
        lenisRef.current.scrollTo(target, {
          offset,
          immediate,
          force,
          duration: immediate ? 0 : 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
      }

      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target + offset, behavior: immediate ? 'auto' : 'smooth' });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
      }
    },
    []
  );

  /**
   * Immediately resets BOTH Lenis's internal inertia state and native scroll position to 0,
   * and recalculates document bounds after route changes so anchor jumps never clamp short.
   */
  const resetScrollTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
      lenisRef.current.resize();
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const resize = useCallback(() => {
    lenisRef.current?.resize();
  }, []);

  const lockScroll = useCallback(() => {
    lockCountRef.current += 1;
    if (lockCountRef.current === 1) {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = 'hidden';
    }
  }, []);

  const unlockScroll = useCallback(() => {
    lockCountRef.current = Math.max(0, lockCountRef.current - 1);
    if (lockCountRef.current === 0) {
      lenisRef.current?.start();
      document.documentElement.style.overflow = '';
    }
  }, []);

  const value = useMemo(
    () => ({ scrollTo, resetScrollTop, resize, lockScroll, unlockScroll }),
    [scrollTo, resetScrollTop, resize, lockScroll, unlockScroll]
  );

  return (
    <LenisContext.Provider value={value}>
      <div data-smooth-ready={ready}>{children}</div>
    </LenisContext.Provider>
  );
};
