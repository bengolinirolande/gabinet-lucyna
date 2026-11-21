import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { useLenis } from './motion/LenisProvider';
import { EASE_EDITORIAL } from './motion/MotionPrimitives';

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ open, onClose }) => {
  const { ui } = usePreferences();
  const p = ui.privacy;
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
          aria-label={p.dialogAria}
          className="fixed inset-0 z-[90] flex items-center justify-center p-5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ backgroundColor: 'var(--backdrop-scrim)' }}
            className="absolute inset-0 backdrop-blur-sm"
          />
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
            className="relative z-10 max-h-[82vh] w-full max-w-[620px] overflow-y-auto overscroll-contain border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-8 text-[var(--text-ink)] shadow-2xl sm:p-10"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
              <div>
                <p className="eyebrow">{p.eyebrow}</p>
                <h2 className="font-editorial mt-1.5 text-3xl font-normal">{p.title}</h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label={p.closeAria}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-medium)] text-[var(--text-ink)] hover:border-[var(--border-accent)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-[14px] font-light leading-[1.8] text-[var(--text-secondary)]">
              {p.sections.map((sec) => (
                <p key={sec.heading}>
                  <strong className="font-medium text-[var(--text-ink)]">{sec.heading}</strong>{' '}
                  {sec.body}
                </p>
              ))}
            </div>

            <div className="mt-8 border-t border-[var(--border-subtle)] pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[var(--btn-primary-bg)] px-6 py-2.5 text-[13px] font-medium text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
              >
                {p.confirmBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
