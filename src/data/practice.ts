// Centralna konfiguracja danych gabinetu mgr Lucyny Grochowskiej
// Dane zsynchronizowane z oficjalnymi profilami:
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
  // aby wszystkie zapytania z formularza trafiały prosto na skrzynkę.
  // =========================================================================
  bookingRecipientEmail: 'euro169@wp.pl',

  brandMonogram: 'L.',
  fullName: 'mgr Lucyna Grochowska',
  shortName: 'Lucyna Grochowska',
  role: 'Psycholog · Psychotraumatolog · Psychoterapeutka',
  regionLabel: 'Gdynia · Trójmiasto · Online (PL / RU)',
  tagline:
    'Psychoterapia psychodynamiczna, psychotraumatologia, seksuologia, fototerapia i pomoc psychologiczna dla dorosłych, par oraz młodzieży (od 10. roku życia) w Gdyni i online.',
  phoneDisplay: '+48 664 411 496',
  phoneSecondaryDisplay: '',
  phoneHref: 'tel:+48664411496',
  phoneSecondaryHref: '',
  email: 'euro169@wp.pl',
  clinicEmail: 'euro169@wp.pl',
  availabilityStatus: 'Przyjmuję w Gdyni, online oraz na wizytach domowych',

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
      'https://www.google.com/maps/search/?api=1&query=3+Maja+30/21,+81-364+Gdynia',
    featuredReviews: [
      {
        author: 'Anita',
        dateLabel: 'maj 2026 · ZnanyLekarz',
        text: 'Serdecznie polecam Panią psycholog. Akceptuje, nie ocenia, a wspiera. Czuję się bezpiecznie i mam dzięki temu odwagę do zmian koniecznych do lepszego życia. Duża wiedza i doświadczenie.',
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
    portrait: '/images/portrait-lucyna.jpg',
    officePortrait: '/images/lucyna-office.jpg',
    gdansk: '/images/gabinet-gdansk.jpg',
    gdynia: '/images/gabinet-gdynia.jpg',
    stillLife: '/images/still-life-calm.jpg',
    detail: '/images/lucyna-detail.jpg',
    balticShore: '/images/baltic-shore-calm.jpg',
    gdanskExterior: '/images/gdansk-kamienica-entrance.jpg',
    sanctuaryTea: '/images/editorial-sanctuary-tea.jpg',
    lightArchitecture: '/images/editorial-light-architecture.jpg',
    balticPinePath: '/images/baltic-pine-path.jpg',
    sanctuaryCorner: '/images/sanctuary-corner.jpg',
  },

  hero: {
    eyebrow: 'Psycholog · Psychotraumatolog · Gdynia i online',
    headlineLines: [
      'Kiedy pozwalasz sobie',
      'na przyjęcie pomocy,',
      'żyje się po prostu lżej.',
    ],
    italicWord: 'po prostu lżej.',
    subheadline:
      'Jestem psychologiem z 8-letnim doświadczeniem klinicznym i psychotraumatologiem — w trakcie certyfikacji z psychoterapii psychodynamicznej oraz seksuologii klinicznej. Przyjmuję w Gdyni i online.',
    primaryCta: 'Umów konsultację',
    secondaryCta: 'Poznaj moje podejście',
    trustStats: [
      { value: '8 lat', label: 'praktyki klinicznej' },
      { value: 'Psychodynamiczny', label: 'nurt · stała superwizja' },
      { value: 'PL / RU', label: 'języki sesji · przyjazna LGBT+' },
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
        lead: 'Lęk, napięcie lub długotrwały smutek nie odpuszczają nawet w spokojne dni.',
        body: 'Napięcie, bezsenność, depresja, lęk społeczny albo dolegliwości psychosomatyczne, w których ciało zaczyna głośno sygnalizować przeciążenie emocjonalne.',
      },
      {
        index: '02',
        lead: 'Trudno Ci oprzeć się na poczuciu własnej wartości i wewnętrznej pewności.',
        body: 'Trudność w odnalezieniu wewnętrznego oparcia, pewności siebie oraz spójnej tożsamości osobistej lub zawodowej — w tym wypalenie zawodowe czy presja w sporcie.',
      },
      {
        index: '03',
        lead: 'W bliskich relacjach wracają te same zranienia, dystans albo samotność.',
        body: 'Powtarzające się kryzysy w związku, zdrada, rozwód lub rozstanie, samotność, trudność w znalezieniu bliskiej osoby oraz napięcia w sferze intymnej i seksualnej.',
      },
      {
        index: '04',
        lead: 'Ślady bolesnych lub traumatycznych przeżyć wciąż nie pozwalają odetchnąć.',
        body: 'Doświadczenie przemocy fizycznej, psychicznej lub ekonomicznej, wykorzystanie seksualne, żałoba, stany pooperacyjne albo nagły kryzys życiowy.',
      },
      {
        index: '05',
        lead: 'Potrzebujesz spokojnej rozmowy w przestrzeni, w której nikt Cię nie ocenia.',
        body: 'Szukasz miejsca w Gdyni lub online (po polsku albo po rosyjsku), gdzie zostaniesz naprawdę wysłuchana lub wysłuchany — z uważnością, dyskrecją i prawdziwym zrozumieniem.',
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
        text: 'Pracuję pod stałą superwizją kliniczną i z zachowaniem tajemnicy zawodowej. Moje dyplomy zostały zweryfikowane w serwisie TwójPsycholog, a gabinet jest przestrzenią przyjazną osobom LGBT+.',
      },
    ],
  },

  specialties: [
    {
      id: 'lek-depresja-nastroj',
      number: '01',
      title: 'Stany lękowe, nerwice i depresja',
      subtitle: 'Odzyskiwanie wewnętrznego spokoju i równowagi',
      description:
        'Towarzyszę osobom, u których przewlekły lęk, obniżony nastrój lub napięcie w ciele zaczynają odbierać siły do codziennego życia. Wspólnie docieramy do źródeł objawów, aby krok po kroku odzyskać stabilność, spokojniejszy sen i realną ulgę.',
      signals: [
        'Stany lękowe i nerwica',
        'Napady paniki i lęk uogólniony',
        'Fobia społeczna',
        'Depresja, depresja sezonowa i ChAD',
        'Bezsenność, rytm dobowy i fototerapia',
        'Zaburzenia emocjonalne i objawy psychosomatyczne',
      ],
      approach: 'Psychoterapia psychodynamiczna · Psychologia kliniczna · Fototerapia · Relaksacja',
      image: '/images/baltic-shore-calm.jpg',
    },
    {
      id: 'psychotraumatologia',
      number: '02',
      title: 'Psychotraumatologia, przemoc i strata',
      subtitle: 'Odbudowa bezpieczeństwa po bolesnych doświadczeniach',
      description:
        'Graniczne przeżycia potrafią na długo odebrać poczucie bezpieczeństwa i zaufanie do świata. W uważnym, dostosowanym do Ciebie tempie stopniowo oswajamy ślady traumy, odzyskując sprawczość i wewnętrzne oparcie.',
      signals: [
        'Psychoterapia traumy',
        'Przemoc fizyczna, psychiczna i ekonomiczna',
        'Wykorzystywanie seksualne',
        'Żałoba i strata bliskiej osoby',
        'Wsparcie w stanach pooperacyjnych',
      ],
      approach: 'Psychotraumatologia · Psychoterapia traumy · Interwencja kryzysowa',
      image: '/images/editorial-sanctuary-tea.jpg',
    },
    {
      id: 'relacje-pary-mlodziez',
      number: '03',
      title: 'Relacje, terapia par i młodzież',
      subtitle: 'Zdrowsza bliskość w związku, rodzinie i wśród rówieśników',
      description:
        'Wspieram zarówno osoby indywidualne, jak i pary przechodzące przez kryzys, oddalenie czy rozstanie. W gabinecie przy ul. Chwarznieńskiej przyjmuję również dzieci i młodzież od 10. roku życia doświadczające trudności emocjonalnych lub rówieśniczych.',
      signals: [
        'Kryzys w związku i zdrada',
        'Rozwód lub rozstanie',
        'Trudności w nawiązywaniu relacji',
        'Samotność i trudność w znalezieniu bliskiej osoby',
        'Dzieci i młodzież od 10. roku życia (depresja, relacje)',
      ],
      approach: 'Terapia indywidualna i dla par · Wsparcie dzieci i młodzieży (10+)',
      image: '/images/gabinet-gdynia.jpg',
    },
    {
      id: 'seksuologia',
      number: '04',
      title: 'Seksuologia kliniczna i intymność',
      subtitle: 'Uważna rozmowa o bliskości i dobrostanie seksualnym',
      description:
        'Sfera seksualna jest naturalną częścią zdrowia i jakości życia, choć rozmowa o niej często bywa trudna. Oferuję dyskretne, nieoceniające konsultacje indywidualne i dla par — łączące perspektywę psychologiczną z wiedzą seksuologiczną.',
      signals: [
        'Problemy seksualne w parze',
        'Obniżone libido i spadek pożądania',
        'Trudności z erekcją i podnieceniem',
        'Intymność w okresie menopauzy',
        'Bliskość i akceptacja cielesności',
      ],
      approach: 'Seksuologia kliniczna (w trakcie certyfikacji) · Edukacja i terapia',
      image: '/images/still-life-calm.jpg',
      imagePosition: 'object-[50%_62%]',
    },
    {
      id: 'tozsamosc-osobowosc-rozwoj',
      number: '05',
      title: 'Tożsamość, osobowość i praca',
      subtitle: 'Budowanie oparcia w sobie i psychoterapia długoterminowa',
      description:
        'Pracuję z osobami poszukującymi spójnego poczucia własnej wartości, kierunku zawodowego, odporności w sporcie oraz wewnętrznej stabilności. Prowadzę również pogłębioną psychoterapię długoterminową dla osób z zaburzeniami osobowości oraz po doświadczeniu psychozy.',
      signals: [
        'Niska samoocena i brak pewności siebie',
        'Osobowość borderline i inne zaburzenia osobowości',
        'Wypalenie, kryzys i rozwój zawodowy',
        'Presja i kryzysy w sporcie',
        'Wsparcie w schizofrenii i po epizodach psychotycznych',
      ],
      approach: 'Psychoterapia długoterminowa · Nurt psychodynamiczny · Diagnoza',
      image: '/images/editorial-light-architecture.jpg',
      imagePosition: 'object-[50%_55%]',
    },
    {
      id: 'kryzys-odzywianie-uzaleznienia',
      number: '06',
      title: 'Kryzysy życiowe, odżywianie i uzależnienia',
      subtitle: 'Oparcie w trudnych zmianach i praca nad nawykami',
      description:
        'Kiedy nagła zmiana życiowa, samotność lub trudne nawyki przekraczają dotychczasowe zasoby, nie musisz mierzyć się z tym w pojedynkę. Łączę interwencję kryzysową z pracą nad relacją z jedzeniem oraz specjalistyczną terapią uzależnień.',
      signals: [
        'Nagły kryzys życiowy, emigracja i przesilenie wieku średniego',
        'Syndrom pustego gniazda i wsparcie seniorów',
        'Zaburzenia odżywiania, relacja z jedzeniem i otyłość',
        'Uzależnienia, DDA i wsparcie bliskich',
      ],
      approach: 'Interwencja kryzysowa · Terapia uzależnień · Psychoedukacja',
      image: '/images/gdansk-kamienica-entrance.jpg',
      imagePosition: 'object-center',
    },
  ] as SpecialtyItem[],

  about: {
    eyebrow: 'O mnie',
    headline: 'Kliniczne doświadczenie, głęboka uważność i przestrzeń bez oceniania.',
    paragraphs: [
      'Z wykształcenia jestem psychologiem z 8-letnią praktyką kliniczną oraz psychotraumatologiem. Kształcę się w procesie certyfikacji z psychoterapii psychodynamicznej oraz seksuologii klinicznej. Zawodowe doświadczenie zdobywałam zarówno w publicznych placówkach zdrowia psychicznego i na oddziałach szpitalnych, jak i w gabinecie prywatnym.',
      'W codziennej pracy towarzyszę osobom zmagającym się ze stanami lękowymi, nerwicami, depresją, niskim poczuciem własnej wartości oraz trudnościami w budowaniu bliskich związków. Pomagam także przy dolegliwościach psychosomatycznych, zagubieniu tożsamościowym i kryzysach zawodowych oraz prowadzę terapię zaburzeń osobowości, odżywiania, uzależnień i interwencję kryzysową.',
      'Każdą współpracę rozpoczynam od spokojnych konsultacji, podczas których staram się głęboko zrozumieć, na czym polega Twoje cierpienie. Spotkania prowadzę po polsku i po rosyjsku, pod stałą superwizją, w przestrzeni otwartej i przyjaznej osobom LGBT+. Pozwalając sobie na przyjęcie pomocy, dajesz sobie realną szansę na lżejsze życie.',
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
            title: 'Gabinet Psychologiczno-Psychoterapeutyczny — Gdynia i online',
            institution:
              'ul. Chwarznieńska 136–138, Gdynia Witomino · Sesje stacjonarne, online i domowe',
            detail:
              'Konsultacje psychologiczne, psychoterapeutyczne, psychotraumatologiczne i seksuologiczne, psychoterapia długoterminowa, terapia par, badania psychologiczne, fototerapia i relaksacja.',
          },
          {
            period: 'Przychodnia specjalistyczna · Gdynia Śródmieście',
            title: 'Psycholog, psychotraumatolog, psychoterapeutka',
            institution:
              'Przychodnia Medyczna Gdynia (ul. 3 Maja 30/21)',
            detail:
              'Konsultacje diagnostyczne i terapeutyczne, ocena stanu psychicznego, interwencja kryzysowa i psychoterapia indywidualna.',
          },
          {
            period: 'Publiczna ochrona zdrowia psychicznego',
            title: 'Psycholog w poradni zdrowia psychicznego',
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
              'Praca psychologiczna z pacjentami oddziałów szpitalnych, w stanach pooperacyjnych i kryzysach zdrowotnych, a także wsparcie seniorów.',
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
              'Bezpieczna, nieoceniająca przestrzeń dla każdej osoby, pełna poufność oraz wyróżnienie w plebiscycie Orły Medycyny.',
          },
          {
            period: 'Dostępność i języki',
            title: 'Sesje po polsku i rosyjsku · Dorośli, pary i młodzież (10+)',
            institution: 'Gdynia (2 lokalizacje), online oraz wizyty domowe',
            detail:
              'Prowadzę konsultacje i terapię w języku polskim i rosyjskim. Przyjmuję dorosłych, pary oraz (przy ul. Chwarznieńskiej) dzieci i młodzież od 10. roku życia.',
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
        image: '/images/editorial-sanctuary-tea.jpg',
        imageAlt: 'Spokojna filiżanka herbaty na stole przed pierwszą konsultacją',
        description:
          'Wypełniasz krótki formularz na stronie albo wybierasz termin w kalendarzu TwójPsycholog.pl lub ZnanyLekarz.pl. Możesz umówić się na Witominie, w Medycznej Gdyni, online lub na wizytę domową.',
      },
      {
        number: '02',
        title: 'Konsultacje wstępne (1–3 spotkania)',
        duration: '50 minut · Język polski lub rosyjski',
        image: '/images/lucyna-office.jpg',
        imageAlt: 'mgr Lucyna Grochowska w swoim gabinecie psychologicznym w Gdyni',
        description:
          'Podczas pierwszych konsultacji wspólnie staramy się zrozumieć, na czym polega Twoje cierpienie i jaka forma pomocy (psychoterapia, wsparcie kryzysowe, badania lub psychoedukacja) będzie najlepsza.',
      },
      {
        number: '03',
        title: 'Regularny proces terapeutyczny',
        duration: '50–60 minut · W Twoim realnym tempie',
        image: '/images/editorial-light-architecture.jpg',
        imageAlt: 'Miękkie poranne światło na gładkim łuku tynku — metafora ulgi i spokoju',
        description:
          'Wspólnie ustalamy ramy współpracy i rozpoczynamy proces w nurcie psychodynamicznym lub psychoterapię traumy — aby z czasem mogło dojść do głębokiej zmiany emocjonalnej i trwałej ulgi.',
      },
    ],
  },

  locations: [
    {
      id: 'witomino',
      city: 'Gdynia Witomino',
      district: 'Gabinet prywatny · Witomino-Radiostacja',
      badge: 'Gabinet prywatny',
      address: 'ul. Chwarznieńska 136–138, 81-602 Gdynia',
      transit:
        'Wejście do budynku wspólne z rehabilitacją, następnie w lewo — trzeci gabinet za szklanymi drzwiami.',
      parking:
        'Płatność: gotówka w gabinecie, BLIK, przelew na konto lub Revolut · Wygodny dojazd ZKM i z Obwodnicy.',
      hours: 'Dorośli, pary oraz dzieci i młodzież od 10. roku życia · Terminy także na TwójPsycholog.pl',
      ambiance:
        'Kameralny, autorski gabinet prywatny wyróżniony w plebiscycie Orły Medycyny. Spokojna i przyjazna przestrzeń, w której od pierwszych minut możesz poczuć się bezpiecznie.',
      image: '/images/gabinet-gdynia.jpg',
      secondaryImage: '/images/lucyna-office.jpg',
      secondaryCaption: 'mgr Lucyna Grochowska · Gabinet przy ul. Chwarznieńskiej 136–138',
      coordinates: '54.4998° N, 18.4976° E',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Chwarznie%C5%84ska+136-138,+81-602+Gdynia',
    },
    {
      id: 'srodmiescie',
      city: 'Gdynia Śródmieście',
      district: 'Przychodnia Medyczna Gdynia',
      badge: 'Medyczna Gdynia',
      address: 'ul. 3 Maja 30/21, 81-364 Gdynia',
      transit:
        'Ścisłe centrum Gdyni — ok. 5 minut spacerem od stacji SKM Gdynia Główna.',
      parking:
        'Kontakt i rejestracja: +48 664 411 496 · euro169@wp.pl (wizyty prywatne).',
      hours: 'Konsultacje stacjonarne dla dorosłych · Rezerwacja telefoniczna, przez formularz lub ZnanyLekarz',
      ambiance:
        'Placówka medyczna w samym centrum Gdyni — bardzo wygodny dojazd kolejką SKM z całego Trójmiasta (Gdynia, Sopot, Gdańsk) i okolic.',
      image: '/images/gabinet-gdansk.jpg',
      secondaryImage: '/images/baltic-shore-calm.jpg',
      secondaryCaption: 'Gdynia Śródmieście · ul. 3 Maja 30/21, blisko SKM i Bulwaru',
      coordinates: '54.5192° N, 18.5364° E',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=3+Maja+30/21,+81-364+Gdynia',
    },
    {
      id: 'online',
      city: 'Online',
      district: 'Polska i zagranica · Polski / Rosyjski',
      badge: 'Wideo i telefon',
      address: 'Szyfrowana wideokonsultacja lub konsultacja telefoniczna (PL / RU)',
      transit:
        'Łączysz się z dowolnego miejsca — przy konsultacji telefonicznej to ja dzwonię do Ciebie o umówionej godzinie.',
      parking:
        'Płatność: przelew na konto · Możliwość przygotowania wcześniejszej dokumentacji medycznej lub wyników badań.',
      hours:
        'Usiądź spokojnie ok. 10 minut przed sesją (sprawdź połączenie, kamerę i mikrofon) · Dorośli i pary',
      ambiance:
        'Pełna dyskrecja, uważność i ciągłość terapii także podczas wyjazdów czy pobytu za granicą. Elastyczne łączenie sesji online ze spotkaniami w Gdyni.',
      image: '/images/editorial-sanctuary-tea.jpg',
      secondaryImage: '/images/lucyna-detail.jpg',
      secondaryCaption: 'Spokojna przestrzeń rozmowy online · PL / RU',
      coordinates: 'End-to-End · RODO',
    },
  ] as LocationItem[],

  pricing: {
    eyebrow: 'Pełny cennik i zakres usług',
    headline: 'Przejrzyste warunki od pierwszego spotkania.',
    subheadline:
      'Przyjmuję wyłącznie w ramach wizyt prywatnych. Poniżej znajdziesz aktualny cennik konsultacji, psychoterapii oraz wizyt domowych — spójny z moimi profilami w serwisach TwójPsycholog i ZnanyLekarz.',
    items: [
      {
        id: 'consultation',
        name: 'Konsultacja psychologiczna i wstępna',
        duration: '50 min · Witomino: 200\u00A0zł · Medyczna Gdynia / ZnanyLekarz: 210\u00A0zł',
        price: '200–210\u00A0zł',
        note: 'Pierwsza konsultacja wstępna, poradnictwo psychologiczne, konsultacja psychoterapeutyczna, psychotraumatologiczna, seksuologiczna oraz dla par (Gdynia lub online).',
      },
      {
        id: 'psychotherapy',
        name: 'Psychoterapia indywidualna (nurt psychodynamiczny)',
        duration: '60 min (Witomino: 200\u00A0zł) · 50 min (ZnanyLekarz: 210\u00A0zł)',
        price: '200–210\u00A0zł',
        note: 'Regularne spotkania psychoterapii krótko- i długoterminowej, w tym psychoterapia traumy oraz terapia uzależnień.',
        highlighted: true,
      },
      {
        id: 'diagnostics-support',
        name: 'Interwencja kryzysowa, badania i psychoedukacja',
        duration: '50 min · Wizyty prywatne (Gdynia / online)',
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
      {
        id: 'phototherapy',
        name: 'Fototerapia',
        duration: 'Sesje indywidualne · Gdynia',
        price: 'do uzgodnienia',
        note: 'Wsparcie światłoterapią m.in. przy obniżonym nastroju, depresji sezonowej oraz zaburzeniach snu i rytmu dobowego. Cena do uzgodnienia indywidualnie.',
      },
    ] as PricingItem[],
    policies: [
      'Akceptowane formy płatności: gotówka w gabinecie, BLIK, przelew na konto oraz Revolut (wizyty wyłącznie prywatne, bez NFZ i pakietów ubezpieczeniowych).',
      'Język prowadzenia sesji: język polski oraz język rosyjski (stacjonarnie w Gdyni, online oraz podczas wizyt domowych).',
      'Wszystkie spotkania objęte są bezwzględną tajemnicą zawodową i prowadzone pod stałą superwizją kliniczną.',
    ],
  },

  faq: [
    {
      question: 'Jak trafić do gabinetu prywatnego przy ul. Chwarznieńskiej 136–138?',
      answer:
        'Wejście do budynku jest wspólne z rehabilitacją — po wejściu skręć w lewo, to trzeci gabinet za szklanymi drzwiami. Przy budynku dostępne są wygodne miejsca postojowe oraz przystanki ZKM.',
    },
    {
      question: 'Jak wygląda pierwsza konsultacja i czy muszę się przygotować?',
      answer:
        'Nie musisz przygotowywać gotowego scenariusza. Podczas pierwszych konsultacji spokojnie rozmawiamy o tym, co sprowadza Cię do gabinetu i na czym polega Twoje cierpienie. Przy sesjach online warto usiąść 10 minut wcześniej, sprawdzić mikrofon i kamerę oraz ewentualnie mieć pod ręką wcześniejszą dokumentację medyczną.',
    },
    {
      question: 'W jakim nurcie pracujesz i czym jest psychoterapia psychodynamiczna?',
      answer:
        'Jestem psychotraumatologiem oraz pracuję w nurcie psychodynamicznym i obszarze seksuologii klinicznej (w obu w trakcie certyfikacji). Podejście psychodynamiczne pozwala sięgnąć głębiej niż same objawy — zrozumieć źródła powtarzających się emocji i wzorców relacyjnych, co prowadzi do trwałej ulgi.',
    },
    {
      question: 'Czy przyjmujesz online, w języku rosyjskim oraz na wizytach domowych?',
      answer:
        'Tak. Oprócz obu gabinetów w Gdyni (ul. Chwarznieńska 136–138 oraz Przychodnia Medyczna Gdynia) prowadzę wideokonsultacje i konsultacje telefoniczne (przy rozmowie telefonicznej to ja dzwonię do Ciebie o umówionej godzinie), a także wizyty domowe (430 zł). Sesje odbywają się po polsku i po rosyjsku.',
    },
    {
      question: 'Z jakimi osobami pracujesz — czy przyjmujesz pary i młodzież?',
      answer:
        'Przyjmuję osoby dorosłe (terapia indywidualna oraz terapia dla par), a w gabinecie przy ul. Chwarznieńskiej również dzieci i młodzież od 10. roku życia. Gabinet jest otwartą, bezpieczną przestrzenią przyjazną osobom LGBT+.',
    },
    {
      question: 'Jakie formy płatności akceptujesz i czy przyjmujesz na NFZ lub w ramach pakietów?',
      answer:
        'Przyjmuję wyłącznie w ramach wizyt prywatnych (bez NFZ oraz prywatnych pakietów medycznych). Akceptuję gotówkę w gabinecie, BLIK, przelew na konto oraz Revolut. Konsultacja i psychoterapia kosztują 200 zł (ul. Chwarznieńska) lub 210 zł (Medyczna Gdynia / ZnanyLekarz), badania psychologiczne od 210 zł, wizyta domowa 430 zł, a cena fototerapii ustalana jest indywidualnie.',
    },
  ] as FaqItem[],

  crisisHelp: [
    { label: 'Centrum Wsparcia (24/7, bezpłatnie)', number: '800 70 2222' },
    { label: 'Kryzysowy Telefon Zaufania dla Dorosłych', number: '116 123' },
    { label: 'W nagłym zagrożeniu życia', number: '112' },
  ],
};
