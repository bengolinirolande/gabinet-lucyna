import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PRACTICE } from '../data/practice';
import {
  CurtainImage,
  EASE_EDITORIAL,
  HairlineDivider,
  Reveal,
} from './motion/MotionPrimitives';

const QUOTE_ACCENT = 'poczuć prawdziwą ulgę w codziennym funkcjonowaniu.';

export const PhilosophyInterlude: React.FC = () => {
  const reduced = useReducedMotion();
  const [quoteLead, quoteTail] = PRACTICE.philosophy.quote.split(QUOTE_ACCENT);

  return (
    <section
      data-dark-surface="true"
      aria-labelledby="philosophy-heading"
      className="relative overflow-hidden bg-[#1A2723] py-14 text-[#F6F3EE] md:py-18"
    >
      <h2 id="philosophy-heading" className="sr-only">
        Filozofia pracy terapeutycznej
      </h2>

      {/* Delicate ambient sage glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(201,164,132,0.09)_0%,rgba(26,39,35,0)_70%)]"
      />

      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Quote Block with Crisp Upward Clip-Mask Unveil */}
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C9A484]">
                {PRACTICE.philosophy.eyebrow}
              </p>
            </Reveal>

            <motion.blockquote
              initial={
                reduced
                  ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 }
                  : { clipPath: 'inset(12% 0% 0% 0%)', opacity: 0.01, y: 18 }
              }
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduced ? 0.01 : 0.96, delay: reduced ? 0 : 0.08, ease: EASE_EDITORIAL }}
              className="font-editorial mt-8 text-[clamp(1.9rem,3.4vw,3.35rem)] font-light leading-[1.22] tracking-[-0.015em] text-[#F6F3EE]"
            >
              {quoteTail !== undefined ? (
                <>
                  {quoteLead}
                  <em className="italic font-normal text-[#C9A484]">{QUOTE_ACCENT}</em>
                  {quoteTail}
                </>
              ) : (
                PRACTICE.philosophy.quote
              )}
            </motion.blockquote>

            <Reveal delay={0.22}>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#C9A484]/70" />
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#F6F3EE]/68">
                  {PRACTICE.philosophy.author}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Poetic Calm Still-Life Image (3:4 native ratio preserved!) */}
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-[340px] lg:ml-auto lg:mr-0">
              <CurtainImage
                src={PRACTICE.images.stillLife}
                alt="Spokojne poranne światło na tynku i gałązka eukaliptusa w gabinecie"
                aspectClass="aspect-[3/4]"
                className="rounded-[2px] bg-[#253630]"
                parallaxStrength={20}
                cursorLabel="Spokój"
              />
            </div>
          </div>
        </div>

        <HairlineDivider light className="my-12 md:my-14" />

        {/* 4 Clinical Pillars with Subtle Warm Amber Top Accent on Hover */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PRACTICE.philosophy.pillars.map((pillar, idx) => (
            <Reveal
              key={pillar.title}
              delay={idx * 0.08}
              className="group space-y-3.5 border-t border-[#F6F3EE]/10 pt-6 transition-colors duration-500 hover:border-[#C9A484]/60"
            >
              <span className="font-editorial text-lg italic text-[#C9A484]">0{idx + 1}</span>
              <h3 className="font-editorial text-[24px] font-normal leading-snug text-[#F6F3EE]">
                {pillar.title}
              </h3>
              <p className="text-[14px] font-light leading-[1.78] text-[#F6F3EE]/70">
                {pillar.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
