import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PRACTICE } from '../data/practice';
import { handleRouteLinkClick, NAV_ORDER, ROUTES, type PageId } from '../types/navigation';
import { useLenis } from './motion/LenisProvider';
import {
  EASE_EDITORIAL,
  KineticArrow,
  MagneticButton,
  SlotRollText,
} from './motion/MotionPrimitives';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (presetTopic?: string, presetType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const { lockScroll, unlockScroll } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Snap reading-progress spring cleanly back to 0 at top of each new chapter
  useEffect(() => {
    if (window.scrollY < 10) {
      progressScaleX.jump(0);
    }
  }, [currentPage, progressScaleX]);

  useEffect(() => {
    if (!mobileOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen, lockScroll, unlockScroll]);

  const handleNavClick = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header
        data-dark-surface={mobileOpen ? 'true' : undefined}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${mobileOpen
          ? 'bg-transparent py-5 shadow-none'
          : scrolled
            ? 'bg-[#F6F3EE]/90 py-3.5 backdrop-blur-md shadow-[0_1px_0_rgba(29,34,32,0.08)]'
            : 'bg-transparent py-5'
          }`}
      >
        {!mobileOpen && (
          <motion.div
            style={{ scaleX: progressScaleX, transformOrigin: 'left center' }}
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-[#2B423B]/65 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'
              }`}
          />
        )}

        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-5 sm:px-6 md:px-10 lg:px-14">
          {/* Brand Mark */}
          <a
            href={ROUTES.home.hash}
            onClick={(e) => handleRouteLinkClick(e, () => handleNavClick('home'))}
            className="group flex items-baseline gap-3 text-left"
          >
            <span
              className={`font-editorial text-[22px] font-medium tracking-tight transition-colors duration-300 sm:text-2xl md:text-[26px] ${mobileOpen ? 'text-[#F6F3EE]' : 'text-[#1D2220]'
                }`}
            >
              {PRACTICE.shortName}
            </span>
            <span
              className={`hidden text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 xl:inline ${mobileOpen
                ? 'text-[#C9A484]'
                : 'text-[#5D6560] group-hover:text-[#2B423B]'
                }`}
            >
              Psycholog · Gdynia i online
            </span>
          </a>

          {/* Clean 4-Chapter Desktop Navigation with Active Pill */}
          <nav
            aria-label="Nawigacja główna"
            className="hidden items-center gap-1.5 rounded-full border border-[#1D2220]/9 bg-[#FAF8F4]/72 p-1 backdrop-blur-md lg:flex"
          >
            {NAV_ORDER.map((pageId) => {
              const meta = ROUTES[pageId];
              const active = currentPage === pageId;
              return (
                <a
                  key={pageId}
                  href={meta.hash}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => handleRouteLinkClick(e, () => handleNavClick(pageId))}
                  className={`group relative rounded-full px-4 py-1.5 text-[12.5px] tracking-[0.02em] transition-colors duration-300 ${active
                    ? 'font-medium text-[#F6F3EE]'
                    : 'font-normal text-[#1D2220]/78 hover:text-[#1D2220]'
                    }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active-route"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#2B423B]"
                    />
                  )}
                  <span className="relative z-10">
                    <SlotRollText label={meta.navLabel} />
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <MagneticButton
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              cursorLabel="Umów"
              className={`group items-center gap-2.5 rounded-full bg-[#2B423B] px-5 py-2.5 text-[12.5px] font-medium tracking-[0.03em] text-[#F6F3EE] transition-colors duration-300 hover:bg-[#1A2723] ${mobileOpen ? 'hidden' : 'hidden sm:inline-flex'
                }`}
            >
              <SlotRollText label="Umów konsultację" italicHover />
              <KineticArrow className="h-3.5 w-3.5" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={mobileOpen}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${mobileOpen
                ? 'border-[#F6F3EE]/30 bg-transparent text-[#F6F3EE] hover:border-[#C9A484]'
                : 'border-[#1D2220]/15 bg-[#FAF8F4]/70 text-[#1D2220] backdrop-blur-sm hover:border-[#2B423B]'
                }`}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav-overlay"
            data-dark-surface="true"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
            className="fixed inset-0 z-[45] flex flex-col justify-between overflow-y-auto bg-[#1A2723] px-7 pb-10 pt-24 text-[#F6F3EE] lg:hidden"
          >
            <nav aria-label="Menu mobilne" className="flex flex-col gap-3">
              {NAV_ORDER.map((pageId, idx) => {
                const meta = ROUTES[pageId];
                const active = currentPage === pageId;
                return (
                  <div
                    key={pageId}
                    className="overflow-hidden border-b border-[#F6F3EE]/12 pb-3.5"
                  >
                    <motion.a
                      href={meta.hash}
                      aria-current={active ? 'page' : undefined}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-80%', opacity: 0 }}
                      transition={{
                        delay: 0.08 + idx * 0.05,
                        duration: 0.55,
                        ease: EASE_EDITORIAL,
                      }}
                      onClick={(e) => handleRouteLinkClick(e, () => handleNavClick(pageId))}
                      className={`font-editorial flex w-full items-baseline justify-between text-left text-4xl font-light tracking-tight transition-colors ${active ? 'italic text-[#C9A484]' : 'text-[#F6F3EE] hover:text-[#C9A484]'
                        }`}
                    >
                      <span>{meta.navLabel}</span>
                      <span className="font-sans text-[11px] tracking-[0.2em] text-[#F6F3EE]/40">
                        {meta.chapter}
                      </span>
                    </motion.a>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.5, ease: EASE_EDITORIAL }}
              className="mt-8 space-y-5"
            >
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F6F3EE] px-6 py-4 text-sm font-medium text-[#1A2723]"
              >
                <span>Umów pierwszą konsultację</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#F6F3EE]/60">
                <span>{PRACTICE.regionLabel}</span>
                <a href={PRACTICE.phoneHref} className="text-[#C9A484]">
                  {PRACTICE.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
