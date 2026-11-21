// Centralna konfiguracja danych gabinetu mgr Lucyny Grochowskiej
// 100% danych zsynchronizowane z oficjalnymi profilami:
// - https://www.znanylekarz.pl/profil/lucyna-grochowska
// - https://twojpsycholog.pl/profil-psychologa/lucyna-grochowska-11618

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
  id: 'witomino' | 'srodmiescie' | 'online';
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
  // KONFIGURACJA REZERWACJI — WPISZ DOCELOWY ADRES E-MAIL GABINETU
  // Uwaga: na ZnanyLekarz i TwójPsycholog nie ma podanego prywatnego e-maila
  // ani prywatnej komórki (portale maskują te dane). Wpisz tu swój e-mail,
  // aby wszystkie rezerwacje z formularza trafiały wprost na skrzynkę.
  // =========================================================================
  bookingRecipientEmail: 'kontakt@lucynagrochowska.pl',

  brandMonogram: 'L.',
  fullName: 'mgr Lucyna Grochowska',
  shortName: 'Lucyna Grochowska',
  role: 'Psycholog · Psychotraumatolog · Psychoterapeutka',
  regionLabel: 'Gdynia · Trójmiasto · Online (PL / RU)',
  tagline:
    'Psychoterapia psychodynamiczna, psychotraumatologia, seksuologia i pomoc psychologiczna dla dorosłych, par oraz młodzieży (od 10 lat) w Gdyni i online.',
  phoneDisplay: '+48 58 500 46 87',
  phoneSecondaryDisplay: '+48 58 500 46 88',
  phoneHref: 'tel:+48585004687',
  phoneSecondaryHref: 'tel:+48585004688',
  email: 'kontakt@lucynagrochowska.pl',
  clinicEmail: 'wizyta@medycznagdynia.pl',
  availabilityStatus:
    'Przyjmuję stacjonarnie w Gdyni (2 gabinety), online oraz na wizytach domowych · PL / RU',

  // Oficjalne profile zewnętrzne mgr Lucyny Grochowskiej
  znanyLekarzUrl: 'https://www.znanylekarz.pl/profil/lucyna-grochowska',
  twojPsychologUrl: 'https://twojpsycholog.pl/profil-psychologa/lucyna-grochowska-11618',
  facebookUrl: 'https://www.facebook.com/share/1E9WPyV2w2/?mibextid=wwXIfr',
  medycznaGdyniaUrl: 'https://www.medycznagdynia.pl/',

  // =========================================================================
  // WIZYTÓWKI I ZWERYFIKOWANE OPINIE (ZnanyLekarz · TwójPsycholog · Google)
  // =========================================================================
  googleProfile: {
    rating: 5.0,
    reviewCount: 8,
    profileUrl:
      'https://www.google.com/maps/search/?api=1&query=Lucyna+Grochowska+psycholog+Gdynia',
    writeReviewUrl: 'https://www.znanylekarz.pl/profil/lucyna-grochowska#profile-reviews',
    mapsWitominoUrl:
      'https://www.google.com/maps/search/?api=1&query=Chwarznie%C5%84ska+136-138,+81-602+Gdynia',
    mapsSrodmiescieUrl:
      'https://www.google.com/maps/search/?api=1&query=Genera%C5%82a+J%C3%B3zefa+Bema+16/2,+81-381+Gdynia',
    featuredReviews: [
      {
        author: 'Anita',
        dateLabel: 'maj 2026 · ZnanyLekarz',
        text: 'Serdecznie polecam Panią psycholog. Akceptuje, nie ocenia a wspiera. Czuję się bezpiecznie i mam dzięki temu odwagę do zmian koniecznych do lepszego życia. Duża wiedza i doświadczenie.',
      },
      {
        author: 'Dg',
        dateLabel: 'kwiecień 2026 · ZnanyLekarz',
        text: 'Bardzo przyjazna i miła przestrzeń, a Pani Lucyna profesjonalna i pomocna.',
      },
      {
        author: 'Ala',
        dateLabel: 'kwiecień 2025 · ZnanyLekarz',
        text: 'Jestem bardzo zadowolona z wizyty. Pani psycholog jest przyjazna i ludzka, bardzo dokładnie tłumaczy.',
      },
    ],
  },

  images: {
    portrait: './images/portrait-lucyna.jpg',
    officePortrait: './images/lucyna-office.jpg',
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
    eyebrow: 'Psycholog · Psychotraumatolog · Gdynia & Online (PL / RU)',
    headlineLines: [
      'Kiedy pozwalasz sobie',
      'na przyjęcie pomocy,',
      'żyje się po prostu lżej.',
    ],
    italicWord: 'po prostu lżej.',
    subheadline:
      'Jestem psychologiem z 8-letnim doświadczeniem klinicznym, psychotraumatologiem, psychoterapeutką pracującą w nurcie psychodynamicznym (w trakcie certyfikacji) oraz seksuologiem klinicznym w trakcie certyfikacji. Przyjmuję w Gdyni oraz online.',
    primaryCta: 'Umów konsultację',
    secondaryCta: 'Poznaj moje podejście',
    trustStats: [
      { value: '8 lat', label: 'praktyki klinicznej' },
      { value: 'Psychodynamiczna', label: 'nurt · stała superwizja' },
      { value: 'PL / RU', label: 'język terapii · LGBT+ friendly' },
    ],
  },

  empathy: {
    eyebrow: 'Czy to brzmi znajomo?',
    stickyTitle: 'Na zewnątrz wszystko wygląda na poukładane.',
    stickySub:
      'Wewnątrz jednak coraz trudniej złapać spokojny oddech. Wielu moich pacjentów trafia do gabinetu w momencie, gdy dotychczasowe sposoby radzenia sobie z lękiem, smutkiem, traumą czy napięciem w relacjach przestają wystarczać.',
    reflections: [
      {
        index: '01',
        lead: 'Stany lękowe, nerwicowe, napady paniki lub długotrwały smutek.',
        body: 'Napięcie, bezsenność, depresja, lęk społeczny albo dolegliwości psychosomatyczne, w których ciało zaczyna głośno sygnalizować przeciążenie emocjonalne.',
      },
      {
        index: '02',
        lead: 'Niskie poczucie własnej wartości i zagubienie tożsamościowe.',
        body: 'Trudność w odnalezieniu wewnętrznego oparcia, pewności siebie oraz spójnej tożsamości osobistej lub zawodowej — w tym wypalenie zawodowe czy presja w sporcie.',
      },
      {
        index: '03',
        lead: 'Trudności w tworzeniu i utrzymywaniu bliskich relacji.',
        body: 'Powtarzające się kryzysy w związku, zdrada, rozwód lub rozstanie, samotność, trudność w znalezieniu partnera/ki oraz napięcia w sferze intymnej i seksualnej.',
      },
      {
        index: '04',
        lead: 'Ślady bolesnych lub traumatycznych doświadczeń.',
        body: 'Doświadczenie przemocy fizycznej, psychicznej lub ekonomicznej, wykorzystanie seksualne, żałoba, stany pooperacyjne albo nagły kryzys życiowy.',
      },
      {
        index: '05',
        lead: 'Potrzeba spokojnej, nieoceniającej rozmowy w bezpiecznej przestrzeni.',
        body: 'Szukasz miejsca w Gdyni lub online (po polsku albo po rosyjsku), gdzie możesz zostać naprawdę wysłuchana i wysłuchany — bez oceniania i z głębokim zrozumieniem.',
      },
    ],
  },

  philosophy: {
    eyebrow: 'Filozofia pracy',
    quote:
      '„Kiedy pozwalamy sobie na przyjęcie pomocy w terapii, żyje się nam po prostu lżej. Aby w naszych wnętrzach doszło do głębokich emocjonalnych zmian, potrzeba czasu — wtedy można poczuć prawdziwą ulgę w codziennym funkcjonowaniu.”',
    author: 'mgr Lucyna Grochowska',
    pillars: [
      {
        title: 'Zrozumienie bez oceniania',
        text: 'Podczas pierwszych konsultacji wspólnie przyglądamy się temu, na czym polega Twoje cierpienie — w atmosferze pełnej akceptacji, uważności i szacunku.',
      },
      {
        title: 'Nurt psychodynamiczny i trauma',
        text: 'Łączę wieloletnie doświadczenie kliniczne z psychoterapią psychodynamiczną, psychotraumatologią oraz wiedzą z zakresu seksuologii klinicznej i terapii uzależnień.',
      },
      {
        title: 'Głęboka, trwała zmiana w czasie',
        text: 'Nie narzucam gotowych schematów ani szybkich rad. Szukamy rozwiązań w Twoim rytmie — zarówno w interwencji kryzysowej, jak i w psychoterapii długoterminowej.',
      },
      {
        title: 'Zweryfikowane dyplomy i superwizja',
        text: 'Pracuję pod stałą superwizją kliniczną, z zachowaniem tajemnicy zawodowej. Dyplomy zweryfikowane przez TwójPsycholog.pl · laureatka Orłów Medycyny · przyjazna LGBT+.',
      },
    ],
  },

  specialties: [
    {
      id: 'lek-depresja-nastroj',
      number: '01',
      title: 'Stany lękowe, nerwice, depresja i nastrój',
      subtitle: 'Odzyskiwanie równowagi emocjonalnej i spokoju w ciele',
      description:
        'Kompleksowe wsparcie w stanach lękowych, lęku napadowym i napadach paniki, fobii społecznej, nerwicy, depresji, chorobie afektywnej dwubiegunowej (ChAD), zaburzeniach emocjonalnych, bezsenności, histerii oraz dolegliwościach psychosomatycznych.',
      signals: [
        'Depresja i ChAD',
        'Lęk napadowy i napady paniki',
        'Fobia społeczna i nerwica',
        'Bezsenność i psychosomatyka',
      ],
      approach: 'Psychoterapia psychodynamiczna · Psychologia kliniczna · Relaksacja',
      image: './images/baltic-shore-calm.jpg',
    },
    {
      id: 'psychotraumatologia',
      number: '02',
      title: 'Psychotraumatologia, przemoc i strata',
      subtitle: 'Bezpieczne przepracowanie urazów i bolesnych doświadczeń',
      description:
        'Specjalistyczna terapia traumy dla osób z doświadczeniem przemocy fizycznej, psychicznej lub ekonomicznej, wykorzystania seksualnego, głębokiej żałoby oraz kryzysów zdrowotnych i stanów pooperacyjnych.',
      signals: [
        'Przemoc fizyczna, psychiczna i ekonomiczna',
        'Wykorzystywanie seksualne',
        'Żałoba i utrata bliskiej osoby',
        'Stany pooperacyjne',
      ],
      approach: 'Psychotraumatologia · Psychoterapia traumy · Interwencja kryzysowa',
      image: './images/editorial-sanctuary-tea.jpg',
    },
    {
      id: 'relacje-pary-mlodziez',
      number: '03',
      title: 'Związki, terapia par oraz dzieci i młodzież (10+)',
      subtitle: 'Bezpieczna bliskość w parze, rodzinie i relacjach rówieśniczych',
      description:
        'Pomoc osobom indywidualnym i parom w kryzysie związku, po zdradzie, w trakcie rozwodu lub rozstania, przy trudności w nawiązywaniu relacji i znalezieniu partnera/ki oraz samotności. Pod wybranym adresem wspieram także dzieci i młodzież od 10 lat (depresja, lęki, trudności rówieśnicze).',
      signals: [
        'Kryzys w związku, zdrada i rozwód',
        'Samotność i trudności w relacjach',
        'Terapia dla par i rodzin',
        'Dzieci i młodzież od 10 lat',
      ],
      approach: 'Terapia indywidualna i dla par · Wsparcie młodzieży (10+)',
      image: './images/gabinet-gdynia.jpg',
    },
    {
      id: 'seksuologia',
      number: '04',
      title: 'Seksuologia kliniczna, intymność i menopauza',
      subtitle: 'Dyskretna, merytoryczna rozmowa o zdrowiu seksualnym',
      description:
        'Konsultacje seksuologiczne dla osób indywidualnych i par obejmujące problemy seksualne w związku, osłabnięcie popędu seksualnego, zaburzenia erekcji lub nawilżenia, a także wsparcie psychologiczne w okresie menopauzy i klimakterium.',
      signals: [
        'Problemy seksualne w parze',
        'Osłabnięcie popędu seksualnego',
        'Zaburzenia erekcji / nawilżenia',
        'Menopauza i klimakterium',
      ],
      approach: 'Seksuologia kliniczna (w trakcie certyfikacji) · Edukacja i terapia',
      image: './images/still-life-calm.jpg',
      imagePosition: 'object-[50%_62%]',
    },
    {
      id: 'tozsamosc-osobowosc-rozwoj',
      number: '05',
      title: 'Tożsamość, osobowość, praca i sport',
      subtitle: 'Pewność siebie, psychoterapia długoterminowa i rozwój zasobów',
      description:
        'Praca nad niskim poczuciem własnej wartości, pewnością siebie, budowaniem tożsamości osobistej i zawodowej, wypaleniem i kryzysem zawodowym, trudnościami w sporcie (w tym zawodowym), a także z zaburzeniami osobowości (m.in. borderline) oraz schizofrenią / psychozami i urojeniami.',
      signals: [
        'Osobowość borderline i inne zaburzenia osobowości',
        'Wypalenie i rozwój kompetencji zawodowych',
        'Schizofrenia / psychozy / urojenia',
        'Pewność siebie i trudności w sporcie',
      ],
      approach: 'Psychoterapia długoterminowa · Nurt psychodynamiczny · Diagnoza',
      image: './images/editorial-light-architecture.jpg',
      imagePosition: 'object-[50%_55%]',
    },
    {
      id: 'kryzys-odzywianie-uzaleznienia',
      number: '06',
      title: 'Kryzysy życiowe, odżywianie i uzależnienia',
      subtitle: 'Oparcie na życiowych zakrętach i zmiana trudnych nawyków',
      description:
        'Interwencja kryzysowa i wsparcie w emigracji, kryzysie wieku średniego, syndromie pustego gniazda (opuszczenie domu przez dziecko) i wyzwaniach starości, a także terapia zaburzeń odżywiania, zmiany nawyków żywieniowych, otyłości oraz uzależnień (w tym DDA).',
      signals: [
        'Emigracja, kryzys wieku średniego i starość',
        'Opuszczenie domu przez dziecko',
        'Zaburzenia odżywiania, otyłość i nawyki',
        'Uzależnienia i DDA',
      ],
      approach: 'Interwencja kryzysowa · Terapia uzależnień · Psychoedukacja',
      image: './images/gdansk-kamienica-entrance.jpg',
      imagePosition: 'object-center',
    },
  ] as SpecialtyItem[],

  about: {
    eyebrow: 'O mnie',
    headline: 'Kliniczne doświadczenie, głęboka uważność i przestrzeń bez oceniania.',
    paragraphs: [
      'Z wykształcenia jestem psychologiem z wieloletnim doświadczeniem klinicznym (8 lat praktyki), psychotraumatologiem, a także psychoterapeutką pracującą w nurcie psychodynamicznym (w trakcie procesu certyfikacji) oraz seksuologiem klinicznym w trakcie procesu certyfikacji. Swoje doświadczenie kliniczne zdobywałam zarówno w publicznych placówkach zdrowia psychicznego, jak i w gabinecie prywatnym.',
      'Korzystając ze swojego doświadczenia klinicznego, pracuję z osobami cierpiącymi na różnego rodzaju stany lękowe, nerwicowe i depresję, z osobami odczuwającymi cierpienie z powodu niskiego poczucia własnej wartości oraz trudności w tworzeniu relacji i utrzymywaniu bliskich związków. Pracuję również z dolegliwościami psychosomatycznymi, brakiem poczucia wewnętrznej tożsamości i trudnościami w budowaniu tożsamości zawodowej, a także prowadzę terapię osób z zaburzeniami osobowości, zaburzeniami odżywiania, uzależnieniami oraz w ramach interwencji kryzysowej.',
      'Aby rozpocząć proces terapeutyczny, proponuję konsultacje, podczas których staram się głęboko zrozumieć, na czym polega cierpienie osoby zgłaszającej się po pomoc. Prowadzę spotkania w języku polskim i rosyjskim, pod stałą superwizją, w przestrzeni otwartej i przyjaznej LGBT+. Serdecznie zapraszam do kontaktu — pozwalając sobie na przyjęcie pomocy, dajesz sobie realną szansę na lepsze życie.',
    ],
    credentials: [
      {
        id: 'education',
        label: 'Wykształcenie',
        items: [
          {
            period: 'Studia magisterskie · Dyplom zweryfikowany',
            title: 'Psychologia — Wydział Psychologii',
            institution: 'Uniwersytet Kazimierza Wielkiego w Bydgoszczy (UKW)',
            detail:
              'Jednolite studia magisterskie z psychologii. Dyplomy oficjalnie zweryfikowane przez portal TwójPsycholog.pl.',
          },
          {
            period: 'Psychoterapia i psychotraumatologia',
            title: 'Psychoterapia psychodynamiczna i psychotraumatologia',
            institution: 'Instytut Psychoterapii i Psychotraumatologii „Triada” w Gdańsku',
            detail:
              'Specjalistyczne szkolenie w zakresie psychotraumatologii oraz psychoterapii psychodynamicznej (w trakcie procesu certyfikacji).',
          },
          {
            period: 'Studia podyplomowe · W trakcie certyfikacji',
            title: 'Seksuologia Kliniczna — Opiniowanie, Edukacja, Terapia',
            institution: 'Uniwersytet im. Adama Mickiewicza w Poznaniu (UAM)',
            detail:
              'Kwalifikacje podyplomowe z seksuologii klinicznej — konsultacje indywidualne, par, edukacja i terapia.',
          },
          {
            period: 'Szkolenie specjalistyczne',
            title: 'Psychoterapia uzależnień',
            institution: 'Szkoła Psychoterapii Uzależnień „Vis Salutis” w Łodzi',
            detail:
              'Przygotowanie kliniczne do pracy z osobami zmagającymi się z uzależnieniami oraz ich bliskimi.',
          },
        ],
      },
      {
        id: 'experience',
        label: 'Doświadczenie',
        items: [
          {
            period: 'Praktyka prywatna · Laureatka Orłów Medycyny',
            title: 'Gabinet Psychologiczno-Psychoterapeutyczny — Gdynia & Online',
            institution: 'ul. Chwarznieńska 136–138, Gdynia Witomino · Sesje stacjonarne, online i domowe',
            detail:
              'Konsultacje psychologiczne, psychoterapeutyczne, psychotraumatologiczne i seksuologiczne, psychoterapia długoterminowa, terapia par, badania psychologiczne i relaksacja.',
          },
          {
            period: 'Przychodnia specjalistyczna · Gdynia Śródmieście',
            title: 'Psycholog, psychotraumatolog, psychoterapeuta',
            institution: 'Przychodnia Medyczna Gdynia (ul. gen. Józefa Bema 16/2 · Oddział A: ul. 3 Maja 30/21)',
            detail:
              'Konsultacje diagnostyczne i terapeutyczne, ocena stanu psychicznego, interwencja kryzysowa i psychoterapia indywidualna.',
          },
          {
            period: 'Publiczna ochrona zdrowia psychicznego',
            title: 'Psycholog kliniczny',
            institution: 'Poradnia Zdrowia Psychicznego MSWiA w Gdańsku',
            detail:
              'Wieloletnia praktyka kliniczna w publicznej poradni zdrowia psychicznego — diagnoza i wsparcie terapeutyczne.',
          },
          {
            period: 'Szpitale i opieka długoterminowa',
            title: 'Doświadczenie szpitalne i staże kliniczne',
            institution:
              'Regionalny Szpital Specjalistyczny w Grudziądzu (Oddział Neurochirurgii) · Szpital Uniwersytecki im. dr. A. Jurasza w Bydgoszczy · DPS Łosienice',
            detail:
              'Praca kliniczna z pacjentami na oddziałach szpitalnych, w stanach pooperacyjnych, kryzysach zdrowotnych oraz wsparcie seniorów.',
          },
        ],
      },
      {
        id: 'standards',
        label: 'Etyka i standardy',
        items: [
          {
            period: 'Stały nadzór kliniczny',
            title: 'Praca pod stałą superwizją · Dyplomy zweryfikowane',
            institution: 'Regularna superwizja psychodynamiczna · TwójPsycholog.pl',
            detail:
              'Każdy proces terapeutyczny objęty jest stałą superwizją kliniczną, a wykształcenie zostało zweryfikowane na portalu TwójPsycholog.',
          },
          {
            period: 'Otwartość, etyka i wyróżnienia',
            title: 'Przestrzeń przyjazna LGBT+ · Tajemnica zawodowa · Orły Medycyny',
            institution: 'Kodeks Etyczno-Zawodowy Psychologa · RODO',
            detail:
              'Bezpieczna, nieoceniająca przestrzeń dla każdego pacjenta, pełna poufność oraz laureat plebiscytu Orły Medycyny.',
          },
          {
            period: 'Dostępność i języki',
            title: 'Sesje po polsku i rosyjsku · Dorośli, pary i młodzież (10+)',
            institution: 'Gdynia (2 lokalizacje), Online oraz Wizyty domowe',
            detail:
              'Prowadzę konsultacje i terapię w języku polskim i rosyjskim. Przyjmuję dorosłych, pary oraz (przy ul. Chwarznieńskiej) dzieci i młodzież od 10 roku życia.',
          },
        ],
      },
    ] as CredentialGroup[],
  },

  journey: {
    eyebrow: 'Jak zacząć',
    headline: 'Pierwszy krok bywa najtrudniejszy. Dlatego spotkanie zaczynamy spokojnie i bez pośpiechu.',
    steps: [
      {
        number: '01',
        title: 'Wybór formy i rezerwacja terminu',
        duration: 'Gdynia (2 adresy) · Online · Wizyta domowa',
        image: './images/editorial-sanctuary-tea.jpg',
        imageAlt: 'Spokojna filiżanka herbaty na stole przed pierwszą konsultacją',
        description:
          'Wypełniasz krótki formularz na stronie albo wybierasz termin w kalendarzu TwójPsycholog.pl lub ZnanyLekarz.pl. Możesz umówić się na Witominie, w Medycznej Gdyni, online lub na wizytę domową.',
      },
      {
        number: '02',
        title: 'Konsultacje wstępne (1–3 spotkania)',
        duration: '50 minut · Język polski lub rosyjski',
        image: './images/lucyna-office.jpg',
        imageAlt: 'mgr Lucyna Grochowska w swoim gabinecie psychologicznym w Gdyni',
        description:
          'Podczas pierwszych konsultacji wspólnie staramy się zrozumieć, na czym polega Twoje cierpienie i jaka forma pomocy (psychoterapia, wsparcie kryzysowe, badania lub psychoedukacja) będzie najlepsza.',
      },
      {
        number: '03',
        title: 'Regularny proces terapeutyczny',
        duration: '50–60 minut · W Twoim realnym tempie',
        image: './images/editorial-light-architecture.jpg',
        imageAlt: 'Miękkie poranne światło na gładkim łuku tynku — metafora ulgi i spokoju',
        description:
          'Wspólnie ustalamy ramy współpracy i rozpoczynamy proces w nurcie psychodynamicznym lub psychoterapię traumy — aby z czasem mogło dojść do głębokiej emocjonalnej zmiany i trwałej ulgi.',
      },
    ],
  },

  locations: [
    {
      id: 'witomino',
      city: 'Gdynia Witomino',
      district: 'Witomino-Radiostacja · Gabinet Psychologiczno-Psychoterapeutyczny',
      badge: 'Gabinet prywatny',
      address: 'ul. Chwarznieńska 136–138, 81-602 Gdynia',
      transit:
        'Wejście do budynku tak jak do rehabilitacji, następnie w lewo — trzeci gabinet za szklanymi drzwiami.',
      parking:
        'Płatność: gotówka w gabinecie, BLIK, przelew na konto lub Revolut · Wygodny dojazd ZKM i z Obwodnicy.',
      hours: 'Dorośli, pary oraz dzieci i młodzież od 10 lat · Terminy także przez TwójPsycholog.pl',
      ambiance:
        'Kameralny, autorski gabinet prywatny wyróżniony w plebiscycie Orły Medycyny. Spokojna i przyjazna przestrzeń, w której od pierwszych minut możesz poczuć się bezpiecznie.',
      image: './images/gabinet-gdynia.jpg',
      secondaryImage: './images/lucyna-office.jpg',
      secondaryCaption: 'mgr Lucyna Grochowska · Gabinet przy ul. Chwarznieńskiej 136–138',
      coordinates: '54.4998° N, 18.4976° E',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Chwarznie%C5%84ska+136-138,+81-602+Gdynia',
    },
    {
      id: 'srodmiescie',
      city: 'Gdynia Śródmieście',
      district: 'Śródmieście · Przychodnia Medyczna Gdynia',
      badge: 'Medyczna Gdynia',
      address: 'ul. gen. Józefa Bema 16/2, 81-381 Gdynia (Oddział A: ul. 3 Maja 30/21)',
      transit:
        'Ścisłe centrum Gdyni — ok. 7 minut spacerem od stacji SKM Gdynia Wzgórze św. Maksymiliana i Gdynia Główna.',
      parking:
        'Rejestracja przychodni: 58 500 46 87 / 58 500 46 88 · wizyta@medycznagdynia.pl (wizyty prywatne).',
      hours: 'Konsultacje stacjonarne dla dorosłych · Rezerwacja przez ZnanyLekarz lub Medyczną Gdynię',
      ambiance:
        'Placówka medyczna w samym centrum Gdyni — bardzo wygodny dojazd kolejką SKM z całego Trójmiasta (Gdynia, Sopot, Gdańsk) oraz Małego Trójmiasta.',
      image: './images/gabinet-gdansk.jpg',
      secondaryImage: './images/baltic-shore-calm.jpg',
      secondaryCaption: 'Gdynia Śródmieście · blisko Bulwaru Nadmorskiego i SKM',
      coordinates: '54.5131° N, 18.5414° E',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Genera%C5%82a+J%C3%B3zefa+Bema+16/2,+81-381+Gdynia',
    },
    {
      id: 'online',
      city: 'Online',
      district: 'Polska i zagranica · Polski / Rosyjski',
      badge: 'Wideo & Telefon',
      address: 'Szyfrowana wideokonsultacja lub konsultacja telefoniczna (PL / RU)',
      transit:
        'Łączysz się z dowolnego miejsca — przy konsultacji telefonicznej to ja dzwonię do pacjenta o umówionej godzinie.',
      parking:
        'Płatność: przelew na konto · Możliwość przygotowania wcześniejszej dokumentacji medycznej lub wyników badań.',
      hours: 'Przygotuj się 10 min przed sesją (sprawdź połączenie, kamerę i mikrofon) · Dorośli i pary',
      ambiance:
        'Pełna dyskrecja, uważność i ciągłość terapii także podczas wyjazdów czy pobytu za granicą. Elastyczne łączenie sesji online ze spotkaniami w Gdyni.',
      image: './images/editorial-sanctuary-tea.jpg',
      secondaryImage: './images/lucyna-detail.jpg',
      secondaryCaption: 'Spokojna przestrzeń rozmowy online · PL / RU',
      coordinates: 'End-to-End · RODO',
    },
  ] as LocationItem[],

  pricing: {
    eyebrow: 'Pełny cennik i zakres usług',
    headline: 'Przejrzyste warunki od pierwszego spotkania.',
    subheadline:
      'Przyjmuję wyłącznie w ramach wizyt prywatnych. Poniżej pełne zestawienie usług i cen z profili TwójPsycholog.pl oraz ZnanyLekarz.pl.',
    items: [
      {
        id: 'consultation',
        name: 'Konsultacja psychologiczna · psychoterapeutyczna · psychotraumatologiczna',
        duration: '50 minut · Witomino: 200 zł · Medyczna Gdynia / ZnanyLekarz: 210 zł',
        price: '200–210 zł',
        note: 'Pierwsza konsultacja wstępna, poradnictwo psychologiczne, konsultacja seksuologiczna oraz konsultacja dla par (Gdynia lub Online).',
      },
      {
        id: 'psychotherapy',
        name: 'Psychoterapia indywidualna (nurt psychodynamiczny)',
        duration: '60 min (ul. Chwarznieńska: 200 zł) · 50 min (ZnanyLekarz: 210 zł)',
        price: '200–210 zł',
        note: 'Regularne spotkania psychoterapii krótko- i długoterminowej, w tym psychoterapia traumy oraz terapia uzależnień.',
        highlighted: true,
      },
      {
        id: 'diagnostics-support',
        name: 'Interwencja kryzysowa · Badania · Ocena stanu psychicznego · Psychoedukacja · Relaksacja',
        duration: '50 minut · Wizyty prywatne (Gdynia / Online)',
        price: 'od 210 zł',
        note: 'Interwencja kryzysowa (210 zł), ocena stanu psychicznego (210 zł), psychoedukacja (210 zł), relaksacja (210 zł) oraz badania psychologiczne (od 210 zł).',
      },
      {
        id: 'home-visit',
        name: 'Wizyta domowa (na terenie Gdyni)',
        duration: 'Spotkanie z dojazdem do domu pacjenta',
        price: '430 zł',
        note: 'Indywidualna konsultacja psychologiczna lub wsparcie w miejscu zamieszkania dla osób mających trudność z dotarciem do gabinetu (np. stany pooperacyjne, seniorzy).',
      },
    ] as PricingItem[],
    policies: [
      'Akceptowane formy płatności: gotówka w gabinecie, BLIK, przelew na konto oraz Revolut (wizyty wyłącznie prywatne, bez NFZ i ubezpieczycieli).',
      'Język prowadzenia sesji: język polski oraz język rosyjski (stacjonarnie w Gdyni, online oraz podczas wizyt domowych).',
      'Wszystkie spotkania objęte są bezwzględną tajemnicą zawodową i prowadzone pod stałą superwizją kliniczną.',
    ],
  },

  faq: [
    {
      question: 'Jak trafić do gabinetu prywatnego przy ul. Chwarznieńskiej 136–138?',
      answer:
        'Wejście do budynku znajduje się tak jak do rehabilitacji — po wejściu należy skręcić w lewo, to trzeci gabinet za szklanymi drzwiami. Przy budynku dostępne są wygodne miejsca postojowe oraz przystanki ZKM.',
    },
    {
      question: 'Jak wygląda pierwsza konsultacja i czy muszę się przygotować?',
      answer:
        'Nie musisz przygotowywać gotowego scenariusza. Podczas pierwszych konsultacji spokojnie rozmawiamy o tym, co sprowadza Cię do gabinetu i na czym polega Twoje cierpienie. Przy sesjach online warto usiąść 10 minut wcześniej, sprawdzić mikrofon/kamerę i ewentualnie mieć pod ręką wcześniejszą dokumentację medyczną.',
    },
    {
      question: 'W jakim nurcie pracujesz i czym jest psychoterapia psychodynamiczna?',
      answer:
        'Pracuję w nurcie psychodynamicznym (w trakcie procesu certyfikacji), jako psychotraumatolog oraz seksuolog kliniczny w trakcie certyfikacji. Podejście psychodynamiczne pozwala sięgnąć głębiej niż powierzchowne objawy — zrozumieć źródła powtarzających się emocji i relacji, co prowadzi do trwałej ulgi.',
    },
    {
      question: 'Czy przyjmujesz online, w języku rosyjskim oraz na wizytach domowych?',
      answer:
        'Tak. Oprócz obu gabinetów w Gdyni (ul. Chwarznieńska 136–138 oraz Przychodnia Medyczna Gdynia) prowadzę wideokonsultacje i konsultacje telefoniczne (przy telefonicznej to ja dzwonię o umówionej porze), a także wizyty domowe (430 zł). Sesje odbywają się po polsku i po rosyjsku.',
    },
    {
      question: 'Z jakimi osobami pracujesz — czy przyjmujesz pary i młodzież?',
      answer:
        'Przyjmuję osoby dorosłe (terapia indywidualna oraz terapia dla par), a w gabinecie przy ul. Chwarznieńskiej również dzieci i młodzież od 10 roku życia. Gabinet jest otwartą, bezpieczną przestrzenią przyjazną osobom LGBT+.',
    },
    {
      question: 'Jakie formy płatności akceptujesz i czy przyjmujesz na NFZ / w ramach pakietów?',
      answer:
        'Przyjmuję wyłącznie w ramach wizyt prywatnych (bez NFZ oraz prywatnych ubezpieczeń medycznych). Akceptuję gotówkę w gabinecie, BLIK, przelew na konto oraz Revolut. Ceny konsultacji i psychoterapii wynoszą 200 zł (ul. Chwarznieńska) lub 210 zł (Medyczna Gdynia / ZnanyLekarz), badania psychologiczne od 210 zł, a wizyta domowa 430 zł.',
    },
  ] as FaqItem[],

  crisisHelp: [
    { label: 'Centrum Wsparcia (24/7, bezpłatnie)', number: '800 70 2222' },
    { label: 'Kryzysowy Telefon Zaufania dla Dorosłych', number: '116 123' },
    { label: 'W nagłym zagrożeniu życia', number: '112' },
  ],
};
