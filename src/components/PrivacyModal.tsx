import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import { useLenis } from './motion/LenisProvider';
import { EASE_EDITORIAL } from './motion/MotionPrimitives';

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ open, onClose }) => {
  const { lockScroll, unlockScroll } = useLenis();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    lockScroll();
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      unlockScroll();
      window.removeEventListener('keydown', onKey);
      prevFocusRef.current?.focus?.();
    };
  }, [open, onClose, lockScroll, unlockScroll]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Polityka prywatności i RODO"
          className="fixed inset-0 z-[90] flex items-center justify-center p-5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A2723]/60 backdrop-blur-sm"
          />
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
            className="relative z-10 max-h-[82vh] w-full max-w-[620px] overflow-y-auto overscroll-contain border border-[#1D2220]/12 bg-[#F6F3EE] p-8 text-[#1D2220] shadow-2xl sm:p-10"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#1D2220]/11 pb-5">
              <div>
                <p className="eyebrow">Informacja prawna</p>
                <h2 className="font-editorial mt-1.5 text-3xl font-normal">
                  Polityka prywatności i RODO
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Zamknij okno"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1D2220]/15 text-[#1D2220] hover:border-[#2B423B]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-[14px] font-light leading-[1.8] text-[#4E5551]">
              <p>
                <strong className="font-medium text-[#1D2220]">1. Administrator danych:</strong>{' '}
                Administratorem danych osobowych przekazywanych za pośrednictwem formularza
                kontaktowego jest {PRACTICE.fullName} — Prywatny Gabinet Psychologiczny (Gdynia ·
                ul. Chwarznieńska 136–138), kontakt: {PRACTICE.email}.
              </p>
              <p>
                <strong className="font-medium text-[#1D2220]">2. Cel przetwarzania:</strong> Dane
                (imię, numer telefonu, adres e-mail oraz dobrowolna treść wiadomości) przetwarzane są
                wyłącznie w celu odpowiedzi na zapytanie, umówienia terminu konsultacji oraz
                realizacji usług psychologicznych (art. 6 ust. 1 lit. a i b RODO).
              </p>
              <p>
                <strong className="font-medium text-[#1D2220]">3. Tajemnica zawodowa:</strong>{' '}
                Wszelkie informacje powierzane podczas kontaktu oraz spotkań terapeutycznych podlegają
                bezwzględnej tajemnicy zawodowej psychologa i nie są udostępniane podmiotom trzecim.
              </p>
              <p>
                <strong className="font-medium text-[#1D2220]">4. Prawa osoby:</strong> Masz prawo
                dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania
                w dowolnym momencie, pisząc na adres {PRACTICE.email}.
              </p>
            </div>

            <div className="mt-8 border-t border-[#1D2220]/11 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#2B423B] px-6 py-2.5 text-[13px] font-medium text-[#F6F3EE] hover:bg-[#1A2723]"
              >
                Rozumiem
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
