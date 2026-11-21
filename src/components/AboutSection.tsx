import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import type { CredentialGroup } from '../data/practice';
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
  const { practice, ui } = usePreferences();
  const [activeTab, setActiveTab] = useState<CredentialGroup['id']>('education');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const count = practice.about.credentials.length;
    let nextIdx = idx;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % count;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + count) % count;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = count - 1;
    else return;

    e.preventDefault();
    const nextGroup = practice.about.credentials[nextIdx];
    setActiveTab(nextGroup.id);
    tabRefs.current[nextIdx]?.focus();
  };

  return (
    <section
      id="o-mnie"
      className={`relative bg-[var(--bg-surface-soft)] ${
        compactHeader ? 'pt-10 pb-16 md:pt-12 md:pb-20' : 'py-16 md:py-24'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        {!compactHeader && <HairlineDivider className="mb-14 md:mb-18" />}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Editorial Monograph Column */}
          <div className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-24">
              {!compactHeader && (
                <>
                  <Reveal>
                    <p className="eyebrow">{practice.about.eyebrow}</p>
                  </Reveal>

                  <h2 className="font-editorial text-[clamp(2.2rem,3.6vw,3.35rem)] font-light leading-[1.05] tracking-[-0.02em] text-[var(--text-ink)]">
                    <MaskedLines
                      lines={ui.about.lines}
                      italicSubstring={ui.about.italicSubstring}
                    />
                  </h2>
                </>
              )}

              {/* Authentic In-Office Photograph + Monograph Identity Plate */}
              <Reveal delay={0.14}>
                <div className="overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-paper)] shadow-[var(--shadow-card)]">
                  <CurtainImage
                    src={practice.images.officePortrait}
                    alt={ui.about.officeAlt}
                    aspectClass="aspect-[4/3]"
                    imgClassName="object-top"
                    parallaxStrength={0}
                    immediate={compactHeader}
                    priority={compactHeader}
                    ready={ready}
                    delay={compactHeader ? 0.12 : 0}
                    cursorLabel={ui.cursors.office}
                  />

                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
                      <div>
                        <p className="font-editorial text-[24px] font-normal text-[var(--text-ink)]">
                          {practice.fullName}
                        </p>
                        <p className="mt-0.5 text-[11.5px] tracking-[0.06em] text-[var(--text-muted)]">
                          {practice.role}
                        </p>
                      </div>
                      <span
                        title={ui.about.verifiedTitle}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent-emphasis)]"
                      >
                        <ShieldCheck className="h-4 w-4 stroke-[1.4]" />
                      </span>
                    </div>

                    <dl className="mt-4 grid grid-cols-2 gap-4 text-[12.5px]">
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {ui.about.plate.approachLabel}
                        </dt>
                        <dd className="mt-0.5 font-medium text-[var(--text-ink)]">
                          {ui.about.plate.approachVal}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {ui.about.plate.specLabel}
                        </dt>
                        <dd className="mt-0.5 font-medium text-[var(--text-ink)]">
                          {ui.about.plate.specVal}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {ui.about.plate.langLabel}
                        </dt>
                        <dd className="mt-0.5 font-medium text-[var(--text-ink)]">
                          {ui.about.plate.langVal}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {ui.about.plate.locLabel}
                        </dt>
                        <dd className="mt-0.5 font-medium text-[var(--text-ink)]">
                          {ui.about.plate.locVal}
                        </dd>
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
              {practice.about.paragraphs.map((paragraph, idx) => (
                <Reveal key={idx} delay={idx * 0.08}>
                  <p
                    className={`font-light leading-[1.86] ${
                      idx === 0
                        ? 'text-[17px] text-[var(--text-ink)] md:text-[18.5px]'
                        : 'text-[15.5px] text-[var(--text-body)]'
                    }`}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Interactive Credentials Tabs + SEO-Crawlable Panels */}
            <Reveal delay={0.18} className="mt-9 border-t border-[var(--border-subtle)] pt-8">
              <h2 className="eyebrow mb-4">{ui.about.tabsHeading}</h2>

              <div
                role="tablist"
                aria-label={ui.about.tabsAria}
                className="inline-flex max-w-full flex-wrap gap-1.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-paper-soft)] p-1.5 sm:rounded-full"
              >
                {practice.about.credentials.map((tab, idx) => {
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
                      className={`relative rounded-full px-3.5 py-2 text-[12px] font-medium tracking-[0.02em] transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-[12.5px] ${
                        active
                          ? 'text-[var(--btn-primary-text)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-ink)]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="about-credential-pill"
                          transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-[var(--btn-primary-bg)]"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 min-h-[280px]">
                {practice.about.credentials.map((group) => {
                  const isActive = group.id === activeTab;
                  return (
                    <motion.div
                      key={group.id}
                      id={`cred-panel-${group.id}`}
                      role="tabpanel"
                      aria-labelledby={`cred-tab-${group.id}`}
                      hidden={!isActive}
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.36, ease: EASE_EDITORIAL }}
                      className="divide-y divide-[var(--border-hairline)]"
                    >
                      {group.items.map((entry) => (
                        <div key={entry.title} className="py-5 first:pt-2">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-amber)]">
                              {entry.period}
                            </span>
                            <span className="text-[12px] font-light text-[var(--text-muted)]">
                              {entry.institution}
                            </span>
                          </div>
                          <h3 className="font-editorial mt-2 text-[23px] font-normal leading-snug text-[var(--text-ink)]">
                            {entry.title}
                          </h3>
                          <p className="mt-2 text-[14px] font-light leading-[1.75] text-[var(--text-secondary)]">
                            {entry.detail}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
