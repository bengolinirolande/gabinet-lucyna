import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { PRACTICE, type CredentialGroup } from '../data/practice';
import {
  CurtainImage,
  EASE_EDITORIAL,
  HairlineDivider,
  MaskedLines,
  Reveal,
} from './motion/MotionPrimitives';

interface AboutSectionProps {
  compactHeader?: boolean;
  ready?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  compactHeader = false,
  ready = true,
}) => {
  const [activeTab, setActiveTab] = useState<CredentialGroup['id']>('education');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentGroup =
    PRACTICE.about.credentials.find((c) => c.id === activeTab) ?? PRACTICE.about.credentials[0];

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const count = PRACTICE.about.credentials.length;
    let nextIdx = idx;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % count;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + count) % count;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = count - 1;
    else return;

    e.preventDefault();
    const nextGroup = PRACTICE.about.credentials[nextIdx];
    setActiveTab(nextGroup.id);
    tabRefs.current[nextIdx]?.focus();
  };

  return (
    <section
      id="o-mnie"
      className={`relative bg-[#EFEAE1]/55 ${compactHeader ? 'pt-10 pb-16 md:pt-12 md:pb-20' : 'py-16 md:py-24'
        }`}
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        {!compactHeader && <HairlineDivider className="mb-14 md:mb-18" />}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Editorial Monograph Column */}
          <div className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-24">
              {!compactHeader && (
                <>
                  <Reveal>
                    <p className="eyebrow">{PRACTICE.about.eyebrow}</p>
                  </Reveal>

                  <h2 className="font-editorial text-[clamp(2.2rem,3.6vw,3.35rem)] font-light leading-[1.05] tracking-[-0.02em] text-[#1D2220]">
                    <MaskedLines
                      lines={['Łączę kliniczną', 'rzetelność z uważną,', 'ludzką obecnością.']}
                      italicSubstring="ludzką obecnością."
                    />
                  </h2>
                </>
              )}

              {/* Authentic In-Office Photograph of mgr Lucyna Grochowska + Monograph Identity Plate */}
              <Reveal delay={0.14}>
                <div className="overflow-hidden border border-[#1D2220]/11 bg-[#FAF8F4] shadow-[0_18px_45px_-30px_rgba(26,39,35,0.2)]">
                  <CurtainImage
                    src={PRACTICE.images.officePortrait}
                    alt="mgr Lucyna Grochowska w swoim gabinecie psychologicznym w Gdyni"
                    aspectClass="aspect-[4/3]"
                    imgClassName="object-[50%_18%]"
                    parallaxStrength={12}
                    immediate={compactHeader}
                    ready={ready}
                    delay={compactHeader ? 0.12 : 0}
                    cursorLabel="Gabinet"
                  />

                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4 border-b border-[#1D2220]/10 pb-4">
                      <div>
                        <p className="font-editorial text-[24px] font-normal text-[#1D2220]">
                          {PRACTICE.fullName}
                        </p>
                        <p className="mt-0.5 text-[11.5px] tracking-[0.06em] text-[#5D6560]">
                          {PRACTICE.role}
                        </p>
                      </div>
                      <span
                        title="Dyplomy zweryfikowane przez TwójPsycholog.pl"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2B423B]/8 text-[#2B423B]"
                      >
                        <ShieldCheck className="h-4 w-4 stroke-[1.4]" />
                      </span>
                    </div>

                    <dl className="mt-4 grid grid-cols-2 gap-4 text-[12.5px]">
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-[#5D6560]">
                          Nurt pracy
                        </dt>
                        <dd className="mt-0.5 font-medium text-[#1D2220]">Psychodynamiczny</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-[#5D6560]">
                          Specjalizacje
                        </dt>
                        <dd className="mt-0.5 font-medium text-[#1D2220]">
                          Trauma · Seksuologia
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-[#5D6560]">
                          Języki i standard
                        </dt>
                        <dd className="mt-0.5 font-medium text-[#1D2220]">
                          PL / RU · Superwizja
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-[#5D6560]">
                          Lokalizacja
                        </dt>
                        <dd className="mt-0.5 font-medium text-[#1D2220]">Gdynia · Online</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Narrative & Interactive Credentials Column */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {PRACTICE.about.paragraphs.map((paragraph, idx) => (
                <Reveal key={idx} delay={idx * 0.08}>
                  <p
                    className={`font-light leading-[1.86] text-[#3F4642] ${idx === 0 ? 'text-[17px] text-[#1D2220] md:text-[18.5px]' : 'text-[15.5px]'
                      }`}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Interactive Credentials Tabs with Spring FLIP Pill & Proper WAI-ARIA */}
            <Reveal delay={0.2} className="mt-14 border-t border-[#1D2220]/11 pt-10">
              <div
                role="tablist"
                aria-label="Kwalifikacje i standardy"
                className="inline-flex flex-wrap gap-1.5 rounded-full border border-[#1D2220]/11 bg-[#FAF8F4]/80 p-1.5"
              >
                {PRACTICE.about.credentials.map((tab, idx) => {
                  const active = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      id={`cred-tab-${tab.id}`}
                      role="tab"
                      type="button"
                      tabIndex={active ? 0 : -1}
                      aria-selected={active}
                      aria-controls={`cred-panel-${tab.id}`}
                      onKeyDown={(e) => handleTabKeyDown(e, idx)}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative rounded-full px-5 py-2.5 text-[12.5px] font-medium tracking-[0.02em] transition-colors duration-300 ${active ? 'text-[#F6F3EE]' : 'text-[#4E5551] hover:text-[#1D2220]'
                        }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="about-credential-pill"
                          transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-[#2B423B]"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGroup.id}
                    id={`cred-panel-${currentGroup.id}`}
                    role="tabpanel"
                    aria-labelledby={`cred-tab-${currentGroup.id}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.42, ease: EASE_EDITORIAL }}
                    className="divide-y divide-[#1D2220]/10"
                  >
                    {currentGroup.items.map((entry) => (
                      <div key={entry.title} className="py-6 first:pt-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-[11px] uppercase tracking-[0.18em] text-[#8C5E3E]">
                            {entry.period}
                          </span>
                          <span className="text-[12px] font-light text-[#5D6560]">
                            {entry.institution}
                          </span>
                        </div>
                        <h3 className="font-editorial mt-2 text-[23px] font-normal leading-snug text-[#1D2220]">
                          {entry.title}
                        </h3>
                        <p className="mt-2 text-[14px] font-light leading-[1.75] text-[#4E5551]">
                          {entry.detail}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
