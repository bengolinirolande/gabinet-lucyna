import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getRouteHref, handleRouteLinkClick, NAV_ORDER, type Locale, type PageId } from '../types/navigation';
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
  const { lang, setLang, theme, toggleTheme, practice, ui, routes } = usePreferences();
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          mobileOpen
            ? 'bg-transparent py-4 shadow-none sm:py-5'
            : scrolled
              ? 'bg-[var(--bg-canvas-blur)] py-3 backdrop-blur-md shadow-[var(--shadow-nav)] sm:py-3.5'
              : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        {!mobileOpen && (
          <motion.div
            style={{ scaleX: progressScaleX, transformOrigin: 'left center' }}
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-[var(--progress-bar)] transition-opacity duration-300 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-2 px-4 sm:px-6 md:px-10 lg:px-14">
          {/* Brand Mark */}
          <a
            href={getRouteHref('home')}
            onClick={(e) => handleRouteLinkClick(e, () => handleNavClick('home'))}
            className="group flex min-w-0 items-baseline gap-3 text-left"
          >
            <span
              className={`font-editorial truncate text-[20px] font-medium tracking-tight transition-colors duration-300 sm:text-2xl md:text-[25px] ${
                mobileOpen ? 'text-[#F6F3EE]' : 'text-[var(--text-ink)]'
              }`}
            >
              {practice.shortName}
            </span>
            <span
              className={`hidden whitespace-nowrap text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 2xl:inline ${
                mobileOpen
                  ? 'text-[#C9A484]'
                  : 'text-[var(--text-muted)] group-hover:text-[var(--accent-emphasis)]'
              }`}
            >
              {ui.navbar.subtitle}
            </span>
          </a>

          {/* Clean 4-Chapter Desktop Navigation with Active Pill */}
          <nav
            aria-label={ui.navbar.navAria}
            className="hidden shrink-0 items-center gap-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper-soft)] p-1 backdrop-blur-md lg:flex"
          >
            {NAV_ORDER.map((pageId) => {
              const meta = routes[pageId];
              const active = currentPage === pageId;
              return (
                <a
                  key={pageId}
                  href={getRouteHref(pageId)}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => handleRouteLinkClick(e, () => handleNavClick(pageId))}
                  className={`group relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] tracking-[0.02em] transition-colors duration-300 xl:px-4 ${
                    active
                      ? 'font-medium text-[var(--btn-primary-text)]'
                      : 'font-normal text-[var(--text-ink-soft)] hover:text-[var(--text-ink)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active-route"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[var(--btn-primary-bg)]"
                    />
                  )}
                  <span className="relative z-10">
                    <SlotRollText label={meta.navLabel} />
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right Utility Controls (PL/RU + Theme Toggle + CTA + Mobile Menu) */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {/* Compact PL / RU Segmented Switcher */}
            <div
              role="group"
              aria-label={ui.navbar.langGroupAria}
              className={`inline-flex items-center rounded-full border p-0.5 backdrop-blur-md transition-colors ${
                mobileOpen
                  ? 'border-[#F6F3EE]/25 bg-[#F6F3EE]/8'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-paper-soft)]'
              }`}
            >
              {(['pl', 'ru'] as Locale[]).map((code) => {
                const active = lang === code;
                return (
                  <button
                    key={code}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setLang(code)}
                    className={`relative rounded-full px-2 py-1 text-[10.5px] font-medium uppercase tracking-[0.08em] transition-colors sm:px-2.5 sm:text-[11px] ${
                      active
                        ? mobileOpen
                          ? 'bg-[#C9A484] text-[#101715]'
                          : 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                        : mobileOpen
                          ? 'text-[#F6F3EE]/72 hover:text-[#F6F3EE]'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                );
              })}
            </div>

            {/* Tactile Light / Dark Mode Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? ui.navbar.switchToLight : ui.navbar.switchToDark}
              title={theme === 'dark' ? ui.navbar.switchToLight : ui.navbar.switchToDark}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-colors sm:h-9 sm:w-9 ${
                mobileOpen
                  ? 'border-[#F6F3EE]/25 bg-transparent text-[#F6F3EE] hover:border-[#C9A484] hover:text-[#C9A484]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-paper-soft)] text-[var(--text-ink)] hover:border-[var(--border-accent)] hover:text-[var(--accent-emphasis)]'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5 stroke-[1.7]" />
              ) : (
                <Moon className="h-3.5 w-3.5 stroke-[1.7]" />
              )}
            </button>

            <MagneticButton
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              cursorLabel={ui.cursors.book}
              className={`group whitespace-nowrap items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-4 py-2 text-[12px] font-medium tracking-[0.02em] text-[var(--btn-primary-text)] transition-colors duration-300 hover:bg-[var(--btn-primary-hover)] xl:px-5 xl:py-2.5 xl:text-[12.5px] ${
                mobileOpen ? 'hidden' : 'hidden sm:inline-flex'
              }`}
            >
              <SlotRollText label={ui.navbar.bookCta} italicHover />
              <KineticArrow className="h-3.5 w-3.5" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? ui.navbar.closeMenu : ui.navbar.openMenu}
              aria-expanded={mobileOpen}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors sm:h-9 sm:w-9 lg:hidden ${
                mobileOpen
                  ? 'border-[#F6F3EE]/30 bg-transparent text-[#F6F3EE] hover:border-[#C9A484]'
                  : 'border-[var(--border-medium)] bg-[var(--bg-paper-soft)] text-[var(--text-ink)] backdrop-blur-sm hover:border-[var(--border-accent)]'
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
            className="fixed inset-0 z-[45] flex flex-col justify-between overflow-y-auto bg-[var(--bg-deep)] px-7 pb-10 pt-24 text-[#F6F3EE] lg:hidden"
          >
            <nav aria-label={ui.navbar.mobileNavAria} className="flex flex-col gap-3">
              {NAV_ORDER.map((pageId, idx) => {
                const meta = routes[pageId];
                const active = currentPage === pageId;
                return (
                  <div
                    key={pageId}
                    className="overflow-hidden border-b border-[#F6F3EE]/12 pb-3.5"
                  >
                    <motion.a
                      href={getRouteHref(pageId)}
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
                      className={`font-editorial flex w-full items-baseline justify-between text-left text-4xl font-light tracking-tight transition-colors ${
                        active ? 'italic text-[#C9A484]' : 'text-[#F6F3EE] hover:text-[#C9A484]'
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
                <span>{ui.navbar.mobileBookCta}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#F6F3EE]/65">
                <span>{practice.regionLabel}</span>
                <a href={practice.phoneHref} className="text-[#C9A484]">
                  {practice.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
