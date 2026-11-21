import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Subtle Awwwards-style editorial contextual cursor.
 * Zero per-pixel React re-renders (state updates only when hover state actually changes).
 * Only active on fine-pointer desktop devices and respects prefers-reduced-motion.
 */
export const CustomCursor: React.FC<{ resetKey?: string }> = ({ resetKey }) => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const visibleRef = useRef(false);
  const labelRef = useRef<string | null>(null);
  const pointerRef = useRef(false);
  const darkRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.35 });

  // Clear stale contextual label & dark surface state whenever page switches
  useEffect(() => {
    labelRef.current = null;
    pointerRef.current = false;
    darkRef.current = false;
    setLabel(null);
    setIsPointer(false);
    setIsDark(false);
  }, [resetKey]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest<HTMLElement>('[data-cursor]');
      const interactiveEl = target?.closest<HTMLElement>(
        'a, button, [role="button"], input, textarea, select'
      );

      const nextLabel = cursorEl?.dataset.cursor || null;
      const nextPointer = Boolean(interactiveEl || cursorEl);
      const nextDark = Boolean(target?.closest('[data-dark-surface="true"]'));

      if (nextLabel !== labelRef.current) {
        labelRef.current = nextLabel;
        setLabel(nextLabel);
      }
      if (nextPointer !== pointerRef.current) {
        pointerRef.current = nextPointer;
        setIsPointer(nextPointer);
      }
      if (nextDark !== darkRef.current) {
        darkRef.current = nextDark;
        setIsDark(nextDark);
      }
    };

    const onLeave = () => {
      if (visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      }
    };

    const onEnter = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const hasLabel = Boolean(label);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden md:block"
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        animate={{
          width: hasLabel ? 80 : isPointer ? 34 : 16,
          height: hasLabel ? 80 : isPointer ? 34 : 16,
          backgroundColor: hasLabel
            ? isDark
              ? 'rgba(246, 243, 238, 0.96)'
              : 'rgba(43, 66, 59, 0.92)'
            : isPointer
              ? isDark
                ? 'rgba(201, 164, 132, 0.14)'
                : 'rgba(43, 66, 59, 0.08)'
              : 'rgba(29, 34, 32, 0.0)',
          borderColor: hasLabel
            ? 'rgba(43, 66, 59, 0)'
            : isPointer
              ? isDark
                ? 'rgba(201, 164, 132, 0.78)'
                : 'rgba(43, 66, 59, 0.45)'
              : isDark
                ? 'rgba(246, 243, 238, 0.48)'
                : 'rgba(29, 34, 32, 0.35)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border backdrop-blur-[2px]"
      >
        <AnimatePresence mode="wait">
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.84 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.86 }}
              transition={{ duration: 0.18 }}
              className={`px-2 text-center text-[9.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 ${
                isDark ? 'text-[#1A2723]' : 'text-[#F6F3EE]'
              }`}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
