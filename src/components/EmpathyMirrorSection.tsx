import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Wind } from 'lucide-react';
import { PRACTICE } from '../data/practice';
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
    offset: ['start 88%', 'center 48%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.36, 1]);
  const x = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, 0]);
  const barScaleY = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.15, 1]);

  return (
    <motion.article
      ref={rowRef}
      style={{ opacity, x }}
      className="group relative border-b border-[#1D2220]/11 py-9 first:border-t md:py-11"
    >
      <motion.span
        aria-hidden="true"
        style={{ scaleY: barScaleY, transformOrigin: 'top center' }}
        className="absolute left-0 top-9 bottom-9 hidden w-[2px] bg-[#8C5E3E]/75 sm:block md:top-11 md:bottom-11"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:pl-7">
        <div className="sm:col-span-2">
          <span className="font-editorial text-xl italic text-[#8C5E3E]">{index}</span>
        </div>
        <div className="space-y-3 sm:col-span-10">
          <h3 className="font-editorial text-[26px] font-normal leading-[1.2] tracking-[-0.01em] text-[#1D2220] md:text-[31px]">
            {lead}
          </h3>
          <p className="max-w-[540px] text-[15px] font-light leading-[1.78] text-[#4E5551]">
            {body}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export const EmpathyMirrorSection: React.FC<EmpathyMirrorSectionProps> = ({ onOpenBreathing }) => {
  return (
    <section
      id="czy-to-brzmi-znajomo"
      className="relative overflow-x-clip bg-[#EFEAE1]/55 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Compact Sticky Editorial Left Column (sized to fit comfortably on 768px+ laptops) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <p className="eyebrow mb-4">{PRACTICE.empathy.eyebrow}</p>
              </Reveal>

              <h2 className="font-editorial text-[clamp(2.2rem,3.6vw,3.35rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#1D2220]">
                <MaskedLines
                  lines={['Na zewnątrz wszystko', 'wygląda na poukładane.']}
                  italicSubstring="poukładane."
                />
              </h2>

              <Reveal delay={0.16}>
                <p className="mt-5 max-w-[430px] text-[15px] font-light leading-[1.8] text-[#4E5551]">
                  {PRACTICE.empathy.stickySub}
                </p>
              </Reveal>

              {/* Signature Design-Spell Trigger: Subtle 4-4-6 Grounding Breath */}
              <Reveal delay={0.24}>
                <button
                  type="button"
                  onClick={onOpenBreathing}
                  data-cursor="Oddech"
                  className="group mt-7 inline-flex items-center gap-3.5 rounded-full border border-[#1D2220]/15 bg-[#FAF8F4]/90 px-4 py-2.5 text-left transition-all duration-400 hover:border-[#2B423B]/50 hover:bg-[#FAF8F4]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2B423B]/10 text-[#2B423B] transition-transform duration-500 group-hover:scale-105">
                    <Wind className="h-3.5 w-3.5 stroke-[1.5]" />
                  </span>
                  <span>
                    <span className="block text-[12px] font-medium text-[#1D2220]">
                      Czujesz dziś napięcie? Zatrzymaj się na 30 sekund
                    </span>
                    <span className="block text-[11px] font-light text-[#5D6560]">
                      Ćwiczenie oddechowe 4–4–6 na uspokojenie układu nerwowego
                    </span>
                  </span>
                </button>
              </Reveal>

              {/* Properly Proportioned Portrait Architectural Still-Life (sized safely for 768px laptops) */}
              <div className="mt-6 hidden max-w-[180px] lg:block">
                <CurtainImage
                  src={PRACTICE.images.lightArchitecture}
                  alt="Światło poranne na ciepłym łuku tynku — symbol spokoju i przestrzeni"
                  aspectClass="aspect-[4/5]"
                  imgClassName="object-[50%_42%]"
                  className="rounded-[2px] shadow-[0_24px_55px_-30px_rgba(26,39,35,0.22)]"
                  parallaxStrength={12}
                  cursorLabel="Cisza"
                />
              </div>
            </div>
          </div>

          {/* Right Scroll-Illuminated Empathy Reflections */}
          <div className="lg:col-span-7">
            {PRACTICE.empathy.reflections.map((item) => (
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
