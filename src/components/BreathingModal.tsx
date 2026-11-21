import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenis } from './motion/LenisProvider';
import { EASE_EDITORIAL } from './motion/MotionPrimitives';

interface BreathingModalProps {
  open: boolean;
  onClose: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale';

// 4s inhale -> 4s hold -> 6s extended parasympathetic exhale (vagal tone activation)
const PHASES: { key: Phase; label: string; hint: string; seconds: number; scale: number }[] = [
  { key: 'inhale', label: 'Spokojny wdech', hint: 'Powoli przez nos', seconds: 4, scale: 1.38 },
  { key: 'hold', label: 'Zatrzymaj oddech', hint: 'Rozluźnij barki i szczękę', seconds: 4, scale: 1.38 },
  { key: 'exhale', label: 'Długi wydech', hint: 'Powoli wypuść powietrze', seconds: 6, scale: 0.88 },
];

interface BreathState {
  phaseIndex: number;
  secondsLeft: number;
  cycles: number;
}

export const BreathingModal: React.FC<BreathingModalProps> = ({ open, onClose }) => {
  const { lockScroll, unlockScroll } = useLenis();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  // Atomic single state object — StrictMode safe (no nested setState calls)
  const [state, setState] = useState<BreathState>({
    phaseIndex: 0,
    secondsLeft: PHASES[0].seconds,
    cycles: 0,
  });

  useEffect(() => {
    if (!open) return;

    prevFocusRef.current = document.activeElement as HTMLElement | null;
    lockScroll();
    setState({ phaseIndex: 0, secondsLeft: PHASES[0].seconds, cycles: 0 });
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 60);

    const interval = window.setInterval(() => {
      setState((prev) => {
        if (prev.secondsLeft > 1) {
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        }
        const nextIndex = (prev.phaseIndex + 1) % PHASES.length;
        return {
          phaseIndex: nextIndex,
          secondsLeft: PHASES[nextIndex].seconds,
          cycles: nextIndex === 0 ? prev.cycles + 1 : prev.cycles,
        };
      });
    }, 1000);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      unlockScroll();
      window.clearInterval(interval);
      window.removeEventListener('keydown', onKeyDown);
      prevFocusRef.current?.focus?.();
    };
  }, [open, onClose, lockScroll, unlockScroll]);

  const current = PHASES[state.phaseIndex];

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ćwiczenie oddechowe 4-4-6"
          data-dark-surface="true"
          className="fixed inset-0 z-[85] flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A2723]/88 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
            className="relative z-10 flex w-full max-w-[480px] flex-col items-center border border-[#F6F3EE]/12 bg-[#1F2F2A] px-8 py-12 text-center text-[#F6F3EE] shadow-2xl"
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Zamknij ćwiczenie oddechowe"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#F6F3EE]/15 text-[#F6F3EE]/70 transition-colors hover:border-[#C9A484] hover:text-[#F6F3EE]"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[10.5px] uppercase tracking-[0.24em] text-[#C9A484]">
              Chwila regulacji · Rytm 4–4–6
            </p>

            {/* Organic Breathing Concentric Rings starting cleanly from contracted 0.88 scale */}
            <div className="relative my-12 flex h-56 w-56 items-center justify-center">
              <motion.div
                initial={{ scale: 0.96, opacity: 0.14 }}
                animate={{
                  scale: current.scale * 1.12,
                  opacity: current.key === 'exhale' ? 0.14 : 0.28,
                }}
                transition={{
                  duration: current.seconds,
                  ease: 'easeInOut',
                }}
                className="absolute h-44 w-44 rounded-full bg-[#C9A484]/30 blur-xl"
              />
              <motion.div
                initial={{ scale: 0.88 }}
                animate={{ scale: current.scale }}
                transition={{
                  duration: current.seconds,
                  ease: 'easeInOut',
                }}
                className="absolute h-40 w-40 rounded-full border border-[#C9A484]/45 bg-[#2B423B]/55"
              />
              <motion.div
                initial={{ scale: 0.64 }}
                animate={{ scale: current.scale * 0.72 }}
                transition={{
                  duration: current.seconds,
                  ease: 'easeInOut',
                }}
                className="absolute h-40 w-40 rounded-full border border-[#F6F3EE]/20"
              />

              <div className="relative z-10 flex flex-col items-center">
                <span className="font-editorial text-5xl font-light tabular-nums text-[#F6F3EE]">
                  {state.secondsLeft}
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="space-y-1.5"
              >
                <h3 className="font-editorial text-3xl font-light text-[#F6F3EE]">
                  {current.label}
                </h3>
                <p className="text-[13px] font-light text-[#F6F3EE]/65">{current.hint}</p>
              </motion.div>
            </AnimatePresence>

            <p className="mt-9 text-[11.5px] font-light text-[#F6F3EE]/45">
              Wydłużony wydech stymuluje nerw błędny i obniża fizjologiczne napięcie.
              {state.cycles > 0 && ` · Ukończone cykle: ${state.cycles}`}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
