import React, { useEffect, useRef } from 'react';

/**
 * Lightweight GPU-friendly HTML5 Canvas ambient Baltic morning light field.
 * Automatically pauses RAF via IntersectionObserver when scrolled off-screen
 * and respects prefers-reduced-motion.
 */
export const AmbientLightCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let isInView = true;
    let width = 0;
    let height = 0;
    let mouseX = 0.65;
    let mouseY = 0.35;
    let targetX = 0.65;
    let targetY = 0.35;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onPointerMove = (e: PointerEvent) => {
      if (!isInView || width <= 0 || height <= 0) return;
      targetX = Math.max(0, Math.min(1, e.clientX / width));
      targetY = Math.max(0, Math.min(1, e.clientY / Math.max(height, window.innerHeight)));
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const startTime = performance.now();

    const draw = (now: number) => {
      if (!isInView || document.hidden) {
        rafId = 0;
        return;
      }

      const t = (now - startTime) * 0.00028;
      mouseX += (targetX - mouseX) * 0.025;
      mouseY += (targetY - mouseY) * 0.025;

      ctx.clearRect(0, 0, width, height);

      const blobs = [
        {
          x: width * (0.72 + Math.sin(t * 1.1) * 0.07 + (mouseX - 0.5) * 0.14),
          y: height * (0.28 + Math.cos(t * 0.9) * 0.08 + (mouseY - 0.5) * 0.1),
          r: Math.max(width, height) * 0.42,
          color0: 'rgba(169, 120, 86, 0.125)',
          color1: 'rgba(169, 120, 86, 0)',
        },
        {
          x: width * (0.24 + Math.cos(t * 0.8) * 0.08 - (mouseX - 0.5) * 0.08),
          y: height * (0.68 + Math.sin(t * 1.05) * 0.07 - (mouseY - 0.5) * 0.08),
          r: Math.max(width, height) * 0.46,
          color0: 'rgba(43, 66, 59, 0.075)',
          color1: 'rgba(43, 66, 59, 0)',
        },
        {
          x: width * (0.5 + Math.sin(t * 0.6 + 1.4) * 0.12 + (mouseX - 0.5) * 0.18),
          y: height * (0.45 + Math.cos(t * 0.75 + 0.8) * 0.09 + (mouseY - 0.5) * 0.14),
          r: Math.max(width, height) * 0.34,
          color0: 'rgba(216, 207, 194, 0.28)',
          color1: 'rgba(216, 207, 194, 0)',
        },
      ];

      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color0);
        grad.addColorStop(1, b.color1);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      rafId = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (!rafId && isInView && !document.hidden) {
        rafId = requestAnimationFrame(draw);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = Boolean(entry?.isIntersecting);
        if (isInView) {
          startLoop();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (!document.hidden) startLoop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    startLoop();

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
