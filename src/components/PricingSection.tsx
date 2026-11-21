import React, { useRef } from 'react';
import { Check } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import type { PricingItem } from '../data/practice';
import {
  CurtainImage,
  KineticArrow,
  MaskedLines,
  Reveal,
  SlotRollText,
} from './motion/MotionPrimitives';

interface PricingSectionProps {
  onOpenBooking: (presetTopic?: string, presetType?: string) => void;
}

const SpotlightPricingCard: React.FC<{
  item: PricingItem;
  delay: number;
  mostChosenLabel: string;
  ctaLabel: string;
  cursorLabel: string;
  onSelect: () => void;
}> = ({ item, delay, mostChosenLabel, ctaLabel, cursorLabel, onSelect }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--sx', `${x}%`);
    el.style.setProperty('--sy', `${y}%`);
  };

  return (
    <Reveal delay={delay}>
      <button
        ref={btnRef}
        type="button"
        data-cursor={cursorLabel}
        onMouseMove={handleMove}
        onClick={onSelect}
        className={`group relative block w-full overflow-hidden border p-6 text-left transition-all duration-500 hover:-translate-y-0.5 md:p-7 ${
          item.highlighted
            ? 'border-[var(--border-accent)] bg-[var(--bg-paper)] shadow-[var(--shadow-card)] hover:border-[var(--accent-emphasis)]'
            : 'border-[var(--border-subtle)] bg-[var(--bg-paper-soft)] hover:border-[var(--border-accent)] hover:bg-[var(--bg-paper)]'
        }`}
      >
        <span
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(380px circle at var(--sx, 50%) var(--sy, 50%), var(--spotlight-glow), transparent 65%)',
          }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        />

        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                {item.duration}
              </span>
              {item.highlighted && (
                <span className="rounded-full bg-[var(--btn-primary-bg)] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--btn-primary-text)]">
                  {mostChosenLabel}
                </span>
              )}
            </div>
            <h3 className="font-editorial mt-2 text-[24px] font-normal leading-[1.2] text-[var(--text-ink)] md:text-[27px]">
              {item.name}
            </h3>
          </div>

          <div className="flex shrink-0 items-baseline gap-2 sm:pt-1 sm:text-right">
            <span className="font-editorial whitespace-nowrap text-[30px] font-normal leading-none tracking-tight text-[var(--accent-emphasis)] md:text-[34px]">
              {item.price}
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex flex-col justify-between gap-4 border-t border-[var(--border-hairline)] pt-5 sm:flex-row sm:items-center">
          <p className="max-w-[490px] text-[13.5px] font-light leading-[1.72] text-[var(--text-secondary)]">
            {item.note}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-[var(--accent-emphasis)]">
            <SlotRollText label={ctaLabel} />
            <KineticArrow className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </Reveal>
  );
};

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const { practice, ui } = usePreferences();

  return (
    <section id="cennik" className="relative bg-[var(--bg-canvas)] py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Transparency & Baltic Path Visual Column */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-5">{practice.pricing.eyebrow}</p>
            </Reveal>

            <h2 className="font-editorial text-[clamp(2.3rem,4vw,3.65rem)] font-light leading-[1.06] tracking-[-0.02em] text-[var(--text-ink)]">
              <MaskedLines
                lines={ui.pricing.lines}
                italicSubstring={ui.pricing.italicSubstring}
              />
            </h2>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-[430px] text-[15px] font-light leading-[1.82] text-[var(--text-secondary)]">
                {practice.pricing.subheadline}
              </p>
            </Reveal>

            <div className="mt-8 max-w-[430px]">
              <CurtainImage
                src={practice.images.balticPinePath}
                alt={ui.pricing.pineAlt}
                aspectClass="aspect-[4/3]"
                className="rounded-[2px] shadow-[var(--shadow-card)]"
                parallaxStrength={16}
                cursorLabel={ui.cursors.calm}
              />
            </div>

            <Reveal delay={0.22}>
              <ul className="mt-8 space-y-3.5 border-t border-[var(--border-subtle)] pt-7">
                {practice.pricing.policies.map((policy) => (
                  <li
                    key={policy}
                    className="flex items-start gap-3 text-[13.5px] font-light leading-[1.7] text-[var(--text-secondary)]"
                  >
                    <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent-emphasis)]">
                      <Check className="h-3 w-3 stroke-[2]" />
                    </span>
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right Editorial Investment Cards */}
          <div className="flex flex-col justify-center space-y-4 lg:col-span-7">
            {practice.pricing.items.map((item, idx) => (
              <SpotlightPricingCard
                key={item.id}
                item={item}
                delay={idx * 0.1}
                mostChosenLabel={ui.pricing.mostChosen}
                ctaLabel={ui.pricing.cta}
                cursorLabel={ui.cursors.choose}
                onSelect={() => onOpenBooking(undefined, item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
