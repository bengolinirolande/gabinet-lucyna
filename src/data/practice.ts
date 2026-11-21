// Centralna konfiguracja danych gabinetu — zmień poniższe dane, aby błyskawicznie
// dostosować nazwisko, adresy, numer telefonu, ceny i treść do docelowej praktyki.

export interface SpecialtyItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  signals: string[];
  approach: string;
  image: string;
  imagePosition?: string;
}

export interface CredentialGroup {
  id: 'education' | 'experience' | 'standards';
  label: string;
  items: {
    period: string;
    title: string;
    institution: string;
    detail: string;
  }[];
}

export interface LocationItem {
  id: 'gdansk' | 'gdynia' | 'online';
  city: string;
  district: string;
  badge: string;
  address: string;
  transit: string;
  parking: string;
  hours: string;
  ambiance: string;
  image: string;
  secondaryImage: string;
  secondaryCaption: string;
  coordinates: string;
  mapUrl?: string;
}

export interface PricingItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  note: string;
  highlighted?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const PRACTICE = {
  // =========================================================================
  // KONFIGURACJA REZERWACJI — WPISZ TUTAJ SWÓJ ADRES E-MAIL!
  // Wszystkie formularze rezerwacji na stronie będą trafiać na tę skrzynkę
  // (przy pierwszym wysłaniu testowym kliknij jednorazowy link aktywacyjny).
  // =========================================================================
  bookingRecipientEmail: 'kontakt@lucynakaminska.pl',

  brandMonogram: 'L.',
  fullName: 'mgr Lucyna Kamińska',
  shortName: 'Lucyna Kamińska',
  role: 'Psycholog · Psychoterapeutka',
  regionLabel: 'Trójmiasto · Gdańsk · Gdynia · Online',
  tagline: 'Spokojna, uważna psychoterapia dla dorosłych w Trójmieście i online.',
  phoneDisplay: '+48 512 480 390',
  phoneHref: 'tel:+48512480390',
  email: 'kontakt@lucynakaminska.pl',
  availabilityStatus: 'Przyjmuję nowe osoby na konsultacje · najbliższe terminy w przyszłym tygodniu',
  znanyLekarzUrl: 'https://www.znanylekarz.pl/',

  // =========================================================================
  // KONFIGURACJA WIZYTÓWKI GOOGLE (Google Business Profile)
  // Podmień poniższe linki na docelowe URL-e ze swojego profilu w Google Maps.
  // =========================================================================
  googleProfile: {
    rating: 5.0,
    reviewCount: 48,
    profileUrl: 'https://www.google.com/maps/search/?api=1&query=Psycholog+Gdansk+Wrzeszcz+Wajdeloty',
    writeReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Psycholog+Gdansk+Wrzeszcz',
    mapsGdanskUrl: 'https://www.google.com/maps/search/?api=1&query=ul.+Wajdeloty+18,+Gdańsk',
    mapsGdyniaUrl: 'https://www.google.com/maps/search/?api=1&query=ul.+Świętojańska+44,+Gdynia',
    featuredReviews: [
      {
        author: 'Marta K.',
        dateLabel: '2 tygodnie temu',
        text: 'Niezwykły spokój, empatia i konkretna praca nad lękiem. Gabinet we Wrzeszczu jest piękny, kameralny i od progu daje poczucie bezpieczeństwa.',
      },
      {
        author: 'Tomasz W.',
        dateLabel: 'miesiąc temu',
        text: 'Trafiłem z silnym wypaleniem zawodowym. Pani Lucyna słucha z ogromną uważnością i bez oceniania. Najlepsza inwestycja w siebie.',
      },
      {
        author: 'Karolina S.',
        dateLabel: '2 miesiące temu',
        text: 'Bardzo profesjonalne podejście, pełna punktualność i realna poprawa jakości życia oraz relacji. Z całego serca polecam osobom z Trójmiasta.',
      },
    ],
  },

  images: {
    portrait: './images/portrait-lucyna.jpg',
    gdansk: './images/gabinet-gdansk.jpg',
    gdynia: './images/gabinet-gdynia.jpg',
    stillLife: './images/still-life-calm.jpg',
    detail: './images/lucyna-detail.jpg',
    balticShore: './images/baltic-shore-calm.jpg',
    gdanskExterior: './images/gdansk-kamienica-entrance.jpg',
    sanctuaryTea: './images/editorial-sanctuary-tea.jpg',
    lightArchitecture: './images/editorial-light-architecture.jpg',
    balticPinePath: './images/baltic-pine-path.jpg',
    sanctuaryCorner: './images/sanctuary-corner.jpg',
  },
  hero: {
    eyebrow: 'Prywatny gabinet psychologiczny · Gdańsk · Gdynia · Online',
    headlineLines: [
      'Przestrzeń, w której',
      'nie musisz już wszystkiego',
      'dźwigać w pojedynkę.',
    ],
    italicWord: 'w pojedynkę.',
    subheadline:
      'Towarzyszę dorosłym z Trójmiasta i online w pracy nad lękiem, wypaleniem, napięciem oraz trudnymi wzorcami w relacjach. Bez pośpiechu, bez oceniania — w oparciu o sprawdzoną wiedzę kliniczną i autentyczny kontakt.',
    primaryCta: 'Umów konsultację',
    secondaryCta: 'Bezpłatna rozmowa 15 min',
    trustStats: [
      { value: '10+', label: 'lat praktyki klinicznej' },
      { value: 'CBT · Schematy', label: 'nurt oparty na badaniach' },
      { value: 'PTTPB / PTP', label: 'stała superwizja i etyka' },
    ],
  },
  empathy: {
    eyebrow: 'Czy to brzmi znajomo?',
    stickyTitle: 'Na zewnątrz wszystko wygląda na poukładane.',
    stickySub:
      'Wewnątrz jednak coraz trudniej złapać spokojny oddech. Wielu moich pacjentów trafia do gabinetu dokładnie w tym momencie — kiedy dotychczasowe sposoby radzenia sobie przestają wystarczać.',
    reflections: [
      {
        index: '01',
        lead: 'Ciągłe napięcie, które nie znika nawet w weekend.',
        body: 'Twoja głowa nie przestaje analizować — odtwarzasz minione rozmowy, planujesz najczarniejsze scenariusze i nawet w chwilach odpoczynku czujesz niejasny niepokój.',
      },
      {
        index: '02',
        lead: 'Wyczerpanie wysokimi wymaganiami wobec siebie.',
        body: 'Jesteś osobą odpowiedzialną, skuteczną i przyzwyczajoną do radzenia sobie samemu. Ceną staje się jednak cichy krytyk wewnętrzny, bezsenność i poczucie, że to wciąż za mało.',
      },
      {
        index: '03',
        lead: 'Powtarzające się schematy w bliskich relacjach.',
        body: 'Zauważasz, że znów rezygnujesz ze swoich potrzeb, boisz się konfliktu lub przeciwnie — wycofujesz się, kiedy robi się naprawdę blisko.',
      },
      {
        index: '04',
        lead: 'Moment życiowego zakrętu lub cichego kryzysu.',
        body: 'Rozstanie, zmiana pracy, strata albo po prostu poczucie, że życie, które zbudowałeś, przestało pasować do tego, kim dziś jesteś.',
      },
      {
        index: '05',
        lead: 'Potrzeba bezpiecznej, dyskretnej rozmowy bez masek.',
        body: 'Szukasz miejsca w Gdańsku, Gdyni lub online, gdzie możesz zdjąć pancerz kompetencji i spokojnie przyjrzeć się temu, co naprawdę przeżywasz.',
      },
    ],
  },
  philosophy: {
    eyebrow: 'Filozofia pracy',
    quote:
      '„Dobra psychoterapia nie naprawia tego, co rzekomo zepsute. Pomaga zrozumieć sens Twoich reakcji, odzyskać sprawczość i zbudować łagodniejszą, trwalszą relację ze sobą.”',
    author: 'mgr Lucyna Kamińska',
    pillars: [
      {
        title: 'Relacja bez oceniania',
        text: 'Badania kliniczne jednoznacznie pokazują, że fundamentem zmiany jest bezpieczna więź terapeutyczna — oparta na szacunku, ciekawości i pełnej dyskrecji.',
      },
      {
        title: 'Metody o potwierdzonej skuteczności',
        text: 'Łączę precyzję terapii poznawczo-behawioralnej (CBT) z głębią Terapii Schematów oraz pracą z układem nerwowym i emocjami.',
      },
      {
        title: 'W Twoim realnym tempie',
        text: 'Nie narzucam sztywnych scenariuszy. Wspólnie określamy cele — czy potrzebujesz krótkoterminowego wsparcia w kryzysie, czy głębszej pracy długoterminowej.',
      },
      {
        title: 'Etyka i stała superwizja',
        text: 'Pracuję zgodnie z Kodeksem Etycznym Psychologa, z bezwzględnym zachowaniem tajemnicy zawodowej oraz pod regularną superwizją certyfikowanych superwizorów.',
      },
    ],
  },
  specialties: [
    {
      id: 'lek-napiecie',
      number: '01',
      title: 'Lęk, przewlekły stres i ataki paniki',
      subtitle: 'Odzyskiwanie spokoju w głowie i w ciele',
      description:
        'Praca z uogólnionym lękiem, natłokiem myśli, lękiem społecznym, napięciem somatycznym oraz wybudzaniem się w nocy. Uczymy się rozumieć sygnały układu nerwowego zamiast z nimi walczyć.',
      signals: ['Ciągłe zamartwianie się', 'Kołatanie serca i ścisk w klatce', 'Lęk przed oceną innych'],
      approach: 'CBT · ACT · Regulacja układu nerwowego',
      image: './images/baltic-shore-calm.jpg',
    },
    {
      id: 'wypalenie',
      number: '02',
      title: 'Wypalenie zawodowe i perfekcjonizm',
      subtitle: 'Dla osób żyjących w chronicznym trybie zadaniowym',
      description:
        'Wsparcie dla specjalistów, liderów, przedsiębiorców i osób ambitnych, które odczuwają emocjonalną pustkę, spadek motywacji, syndrom oszusta i nieustanną presję osiągania.',
      signals: ['Chroniczne zmęczenie mimo snu', 'Poczucie winy podczas odpoczynku', 'Syndrom oszusta'],
      approach: 'Terapia Schematów · Praca z wewnętrznym krytykiem',
      image: './images/editorial-sanctuary-tea.jpg',
    },
    {
      id: 'relacje',
      number: '03',
      title: 'Relacje, granice i style przywiązania',
      subtitle: 'Zdrowsza bliskość bez tracenia siebie',
      description:
        'Przyglądamy się powtarzalnym wzorcom w związkach i relacjach rodzinnych — lękowi przed odrzuceniem, nadmiernemu dostosowywaniu się, trudności w stawianiu granic oraz komunikacji w kryzysie.',
      signals: ['Trudność z mówieniem „nie”', 'Lęk przed bliskością lub porzuceniem', 'Powtarzające się konflikty'],
      approach: 'Terapia Schematów · Perspektywa relacyjna',
      image: './images/gabinet-gdansk.jpg',
    },
    {
      id: 'nastroj',
      number: '04',
      title: 'Obniżony nastrój, depresja i utrata sensu',
      subtitle: 'Krok po kroku ku odzyskaniu żywotności',
      description:
        'Uważne, empatyczne towarzyszenie w stanach przeciążenia, smutku, poczucia przytłoczenia i wycofania. Łączymy delikatną aktywizację z głębszym rozumieniem źródła cierpienia.',
      signals: ['Brak energii i radości', 'Poczucie odcięcia i pustki', 'Trudność w codziennych czynnościach'],
      approach: 'CBT · Terapia zorientowana na współczucie (CFT)',
      image: './images/still-life-calm.jpg',
      imagePosition: 'object-[50%_62%]',
    },
    {
      id: 'kryzysy',
      number: '05',
      title: 'Kryzysy życiowe i momenty zmiany',
      subtitle: 'Bezpieczne przejście przez trudny etap',
      description:
        'Pomoc psychologiczna po rozstaniu, rozwodzie, żałobie, przeprowadzce, zmianie ścieżki zawodowej lub wejściu w nową rolę życiową. Stabilizacja emocjonalna i odbudowa fundamentu.',
      signals: ['Nagła utrata poczucia gruntu', 'Rozstanie lub żałoba', 'Trudne decyzje życiowe'],
      approach: 'Interwencja kryzysowa · Wsparcie krótkoterminowe',
      image: './images/gdansk-kamienica-entrance.jpg',
      imagePosition: 'object-center',
    },
    {
      id: 'poczucie-wartosci',
      number: '06',
      title: 'Poczucie własnej wartości i tożsamość',
      subtitle: 'Od surowej samokrytyki do wewnętrznego oparcia',
      description:
        'Budowanie stabilnej samooceny niezależnej od zewnętrznej aprobaty. Praca nad zaufaniem do własnych emocji, potrzeb oraz wyborów — także u osób z doświadczeniem DDA/DDD.',
      signals: ['Nadmierna samokrytyka', 'Zależność od opinii otoczenia', 'Poczucie bycia niewystarczającym'],
      approach: 'Terapia Schematów · Integracyjna psychoterapia',
      image: './images/editorial-light-architecture.jpg',
      imagePosition: 'object-[50%_55%]',
    },
  ] as SpecialtyItem[],
  about: {
    eyebrow: 'O mnie',
    headline: 'Łączę kliniczną rzetelność z uważną, ludzką obecnością.',
    paragraphs: [
      'Jestem magistrem psychologii oraz psychoterapeutką pracującą z osobami dorosłymi w Gdańsku, Gdyni oraz online. Od ponad dekady towarzyszę pacjentom w odzyskiwaniu równowagi psychicznej, zrozumieniu własnych emocji i wprowadzaniu trwałych zmian w życiu codziennym.',
      'W swojej pracy nie wierzę w zimny dystans ani gotowe recepty z podręczników. Wierzę w rozmowę, w której możesz mówić wprost — także o tym, co trudne, niejednoznaczne czy wstydliwe. Moją rolą jest stworzenie dla Ciebie bezpiecznej, ustrukturyzowanej przestrzeni oraz dzielenie się narzędziami, które realnie działają poza ścianami gabinetu.',
      'Stale rozwijam swój warsztat, uczestniczę w specjalistycznych szkoleniach klinicznych oraz poddaję swoją pracę regularnej superwizji. Na co dzień mieszkam i pracuję w Trójmieście — bliskość morza i spokojny rytm natury przypominają mi, jak ważne jest zatrzymanie się w biegu.',
    ],
    credentials: [
      {
        id: 'education',
        label: 'Wykształcenie',
        items: [
          {
            period: 'Całościowe 4-letnie szkolenie',
            title: 'Szkoła Psychoterapii Poznawczo-Behawioralnej',
            institution: 'Ośrodek akredytowany przez PTTPB',
            detail: 'Ponad 1200 godzin szkolenia teoretycznego, warsztatowego oraz klinicznej praktyki terapeutycznej.',
          },
          {
            period: 'Studia magisterskie',
            title: 'Psychologia — specjalność kliniczna',
            institution: 'Uniwersytet Gdański / Wydział Nauk Społecznych',
            detail: 'Jednolite 5-letnie studia magisterskie z wyróżnieniem w zakresie psychologii klinicznej i osobowości.',
          },
          {
            period: 'Szkolenia specjalistyczne',
            title: 'Terapia Schematów (ISST) & Terapia Akceptacji i Zaangażowania (ACT)',
            institution: 'Instytuty szkoleniowe w Polsce i Europie',
            detail: 'Pogłębione kursy z zakresu pracy z relacjami, traumą rozwojową oraz regulacją emocji.',
          },
        ],
      },
      {
        id: 'experience',
        label: 'Doświadczenie',
        items: [
          {
            period: 'Obecnie · Trójmiasto',
            title: 'Prywatna praktyka psychologiczna i psychoterapeutyczna',
            institution: 'Gabinety w Gdańsku Wrzeszczu, Gdyni oraz konsultacje online',
            detail: 'Indywidualna psychoterapia dorosłych, konsultacje diagnostyczne oraz wsparcie kryzysowe.',
          },
          {
            period: 'Praktyka szpitalna i ambulatoryjna',
            title: 'Staże kliniczne na oddziałach psychiatrycznych i w poradniach zdrowia psychicznego',
            institution: 'Wojewódzki Szpital Psychiatryczny w Gdańsku / Poradnie PZP',
            detail: 'Diagnoza psychologiczna, prowadzenie konsultacji indywidualnych oraz współprowadzenie grup terapeutycznych.',
          },
          {
            period: 'Współpraca rozwojowa',
            title: 'Warsztaty psychoedukacyjne i profilaktyka wypalenia zawodowego',
            institution: 'Sektor technologiczny, medyczny i kreatywny w Trójmieście',
            detail: 'Praca nad higieną psychiczną, stresem przewlekłym oraz odpornością emocjonalną zespołów.',
          },
        ],
      },
      {
        id: 'standards',
        label: 'Etyka i superwizja',
        items: [
          {
            period: 'Standard kliniczny',
            title: 'Regularna superwizja indywidualna i grupowa',
            institution: 'Certyfikowani superwizorzy PTTPB i PTP',
            detail: 'Każdy proces terapeutyczny objęty jest profesjonalną refleksją kliniczną dla najwyższego bezpieczeństwa pacjenta.',
          },
          {
            period: 'Zaufanie i prawo',
            title: 'Bezwzględna tajemnica zawodowa oraz pełna zgodność z RODO',
            institution: 'Kodeks Etyczno-Zawodowy Psychologa',
            detail: 'Wszystkie rozmowy oraz dane kontaktowe są ściśle chronione. Sesje online odbywają się na szyfrowanej platformie.',
          },
          {
            period: 'Przynależność',
            title: 'Członkostwo w towarzystwach naukowych',
            institution: 'Polskie Towarzystwo Terapii Poznawczej i Behawioralnej (PTTPB)',
            detail: 'Stały dostęp do aktualnych wytycznych klinicznych i konferencji naukowych.',
          },
        ],
      },
    ] as CredentialGroup[],
  },
  journey: {
    eyebrow: 'Jak zacząć',
    headline: 'Pierwszy krok bywa najtrudniejszy. Dlatego upraszczam wszystko, co po nim następuje.',
    steps: [
      {
        number: '01',
        title: 'Krótki kontakt lub rozmowa 15 min',
        duration: 'Bezpłatnie · Bez zobowiązań',
        image: './images/editorial-sanctuary-tea.jpg',
        imageAlt: 'Spokojna filiżanka herbaty na dębowym stole przed rozmową wstępną',
        description:
          'Wypełniasz krótki formularz lub umawiasz bezpłatną 15-minutową rozmowę telefoniczną. Sprawdzamy wstępnie, czego potrzebujesz i czy mój styl pracy będzie dla Ciebie dobrym wyborem.',
      },
      {
        number: '02',
        title: 'Konsultacje wstępne (1–3 spotkania)',
        duration: '50 minut · Stacjonarnie lub online',
        image: './images/gdansk-kamienica-entrance.jpg',
        imageAlt: 'Słoneczne, ciche podwórze kamienicy w Gdańsku Wrzeszczu',
        description:
          'Spokojnie rozmawiamy o Twojej sytuacji, historii oraz tym, co najbardziej Cię obciąża. Nie musisz się specjalnie przygotowywać — poprowadzę spotkanie tak, byś czuł się bezpiecznie.',
      },
      {
        number: '03',
        title: 'Wspólny plan i regularny proces',
        duration: 'Zwykle 1× w tygodniu · Stała pora',
        image: './images/editorial-light-architecture.jpg',
        imageAlt: 'Miękkie poranne światło na gładkim łuku tynku — metafora klarowności i oparcia',
        description:
          'Ustalamy jasne, realistyczne cele i rozpoczynamy właściwą pracę w Twoim rytmie. Regularnie sprawdzamy postępy, abyś czuł realny sens i wpływ spotkań na codzienność.',
      },
    ],
  },
  locations: [
    {
      id: 'gdansk',
      city: 'Gdańsk',
      district: 'Wrzeszcz · okolice Garnizonu',
      badge: 'Gabinet główny',
      address: 'ul. Wajdeloty 18/4, 80-437 Gdańsk Wrzeszcz',
      transit: '4 minuty spacerem od stacji SKM / PKM Gdańsk Wrzeszcz oraz przystanku tramwajowego',
      parking: 'Strefa parkowania przy ulicy oraz parking przy Galerii Metropolia (3 min pieszo)',
      hours: 'Poniedziałek, Środa, Czwartek · 09:00 – 20:00',
      ambiance:
        'Cichy, jasny gabinet w odrestaurowanej wrzeszczańskiej kamienicy z widokiem na korony drzew. Dyskretne wejście bez zatłoczonej poczekalni.',
      image: './images/gabinet-gdansk.jpg',
      secondaryImage: './images/gdansk-kamienica-entrance.jpg',
      secondaryCaption: 'Ciche podwórze kamienicy · ul. Wajdeloty 18',
      coordinates: '54.3812° N, 18.6108° E',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=ul.+Wajdeloty+18,+Gdańsk',
    },
    {
      id: 'gdynia',
      city: 'Gdynia',
      district: 'Śródmieście · blisko Skweru i Bulwaru',
      badge: 'Wtorki i piątki',
      address: 'ul. Świętojańska 44/7, 81-393 Gdynia',
      transit: '6 minut spacerem od stacji SKM Gdynia Wzgórze św. Maksymiliana lub Gdynia Główna',
      parking: 'Miejsca postojowe przy ul. Armii Krajowej oraz ul. Świętojańskiej',
      hours: 'Wtorek, Piątek · 10:00 – 19:00',
      ambiance:
        'Modernistyczna, spokojna przestrzeń wypełniona naturalnym światłem — idealna dla osób dojeżdżających z Gdyni, Sopotu oraz Małego Trójmiasta.',
      image: './images/gabinet-gdynia.jpg',
      secondaryImage: './images/baltic-shore-calm.jpg',
      secondaryCaption: 'Bliskość morza i nadmorskiego spokoju Gdyni',
      coordinates: '54.5159° N, 18.5403° E',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=ul.+Świętojańska+44,+Gdynia',
    },
    {
      id: 'online',
      city: 'Online',
      district: 'Cała Polska & Polacy za granicą',
      badge: 'Elastycznie',
      address: 'Szyfrowane połączenie wideo (Google Meet / bezpieczna platforma medyczna)',
      transit: 'Łączysz się z komfortu własnego domu, biura lub podczas wyjazdu służbowego',
      parking: 'Możliwość płynnego łączenia spotkań stacjonarnych w Trójmieście z sesjami online',
      hours: 'Poniedziałek – Piątek · 08:30 – 20:00',
      ambiance:
        'Ta sama uważność, poufność i jakość kontaktu. Przed pierwszą sesją otrzymasz prosty, jednorazowy link bez konieczności instalowania aplikacji.',
      image: './images/editorial-sanctuary-tea.jpg',
      secondaryImage: './images/lucyna-detail.jpg',
      secondaryCaption: 'Spokojna przestrzeń rozmowy z dowolnego miejsca',
      coordinates: 'End-to-End · RODO',
    },
  ] as LocationItem[],
  pricing: {
    eyebrow: 'Inwestycja i zasady',
    headline: 'Przejrzyste warunki od pierwszego spotkania.',
    subheadline:
      'Szanuję Twój czas i potrzebę jasności — poniżej znajdziesz pełny cennik oraz zasady organizacji spotkań, bez ukrytych kosztów.',
    items: [
      {
        id: 'intro-call',
        name: 'Wstępna rozmowa telefoniczna',
        duration: '15 minut · Telefon',
        price: '0 zł',
        note: 'Krótkie poznanie się, omówienie Twoich oczekiwań i sprawdzenie, czy mogę Ci pomóc.',
      },
      {
        id: 'individual',
        name: 'Konsultacja psychologiczna / Psychoterapia indywidualna',
        duration: '50 minut · Gdańsk, Gdynia lub Online',
        price: '220 zł',
        note: 'Zarówno pierwsze spotkania konsultacyjne, jak i regularne sesje psychoterapii indywidualnej.',
        highlighted: true,
      },
      {
        id: 'couples',
        name: 'Konsultacja dla par / relacji',
        duration: '80 minut · Stacjonarnie lub Online',
        price: '340 zł',
        note: 'Rozszerzona sesja poświęcona komunikacji, przepracowaniu kryzysu i budowaniu bezpieczeństwa w związku.',
      },
    ] as PricingItem[],
    policies: [
      'Płatność przelewem, BLIK-iem lub gotówką na miejscu (możliwość wystawienia rachunku / faktury).',
      'Bezpłatne odwołanie lub przełożenie wizyty jest możliwe najpóźniej na 24 godziny przed umówionym terminem.',
      'Wszystkie sesje są objęte bezwzględną tajemnicą zawodową zgodnie z Kodeksem Etycznym Psychologa.',
    ],
  },
  faq: [
    {
      question: 'Czy muszę wiedzieć dokładnie, co chcę powiedzieć na pierwszym spotkaniu?',
      answer:
        'Absolutnie nie. Wiele osób przychodzi z poczuciem chaosu albo z myślą „nie wiem nawet, od czego zacząć”. Moją rolą jest zadać spokojne, pomocne pytania i nadać rozmowie strukturę — niczego nie musisz przygotowywać wcześniej.',
    },
    {
      question: 'Czym różni się konsultacja psychologiczna od psychoterapii?',
      answer:
        'Pierwsze 1–3 spotkania mają charakter konsultacyjny: wspólnie rozpoznajemy, z czym się mierzysz, co podtrzymuje trudność i jaka forma pomocy będzie najlepsza. Czasem wystarcza kilka konsultacji wspierających; kiedy indziej przechodzimy do regularnej psychoterapii nakierowanej na głębszą i trwalszą zmianę.',
    },
    {
      question: 'Jak długo trwa cały proces psychoterapii?',
      answer:
        'To zależy od Twoich celów i charakteru trudności. Praca nad konkretnym obszarem (np. radzenie sobie ze stresem czy atakami paniki) trwa często od kilkunastu tygodni do kilku miesięcy. Praca nad głęboko zakorzenionymi schematami relacyjnymi i poczuciem własnej wartości jest zazwyczaj procesem dłuższym — zawsze jednak wspólnie monitorujemy postępy.',
    },
    {
      question: 'Czy mogę łączyć wizyty stacjonarne w Gdańsku lub Gdyni z sesjami online?',
      answer:
        'Tak. Wielu moich pacjentów z Trójmiasta pracuje hybrydowo — większość spotkań odbywa się stacjonarnie w gabinecie, a w razie podróży służbowej, przeziębienia lub napiętego grafiku płynnie przechodzimy na wideo.',
    },
    {
      question: 'Czy wszystko, o czym rozmawiamy, pozostaje całkowicie poufne?',
      answer:
        'Tak. Obowiązuje mnie ścisła tajemnica zawodowa. Jedynym ustawowym wyjątkiem od tajemnicy (wspólnym dla wszystkich psychologów i psychoterapeutów) jest sytuacja bezpośredniego zagrożenia życia lub zdrowia. Podczas superwizji dane pacjentów są zawsze w pełni zanonimizowane.',
    },
    {
      question: 'Co daje bezpłatna 15-minutowa rozmowa wstępna?',
      answer:
        'To spokojna, niezobowiązująca rozmowa telefoniczna, w której możesz usłyszeć mój głos, zapytać o sposób pracy i sprawdzić, czy czujesz się ze mną komfortowo jeszcze przed pierwszą pełną wizytą. Jeśli okaże się, że lepiej sprawdzi się inny specjalista (np. psychiatra lub terapeuta uzależnień), wskażę Ci sprawdzone polecenie w Trójmieście.',
    },
  ] as FaqItem[],
  crisisHelp: [
    { label: 'Centrum Wsparcia (24/7, bezpłatnie)', number: '800 70 2222' },
    { label: 'Kryzysowy Telefon Zaufania dla Dorosłych', number: '116 123' },
    { label: 'W nagłym zagrożeniu życia', number: '112' },
  ],
};
