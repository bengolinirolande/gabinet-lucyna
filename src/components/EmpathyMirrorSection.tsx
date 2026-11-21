import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Wind } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import {
  CurtainImage,
  MaskedLines,
  Reveal,
} from './motion/MotionPrimitives';

interface EmpathyMirrorSectionProps {
  onOpenBreathing: () => void;
}

const ReflectionRow: React.FC<{
  index: string;
  lead: string;
  body: string;
}> = ({ index, lead, body }) => {
  const rowRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 95%', 'start 62%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.7, 1]);
  const x = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [10, 0]);
  const barScaleY = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.25, 1]);

  return (
    <motion.article
      ref={rowRef}
      style={{ opacity, x }}
      className="group relative border-b border-[var(--border-subtle)] py-7 first:border-t md:py-8"
    >
      <motion.span
        aria-hidden="true"
        style={{ scaleY: barScaleY, transformOrigin: 'top center' }}
        className="absolute left-0 top-7 bottom-7 hidden w-[2px] bg-[var(--accent-amber)] opacity-75 sm:block md:top-8 md:bottom-8"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:pl-7">
        <div className="sm:col-span-2">
          <span className="font-editorial text-xl italic text-[var(--accent-amber)]">{index}</span>
        </div>
        <div className="space-y-3 sm:col-span-10">
          <h3 className="font-editorial text-[26px] font-normal leading-[1.2] tracking-[-0.01em] text-[var(--text-ink)] md:text-[31px]">
            {lead}
          </h3>
          <p className="max-w-[540px] text-[15px] font-light leading-[1.78] text-[var(--text-secondary)]">
            {body}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export const EmpathyMirrorSection: React.FC<EmpathyMirrorSectionProps> = ({ onOpenBreathing }) => {
  const { practice, ui } = usePreferences();

  return (
    <section
      id="czy-to-brzmi-znajomo"
      className="relative overflow-x-clip bg-[var(--bg-surface-soft)] py-14 md:py-18"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Compact Sticky Editorial Left Column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <p className="eyebrow mb-4">{practice.empathy.eyebrow}</p>
              </Reveal>

              <h2 className="font-editorial text-[clamp(2.2rem,3.6vw,3.35rem)] font-light leading-[1.06] tracking-[-0.02em] text-[var(--text-ink)]">
                <MaskedLines
                  lines={ui.empathy.lines}
                  italicSubstring={ui.empathy.italicSubstring}
                />
              </h2>

              <Reveal delay={0.16}>
                <p className="mt-5 max-w-[430px] text-[15px] font-light leading-[1.8] text-[var(--text-secondary)]">
                  {practice.empathy.stickySub}
                </p>
              </Reveal>

              {/* Subtle 4-4-6 Grounding Breath Trigger */}
              <Reveal delay={0.24}>
                <button
                  type="button"
                  onClick={onOpenBreathing}
                  data-cursor={ui.cursors.breath}
                  className="group mt-7 inline-flex items-center gap-3.5 rounded-full border border-[var(--border-medium)] bg-[var(--bg-paper-elevated)] px-4 py-2.5 text-left transition-all duration-400 hover:border-[var(--border-accent)] hover:bg-[var(--bg-paper)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent-emphasis)] transition-transform duration-500 group-hover:scale-105">
                    <Wind className="h-3.5 w-3.5 stroke-[1.5]" />
                  </span>
                  <span>
                    <span className="block text-[12px] font-medium text-[var(--text-ink)]">
                      {ui.empathy.breathBtnTitle}
                    </span>
                    <span className="block text-[11px] font-light text-[var(--text-muted)]">
                      {ui.empathy.breathBtnSub}
                    </span>
                  </span>
                </button>
              </Reveal>

              <div className="mt-6 hidden max-w-[180px] lg:block">
                <CurtainImage
                  src={practice.images.lightArchitecture}
                  alt={ui.empathy.archAlt}
                  aspectClass="aspect-[4/5]"
                  imgClassName="object-[50%_42%]"
                  className="rounded-[2px] shadow-[var(--shadow-card)]"
                  parallaxStrength={12}
                  cursorLabel={ui.cursors.silence}
                />
              </div>
            </div>
          </div>

          {/* Right Scroll-Illuminated Empathy Reflections */}
          <div className="lg:col-span-7">
            {practice.empathy.reflections.map((item) => (
              <ReflectionRow
                key={item.index}
                index={item.index}
                lead={item.lead}
                body={item.body}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
