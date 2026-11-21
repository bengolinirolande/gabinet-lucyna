import type { Locale, PageId } from '../types/navigation';
import { PRACTICE } from './practice';

export interface UiStrings {
  skipToContent: string;
  chapterLabel: string;
  breathPill: string;
  breathPillAria: string;
  preloaderSubtitle: string;
  cursors: {
    book: string;
    about: string;
    open: string;
    close: string;
    breath: string;
    talk: string;
    next: string;
    calm: string;
    office: string;
    silence: string;
    choose: string;
    start: string;
  };
  navbar: {
    subtitle: string;
    navAria: string;
    mobileNavAria: string;
    bookCta: string;
    mobileBookCta: string;
    openMenu: string;
    closeMenu: string;
    switchToDark: string;
    switchToLight: string;
    langGroupAria: string;
    themeLabelLight: string;
    themeLabelDark: string;
  };
  hero: {
    todayWeekend: string;
    todayWeekday: string;
    portraitAlt: string;
    portraitAria: string;
    locationsLine: string;
    scrollCue: string;
    confidentiality: string;
    reviewsSuffix: string;
  };
  ribbonItems: string[];
  directory: {
    eyebrow: string;
    lines: string[];
    italicSubstring: string;
    breathTitle: string;
    breathSub: string;
    cards: {
      page: PageId;
      num: string;
      eyebrow: string;
      title: string;
      summary: string;
      image: string;
      imageAlt: string;
      imagePosition?: string;
      cta: string;
    }[];
    trustTitle: string;
    trustQuote: string;
    trustLocations: string;
    trustDiplomas: string;
    trustMapCta: string;
    trustZnanyAria: string;
  };
  baltic: {
    ariaLabel: string;
    eyebrow: string;
    region: string;
    promptHeading: string;
    imgAlt: string;
    cta: string;
    ctaHint: string;
    moods: {
      id: string;
      label: string;
      topic: string;
      title: string;
      response: string;
    }[];
  };
  subpages: {
    backHome: string;
    nextChapterPrefix: string;
    nextChapterCta: string;
    terapia: {
      eyebrow: string;
      lines: string[];
      italicSubstring: string;
      lead: string;
      nextTeaser: string;
    };
    oMnie: {
      eyebrow: string;
      lines: string[];
      italicSubstring: string;
      lead: string;
      nextTeaser: string;
    };
    gabinety: {
      eyebrow: string;
      lines: string[];
      italicSubstring: string;
      lead: string;
    };
  };
  specialties: {
    eyebrow: string;
    compactEyebrow: string;
    compactHint: string;
    lines: string[];
    italicSubstring: string;
    lead: string;
    approachLabel: string;
    cta: string;
  };
  journey: {
    lines: string[];
    italicSubstring: string;
    lead: string;
    cta: string;
    stepPrefix: string;
    cardFooter: string;
  };
  philosophy: {
    srHeading: string;
    quoteAccent: string;
    stillLifeAlt: string;
  };
  about: {
    lines: string[];
    italicSubstring: string;
    officeAlt: string;
    verifiedTitle: string;
    tabsHeading: string;
    tabsAria: string;
    plate: {
      approachLabel: string;
      approachVal: string;
      specLabel: string;
      specVal: string;
      langLabel: string;
      langVal: string;
      locLabel: string;
      locVal: string;
    };
  };
  manifesto: {
    ariaLabel: string;
    eyebrow: string;
    text: string;
    highlightWords: string[];
    footerRegion: string;
  };
  empathy: {
    lines: string[];
    italicSubstring: string;
    breathBtnTitle: string;
    breathBtnSub: string;
    archAlt: string;
  };
  testimonials: {
    ariaLabel: string;
    eyebrow: string;
    headingPrefix: string;
    headingItalic: string;
    verifiedNote: string;
    prevAria: string;
    nextAria: string;
    showReviewAria: string;
    reflections: {
      id: string;
      quote: string;
      author: string;
      context: string;
      location: string;
    }[];
    triptych: {
      src: string;
      pos: string;
      alt: string;
      caption: string;
    }[];
  };
  locations: {
    compactHeading: string;
    eyebrow: string;
    lines: string[];
    italicSubstring: string;
    tablistAria: string;
    imgAltPrefix: string;
    askSlotPrefix: string;
    mapsLabel: string;
    bilingualNote: string;
    bilingualNoteLang: 'ru' | 'pl';
  };
  pricing: {
    lines: string[];
    italicSubstring: string;
    mostChosen: string;
    cta: string;
    pineAlt: string;
  };
  googleProfile: {
    eyebrow: string;
    lines: string[];
    italicSubstring: string;
    lead: string;
    starsAria: string;
    reviewsCountSuffix: string;
    diplomasSubtitleSuffix: string;
    verifiedBadge: string;
    znanyBtn: string;
    twojBtn: string;
    mapsLink: string;
    fbLink: string;
    star5Aria: string;
    mapAria: string;
    mapTitle: string;
    mapBay: string;
    mapOrlowo: string;
    mapSrodmiescie: string;
    mapWitomino: string;
    tabWitomino: string;
    tabSrodmiescie: string;
    pinSrodmiescieAria: string;
    pinWitominoAria: string;
    transitWitomino: string;
    transitSrodmiescie: string;
    routeBtn: string;
  };
  faq: {
    eyebrow: string;
    lines: string[];
    italicSubstring: string;
    avatarAlt: string;
    doubtTitle: string;
    doubtCta: string;
    cornerAlt: string;
  };
  booking: {
    eyebrow: string;
    title: string;
    closeAria: string;
    sessionTypes: string[];
    locations: readonly [string, string, string];
    timeSlots: string[];
    locationMeta: readonly [string, string, string];
    nearestSlot: string;
    homeVisitLocationLabel: string;
    homeVisitHint: string;
    step1: string;
    step2: string;
    step3: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    noteLabel: string;
    notePlaceholder: string;
    noteTopicPrefix: string;
    consentPrefix: string;
    consentLink: string;
    submitBtn: string;
    sendingBtn: string;
    recipientPrefix: string;
    externalCalendar: string;
    errors: {
      name: string;
      contact: string;
      phoneShort: string;
      emailInvalid: string;
      consent: string;
    };
    successTitlePrefix: string;
    fallbackTitlePrefix: string;
    successBodyBefore: string;
    successBodyAfter: string;
    fallbackBodyBefore: string;
    fallbackBodyAfter: string;
    summaryHeading: string;
    contactLabel: string;
    sendEmailBtn: string;
    copyBtn: string;
    copiedBtn: string;
    editDataBtn: string;
    backToSiteBtn: string;
    mailtoSubjectPrefix: string;
    mailtoGreeting: string;
    summaryFields: {
      name: string;
      phone: string;
      email: string;
      sessionType: string;
      location: string;
      day: string;
      time: string;
      message: string;
      noMessage: string;
      notProvided: string;
      rodo: string;
      rodoValue: string;
    };
  };
  footer: {
    eyebrow: string;
    lines: string[];
    cta: string;
    replyNote: string;
    contactHeading: string;
    copyPhoneAria: string;
    copyEmailAria: string;
    copied: string;
    clinicNoteBefore: string;
    clinicNoteAfter: string;
    locationsHeading: string;
    onlineLabel: string;
    onlineSub: string;
    bilingualNote: string;
    bilingualNoteLang: 'ru' | 'pl';
    navHeading: string;
    navAria: string;
    crisisHeading: string;
    crisisIntro: string;
    copyrightSuffix: string;
    privacyBtn: string;
    backToTop: string;
  };
  privacy: {
    dialogAria: string;
    eyebrow: string;
    title: string;
    closeAria: string;
    sections: {
      heading: string;
      body: string;
    }[];
    confirmBtn: string;
  };
  breathing: {
    dialogAria: string;
    closeAria: string;
    eyebrow: string;
    phases: {
      key: 'inhale' | 'hold' | 'exhale';
      label: string;
      hint: string;
      seconds: number;
      scale: number;
    }[];
    footnote: string;
    cyclesLabel: string;
  };
}

export const UI_STRINGS: Record<Locale, UiStrings> = {
  pl: {
    skipToContent: 'Przejdź do głównej treści',
    chapterLabel: 'Rozdział',
    breathPill: 'Chwila oddechu',
    breathPillAria: 'Otwórz krótkie ćwiczenie oddechowe 4-4-6',
    preloaderSubtitle: 'Psycholog · Psychotraumatolog · Gdynia i online',
    cursors: {
      book: 'Umów',
      about: 'O mnie',
      open: 'Otwórz',
      close: 'Zwiń',
      breath: 'Oddech',
      talk: 'Porozmawiajmy',
      next: 'Dalej',
      calm: 'Spokój',
      office: 'Gabinet',
      silence: 'Cisza',
      choose: 'Wybierz',
      start: 'Start',
    },
    navbar: {
      subtitle: 'Psycholog · Gdynia i online',
      navAria: 'Nawigacja główna',
      mobileNavAria: 'Menu mobilne',
      bookCta: 'Umów konsultację',
      mobileBookCta: 'Umów pierwszą konsultację',
      openMenu: 'Otwórz menu',
      closeMenu: 'Zamknij menu',
      switchToDark: 'Przełącz na tryb ciemny',
      switchToLight: 'Przełącz na tryb jasny',
      langGroupAria: 'Wybierz język strony',
      themeLabelLight: 'Tryb jasny',
      themeLabelDark: 'Tryb ciemny',
    },
    hero: {
      todayWeekend: 'Gdynia Witomino · Śródmieście',
      todayWeekday: 'Trójmiasto · 54°N 18°E',
      portraitAlt: 'mgr Lucyna Grochowska — psycholog, psychotraumatolog i psychoterapeutka w Gdyni',
      portraitAria: 'Przejdź do podstrony O mnie',
      locationsLine: 'Gdynia Witomino · Śródmieście · Online',
      scrollCue: 'Przewiń, aby poznać praktykę',
      confidentiality: 'Pełna poufność · Tajemnica zawodowa · RODO',
      reviewsSuffix: 'opinii · ZnanyLekarz',
    },
    ribbonItems: [
      'Gdynia Witomino',
      'Psychoterapia psychodynamiczna',
      'Gdynia Śródmieście',
      'Psychotraumatologia',
      'Seksuologia kliniczna',
      'Konsultacje online · PL / RU',
      'Stała superwizja',
    ],
    directory: {
      eyebrow: 'Przewodnik po praktyce',
      lines: ['Wszystko, czego potrzebujesz,', 'uporządkowane w spokoju.'],
      italicSubstring: 'w spokoju.',
      breathTitle: 'Chwila oddechu (4–4–6)',
      breathSub: '30 sekund na wyciszenie i spokój',
      cards: [
        {
          page: 'terapia',
          num: '01',
          eyebrow: 'Psychoterapia i konsultacje',
          title: 'Terapia i obszary wsparcia',
          summary:
            'Gdy lęk, żal, ślady traumy czy napięcie w bliskości odbierają codzienny oddech. Zobacz, z czym możesz przyjść i jak łagodnie zaczynamy wspólną pracę.',
          image: PRACTICE.images.gdynia,
          imageAlt: 'Spokojne wnętrze gabinetu psychoterapeutycznego w Gdyni',
          cta: 'Zobacz, w czym pomagam',
        },
        {
          page: 'o-mnie',
          num: '02',
          eyebrow: 'Kliniczna uważność',
          title: 'O mnie i doświadczenie',
          summary:
            'Od poradni i oddziałów szpitalnych po kameralny gabinet w Gdyni. Poznaj moją drogę zawodową, zweryfikowane dyplomy oraz pracę pod stałą superwizją.',
          image: PRACTICE.images.officePortrait,
          imageAlt: 'mgr Lucyna Grochowska — psycholog i psychotraumatolog w swoim gabinecie w Gdyni',
          imagePosition: 'object-top',
          cta: 'Poznaj moją drogę',
        },
        {
          page: 'gabinety',
          num: '03',
          eyebrow: 'Gdynia i online · PL / RU',
          title: 'Gabinety i cennik',
          summary:
            'Dwa spokojne adresy w Gdyni — na Witominie i w Śródmieściu — sesje online oraz wizyty domowe. Sprawdź dojazd, warunki spotkań i odpowiedzi na pytania.',
          image: PRACTICE.images.gdansk,
          imageAlt: 'Jasne wnętrze gabinetu konsultacyjnego w centrum Gdyni',
          cta: 'Sprawdź dojazd i cennik',
        },
      ],
      trustTitle: `ZnanyLekarz · ${PRACTICE.googleProfile.reviewCount} zweryfikowanych opinii`,
      trustQuote: '„Nie ocenia, a wspiera. Czuję się bezpiecznie i mam odwagę do zmian.”',
      trustLocations: 'Gdynia (2 gabinety) · Online',
      trustDiplomas: 'Dyplomy zweryfikowane · PL / RU',
      trustMapCta: 'Mapa i cennik',
      trustZnanyAria: 'Otwórz profil ZnanyLekarz w nowej karcie',
    },
    baltic: {
      ariaLabel: 'Przestrzeń spokoju nad Zatoką Gdańską',
      eyebrow: 'Zatoka Gdańska · Moment zatrzymania',
      region: 'Gdynia · Trójmiasto · Online',
      promptHeading: 'Z czym dziś tu zaglądasz? Wybierz zdanie najbliższe Tobie:',
      imgAlt: 'Spokojny poranek nad Zatoką Gdańską w okolicach Gdyni Orłowa',
      cta: 'Umów pierwszą rozmowę',
      ctaHint: 'Wybrany temat pojawi się od razu w formularzu.',
      moods: [
        {
          id: 'spokoj',
          label: 'Chcę odetchnąć od lęku i smutku',
          topic: 'Stany lękowe, nerwice i depresja',
          title: 'Kiedy napięcie, lęk lub przygnębienie odbierają codzienny oddech.',
          response:
            'Pierwszym krokiem nie jest „wzięcie się w garść”, ale pozwolenie sobie na przyjęcie pomocy. Podczas konsultacji spokojnie poznajemy źródła cierpienia, aby krok po kroku mogła pojawić się prawdziwa ulga.',
        },
        {
          id: 'trauma',
          label: 'Niosę trudne doświadczenia',
          topic: 'Psychotraumatologia, przemoc i strata',
          title: 'Kiedy bolesne przeżycia lub doświadczenie przemocy wciąż dają o sobie znać.',
          response:
            'Jako psychotraumatolog towarzyszę w uważnym, stopniowym oswajaniu śladów traumy, straty oraz zachwianego poczucia bezpieczeństwa — bez pośpiechu, bez oceniania i z pełnym szacunkiem dla Twoich granic.',
        },
        {
          id: 'relacje',
          label: 'Chcę zdrowszych relacji i bliskości',
          topic: 'Relacje, terapia par i młodzież',
          title: 'Kiedy trudno o bezpieczną bliskość, zaufanie lub poczucie własnej wartości.',
          response:
            'Praca w nurcie psychodynamicznym oraz konsultacje dla par i seksuologiczne pomagają zrozumieć powtarzalne mechanizmy w związkach i budować relację ze sobą oraz z bliskimi na solidniejszym fundamencie.',
        },
      ],
    },
    subpages: {
      backHome: 'Powrót na stronę główną',
      nextChapterPrefix: 'Następny rozdział',
      nextChapterCta: 'Przejdź dalej',
      terapia: {
        eyebrow: 'Terapia i obszary wsparcia',
        lines: ['W czym mogę Ci', 'uważnie towarzyszyć.'],
        italicSubstring: 'towarzyszyć.',
        lead: 'Nie musisz przychodzić z gotową diagnozą ani planem. Łączę nurt psychodynamiczny, psychotraumatologię i seksuologię kliniczną — poniżej zobaczysz główne obszary pomocy, przebieg pierwszych spotkań oraz wartości, którymi kieruję się w gabinecie.',
        nextTeaser:
          'Poznaj moje wykształcenie, 8-letnią praktykę kliniczną, etykę pracy oraz głosy pacjentów.',
      },
      oMnie: {
        eyebrow: 'O mnie · mgr Lucyna Grochowska',
        lines: ['Kliniczne doświadczenie', 'i przestrzeń bez oceniania.'],
        italicSubstring: 'bez oceniania.',
        lead: 'Łączę rzetelne przygotowanie kliniczne z uważną, ludzką obecnością. Wierzę, że głęboka zmiana zaczyna się tam, gdzie nie trzeba niczego udawać ani bronić się przed oceną.',
        nextTeaser:
          'Sprawdź oba gabinety w Gdyni, konsultacje online, zweryfikowane profile oraz przejrzysty cennik spotkań.',
      },
      gabinety: {
        eyebrow: 'Praktyka · Gdynia i online (PL / RU)',
        lines: ['Gabinety w Gdyni,', 'sesje online i cennik.'],
        italicSubstring: 'online i cennik.',
        lead: 'Przyjmuję stacjonarnie w dwóch miejscach w Gdyni — na Witominie (ul. Chwarznieńska 136–138) oraz w Śródmieściu (ul. gen. Bema 16/2) — a także online i podczas wizyt domowych. Poniżej znajdziesz dojazd, mapę, zweryfikowane opinie, cennik oraz odpowiedzi na pytania.',
      },
    },
    specialties: {
      eyebrow: 'Obszary wsparcia',
      compactEyebrow: 'Główne obszary wsparcia',
      compactHint: 'Rozwiń wybrany temat, aby przeczytać więcej',
      lines: ['W czym mogę Ci', 'uważnie towarzyszyć.'],
      italicSubstring: 'towarzyszyć.',
      lead: 'Nie musisz mieć gotowej diagnozy, żeby zgłosić się po wsparcie. Rozwiń dowolny obszar poniżej, aby zobaczyć szczegółowy zakres pomocy.',
      approachLabel: 'Forma pracy i podejście',
      cta: 'Umów konsultację w tym obszarze',
    },
    journey: {
      lines: ['Pierwszy krok bywa', 'najtrudniejszy.', 'Dalej idziemy spokojnie.'],
      italicSubstring: 'Dalej idziemy spokojnie.',
      lead: 'Nie musisz mieć gotowych odpowiedzi ani sprecyzowanego planu. Pierwsze konsultacje służą temu, byśmy mogli spokojnie zrozumieć, z czym się mierzysz.',
      cta: 'Umów pierwszą konsultację',
      stepPrefix: 'Krok',
      cardFooter: 'Gdynia · Online (PL / RU)',
    },
    philosophy: {
      srHeading: 'Filozofia pracy terapeutycznej',
      quoteAccent: 'poczuć prawdziwą ulgę w codziennym funkcjonowaniu.',
      stillLifeAlt: 'Spokojne poranne światło na tynku i gałązka eukaliptusa w gabinecie',
    },
    about: {
      lines: ['Łączę kliniczną', 'rzetelność z uważną,', 'ludzką obecnością.'],
      italicSubstring: 'ludzką obecnością.',
      officeAlt: 'mgr Lucyna Grochowska w swoim gabinecie psychologicznym w Gdyni',
      verifiedTitle: 'Dyplomy zweryfikowane przez TwójPsycholog.pl',
      tabsHeading: 'Wykształcenie, doświadczenie kliniczne i standardy pracy',
      tabsAria: 'Kwalifikacje i standardy',
      plate: {
        approachLabel: 'Nurt pracy',
        approachVal: 'Psychodynamiczny',
        specLabel: 'Specjalizacje',
        specVal: 'Trauma · Seksuologia',
        langLabel: 'Języki i standard',
        langVal: 'PL / RU · Superwizja',
        locLabel: 'Lokalizacja',
        locVal: 'Gdynia · Online',
      },
    },
    manifesto: {
      ariaLabel: 'Manifest terapeutyczny',
      eyebrow: 'Sedno spotkania',
      text: 'Terapia nie polega na tym, by stać się kimś innym. Polega na tym, by w bezpiecznej relacji odzyskać spokój, jasność i kontakt ze sobą.',
      highlightWords: ['bezpiecznej', 'relacji', 'spokój,', 'jasność', 'sobą.'],
      footerRegion: 'Gdynia · Trójmiasto · Online (PL / RU)',
    },
    empathy: {
      lines: ['Na zewnątrz wszystko', 'wygląda na poukładane.'],
      italicSubstring: 'poukładane.',
      breathBtnTitle: 'Czujesz dziś napięcie? Zatrzymaj się na 30 sekund',
      breathBtnSub: 'Ćwiczenie oddechowe 4–4–6 na uspokojenie układu nerwowego',
      archAlt: 'Światło poranne na ciepłym łuku tynku — symbol spokoju i przestrzeni',
    },
    testimonials: {
      ariaLabel: 'Słowa pacjentów',
      eyebrow: 'Głosy pacjentów',
      headingPrefix: 'Doświadczenie osób, które zdecydowały się',
      headingItalic: 'zrobić pierwszy krok.',
      verifiedNote: 'Zweryfikowane opinie 5,0 / 5 z portalu ZnanyLekarz.pl',
      prevAria: 'Poprzednia opinia',
      nextAria: 'Następna opinia',
      showReviewAria: 'Pokaż opinię',
      reflections: [
        {
          id: 'r1',
          quote:
            'Serdecznie polecam Panią psycholog. Akceptuje Pani moje dziwactwa, nie ocenia, a wspiera. Czuję się bezpiecznie i mam dzięki temu odwagę do zmian koniecznych do lepszego życia. Pani z dużą wiedzą i doświadczeniem, co da się odczuć. Dziękuję.',
          author: 'Anita',
          context: 'Psychoterapia · maj 2026 · ZnanyLekarz.pl',
          location: 'Wizyta zweryfikowana · 5,0',
        },
        {
          id: 'r2',
          quote:
            'Pani psycholog słuchała mnie z uwagą i z takim głębokim zainteresowaniem, jakiego nigdy wcześniej nie zaznałam. Pani Lucyna nie jest osobą kogokolwiek oceniającą, tylko wspierającą i naprawdę głęboko rozumiejącą. Polecam ją każdemu, kto czuje, że potrzebuje pomocy — zazna wyłącznie wsparcia i prawdziwego zrozumienia.',
          author: 'Monika',
          context: 'Konsultacja psychologiczna · czerwiec 2025 · ZnanyLekarz.pl',
          location: 'Wizyta zweryfikowana · 5,0',
        },
        {
          id: 'r3',
          quote:
            'Swobodna atmosfera i profesjonalne podejście. Szukanie rozwiązań, nic nie jest narzucane! Na pewno Pani Lucyna pomoże odnaleźć odpowiednią drogę — tę z uśmiechem.',
          author: 'Joanna',
          context: 'Badania psychologiczne · maj 2025 · ZnanyLekarz.pl',
          location: 'Wizyta zweryfikowana · 5,0',
        },
        {
          id: 'r4',
          quote:
            'Jestem bardzo zadowolony z wizyty i na pewno umówię się kolejny raz. Długo nie mogłem się zdecydować, ale odważyłem się i jestem bardzo zadowolony.',
          author: 'P.K.',
          context: 'Konsultacja psychologiczna · lipiec 2025 · ZnanyLekarz.pl',
          location: 'Wizyta zweryfikowana · 5,0',
        },
      ],
      triptych: [
        {
          src: PRACTICE.images.officePortrait,
          pos: 'object-top',
          alt: 'mgr Lucyna Grochowska w gabinecie psychologicznym w Gdyni na Witominie',
          caption: 'Gdynia Witomino · gabinet przy ul. Chwarznieńskiej',
        },
        {
          src: PRACTICE.images.sanctuaryTea,
          pos: 'object-center',
          alt: 'Ceramiczna filiżanka herbaty na drewnianym stoliku w świetle dziennym',
          caption: 'Spokojny rytm spotkania w nurcie psychodynamicznym',
        },
        {
          src: PRACTICE.images.gdynia,
          pos: 'object-center',
          alt: 'Wnętrze gabinetu w Przychodni Medyczna Gdynia w Śródmieściu',
          caption: 'Gdynia Śródmieście · Przychodnia Medyczna Gdynia',
        },
      ],
    },
    locations: {
      compactHeading: 'Wybierz lokalizację · Gdynia Witomino, Śródmieście lub online',
      eyebrow: 'Gabinety w Gdyni i online (PL / RU)',
      lines: ['Kameralne przestrzenie', 'w Gdyni oraz online.'],
      italicSubstring: 'Gdyni oraz online.',
      tablistAria: 'Wybierz lokalizację gabinetu',
      imgAltPrefix: 'Gabinet psychologiczny —',
      askSlotPrefix: 'Zapytaj o termin',
      mapsLabel: 'Google Maps',
      bilingualNote: 'Консультации и психотерапия также на русском языке — онлайн и в Гдыне.',
      bilingualNoteLang: 'ru',
    },
    pricing: {
      lines: ['Przejrzyste warunki', 'od pierwszego spotkania.'],
      italicSubstring: 'pierwszego spotkania.',
      mostChosen: 'Najczęściej wybierane',
      cta: 'Umów wizytę',
      pineAlt: 'Nadmorska ścieżka wśród bałtyckich sosen prowadząca ku spokojnej linii morza',
    },
    googleProfile: {
      eyebrow: 'Zweryfikowane profile · ZnanyLekarz · TwójPsycholog',
      lines: ['Zweryfikowane dyplomy', 'i pełne zaufanie pacjentów.'],
      italicSubstring: 'zaufanie pacjentów.',
      lead: 'Sprawdź potwierdzone opinie pacjentów na portalu ZnanyLekarz, zweryfikowane dyplomy w serwisie TwójPsycholog oraz lokalizacje obu gabinetów w Gdyni.',
      starsAria: 'Ocena 5 na 5 gwiazdek',
      reviewsCountSuffix: 'zweryfikowanych opinii · ZnanyLekarz.pl',
      diplomasSubtitleSuffix: 'Dyplomy zweryfikowane przez TwójPsycholog.pl',
      verifiedBadge: 'Dyplomy zweryfikowane',
      znanyBtn: 'Profil ZnanyLekarz (5,0)',
      twojBtn: 'Profil TwójPsycholog',
      mapsLink: 'Google Maps',
      fbLink: 'Facebook',
      star5Aria: '5 gwiazdek',
      mapAria: 'Interaktywna mapa gabinetów mgr Lucyny Grochowskiej na Witominie i w Śródmieściu Gdyni',
      mapTitle: 'Mapa gabinetów — Gdynia Witomino i Gdynia Śródmieście',
      mapBay: 'ZATOKA GDAŃSKA',
      mapOrlowo: 'ORŁOWO · SOPOT',
      mapSrodmiescie: 'ŚRÓDMIEŚCIE · BEMA 16/2',
      mapWitomino: 'WITOMINO · CHWARZNIEŃSKA',
      tabWitomino: 'Witomino',
      tabSrodmiescie: 'Śródmieście',
      pinSrodmiescieAria: 'Wybierz gabinet Gdynia Śródmieście — ul. Bema 16/2',
      pinWitominoAria: 'Wybierz gabinet Gdynia Witomino — ul. Chwarznieńska 136–138',
      transitWitomino: 'Witomino · Gabinet prywatny · ZKM / Obwodnica',
      transitSrodmiescie: 'Śródmieście · Medyczna Gdynia · 7 min od SKM',
      routeBtn: 'Wyznacz trasę w Google Maps',
    },
    faq: {
      eyebrow: 'Pytania i odpowiedzi',
      lines: ['Wszystko, o co', 'możesz chcieć', 'zapytać przed wizytą.'],
      italicSubstring: 'przed wizytą.',
      avatarAlt: 'mgr Lucyna Grochowska — psycholog Gdynia',
      doubtTitle: 'Masz jeszcze wątpliwości?',
      doubtCta: 'Umów pierwszą konsultację (50 min)',
      cornerAlt: 'Kameralny fotel i stolik z trawertynu w popołudniowym świetle gabinetu',
    },
    booking: {
      eyebrow: 'Rezerwacja konsultacji',
      title: 'Zróbmy spokojny pierwszy krok.',
      closeAria: 'Zamknij panel rezerwacji',
      sessionTypes: [
        'Konsultacja psychologiczna / psychoterapeutyczna (50 min · 200–210 zł)',
        'Psychoterapia indywidualna — psychodynamiczna (50–60 min · 200–210 zł)',
        'Psychotraumatologia / Seksuologia / Terapia par (50 min · 200–210 zł)',
        'Interwencja kryzysowa, badania, ocena stanu psychicznego (od 210 zł)',
        'Wizyta domowa na terenie Gdyni (430 zł)',
      ],
      locations: ['Gdynia Witomino', 'Gdynia Śródmieście', 'Online (wideo / telefon)'] as const,
      timeSlots: ['Poranek (08:30–12:00)', 'Popołudnie (12:00–16:00)', 'Wieczór (16:00–20:00)'],
      locationMeta: [
        'ul. Chwarznieńska 136–138 (wejście wspólne z rehabilitacją, w lewo, 3. gabinet) · PL / RU',
        'Przychodnia Medyczna Gdynia (ul. gen. Bema 16/2 · tel. 58 500 46 87 / 88)',
        'Wideokonsultacja lub rozmowa telefoniczna (język polski / rosyjski)',
      ] as const,
      nearestSlot: 'Najbliższy wolny termin',
      homeVisitLocationLabel: 'Wizyta domowa (Gdynia)',
      homeVisitHint: 'Wizyta domowa na terenie Gdyni — podaj dzielnicę w wiadomości poniżej.',
      step1: '1. Wybierz formę spotkania',
      step2: '2. Lokalizacja',
      step3: 'Preferowany dzień i pora',
      nameLabel: 'Imię *',
      namePlaceholder: 'np. Anna',
      phoneLabel: 'Telefon (lub e-mail) *',
      phonePlaceholder: 'np. 500 000 000',
      emailLabel: 'Adres e-mail (do potwierdzenia terminu)',
      emailPlaceholder: 'np. anna@example.pl',
      noteLabel: 'Krótka wiadomość (opcjonalnie)',
      notePlaceholder: 'Wystarczy jedno zdanie lub preferowane godziny.',
      noteTopicPrefix: 'Obszar, o którym chcę porozmawiać:',
      consentPrefix:
        'Wyrażam zgodę na kontakt zwrotny w celu ustalenia terminu konsultacji oraz potwierdzam zapoznanie się z',
      consentLink: 'Polityką prywatności i RODO',
      submitBtn: 'Wyślij zapytanie o termin',
      sendingBtn: 'Wysyłanie zgłoszenia…',
      recipientPrefix: 'Wiadomość trafia na',
      externalCalendar: 'Wolisz kalendarz zewnętrzny?',
      errors: {
        name: 'Podaj proszę swoje imię.',
        contact: 'Podaj numer telefonu lub adres e-mail, abym mogła odpowiedzieć.',
        phoneShort: 'Numer telefonu wydaje się zbyt krótki — sprawdź proszę cyfry lub podaj e-mail.',
        emailInvalid: 'Sprawdź proszę poprawność adresu e-mail.',
        consent: 'Potwierdź proszę zgodę na kontakt zwrotny (RODO).',
      },
      successTitlePrefix: 'Dziękuję,',
      fallbackTitlePrefix: 'Prawie gotowe,',
      successBodyBefore: 'Twoje zapytanie o termin zostało wysłane na skrzynkę gabinetu (',
      successBodyAfter:
        '). Odpowiadam osobiście w ciągu 24 godzin w dni robocze z propozycją dokładnej godziny.',
      fallbackBodyBefore:
        'Nie udało się teraz potwierdzić automatycznej wysyłki — prawdopodobnie z powodu chwilowej przerwy połączenia. Możesz wysłać przygotowane zapytanie jednym kliknięciem ze swojej poczty na adres ',
      fallbackBodyAfter: ' lub skopiować jego treść:',
      summaryHeading: 'Podsumowanie zgłoszenia',
      contactLabel: 'Kontakt:',
      sendEmailBtn: 'Wyślij przez program pocztowy',
      copyBtn: 'Kopiuj treść',
      copiedBtn: 'Skopiowano',
      editDataBtn: '← Popraw dane',
      backToSiteBtn: 'Wróć na stronę',
      mailtoSubjectPrefix: '[Rezerwacja]',
      mailtoGreeting: 'Dzień dobry,',
      summaryFields: {
        name: 'Imię',
        phone: 'Telefon',
        email: 'E-mail pacjenta',
        sessionType: 'Rodzaj spotkania',
        location: 'Forma / Lokalizacja',
        day: 'Preferowany dzień',
        time: 'Preferowana pora',
        message: 'Wiadomość',
        noMessage: '(brak dodatkowej wiadomości)',
        notProvided: 'Nie podano',
        rodo: 'Zgoda RODO',
        rodoValue: 'Tak — zgoda na kontakt zwrotny w celu umówienia wizyty',
      },
    },
    footer: {
      eyebrow: 'Pierwszy krok',
      lines: ['Nie musisz mieć wszystkiego', 'poukładanego, żeby zacząć.'],
      cta: 'Umów konsultację',
      replyNote: 'Odpowiadam zwykle w ciągu 24 godzin w dni robocze.',
      contactHeading: 'Kontakt bezpośredni',
      copyPhoneAria: 'Kopiuj numer telefonu',
      copyEmailAria: 'Kopiuj adres e-mail',
      copied: 'Skopiowano',
      clinicNoteBefore: 'Rejestracja telefoniczna Przychodni Medyczna Gdynia (',
      clinicNoteAfter: '). Wizytę możesz też umówić przez formularz lub oficjalne profile:',
      locationsHeading: 'Lokalizacje',
      onlineLabel: 'Wideo i telefon',
      onlineSub: 'Spotkania wideo i telefoniczne · PL / RU',
      bilingualNote: 'Консультации также на русском языке — в Гдыне и онлайн.',
      bilingualNoteLang: 'ru',
      navHeading: 'Nawigacja',
      navAria: 'Nawigacja w stopce',
      crisisHeading: 'Pilna pomoc w kryzysie',
      crisisIntro:
        'Gabinet nie prowadzi całodobowego dyżuru interwencyjnego. W sytuacji nagłego kryzysu psychicznego skontaktuj się bezpłatnie:',
      copyrightSuffix: 'Gabinet Psychologiczny · Gdynia i online',
      privacyBtn: 'Polityka prywatności i RODO',
      backToTop: 'Powrót na górę ↑',
    },
    privacy: {
      dialogAria: 'Polityka prywatności i RODO',
      eyebrow: 'Informacja prawna',
      title: 'Polityka prywatności i RODO',
      closeAria: 'Zamknij okno',
      sections: [
        {
          heading: '1. Administrator danych:',
          body: `Administratorem danych osobowych przekazywanych przez formularz kontaktowy jest ${PRACTICE.fullName} — Prywatny Gabinet Psychologiczny (Gdynia, ul. Chwarznieńska 136–138), kontakt: ${PRACTICE.email}.`,
        },
        {
          heading: '2. Cel i zakres przetwarzania:',
          body: 'Dane (imię, numer telefonu, adres e-mail oraz dobrowolna treść wiadomości) przetwarzane są wyłącznie w celu odpowiedzi na zapytanie i ustalenia terminu konsultacji (art. 6 ust. 1 lit. a i b RODO). W pierwszym zgłoszeniu proszę o niezamieszczanie szczegółowej dokumentacji ani wrażliwych danych medycznych — szczegóły omawiamy bezpiecznie podczas spotkania.',
        },
        {
          heading: '3. Tajemnica zawodowa:',
          body: 'Informacje powierzane podczas kontaktu i spotkań podlegają tajemnicy zawodowej psychologa i nie są udostępniane podmiotom nieuprawnionym. Wiadomość z formularza przekazywana jest szyfrowanym połączeniem HTTPS na skrzynkę e-mail gabinetu.',
        },
        {
          heading: '4. Prawa osoby:',
          body: `Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania w dowolnym momencie, pisząc na adres ${PRACTICE.email}, a także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.`,
        },
      ],
      confirmBtn: 'Rozumiem',
    },
    breathing: {
      dialogAria: 'Ćwiczenie oddechowe 4-4-6',
      closeAria: 'Zamknij ćwiczenie oddechowe',
      eyebrow: 'Chwila regulacji · Rytm 4–4–6',
      phases: [
        { key: 'inhale', label: 'Spokojny wdech', hint: 'Powoli przez nos', seconds: 4, scale: 1.38 },
        { key: 'hold', label: 'Zatrzymaj oddech', hint: 'Rozluźnij barki i szczękę', seconds: 4, scale: 1.38 },
        { key: 'exhale', label: 'Długi wydech', hint: 'Powoli wypuść powietrze', seconds: 6, scale: 0.88 },
      ],
      footnote: 'Wydłużony wydech stymuluje nerw błędny i obniża fizjologiczne napięcie.',
      cyclesLabel: 'Ukończone cykle:',
    },
  },

  ru: {
    skipToContent: 'Перейти к основному содержанию',
    chapterLabel: 'Раздел',
    breathPill: 'Минута дыхания',
    breathPillAria: 'Открыть короткое дыхательное упражнение 4-4-6',
    preloaderSubtitle: 'Психолог · Психотравматолог · Гдыня и онлайн',
    cursors: {
      book: 'Запись',
      about: 'Обо мне',
      open: 'Открыть',
      close: 'Свернуть',
      breath: 'Дыхание',
      talk: 'Поговорим',
      next: 'Далее',
      calm: 'Покой',
      office: 'Кабинет',
      silence: 'Тишина',
      choose: 'Выбрать',
      start: 'Начать',
    },
    navbar: {
      subtitle: 'Психолог · Гдыня и онлайн',
      navAria: 'Основная навигация',
      mobileNavAria: 'Мобильное меню',
      bookCta: 'Записаться',
      mobileBookCta: 'Записаться на первую консультацию',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      switchToDark: 'Включить тёмную тему',
      switchToLight: 'Включить светлую тему',
      langGroupAria: 'Выбрать язык сайта',
      themeLabelLight: 'Светлая тема',
      themeLabelDark: 'Тёмная тема',
    },
    hero: {
      todayWeekend: 'Гдыня Витомино · Центр',
      todayWeekday: 'Труймясто · 54°N 18°E',
      portraitAlt: 'mgr Луцина Гроховская — психолог, психотравматолог и психотерапевт в Гдыне',
      portraitAria: 'Перейти в раздел Обо мне',
      locationsLine: 'Гдыня Витомино · Центр · Онлайн',
      scrollCue: 'Листайте вниз, чтобы познакомиться с практикой',
      confidentiality: 'Полная конфиденциальность · Тайна приёма · GDPR',
      reviewsSuffix: 'отзывов · ZnanyLekarz',
    },
    ribbonItems: [
      'Гдыня Витомино',
      'Психодинамическая терапия',
      'Гдыня Центр',
      'Психотравматология',
      'Клиническая сексология',
      'Консультации онлайн · RU / PL',
      'Постоянная супервизия',
    ],
    directory: {
      eyebrow: 'Навигатор по практике',
      lines: ['Всё самое важное —', 'собранно и спокойно.'],
      italicSubstring: 'и спокойно.',
      breathTitle: 'Пауза дыхания (4–4–6)',
      breathSub: '30 секунд для мягкого выдоха и спокойствия',
      cards: [
        {
          page: 'terapia',
          num: '01',
          eyebrow: 'Психотерапия и консультации',
          title: 'Терапия и направления помощи',
          summary:
            'Когда тревога, боль, следы травмы или напряжение в отношениях мешают свободно дышать. Посмотрите, с чем можно прийти и как бережно мы начинаем работу.',
          image: PRACTICE.images.gdynia,
          imageAlt: 'Спокойный интерьер психотерапевтического кабинета в Гдыне',
          cta: 'Чем я могу помочь',
        },
        {
          page: 'o-mnie',
          num: '02',
          eyebrow: 'Клиническая бережность',
          title: 'Обо мне и опыт',
          summary:
            'От клиник и больничных отделений до камерного кабинета в Гдыне. Узнайте о моём профессиональном пути, подтверждённых дипломах и работе под супервизией.',
          image: PRACTICE.images.officePortrait,
          imageAlt: 'mgr Луцина Гроховская — психолог и психотравматолог в своём кабинете в Гдыне',
          imagePosition: 'object-top',
          cta: 'Узнать мой путь',
        },
        {
          page: 'gabinety',
          num: '03',
          eyebrow: 'Гдыня и онлайн · RU / PL',
          title: 'Кабинеты и цены',
          summary:
            'Два спокойных адреса в Гдыне — в Витомино и в центре — а также онлайн-сессии и визиты на дом. Посмотрите доезд, условия встреч и ответы на частые вопросы.',
          image: PRACTICE.images.gdansk,
          imageAlt: 'Светлый интерьер консультационного кабинета в центре Гдыни',
          cta: 'Адреса и стоимость',
        },
      ],
      trustTitle: `ZnanyLekarz · ${PRACTICE.googleProfile.reviewCount} подтверждённых отзывов`,
      trustQuote: '«Не осуждает, а поддерживает. Я чувствую себя в безопасности и нахожу смелость для перемен.»',
      trustLocations: 'Гдыня (2 кабинета) · Онлайн',
      trustDiplomas: 'Дипломы подтверждены · RU / PL',
      trustMapCta: 'Карта и цены',
      trustZnanyAria: 'Открыть профиль ZnanyLekarz в новой вкладке',
    },
    baltic: {
      ariaLabel: 'Пространство тишины у Гданьского залива',
      eyebrow: 'Гданьский залив · Минута тишины',
      region: 'Гдыня · Труймясто · Онлайн',
      promptHeading: 'С чем вы заглянули сюда сегодня? Выберите фразу, которая ближе всего:',
      imgAlt: 'Спокойное утро на берегу Гданьского залива рядом с Гдыней Орлово',
      cta: 'Записаться на первую беседу',
      ctaHint: 'Выбранная тема сразу подставится в форму записи.',
      moods: [
        {
          id: 'spokoj',
          label: 'Хочу передохнуть от тревоги и грусти',
          topic: 'Тревожные состояния, неврозы и депрессия',
          title: 'Когда напряжение, тревога или подавленность отнимают ежедневные силы.',
          response:
            'Первый шаг — не «взять себя в руки», а позволить себе принять поддержку. На консультациях мы спокойно разбираемся в причинах переживаний, чтобы постепенно пришло настоящее облегчение.',
        },
        {
          id: 'trauma',
          label: 'Несу тяжёлый жизненный опыт',
          topic: 'Психотравматология, насилие и утрата',
          title: 'Когда болезненные события или опыт насилия всё ещё напоминают о себе.',
          response:
            'Как психотравматолог я сопровождаю в бережном, постепенном проживании последствий травмы, утраты и пошатнувшегося чувства безопасности — без спешки, без оценок и с уважением к вашим границам.',
        },
        {
          id: 'relacje',
          label: 'Хочу более здоровых отношений и близости',
          topic: 'Отношения, терапия пар и подростки',
          title: 'Когда трудно построить безопасную близость, доверие или опору в себе.',
          response:
            'Психодинамическая работа, парные и сексологические консультации помогают увидеть повторяющиеся сценарии в отношениях и выстроить более надёжный контакт с собой и с близкими.',
        },
      ],
    },
    subpages: {
      backHome: 'На главную страницу',
      nextChapterPrefix: 'Следующий раздел',
      nextChapterCta: 'Перейти далее',
      terapia: {
        eyebrow: 'Терапия и направления помощи',
        lines: ['В чём я могу', 'бережно вас поддержать.'],
        italicSubstring: 'вас поддержать.',
        lead: 'Не нужно приходить с готовым диагнозом или чётким планом. Я соединяю психодинамический подход, психотравматологию и клиническую сексологию — ниже вы увидите ключевые темы работы, ход первых встреч и мои профессиональные принципы.',
        nextTeaser:
          'Познакомьтесь с моим образованием, 8-летней клинической практикой, этикой работы и отзывами клиентов.',
      },
      oMnie: {
        eyebrow: 'Обо мне · mgr Луцина Гроховская',
        lines: ['Клинический опыт', 'и пространство без осуждения.'],
        italicSubstring: 'без осуждения.',
        lead: 'Я объединяю основательную клиническую подготовку с живым, внимательным человеческим присутствием. Верю, что глубокие перемены начинаются там, где не нужно притворяться и защищаться от оценок.',
        nextTeaser:
          'Посмотрите оба кабинета в Гдыне, формат онлайн-встреч, подтверждённые профили и прозрачный прайс-лист.',
      },
      gabinety: {
        eyebrow: 'Практика · Гдыня и онлайн (RU / PL)',
        lines: ['Кабинеты в Гдыне,', 'онлайн-сессии и цены.'],
        italicSubstring: 'онлайн-сессии и цены.',
        lead: 'Я принимаю очно по двум адресам в Гдыне — в Витомино (ul. Chwarznieńska 136–138) и в центре (ul. gen. Bema 16/2) — а также онлайн и на визитах на дом. Ниже — как добраться, карта, подтверждённые отзывы, цены и ответы на вопросы.',
      },
    },
    specialties: {
      eyebrow: 'Направления помощи',
      compactEyebrow: 'Основные направления помощи',
      compactHint: 'Раскройте интересующую тему, чтобы прочитать подробнее',
      lines: ['В чём я могу', 'бережно вас поддержать.'],
      italicSubstring: 'вас поддержать.',
      lead: 'Не нужно иметь готовый диагноз, чтобы обратиться за поддержкой. Раскройте любое направление ниже, чтобы увидеть подробный спектр помощи.',
      approachLabel: 'Формат работы и подход',
      cta: 'Записаться на консультацию по этой теме',
    },
    journey: {
      lines: ['Первый шаг бывает', 'самым непростым.', 'Дальше идём спокойно.'],
      italicSubstring: 'Дальше идём спокойно.',
      lead: 'Не нужно знать все ответы заранее. Первые консультации нужны для того, чтобы спокойно понять, с чем именно вы сталкиваетесь сейчас.',
      cta: 'Записаться на первую консультацию',
      stepPrefix: 'Шаг',
      cardFooter: 'Гдыня · Онлайн (RU / PL)',
    },
    philosophy: {
      srHeading: 'Философия терапевтической работы',
      quoteAccent: 'настоящее облегчение в повседневной жизни.',
      stillLifeAlt: 'Спокойный утренний свет на стене и ветка эвкалипта в кабинете',
    },
    about: {
      lines: ['Объединяю клиническую', 'точность с бережным', 'человеческим присутствием.'],
      italicSubstring: 'человеческим присутствием.',
      officeAlt: 'mgr Луцина Гроховская в своём психологическом кабинете в Гдыне',
      verifiedTitle: 'Дипломы подтверждены порталом TwójPsycholog.pl',
      tabsHeading: 'Образование, клинический опыт и стандарты работы',
      tabsAria: 'Квалификация и стандарты',
      plate: {
        approachLabel: 'Подход',
        approachVal: 'Психодинамический',
        specLabel: 'Специализации',
        specVal: 'Травма · Сексология',
        langLabel: 'Языки и стандарт',
        langVal: 'RU / PL · Супервизия',
        locLabel: 'Локация',
        locVal: 'Гдыня · Онлайн',
      },
    },
    manifesto: {
      ariaLabel: 'Терапевтический манифест',
      eyebrow: 'Суть встречи',
      text: 'Терапия нужна не для того, чтобы стать кем-то другим. Она нужна, чтобы в безопасных отношениях вернуть спокойствие, ясность и контакт с собой.',
      highlightWords: ['безопасных', 'отношениях', 'спокойствие,', 'ясность', 'собой.'],
      footerRegion: 'Гдыня · Труймясто · Онлайн (RU / PL)',
    },
    empathy: {
      lines: ['Снаружи кажется, что', 'всё под контролем.'],
      italicSubstring: 'под контролем.',
      breathBtnTitle: 'Чувствуете сейчас напряжение? Остановитесь на 30 секунд',
      breathBtnSub: 'Дыхательное упражнение 4–4–6 для успокоения нервной системы',
      archAlt: 'Утренний свет на тёплой арке — символ тишины и пространства',
    },
    testimonials: {
      ariaLabel: 'Отзывы клиентов',
      eyebrow: 'Голоса клиентов',
      headingPrefix: 'Опыт людей, которые решились',
      headingItalic: 'сделать первый шаг.',
      verifiedNote: 'Подтверждённые отзывы 5,0 / 5 на ZnanyLekarz.pl (перевод с польского)',
      prevAria: 'Предыдущий отзыв',
      nextAria: 'Следующий отзыв',
      showReviewAria: 'Показать отзыв',
      reflections: [
        {
          id: 'r1',
          quote:
            'От всей души рекомендую пани психолога. Принимает мои особенности, не осуждает, а поддерживает. Я чувствую себя в безопасности и благодаря этому нахожу смелость для перемен, необходимых для лучшей жизни. Ощущаются глубокие знания и большой опыт. Спасибо.',
          author: 'Anita',
          context: 'Психотерапия · май 2026 · ZnanyLekarz.pl',
          location: 'Визит подтверждён · 5,0',
        },
        {
          id: 'r2',
          quote:
            'Пани психолог слушала меня с таким вниманием и глубоким интересом, какого я раньше никогда не встречала. Пани Луцина никого не оценивает, а действительно поддерживает и глубоко понимает. Рекомендую каждому, кто чувствует, что нуждается в помощи — здесь вы встретите только поддержку и подлинное понимание.',
          author: 'Monika',
          context: 'Психологическая консультация · июнь 2025 · ZnanyLekarz.pl',
          location: 'Визит подтверждён · 5,0',
        },
        {
          id: 'r3',
          quote:
            'Свободная, спокойная атмосфера и профессиональный подход. Совместный поиск решений, ничего не навязывается! Пани Луцина точно поможет найти правильный путь — тот, на котором снова появляется улыбка.',
          author: 'Joanna',
          context: 'Психологическая диагностика · май 2025 · ZnanyLekarz.pl',
          location: 'Визит подтверждён · 5,0',
        },
        {
          id: 'r4',
          quote:
            'Я очень доволен визитом и обязательно запишусь снова. Долго не мог решиться, но всё-таки сделал этот шаг и остался очень доволен.',
          author: 'P.K.',
          context: 'Психологическая консультация · июль 2025 · ZnanyLekarz.pl',
          location: 'Визит подтверждён · 5,0',
        },
      ],
      triptych: [
        {
          src: PRACTICE.images.officePortrait,
          pos: 'object-top',
          alt: 'mgr Луцина Гроховская в психологическом кабинете в Гдыне Витомино',
          caption: 'Гдыня Витомино · кабинет на ul. Chwarznieńska',
        },
        {
          src: PRACTICE.images.sanctuaryTea,
          pos: 'object-center',
          alt: 'Керамическая чашка чая на деревянном столике в дневном свете',
          caption: 'Спокойный ритм встреч в психодинамическом подходе',
        },
        {
          src: PRACTICE.images.gdynia,
          pos: 'object-center',
          alt: 'Интерьер кабинета в клинике Medyczna Gdynia в центре Гдыни',
          caption: 'Гдыня Центр · клиника Medyczna Gdynia',
        },
      ],
    },
    locations: {
      compactHeading: 'Выберите локацию · Гдыня Витомино, Центр или онлайн',
      eyebrow: 'Кабинеты в Гдыне и онлайн (RU / PL)',
      lines: ['Камерные пространства', 'в Гдыне и онлайн.'],
      italicSubstring: 'в Гдыне и онлайн.',
      tablistAria: 'Выберите расположение кабинета',
      imgAltPrefix: 'Психологический кабинет —',
      askSlotPrefix: 'Уточнить время',
      mapsLabel: 'Google Maps',
      bilingualNote: 'Konsultacje i psychoterapia prowadzone są również w języku polskim — w Gdyni i online.',
      bilingualNoteLang: 'pl',
    },
    pricing: {
      lines: ['Прозрачные условия', 'с первой встречи.'],
      italicSubstring: 'с первой встречи.',
      mostChosen: 'Выбирают чаще всего',
      cta: 'Записаться',
      pineAlt: 'Прибрежная тропа среди балтийских сосен, ведущая к спокойному морю',
    },
    googleProfile: {
      eyebrow: 'Подтверждённые профили · ZnanyLekarz · TwójPsycholog',
      lines: ['Подтверждённые дипломы', 'и высокое доверие клиентов.'],
      italicSubstring: 'доверие клиентов.',
      lead: 'Посмотрите подтверждённые отзывы клиентов на портале ZnanyLekarz, проверенные дипломы на сервисе TwójPsycholog и расположение обоих кабинетов в Гдыне.',
      starsAria: 'Оценка 5 из 5 звёзд',
      reviewsCountSuffix: 'подтверждённых отзывов · ZnanyLekarz.pl',
      diplomasSubtitleSuffix: 'Дипломы подтверждены сервисом TwójPsycholog.pl',
      verifiedBadge: 'Дипломы подтверждены',
      znanyBtn: 'Профиль ZnanyLekarz (5,0)',
      twojBtn: 'Профиль TwójPsycholog',
      mapsLink: 'Google Maps',
      fbLink: 'Facebook',
      star5Aria: '5 звёзд',
      mapAria: 'Интерактивная карта кабинетов mgr Луцины Гроховской в Витомино и центре Гдыни',
      mapTitle: 'Карта кабинетов — Гдыня Витомино и Центр Гдыни',
      mapBay: 'ГДАНЬСКИЙ ЗАЛИВ',
      mapOrlowo: 'ОРЛОВО · СОПОТ',
      mapSrodmiescie: 'ЦЕНТР · BEMA 16/2',
      mapWitomino: 'ВИТОМИНО · CHWARZNIEŃSKA',
      tabWitomino: 'Витомино',
      tabSrodmiescie: 'Центр',
      pinSrodmiescieAria: 'Выбрать кабинет Гдыня Центр — ul. Bema 16/2',
      pinWitominoAria: 'Выбрать кабинет Гдыня Витомино — ul. Chwarznieńska 136–138',
      transitWitomino: 'Витомино · Частный кабинет · ZKM / Объездная',
      transitSrodmiescie: 'Центр · Medyczna Gdynia · 7 мин от SKM',
      routeBtn: 'Построить маршрут в Google Maps',
    },
    faq: {
      eyebrow: 'Вопросы и ответы',
      lines: ['Всё, о чём', 'хочется спросить', 'перед встречей.'],
      italicSubstring: 'перед встречей.',
      avatarAlt: 'mgr Луцина Гроховская — психолог в Гдыне',
      doubtTitle: 'Остались сомнения или вопросы?',
      doubtCta: 'Записаться на первую консультацию (50 мин)',
      cornerAlt: 'Уютное кресло и столик из травертина в мягком дневном свете кабинета',
    },
    booking: {
      eyebrow: 'Запись на консультацию',
      title: 'Сделаем спокойный первый шаг.',
      closeAria: 'Закрыть панель записи',
      sessionTypes: [
        'Психологическая / психотерапевтическая консультация (50 мин · 200–210 zł)',
        'Индивидуальная психотерапия — психодинамическая (50–60 мин · 200–210 zł)',
        'Психотравматология / Сексология / Терапия пар (50 мин · 200–210 zł)',
        'Кризисная помощь, диагностика, оценка состояния (от 210 zł)',
        'Визит на дом по Гдыне (430 zł)',
      ],
      locations: ['Гдыня Витомино', 'Гдыня Центр', 'Онлайн (видео / телефон)'] as const,
      timeSlots: ['Утро (08:30–12:00)', 'День (12:00–16:00)', 'Вечер (16:00–20:00)'],
      locationMeta: [
        'ul. Chwarznieńska 136–138 (вход с реабилитацией, налево, 3-й кабинет) · RU / PL',
        'Клиника Medyczna Gdynia (ul. gen. Bema 16/2 · тел. 58 500 46 87 / 88)',
        'Видеоконсультация или телефонная беседа (русский / польский язык)',
      ] as const,
      nearestSlot: 'Ближайшее свободное время',
      homeVisitLocationLabel: 'Визит на дом (Гдыня)',
      homeVisitHint: 'Визит на дом на территории Гдыни — укажите район в сообщении ниже.',
      step1: '1. Выберите формат встречи',
      step2: '2. Локация',
      step3: 'Удобный день и время',
      nameLabel: 'Имя *',
      namePlaceholder: 'напр. Анна',
      phoneLabel: 'Телефон (или e-mail) *',
      phonePlaceholder: 'напр. +48 500 000 000',
      emailLabel: 'Электронная почта (для подтверждения времени)',
      emailPlaceholder: 'напр. anna@example.com',
      noteLabel: 'Короткое сообщение (необязательно)',
      notePlaceholder: 'Достаточно одной фразы или удобных часов.',
      noteTopicPrefix: 'Тема, которую хотелось бы обсудить:',
      consentPrefix:
        'Я даю согласие на обратную связь для согласования времени консультации и подтверждаю ознакомление с',
      consentLink: 'Политикой конфиденциальности (GDPR)',
      submitBtn: 'Отправить запрос на время',
      sendingBtn: 'Отправка заявки…',
      recipientPrefix: 'Сообщение поступает на',
      externalCalendar: 'Предпочитаете внешний календарь?',
      errors: {
        name: 'Пожалуйста, укажите ваше имя.',
        contact: 'Укажите номер телефона или e-mail, чтобы я могла вам ответить.',
        phoneShort: 'Номер телефона кажется слишком коротким — проверьте цифры или укажите e-mail.',
        emailInvalid: 'Пожалуйста, проверьте корректность адреса e-mail.',
        consent: 'Пожалуйста, подтвердите согласие на обратную связь (GDPR).',
      },
      successTitlePrefix: 'Спасибо,',
      fallbackTitlePrefix: 'Почти готово,',
      successBodyBefore: 'Ваш запрос на консультацию отправлен на почту кабинета (',
      successBodyAfter:
        '). Я отвечаю лично в течение 24 часов в рабочие дни с предложением точного времени.',
      fallbackBodyBefore:
        'Сейчас не удалось подтвердить автоматическую отправку — вероятно, из-за кратковременного сбоя связи. Вы можете отправить готовый запрос одним кликом через свою почту на адрес ',
      fallbackBodyAfter: ' или скопировать его текст:',
      summaryHeading: 'Сводка заявки',
      contactLabel: 'Контакт:',
      sendEmailBtn: 'Отправить через почтовую программу',
      copyBtn: 'Скопировать текст',
      copiedBtn: 'Скопировано',
      editDataBtn: '← Изменить данные',
      backToSiteBtn: 'Вернуться на сайт',
      mailtoSubjectPrefix: '[Запись]',
      mailtoGreeting: 'Здравствуйте,',
      summaryFields: {
        name: 'Имя',
        phone: 'Телефон',
        email: 'E-mail клиента',
        sessionType: 'Формат встречи',
        location: 'Локация / формат',
        day: 'Предпочитаемый день',
        time: 'Удобное время дня',
        message: 'Сообщение',
        noMessage: '(без дополнительного сообщения)',
        notProvided: 'Не указано',
        rodo: 'Согласие GDPR',
        rodoValue: 'Да — согласие на обратную связь для записи на консультацию',
      },
    },
    footer: {
      eyebrow: 'Первый шаг',
      lines: ['Не нужно, чтобы всё было', 'разложено по полочкам, чтобы начать.'],
      cta: 'Записаться на консультацию',
      replyNote: 'Обычно отвечаю в течение 24 часов в рабочие дни.',
      contactHeading: 'Прямой контакт',
      copyPhoneAria: 'Скопировать номер телефона',
      copyEmailAria: 'Скопировать адрес e-mail',
      copied: 'Скопировано',
      clinicNoteBefore: 'Телефонная регистратура клиники Medyczna Gdynia (',
      clinicNoteAfter: '). Записаться можно также через форму на сайте или официальные профили:',
      locationsHeading: 'Адреса и формат',
      onlineLabel: 'Видео и телефон',
      onlineSub: 'Видео- и телефонные встречи · RU / PL',
      bilingualNote: 'Konsultacje prowadzone są również po polsku — w Gdyni i online.',
      bilingualNoteLang: 'pl',
      navHeading: 'Навигация',
      navAria: 'Навигация в подвале сайта',
      crisisHeading: 'Срочная помощь в кризисе',
      crisisIntro:
        'Кабинет не ведёт круглосуточного экстренного дежурства. В ситуации острого кризиса обратитесь бесплатно:',
      copyrightSuffix: 'Психологический кабинет · Гдыня и онлайн',
      privacyBtn: 'Политика конфиденциальности и GDPR',
      backToTop: 'Наверх ↑',
    },
    privacy: {
      dialogAria: 'Политика конфиденциальности и GDPR',
      eyebrow: 'Правовая информация',
      title: 'Политика конфиденциальности (GDPR / RODO)',
      closeAria: 'Закрыть окно',
      sections: [
        {
          heading: '1. Администратор данных:',
          body: `Администратором персональных данных, передаваемых через контактную форму, является mgr Луцина Гроховская — Частный психологический кабинет (Гдыня, ul. Chwarznieńska 136–138), контакт: ${PRACTICE.email}.`,
        },
        {
          heading: '2. Цель и объём обработки:',
          body: 'Данные (имя, номер телефона, адрес e-mail и добровольный текст сообщения) обрабатываются исключительно для ответа на запрос и согласования времени консультации (ст. 6 ч. 1 п. a и b GDPR / RODO). Прошу не указывать в первом сообщении подробную медицинскую историю — все детали мы безопасно обсудим на встрече.',
        },
        {
          heading: '3. Профессиональная тайна:',
          body: 'Вся информация, которой вы делитесь при обращении и на сессиях, защищена профессиональной тайной психолога и не передаётся третьим лицам. Сообщение из формы передаётся по защищённому соединению HTTPS на электронную почту кабинета.',
        },
        {
          heading: '4. Ваши права:',
          body: `Вы имеете право на доступ к своим данным, их исправление, удаление или ограничение обработки в любой момент, написав на адрес ${PRACTICE.email}, а также право подать жалобу в надзорный орган по защите данных (UODO).`,
        },
      ],
      confirmBtn: 'Понятно',
    },
    breathing: {
      dialogAria: 'Дыхательное упражнение 4-4-6',
      closeAria: 'Закрыть дыхательное упражнение',
      eyebrow: 'Минута регуляции · Ритм 4–4–6',
      phases: [
        { key: 'inhale', label: 'Спокойный вдох', hint: 'Медленно через нос', seconds: 4, scale: 1.38 },
        { key: 'hold', label: 'Пауза', hint: 'Расслабьте плечи и челюсть', seconds: 4, scale: 1.38 },
        { key: 'exhale', label: 'Длинный выдох', hint: 'Плавно выпустите воздух', seconds: 6, scale: 0.88 },
      ],
      footnote: 'Удлинённый выдох активирует блуждающий нерв и мягко снижает физиологическое напряжение.',
      cyclesLabel: 'Завершённые циклы:',
    },
  },
};
