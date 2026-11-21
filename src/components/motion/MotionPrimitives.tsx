import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type HTMLMotionProps,
} from 'framer-motion';

// Signature Awwwards editorial expo-out curve (calm deceleration, zero bounce)
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

interface MaskedLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  italicSubstring?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  ready?: boolean;
}

/**
 * Editorial split-line clip-mask reveal with subtle Locomotive-style organic tilt settle.
 */
export const MaskedLines: React.FC<MaskedLinesProps> = ({
  lines,
  className = '',
  lineClassName = '',
  italicSubstring,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  ready = true,
}) => {
  const reduced = useReducedMotion();

  return (
    <span className={`block ${className}`}>
      {lines.map((line, idx) => {
        const hasItalic = italicSubstring && line.includes(italicSubstring);
        const content = hasItalic ? (
          <>
            {line.split(italicSubstring)[0]}
            <em className="italic font-normal text-[#2B423B]">{italicSubstring}</em>
            {line.split(italicSubstring)[1]}
          </>
        ) : (
          line
        );

        return (
          <span key={idx} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.span
              className={`block origin-bottom-left ${lineClassName}`}
              initial={
                reduced
                  ? { opacity: 1, y: 0, rotate: 0 }
                  : { y: '112%', rotate: 1.8, opacity: 0.01 }
              }
              {...(immediate
                ? {
                    animate:
                      ready || reduced
                        ? { y: '0%', rotate: 0, opacity: 1 }
                        : { y: '112%', rotate: 1.8, opacity: 0.01 },
                  }
                : {
                    whileInView: { y: '0%', rotate: 0, opacity: 1 },
                    viewport: { once: true, amount: 0.3 },
                  })}
              transition={{
                duration: reduced ? 0.01 : 0.96,
                delay: reduced ? 0 : delay + idx * stagger,
                ease: EASE_EDITORIAL,
              }}
            >
              {content}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

interface SlotRollTextProps {
  label: string;
  hoverLabel?: string;
  className?: string;
  italicHover?: boolean;
}

/**
 * Design Spells / FWA luxury slot-roll text micro-interaction.
 */
export const SlotRollText: React.FC<SlotRollTextProps> = ({
  label,
  hoverLabel,
  className = '',
  italicHover = false,
}) => {
  return (
    <span className={`relative inline-block overflow-hidden align-top leading-[1.2] ${className}`}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[115%]">
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full ${
          italicHover ? 'font-editorial italic text-[1.12em] leading-[1.05]' : ''
        }`}
      >
        {hoverLabel ?? label}
      </span>
    </span>
  );
};

/**
 * Cohesive FWA / Design Spells dual-arrow clip-mask launch & return swap.
 */
export const KineticArrow: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <span
    aria-hidden="true"
    className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden ${className}`}
  >
    <ArrowUpRight className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[120%] group-hover:translate-x-[120%]" />
    <ArrowUpRight className="absolute h-full w-full -translate-x-[120%] translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
  </span>
);

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
  children: React.ReactNode;
}

export const Reveal: React.FC<RevealProps> = ({
  delay = 0,
  y = 24,
  children,
  className = '',
  ...rest
}) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduced ? 0.01 : 0.82,
        delay: reduced ? 0 : delay,
        ease: EASE_EDITORIAL,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface HairlineDividerProps {
  className?: string;
  delay?: number;
  light?: boolean;
}

export const HairlineDivider: React.FC<HairlineDividerProps> = ({
  className = '',
  delay = 0,
  light = false,
}) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: reduced ? 0.01 : 1.0,
        delay: reduced ? 0 : delay,
        ease: EASE_EDITORIAL,
      }}
      style={{ transformOrigin: 'left center' }}
      className={`h-px w-full ${light ? 'bg-[#F6F3EE]/16' : 'bg-[#1D2220]/12'} ${className}`}
    />
  );
};

interface CurtainImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  parallaxStrength?: number;
  immediate?: boolean;
  ready?: boolean;
  delay?: number;
  cursorLabel?: string;
  priority?: boolean;
}

/**
 * Awwwards-signature image frame:
 * Always mounts <img> immediately (zero LCP delay), animates clip-path curtain unveil,
 * de-zoom settle, and scroll-linked GPU parallax.
 */
export const CurtainImage: React.FC<CurtainImageProps> = ({
  src,
  alt,
  aspectClass = 'aspect-[4/5]',
  className = '',
  imgClassName = '',
  parallaxStrength = 24,
  immediate = false,
  ready = true,
  delay = 0,
  cursorLabel,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const effectiveParallax = reduced ? 0 : parallaxStrength;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25,
  });

  const y = useTransform(smoothProgress, [0, 1], [-effectiveParallax, effectiveParallax]);

  return (
    <motion.div
      ref={containerRef}
      data-cursor={cursorLabel}
      initial={
        reduced
          ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
          : { clipPath: 'inset(14% 0% 0% 0%)', opacity: 0.01 }
      }
      {...(immediate
        ? {
            animate:
              ready || reduced
                ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                : { clipPath: 'inset(14% 0% 0% 0%)', opacity: 0.01 },
          }
        : {
            whileInView: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
            viewport: { once: true, amount: 0.18 },
          })}
      transition={{
        duration: reduced ? 0.01 : 1.05,
        delay: reduced ? 0 : delay,
        ease: EASE_EDITORIAL,
      }}
      className={`group/img relative overflow-hidden bg-[#E7E0D5] ${aspectClass} ${className}`}
    >
      <motion.div
        style={{ y }}
        className={reduced ? 'h-full w-full' : 'h-[114%] w-full -mt-[7%]'}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          initial={reduced ? { scale: 1 } : { scale: 1.12 }}
          {...(immediate
            ? { animate: ready || reduced ? { scale: 1 } : { scale: 1.12 } }
            : {
                whileInView: { scale: 1 },
                viewport: { once: true, amount: 0.18 },
              })}
          transition={{
            duration: reduced ? 0.01 : 1.3,
            delay: reduced ? 0 : delay,
            ease: EASE_EDITORIAL,
          }}
          className={`h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-[1.035] ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  cursorLabel?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  strength = 0.22,
  cursorLabel = 'Umów',
  type = 'button',
  ariaLabel,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.35 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    rawX.set(offsetX * strength);
    rawY.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      data-cursor={cursorLabel}
      style={reduced ? undefined : { x, y }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const RibbonTrack: React.FC<{ items: string[]; dark: boolean }> = ({ items, dark }) => (
  <div className="flex shrink-0 items-center gap-10 pr-10">
    {items.map((item, i) => (
      <React.Fragment key={`${item}-${i}`}>
        <span
          className={`font-editorial whitespace-nowrap text-[24px] font-light tracking-[-0.01em] md:text-[32px] ${
            dark ? 'text-[#F6F3EE]/80' : 'text-[#1D2220]/75'
          }`}
        >
          {i % 2 === 1 ? (
            <em className={`italic ${dark ? 'text-[#C9A484]' : 'text-[#8C5E3E]'}`}>{item}</em>
          ) : (
            item
          )}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 14 14"
          className={`h-3 w-3 shrink-0 ${dark ? 'text-[#C9A484]/55' : 'text-[#2B423B]/40'}`}
          fill="currentColor"
        >
          <path d="M7 0L8.6 5.4L14 7L8.6 8.6L7 14L5.4 8.6L0 7L5.4 5.4L7 0Z" />
        </svg>
      </React.Fragment>
    ))}
  </div>
);

/**
 * Meditative, slow-drifting kinetic editorial ribbon (~52s/loop, ~48px/s).
 * Unidirectional calm ocean-tide flow (gently boosts on down-scroll, slows softly on up-scroll —
 * never jolts or latches backwards), mouse-only hover deceleration, pauses off-screen.
 */
export const VelocityRibbon: React.FC<{
  items: string[];
  baseSpeed?: number;
  dark?: boolean;
}> = ({ items, baseSpeed = -0.95, dark = false }) => {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ribbonRef, { margin: '120px 0px' });
  const reduced = useReducedMotion();
  const hoveredRef = useRef<boolean>(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 72,
    stiffness: 200,
  });

  // Gentle unidirectional speed modulation: accelerates slightly scrolling down, breathes slower scrolling up
  const scrollBoost = useTransform(smoothVelocity, [-2400, 0, 2400], [-0.55, 0, 0.85], {
    clamp: true,
  });
  const skewX = useTransform(smoothVelocity, [-2400, 0, 2400], [-1.3, 0, 1.3], {
    clamp: true,
  });

  const speedScaleRef = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return;

    const dt = Math.min(delta, 40) / 1000;
    const boost = scrollBoost.get();

    const targetScale = hoveredRef.current ? 0.2 : 1;
    const alpha = 1 - Math.exp(-5.5 * dt);
    speedScaleRef.current += (targetScale - speedScaleRef.current) * alpha;

    const moveBy = baseSpeed * speedScaleRef.current * (1 + boost) * dt;

    let next = baseX.get() + moveBy;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div
      ref={ribbonRef}
      aria-hidden="true"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') hoveredRef.current = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') hoveredRef.current = false;
      }}
      className={`overflow-hidden border-y py-3.5 select-none ${
        dark
          ? 'border-[#F6F3EE]/12 bg-[#16211D]'
          : 'border-[#1D2220]/10 bg-[#FAF8F4]/75'
      }`}
    >
      <motion.div
        style={reduced ? undefined : { x, skewX }}
        className="flex w-max will-change-transform"
      >
        <RibbonTrack items={items} dark={dark} />
        <RibbonTrack items={items} dark={dark} />
      </motion.div>
    </div>
  );
};

/**
 * Hand-crafted minimalist botanical branch SVG that draws itself gracefully on scroll.
 */
export const BotanicalDrawSvg: React.FC<{
  className?: string;
  light?: boolean;
}> = ({ className = '', light = false }) => {
  const reduced = useReducedMotion();
  const stroke = light ? 'rgba(201, 164, 132, 0.5)' : 'rgba(43, 66, 59, 0.34)';

  return (
    <svg aria-hidden="true" viewBox="0 0 180 220" fill="none" className={className}>
      <motion.path
        d="M28 206 C 54 152, 86 98, 146 22"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.01 : 1.5, ease: EASE_EDITORIAL }}
      />
      {[
        { d: 'M58 148 C 36 138, 28 118, 44 106 C 58 114, 62 132, 58 148 Z', delay: 0.35 },
        { d: 'M72 128 C 96 128, 114 114, 110 96 C 92 98, 78 112, 72 128 Z', delay: 0.5 },
        { d: 'M92 96 C 72 82, 68 62, 84 50 C 98 60, 100 78, 92 96 Z', delay: 0.65 },
        { d: 'M112 68 C 134 70, 152 58, 150 42 C 132 42, 118 54, 112 68 Z', delay: 0.8 },
        { d: 'M132 42 C 122 26, 126 12, 142 8 C 148 20, 142 34, 132 42 Z', delay: 0.95 },
      ].map((leaf, i) => (
        <motion.path
          key={i}
          d={leaf.d}
          stroke={stroke}
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduced ? 0.01 : 1.0,
            delay: reduced ? 0 : leaf.delay,
            ease: EASE_EDITORIAL,
          }}
        />
      ))}
    </svg>
  );
};
