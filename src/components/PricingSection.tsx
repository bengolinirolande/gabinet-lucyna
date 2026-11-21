import React, { useRef } from 'react';
import { Check } from 'lucide-react';
import { PRACTICE } from '../data/practice';
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

/**
 * Zero-re-render cursor-reactive warm spotlight pricing card (CSS variables updated via ref).
 */
const SpotlightPricingCard: React.FC<{
  item: (typeof PRACTICE.pricing.items)[number];
  delay: number;
  onSelect: () => void;
}> = ({ item, delay, onSelect }) => {
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
        data-cursor="Wybierz"
        onMouseMove={handleMove}
        onClick={onSelect}
        className={`group relative block w-full overflow-hidden border p-6 text-left transition-all duration-500 hover:-translate-y-0.5 md:p-7 ${item.highlighted
          ? 'border-[#2B423B]/45 bg-[#FAF8F4] shadow-[0_24px_55px_-34px_rgba(26,39,35,0.28)] hover:border-[#2B423B]'
          : 'border-[#1D2220]/11 bg-[#FAF8F4]/78 hover:border-[#2B423B]/40 hover:bg-[#FAF8F4]'
          }`}
      >
        {/* Pure CSS zero-re-render warm radial spotlight sheen */}
        <span
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(380px circle at var(--sx, 50%) var(--sy, 50%), rgba(169,120,86,0.12), transparent 65%)',
          }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        />

        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#5D6560]">
                {item.duration}
              </span>
              {item.highlighted && (
                <span className="rounded-full bg-[#2B423B] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#F6F3EE]">
                  Najczęściej wybierane
                </span>
              )}
            </div>
            <h3 className="font-editorial mt-2 text-[24px] font-normal leading-[1.2] text-[#1D2220] md:text-[27px]">
              {item.name}
            </h3>
          </div>

          <div className="flex shrink-0 items-baseline gap-2 sm:pt-1 sm:text-right">
            <span className="font-editorial whitespace-nowrap text-[30px] font-normal leading-none tracking-tight text-[#2B423B] md:text-[34px]">
              {item.price}
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex flex-col justify-between gap-4 border-t border-[#1D2220]/10 pt-5 sm:flex-row sm:items-center">
          <p className="max-w-[490px] text-[13.5px] font-light leading-[1.72] text-[#4E5551]">
            {item.note}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-[#2B423B]">
            <SlotRollText label="Umów wizytę" />
            <KineticArrow className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </Reveal>
  );
};

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="cennik" className="relative bg-[#F6F3EE] py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Transparency & Baltic Path Visual Column */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-5">{PRACTICE.pricing.eyebrow}</p>
            </Reveal>

            <h2 className="font-editorial text-[clamp(2.3rem,4vw,3.65rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#1D2220]">
              <MaskedLines
                lines={['Przejrzyste warunki', 'od pierwszego spotkania.']}
                italicSubstring="pierwszego spotkania."
              />
            </h2>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-[430px] text-[15px] font-light leading-[1.82] text-[#4E5551]">
                {PRACTICE.pricing.subheadline}
              </p>
            </Reveal>

            {/* Editorial Coastal Pine Trail Photograph */}
            <div className="mt-8 max-w-[430px]">
              <CurtainImage
                src={PRACTICE.images.balticPinePath}
                alt="Nadmorska ścieżka wśród bałtyckich sosen prowadząca ku spokojnej linii morza"
                aspectClass="aspect-[4/3]"
                className="rounded-[2px] shadow-[0_22px_50px_-30px_rgba(26,39,35,0.25)]"
                parallaxStrength={16}
                cursorLabel="Spokój"
              />
            </div>

            <Reveal delay={0.22}>
              <ul className="mt-8 space-y-3.5 border-t border-[#1D2220]/11 pt-7">
                {PRACTICE.pricing.policies.map((policy) => (
                  <li
                    key={policy}
                    className="flex items-start gap-3 text-[13.5px] font-light leading-[1.7] text-[#4E5551]"
                  >
                    <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#2B423B]/10 text-[#2B423B]">
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
            {PRACTICE.pricing.items.map((item, idx) => (
              <SpotlightPricingCard
                key={item.id}
                item={item}
                delay={idx * 0.1}
                onSelect={() => onOpenBooking(undefined, `${item.name} (${item.duration})`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
