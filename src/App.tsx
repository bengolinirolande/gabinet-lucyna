import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import { LenisProvider, useLenis } from './components/motion/LenisProvider';
import { Preloader, shouldPlayPreloader } from './components/motion/Preloader';
import { CustomCursor } from './components/motion/CustomCursor';
import { PageTransitionCurtain } from './components/motion/PageTransitionCurtain';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeDirectorySection } from './components/HomeDirectorySection';
import { BalticGalleryInterlude } from './components/BalticGalleryInterlude';
import { SubpageHeader, NextChapterBridge } from './components/SubpageHeader';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { JourneySection } from './components/JourneySection';
import { PhilosophyInterlude } from './components/PhilosophyInterlude';
import { AboutSection } from './components/AboutSection';
import { ScrollManifestoBand } from './components/ScrollManifestoBand';
import { EmpathyMirrorSection } from './components/EmpathyMirrorSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationsSection } from './components/LocationsSection';
import { PricingSection } from './components/PricingSection';
import { GoogleProfileSection } from './components/GoogleProfileSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { BookingDrawer, type BookingPreset } from './components/BookingDrawer';
import { BreathingModal } from './components/BreathingModal';
import { PrivacyModal } from './components/PrivacyModal';
import { EASE_EDITORIAL, VelocityRibbon } from './components/motion/MotionPrimitives';
import { getRouteHref, isHashRouting, parseLocationToPage, type PageId } from './types/navigation';
import { syncRouteSeo } from './utils/seo';

const AppShell: React.FC = () => {
  const { lang, theme, ui } = usePreferences();
  const { scrollTo, resetScrollTop, resize, lockScroll, unlockScroll } = useLenis();
  const mainRef = useRef<HTMLElement>(null);
  const [heroReady, setHeroReady] = useState<boolean>(() => !shouldPlayPreloader());
  const [currentPage, setCurrentPage] = useState<PageId>(() => parseLocationToPage());
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainTarget, setCurtainTarget] = useState<PageId>(currentPage);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState<BookingPreset>({});
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [showBreathPill, setShowBreathPill] = useState(false);

  const timersRef = useRef<number[]>([]);
  const curtainOpenRef = useRef(false);

  const clearTransitionTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  const openBooking = useCallback(
    (presetTopic?: string, presetType?: string, presetLocation?: string) => {
      setBookingPreset({
        topic: presetTopic,
        sessionType: presetType,
        location: presetLocation,
      });
      setBookingOpen(true);
    },
    []
  );

  // Lock Lenis smooth wheel momentum while the full-screen curtain covers the screen
  useEffect(() => {
    curtainOpenRef.current = curtainOpen;
    if (!curtainOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [curtainOpen, lockScroll, unlockScroll]);

  const navigateTo = useCallback(
    (target: PageId, scrollSelector?: string) => {
      if (target === currentPage && !curtainOpenRef.current) {
        if (scrollSelector) {
          scrollTo(scrollSelector, { offset: -80 });
        } else {
          scrollTo(0, { offset: 0 });
        }
        return;
      }

      if (target === currentPage && curtainOpenRef.current) {
        clearTransitionTimers();
        curtainOpenRef.current = false;
        setCurtainOpen(false);
        return;
      }

      const alreadyCovered = curtainOpenRef.current;
      clearTransitionTimers();

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targetUrl = getRouteHref(target);
      const pushRouteUrl = () => {
        if (isHashRouting()) {
          if (window.location.hash !== targetUrl) {
            window.history.pushState(null, '', targetUrl);
          }
        } else if (window.location.pathname !== targetUrl || window.location.hash) {
          window.history.pushState(null, '', targetUrl);
        }
      };

      const positionScrollForNewPage = () => {
        if (scrollSelector) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resize();
              scrollTo(scrollSelector, { offset: -80, immediate: true, force: true });
            });
          });
        } else {
          resetScrollTop();
        }
      };

      if (reduced) {
        setCurrentPage(target);
        pushRouteUrl();
        positionScrollForNewPage();
        mainRef.current?.focus({ preventScroll: true });
        return;
      }

      setCurtainTarget(target);
      curtainOpenRef.current = true;
      setCurtainOpen(true);

      const swapDelay = alreadyCovered ? 160 : 460;
      const liftDelay = swapDelay + 150;

      const swapTimer = window.setTimeout(() => {
        setCurrentPage(target);
        pushRouteUrl();
        positionScrollForNewPage();
      }, swapDelay);

      const liftTimer = window.setTimeout(() => {
        curtainOpenRef.current = false;
        setCurtainOpen(false);
        requestAnimationFrame(() => {
          resize();
          mainRef.current?.focus({ preventScroll: true });
        });
      }, liftDelay);

      timersRef.current.push(swapTimer, liftTimer);
    },
    [currentPage, clearTransitionTimers, resetScrollTop, resize, scrollTo]
  );

  useEffect(() => {
    const syncFromLocation = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#' && !hash.startsWith('#/')) return;
      clearTransitionTimers();
      curtainOpenRef.current = false;
      setCurtainOpen(false);
      setCurrentPage(parseLocationToPage());
      resetScrollTop();
    };
    window.addEventListener('hashchange', syncFromLocation);
    window.addEventListener('popstate', syncFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncFromLocation);
      window.removeEventListener('popstate', syncFromLocation);
      clearTransitionTimers();
    };
  }, [clearTransitionTimers, resetScrollTop]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => resize());
    return () => cancelAnimationFrame(rafId);
  }, [currentPage, lang, resize]);

  // Dynamic localized SEO metadata, canonical & route-specific structured data per chapter
  useEffect(() => {
    syncRouteSeo(currentPage, lang);
  }, [currentPage, lang]);

  useEffect(() => {
    const onScroll = () => {
      setShowBreathPill(window.scrollY > 760);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const viewReady = heroReady && !curtainOpen;
  const activeNavPage = curtainOpen ? curtainTarget : currentPage;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--bg-canvas)] text-[var(--text-ink)] transition-colors duration-300">
      {/* Accessible keyboard skip link */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-[var(--btn-primary-bg)] focus:px-5 focus:py-2.5 focus:text-xs focus:font-medium focus:text-[var(--btn-primary-text)] focus:shadow-lg"
      >
        {ui.skipToContent}
      </a>

      {/* Tactile paper grain */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Initial opening curtain */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Awwwards inter-page curtain transition */}
      <PageTransitionCurtain active={curtainOpen} targetPage={curtainTarget} />

      {/* Desktop-only contextual cursor */}
      <CustomCursor resetKey={`${currentPage}-${lang}-${theme}`} />

      {/* Compact 4-Chapter Architectural Navigation + PL/RU & Light/Dark Toggles */}
      <Navbar
        currentPage={activeNavPage}
        onNavigate={(page) => navigateTo(page)}
        onOpenBooking={(t, s) => openBooking(t, s)}
      />

      {/* Active Page View */}
      <main id="main-content" ref={mainRef} tabIndex={-1} className="outline-none">
        {currentPage === 'home' && (
          <>
            <HeroSection
              ready={viewReady}
              onNavigate={(page, anchor) => navigateTo(page, anchor)}
              onOpenBooking={(t, s) => openBooking(t, s)}
            />
            <VelocityRibbon items={ui.ribbonItems} />
            <HomeDirectorySection
              onNavigate={(page) => navigateTo(page)}
              onOpenBreathing={() => setBreathingOpen(true)}
            />
            <BalticGalleryInterlude onOpenBooking={(topic) => openBooking(topic)} />
          </>
        )}

        {currentPage === 'terapia' && (
          <>
            <SubpageHeader
              chapter="01"
              eyebrow={ui.subpages.terapia.eyebrow}
              lines={ui.subpages.terapia.lines}
              italicSubstring={ui.subpages.terapia.italicSubstring}
              lead={ui.subpages.terapia.lead}
              ready={viewReady}
              onBackHome={() => navigateTo('home')}
            />
            <SpecialtiesSection
              compactHeader
              onOpenBooking={(topic) => openBooking(topic)}
            />
            <JourneySection onOpenBooking={(t, s) => openBooking(t, s)} />
            <PhilosophyInterlude />
            <NextChapterBridge
              nextPage="o-mnie"
              tone="light"
              teaser={ui.subpages.terapia.nextTeaser}
              onNavigate={(page) => navigateTo(page)}
            />
          </>
        )}

        {currentPage === 'o-mnie' && (
          <>
            <SubpageHeader
              chapter="02"
              eyebrow={ui.subpages.oMnie.eyebrow}
              lines={ui.subpages.oMnie.lines}
              italicSubstring={ui.subpages.oMnie.italicSubstring}
              lead={ui.subpages.oMnie.lead}
              ready={viewReady}
              onBackHome={() => navigateTo('home')}
            />
            <AboutSection compactHeader ready={viewReady} />
            <ScrollManifestoBand />
            <EmpathyMirrorSection onOpenBreathing={() => setBreathingOpen(true)} />
            <TestimonialsSection />
            <NextChapterBridge
              nextPage="gabinety"
              tone="sand"
              teaser={ui.subpages.oMnie.nextTeaser}
              onNavigate={(page) => navigateTo(page)}
            />
          </>
        )}

        {currentPage === 'gabinety' && (
          <>
            <SubpageHeader
              chapter="03"
              eyebrow={ui.subpages.gabinety.eyebrow}
              lines={ui.subpages.gabinety.lines}
              italicSubstring={ui.subpages.gabinety.italicSubstring}
              lead={ui.subpages.gabinety.lead}
              ready={viewReady}
              onBackHome={() => navigateTo('home')}
            />
            <LocationsSection
              compactHeader
              ready={viewReady}
              onOpenBooking={(t, s, loc) => openBooking(t, s, loc)}
            />
            <PricingSection onOpenBooking={(t, s) => openBooking(t, s)} />
            <GoogleProfileSection />
            <FaqSection onOpenBooking={(t, s) => openBooking(t, s)} />
          </>
        )}
      </main>

      {/* Keyed by currentPage & lang so scroll wordmark bounds stay calibrated */}
      <FooterSection
        key={`${currentPage}-${lang}`}
        onNavigate={(page) => navigateTo(page)}
        onOpenBooking={() => openBooking()}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* Discreet Floating Grounding Pill */}
      <AnimatePresence>
        {showBreathPill && !bookingOpen && !breathingOpen && !curtainOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
            onClick={() => setBreathingOpen(true)}
            data-cursor={ui.cursors.breath}
            aria-label={ui.breathPillAria}
            className="fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full border border-[var(--border-medium)] bg-[var(--bg-paper-elevated)] px-4 py-2.5 text-[12px] font-medium text-[var(--accent-emphasis)] shadow-[var(--shadow-card)] backdrop-blur-md transition-colors hover:border-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-text)] sm:inline-flex"
          >
            <Wind className="h-3.5 w-3.5 stroke-[1.6]" />
            <span>{ui.breathPill}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interactive Booking Sheet & Modals */}
      <BookingDrawer
        open={bookingOpen}
        privacyOpen={privacyOpen}
        preset={bookingPreset}
        onClose={() => setBookingOpen(false)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />
      <BreathingModal
        open={breathingOpen}
        onClose={() => setBreathingOpen(false)}
      />
      <PrivacyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <PreferencesProvider>
      <LenisProvider>
        <AppShell />
      </LenisProvider>
    </PreferencesProvider>
  </MotionConfig>
);

export default App;
