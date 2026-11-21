import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { LenisProvider, useLenis } from './components/motion/LenisProvider';
import { Preloader } from './components/motion/Preloader';
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
import { parseHashToPage, ROUTES, type PageId } from './types/navigation';

const AppShell: React.FC = () => {
  const { scrollTo, resetScrollTop, resize, lockScroll, unlockScroll } = useLenis();
  const mainRef = useRef<HTMLElement>(null);
  const [heroReady, setHeroReady] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? parseHashToPage(window.location.hash) : 'home'
  );
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

  /**
   * Race-free Awwwards curtain page navigation:
   * - Handles rapid mid-curtain second clicks cleanly
   * - Performs cross-page anchor jumps (e.g. `#wizytowka-google`) BEFORE lifting the curtain
   * - Restores keyboard focus safely to `<main>` after route swaps
   */
  const navigateTo = useCallback(
    (target: PageId, scrollSelector?: string) => {
      // Same page & no transition running -> smooth scroll in place
      if (target === currentPage && !curtainOpenRef.current) {
        if (scrollSelector) {
          scrollTo(scrollSelector, { offset: -80 });
        } else {
          scrollTo(0, { offset: 0 });
        }
        return;
      }

      // Clicking back to currentPage mid-curtain -> abort transition cleanly
      if (target === currentPage && curtainOpenRef.current) {
        clearTransitionTimers();
        curtainOpenRef.current = false;
        setCurtainOpen(false);
        return;
      }

      const alreadyCovered = curtainOpenRef.current;
      clearTransitionTimers();

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targetHash = ROUTES[target].hash;

      const positionScrollForNewPage = () => {
        if (scrollSelector) {
          // Wait 2 animation frames for new page DOM layout before immediate anchor jump
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
        if (window.location.hash !== targetHash) {
          window.history.pushState(null, '', targetHash);
        }
        positionScrollForNewPage();
        mainRef.current?.focus({ preventScroll: true });
        return;
      }

      setCurtainTarget(target);
      curtainOpenRef.current = true;
      setCurtainOpen(true);

      // Shorten swap if curtain was already closed from a rapid second click
      const swapDelay = alreadyCovered ? 160 : 460;
      const liftDelay = swapDelay + 150;

      const swapTimer = window.setTimeout(() => {
        setCurrentPage(target);
        if (window.location.hash !== targetHash) {
          window.history.pushState(null, '', targetHash);
        }
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

  // Sync browser Back / Forward (ignoring non-route in-page fragments like `#main-content`)
  useEffect(() => {
    const syncFromLocation = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#' && !hash.startsWith('#/')) return;
      clearTransitionTimers();
      curtainOpenRef.current = false;
      setCurtainOpen(false);
      const next = parseHashToPage(hash);
      setCurrentPage(next);
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
  }, [currentPage, resize]);

  // Dynamic browser tab title per chapter
  useEffect(() => {
    const meta = ROUTES[currentPage];
    document.title =
      currentPage === 'home'
        ? 'mgr Lucyna Grochowska — Psycholog, Psychotraumatolog, Psychoterapeutka | Gdynia · Online'
        : `${meta.curtainTitle} — mgr Lucyna Grochowska | Gdynia`;
  }, [currentPage]);

  useEffect(() => {
    const onScroll = () => {
      setShowBreathPill(window.scrollY > 760);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const viewReady = heroReady && !curtainOpen;
  // Navbar active pill updates immediately on click instead of waiting 460ms
  const activeNavPage = curtainOpen ? curtainTarget : currentPage;

  return (
    <div className="relative min-h-screen bg-[#F6F3EE] text-[#1D2220]">
      {/* Accessible keyboard skip link (never mutates route hash!) */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-[#2B423B] focus:px-5 focus:py-2.5 focus:text-xs focus:font-medium focus:text-[#F6F3EE] focus:shadow-lg"
      >
        Przejdź do głównej treści
      </a>

      {/* Tactile paper grain */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Initial opening curtain */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Awwwards inter-page curtain transition (above cursor, below preloader) */}
      <PageTransitionCurtain active={curtainOpen} targetPage={curtainTarget} />

      {/* Desktop-only contextual cursor (auto-resets stale labels on page switch) */}
      <CustomCursor resetKey={currentPage} />

      {/* Compact 4-Chapter Architectural Navigation */}
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
            <VelocityRibbon
              items={[
                'Gdynia Witomino',
                'Psychoterapia psychodynamiczna',
                'Gdynia Śródmieście',
                'Psychotraumatologia',
                'Seksuologia kliniczna',
                'Konsultacje Online · PL / RU',
                'Stała superwizja',
              ]}
            />
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
              eyebrow="Terapia i obszary pracy"
              lines={['W czym mogę Ci', 'uważnie towarzyszyć.']}
              italicSubstring="towarzyszyć."
              lead="Pracuję w nurcie psychodynamicznym (w trakcie certyfikacji), jako psychotraumatolog oraz seksuolog kliniczny w trakcie certyfikacji. Poniżej znajdziesz główne obszary pomocy, przebieg pierwszych spotkań oraz moją filozofię pracy."
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
              teaser="Poznaj moje wykształcenie (UKW, Triada, UAM, Vis Salutis), 8-letnie doświadczenie kliniczne oraz zweryfikowane opinie pacjentów."
              onNavigate={(page) => navigateTo(page)}
            />
          </>
        )}

        {currentPage === 'o-mnie' && (
          <>
            <SubpageHeader
              chapter="02"
              eyebrow="O mnie · mgr Lucyna Grochowska"
              lines={['Kliniczne doświadczenie', 'i przestrzeń bez oceniania.']}
              italicSubstring="bez oceniania."
              lead="Od 8 lat łączę praktykę w publicznych placówkach zdrowia psychicznego z gabinetem prywatnym. Pracuję pod stałą superwizją, w języku polskim i rosyjskim, z głębokim poszanowaniem historii każdej osoby."
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
              teaser="Sprawdź oba gabinety w Gdyni (ul. Chwarznieńska i Medyczna Gdynia), konsultacje online, profile ZnanyLekarz / TwójPsycholog oraz cennik."
              onNavigate={(page) => navigateTo(page)}
            />
          </>
        )}

        {currentPage === 'gabinety' && (
          <>
            <SubpageHeader
              chapter="03"
              eyebrow="Praktyka · Gdynia i Online (PL / RU)"
              lines={['Gabinety, opinie 5,0', 'i przejrzysty cennik.']}
              italicSubstring="przejrzysty cennik."
              lead="Przyjmuję stacjonarnie w Gdyni Witominie (ul. Chwarznieńska 136–138), w Przychodni Medyczna Gdynia (ul. gen. Bema 16/2) oraz online. Tutaj znajdziesz dojazd, mapę Gdyni, zweryfikowane opinie, cennik oraz odpowiedzi na pytania."
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

      {/* Keyed by currentPage so scroll wordmark bounds stay 100% calibrated on height change */}
      <FooterSection
        key={currentPage}
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
            data-cursor="Oddech"
            aria-label="Otwórz krótkie ćwiczenie oddechowe 4-4-6"
            className="fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full border border-[#1D2220]/14 bg-[#FAF8F4]/92 px-4 py-2.5 text-[12px] font-medium text-[#2B423B] shadow-[0_14px_34px_-14px_rgba(26,39,35,0.3)] backdrop-blur-md transition-colors hover:border-[#2B423B] hover:bg-[#2B423B] hover:text-[#F6F3EE] sm:inline-flex"
          >
            <Wind className="h-3.5 w-3.5 stroke-[1.6]" />
            <span>Chwila oddechu</span>
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
    <LenisProvider>
      <AppShell />
    </LenisProvider>
  </MotionConfig>
);

export default App;
