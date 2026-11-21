// Centralna konfiguracja danych gabinetu mgr Lucyny Grochowskiej
// Dane zsynchronizowane z oficjalnymi profilami: ZnanyLekarz.pl oraz TwójPsycholog.pl

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
  // Wszystkie formularze rezerwacji ze strony będą trafiać na tę skrzynkę
  // (przy pierwszym wysłaniu testowym kliknij jednorazowy link aktywacyjny).
  // =========================================================================
  bookingRecipientEmail: 'kontakt@lucynagrochowska.pl',

  brandMonogram: 'L.',
  fullName: 'mgr Lucyna Grochowska',
  shortName: 'Lucyna Grochowska',
  role: 'Psycholog · Psychotraumatolog · Psychoterapeutka',
  regionLabel: 'Gdynia · Trójmiasto · Online (PL / RU)',
  tagline:
    'Psychoterapia psychodynamiczna, psychotraumatologia i pomoc psychologiczna dla dorosłych, par oraz młodzieży w Gdyni i online.',
  phoneDisplay: '+48 58 500 46 87',
  phoneHref: 'tel:+48585004687',
  email: 'kontakt@lucynagrochowska.pl',
  availabilityStatus:
    'Przyjmuję stacjonarnie w Gdyni (2 gabinety) oraz online · Polski i Rosyjski',

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
      'Jestem psychologiem z wieloletnim doświadczeniem klinicznym, psychotraumatologiem oraz psychoterapeutką w nurcie psychodynamicznym i seksuologiem klinicznym w trakcie certyfikacji. Przyjmuję stacjonarnie w Gdyni oraz online.',
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
      'Wewnątrz jednak coraz trudniej złapać spokojny oddech. Wielu moich pacjentów trafia do gabinetu w momencie, gdy dotychczasowe sposoby radzenia sobie z lękiem, smutkiem czy napięciem w relacjach przestają wystarczać.',
    reflections: [
      {
        index: '01',
        lead: 'Stany lękowe, nerwicowe lub długotrwałe przygnębienie.',
        body: 'Napięcie, kołatanie serca, bezsenność, poczucie pustki albo dolegliwości psychosomatyczne, w których ciało zaczyna głośno sygnalizować przeciążenie emocjonalne.',
      },
      {
        index: '02',
        lead: 'Niskie poczucie własnej wartości i brak wewnętrznego oparcia.',
        body: 'Poczucie zagubienia w tym, kim naprawdę jesteś — zarówno w życiu osobistym, jak i w budowaniu swojej tożsamości zawodowej oraz stawianiu zdrowych granic.',
      },
      {
        index: '03',
        lead: 'Trudności w tworzeniu i utrzymywaniu bliskich relacji.',
        body: 'Powtarzające się kryzysy w związku, lęk przed bliskością lub odrzuceniem, doświadczenie zdrady, rozstania czy poczucie samotności mimo obecności innych.',
      },
      {
        index: '04',
        lead: 'Ślady trudnych, bolesnych lub traumatycznych doświadczeń.',
        body: 'Przeszłe urazy, doświadczenie przemocy fizycznej, psychicznej lub ekonomicznej, żałoba albo wydarzenia, po których trudno wrócić do poczucia bezpieczeństwa.',
      },
      {
        index: '05',
        lead: 'Potrzeba spokojnej, nieoceniającej rozmowy w bezpiecznej przestrzeni.',
        body: 'Szukasz miejsca w Gdyni lub online, gdzie możesz zostać naprawdę wysłuchana i wysłuchany — bez oceniania, w swoim tempie i z głębokim zrozumieniem.',
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
        text: 'Łączę wieloletnie doświadczenie kliniczne z psychoterapią psychodynamiczną, psychotraumatologią oraz wiedzą z zakresu seksuologii klinicznej.',
      },
      {
        title: 'Głęboka, trwała zmiana w czasie',
        text: 'Nie narzucam gotowych schematów ani szybkich rad. Szukamy rozwiązań w Twoim rytmie — zarówno w interwencji kryzysowej, jak i w procesie długoterminowym.',
      },
      {
        title: 'Zweryfikowane kwalifikacje i etyka',
        text: 'Pracuję pod stałą superwizją kliniczną, z zachowaniem tajemnicy zawodowej. Dyplomy zweryfikowane przez TwójPsycholog.pl · przestrzeń przyjazna LGBT+.',
      },
    ],
  },

  specialties: [
    {
      id: 'lek-depresja',
      number: '01',
      title: 'Stany lękowe, nerwice i depresja',
      subtitle: 'Odzyskiwanie równowagi emocjonalnej i spokoju w ciele',
      description:
        'Pomoc osobom zmagającym się ze stanami lękowymi, lękiem napadowym i atakami paniki, fobią społeczną, nerwicą, depresją, bezsennością oraz dolegliwościami psychosomatycznymi.',
      signals: ['Lęk i ataki paniki', 'Obniżony nastrój i pustka', 'Objawy psychosomatyczne'],
      approach: 'Psychoterapia psychodynamiczna · Psychologia kliniczna',
      image: './images/baltic-shore-calm.jpg',
    },
    {
      id: 'psychotraumatologia',
      number: '02',
      title: 'Psychotraumatologia i praca z traumą',
      subtitle: 'Bezpieczne przepracowanie bolesnych doświadczeń',
      description:
        'Specjalistyczne wsparcie dla osób po traumatycznych przeżyciach, z doświadczeniem przemocy fizycznej, psychicznej lub ekonomicznej, wykorzystania seksualnego oraz głębokiej żałoby.',
      signals: ['Doświadczenie przemocy', 'Urazy psychiczne i żałoba', 'Utrata poczucia bezpieczeństwa'],
      approach: 'Psychotraumatologia · Psychoterapia traumy',
      image: './images/editorial-sanctuary-tea.jpg',
    },
    {
      id: 'relacje-pary',
      number: '03',
      title: 'Relacje, związki i terapia dla par',
      subtitle: 'Budowanie bezpiecznej bliskości i wzajemnego zrozumienia',
      description:
        'Wsparcie dla osób mających trudność w tworzeniu i utrzymywaniu bliskich więzi oraz dla par w kryzysie — po zdradzie, w trakcie rozstania lub rozwodu, a także w doświadczeniu samotności.',
      signals: ['Kryzys w związku i zdrada', 'Trudność w budowaniu więzi', 'Rozwód / rozstanie'],
      approach: 'Psychoterapia indywidualna i dla par',
      image: './images/gabinet-gdynia.jpg',
    },
    {
      id: 'seksuologia',
      number: '04',
      title: 'Seksuologia kliniczna i intymność',
      subtitle: 'Dyskretna rozmowa o sferze seksualnej i bliskości',
      description:
        'Konsultacje seksuologiczne dla osób indywidualnych i par dotyczące osłabnięcia popędu, zaburzeń erekcji lub nawilżenia, napięć w sferze intymnej oraz dobrostanu seksualnego.',
      signals: ['Spadek popędu seksualnego', 'Trudności w intymności pary', 'Zaburzenia erekcji / nawilżenia'],
      approach: 'Seksuologia kliniczna (w trakcie certyfikacji)',
      image: './images/still-life-calm.jpg',
      imagePosition: 'object-[50%_62%]',
    },
    {
      id: 'tozsamosc-osobowosc',
      number: '05',
      title: 'Tożsamość, poczucie wartości i osobowość',
      subtitle: 'Odnajdywanie wewnętrznego oparcia i własnej drogi',
      description:
        'Praca z osobami doświadczającymi niskiego poczucia własnej wartości, braku spójnej tożsamości osobistej lub zawodowej, wypalenia oraz zaburzeń osobowości (w tym borderline).',
      signals: ['Niskie poczucie własnej wartości', 'Zaburzenia osobowości / borderline', 'Wypalenie i kryzys zawodowy'],
      approach: 'Psychoterapia długoterminowa · Nurt psychodynamiczny',
      image: './images/editorial-light-architecture.jpg',
      imagePosition: 'object-[50%_55%]',
    },
    {
      id: 'kryzys-odzywianie-uzaleznienia',
      number: '06',
      title: 'Interwencja kryzysowa, odżywianie i uzależnienia',
      subtitle: 'Oparcie w nagłych zmianach i trudnych nawykach',
      description:
        'Wsparcie w ostrych kryzysach życiowych i emocjonalnych (emigracja, kryzys wieku średniego, syndrom pustego gniazda, stany pooperacyjne), a także terapia zaburzeń odżywiania i uzależnień.',
      signals: ['Kryzys życiowy lub emigracja', 'Zaburzenia odżywiania', 'Uzależnienia i DDA'],
      approach: 'Interwencja kryzysowa · Terapia uzależnień',
      image: './images/gdansk-kamienica-entrance.jpg',
      imagePosition: 'object-center',
    },
  ] as SpecialtyItem[],

  about: {
    eyebrow: 'O mnie',
    headline: 'Kliniczne doświadczenie, głęboka uważność i przestrzeń bez oceniania.',
    paragraphs: [
      'Z wykształcenia jestem psychologiem z wieloletnim doświadczeniem klinicznym (8 lat praktyki), psychotraumatologiem, a także psychoterapeutką pracującą w nurcie psychodynamicznym (w trakcie procesu certyfikacji) oraz seksuologiem klinicznym w trakcie procesu certyfikacji. Swoje doświadczenie zdobywałam zarówno w publicznych placówkach ochrony zdrowia psychicznego, jak i w gabinecie prywatnym.',
      'Pracuję z osobami zmagającymi się ze stanami lękowymi, nerwicowymi i depresją, z osobami doświadczającymi cierpienia z powodu niskiego poczucia własnej wartości oraz trudności w budowaniu i utrzymywaniu bliskich relacji. Towarzyszę również osobom z dolegliwościami psychosomatycznymi, z brakiem poczucia wewnętrznej tożsamości i trudnościami zawodowymi, a także pacjentom z zaburzeniami osobowości, zaburzeniami odżywiania, uzależnieniami oraz w sytuacjach interwencji kryzysowej.',
      'Każdy proces terapeutyczny rozpoczynamy od spokojnych konsultacji, podczas których staram się głęboko zrozumieć, na czym polega Twoje cierpienie. Prowadzę spotkania w języku polskim oraz rosyjskim — pod stałą superwizją kliniczną, w otwartej i bezpiecznej atmosferze. Serdecznie zapraszam do kontaktu: pozwalając sobie na przyjęcie pomocy, dajesz sobie realną szansę na lżejsze, lepsze życie.',
    ],
    credentials: [
      {
        id: 'education',
        label: 'Wykształcenie',
        items: [
          {
            period: 'Studia magisterskie · Dyplom zweryfikowany',
            title: 'Psychologia — Wydział Psychologii',
            institution: 'Uniwersytet Kazimierza Wielkiego w Bydgoszczy',
            detail:
              'Jednolite studia magisterskie z psychologii. Dyplomy oficjalnie zweryfikowane przez portal TwójPsycholog.pl.',
          },
          {
            period: 'Szkolenie psychoterapeutyczne i psychotraumatologia',
            title: 'Psychoterapia psychodynamiczna i psychotraumatologia',
            institution: 'Instytut Psychoterapii i Psychotraumatologii „Triada” w Gdańsku',
            detail:
              'Specjalistyczne kształcenie w zakresie psychotraumatologii oraz psychoterapii w nurcie psychodynamicznym (w trakcie procesu certyfikacji).',
          },
          {
            period: 'Studia podyplomowe · W trakcie certyfikacji',
            title: 'Seksuologia Kliniczna — Opiniowanie, Edukacja, Terapia',
            institution: 'Uniwersytet im. Adama Mickiewicza w Poznaniu',
            detail:
              'Kwalifikacje z obszaru zdrowia seksualnego, pracy z indywidualnymi trudnościami intymnymi oraz terapii relacji par.',
          },
          {
            period: 'Szkolenie specjalistyczne',
            title: 'Psychoterapia uzależnień',
            institution: 'Szkoła Psychoterapii Uzależnień „Vis Salutis” w Łodzi',
            detail:
              'Przygotowanie kliniczne do prowadzenia terapii osób zmagających się z uzależnieniami oraz współuzależnieniem.',
          },
        ],
      },
      {
        id: 'experience',
        label: 'Doświadczenie',
        items: [
          {
            period: 'Praktyka prywatna · Gdynia & Online',
            title: 'Gabinet Psychologiczny i Psychoterapeutyczny',
            institution: 'ul. Chwarznieńska 136–138, Gdynia Witomino oraz sesje online',
            detail:
              'Konsultacje psychologiczne, psychotraumatologiczne i seksuologiczne, psychoterapia indywidualna, terapia dla par oraz wizyty domowe.',
          },
          {
            period: 'Przychodnia specjalistyczna · Gdynia Śródmieście',
            title: 'Psycholog, psychotraumatolog, psychoterapeuta',
            institution: 'Przychodnia Medyczna Gdynia (ul. gen. Józefa Bema 16/2)',
            detail:
              'Konsultacje diagnostyczne i terapeutyczne, ocena stanu psychicznego, interwencja kryzysowa i psychoterapia długoterminowa.',
          },
          {
            period: 'Publiczna ochrona zdrowia psychicznego',
            title: 'Psycholog kliniczny',
            institution: 'Poradnia Zdrowia Psychicznego MSWiA w Gdańsku',
            detail:
              'Wieloletnia praca diagnostyczna i terapeutyczna z pacjentami w publicznej poradni zdrowia psychicznego.',
          },
          {
            period: 'Praktyka szpitalna i opiekuńcza',
            title: 'Doświadczenie kliniczne i wsparcie w kryzysie zdrowotnym',
            institution:
              'Regionalny Szpital Specjalistyczny w Grudziądzu (Oddział Neurochirurgii) · DPS Łosienice',
            detail:
              'Praca z pacjentami w stanach pooperacyjnych, kryzysach zdrowotnych oraz wsparcie psychologiczne osób starszych.',
          },
        ],
      },
      {
        id: 'standards',
        label: 'Etyka i standardy',
        items: [
          {
            period: 'Stały nadzór merytoryczny',
            title: 'Praca pod stałą superwizją kliniczną',
            institution: 'Regularna superwizja psychodynamiczna',
            detail:
              'Każdy proces terapeutyczny poddawany jest regularnej superwizji, co gwarantuje najwyższe bezpieczeństwo i rzetelność pracy.',
          },
          {
            period: 'Otwartość i dyskrecja',
            title: 'Bezpieczna przestrzeń przyjazna LGBT+ · Tajemnica zawodowa',
            institution: 'Kodeks Etyczno-Zawodowy Psychologa · RODO',
            detail:
              'Pełna akceptacja bez oceniania, ścisła poufność wszystkich rozmów oraz pełna ochrona danych osobowych.',
          },
          {
            period: 'Dostępność językowa i grupowa',
            title: 'Konsultacje po polsku i rosyjsku · Dorośli, pary i młodzież (10+)',
            institution: 'Stacjonarnie w Gdyni oraz zdalnie z dowolnego miejsca',
            detail:
              'Prowadzę sesje w języku polskim i rosyjskim. Przyjmuję osoby dorosłe, pary oraz (pod wybranym adresem) dzieci i młodzież od 10 roku życia.',
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
          'Wypełniasz krótki formularz na stronie albo rezerwujesz termin przez ZnanyLekarz lub TwójPsycholog. Możesz wybrać gabinet na Witominie, Medyczną Gdynię w Śródmieściu albo sesję online.',
      },
      {
        number: '02',
        title: 'Konsultacje wstępne (1–3 spotkania)',
        duration: '50 minut · W języku polskim lub rosyjskim',
        image: './images/lucyna-office.jpg',
        imageAlt: 'mgr Lucyna Grochowska w swoim gabinecie psychologicznym w Gdyni',
        description:
          'Podczas pierwszych spotkań wspólnie staramy się zrozumieć, na czym polega Twoje cierpienie i czego najbardziej potrzebujesz. Nic nie jest narzucane — rozmawiamy w bezpiecznej, swobodnej atmosferze.',
      },
      {
        number: '03',
        title: 'Regularny proces terapeutyczny',
        duration: '50–60 minut · W Twoim realnym tempie',
        image: './images/editorial-light-architecture.jpg',
        imageAlt: 'Miękkie poranne światło na gładkim łuku tynku — metafora ulgi i spokoju',
        description:
          'Wspólnie ustalamy ramy współpracy i rozpoczynamy proces w nurcie psychodynamicznym lub wsparcie kryzysowe — aby krok po kroku mogło dojść do głębokiej, trwałej ulgi w codziennym życiu.',
      },
    ],
  },

  locations: [
    {
      id: 'witomino',
      city: 'Gdynia Witomino',
      district: 'Witomino-Radiostacja · Gabinet prywatny',
      badge: 'Gabinet prywatny',
      address: 'ul. Chwarznieńska 136–138, 81-602 Gdynia',
      transit:
        'Bezpośredni dojazd liniami ZKM wzdłuż ul. Chwarznieńskiej · szybki zjazd z Obwodnicy Trójmiasta',
      parking: 'Wygodne miejsca postojowe przy budynku · akceptacja gotówki, BLIK, przelewu i Revolut',
      hours: 'Wizyty umawiane indywidualnie · Dorośli, pary i młodzież od 10 r.ż.',
      ambiance:
        'Przyjazna, kameralna przestrzeń gabinetu prywatnego w Gdyni Witominie. Spokojna atmosfera, która od pierwszych minut daje poczucie bezpieczeństwa i dyskrecji.',
      image: './images/gabinet-gdynia.jpg',
      secondaryImage: './images/lucyna-office.jpg',
      secondaryCaption: 'mgr Lucyna Grochowska · Gabinet przy ul. Chwarznieńskiej',
      coordinates: '54.4998° N, 18.4976° E',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Chwarznie%C5%84ska+136-138,+81-602+Gdynia',
    },
    {
      id: 'srodmiescie',
      city: 'Gdynia Śródmieście',
      district: 'Śródmieście · Przychodnia Medyczna Gdynia',
      badge: 'Medyczna Gdynia',
      address: 'ul. gen. Józefa Bema 16/2, 81-381 Gdynia',
      transit:
        'Ścisłe centrum Gdyni — ok. 7 minut spacerem od stacji SKM Gdynia Wzgórze św. Maksymiliana oraz ul. Świętojańskiej',
      parking: 'Strefa parkowania przy ul. Bema i al. Marszałka Piłsudskiego · tel. rejestracji: 58 500 46 87',
      hours: 'Konsultacje stacjonarne wg grafiku placówki · Rezerwacja przez formularz lub ZnanyLekarz',
      ambiance:
        'Placówka medyczna w sercu Gdyni Śródmieścia — dogodna lokalizacja dla pacjentów z całego Trójmiasta (Gdynia, Sopot, Gdańsk) oraz Małego Trójmiasta.',
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
      transit: 'Łączysz się z dowolnego miejsca — z domu, biura lub z zagranicy',
      parking:
        'Płatność przelewem na konto · możliwość płynnego łączenia z wizytami stacjonarnymi w Gdyni',
      hours: 'Elastyczne godziny · przygotuj się 10 minut przed sesją (sprawdź kamerę i mikrofon)',
      ambiance:
        'Pełna uważność, poufność i jakość kontaktu bez konieczności dojazdu. W przypadku konsultacji telefonicznej to ja dzwonię do pacjenta o umówionej godzinie.',
      image: './images/editorial-sanctuary-tea.jpg',
      secondaryImage: './images/lucyna-detail.jpg',
      secondaryCaption: 'Spokojna przestrzeń rozmowy online · PL / RU',
      coordinates: 'End-to-End · RODO',
    },
  ] as LocationItem[],

  pricing: {
    eyebrow: 'Usługi i cennik',
    headline: 'Przejrzyste warunki od pierwszego spotkania.',
    subheadline:
      'Przyjmuję wyłącznie w ramach wizyt prywatnych — poniżej znajdziesz aktualny cennik zgodny z profilami TwójPsycholog.pl i ZnanyLekarz.pl.',
    items: [
      {
        id: 'consultation',
        name: 'Konsultacja psychologiczna / psychotraumatologiczna',
        duration: '50 minut · Gdynia Witomino lub Online',
        price: '200 zł',
        note: 'Pierwsza konsultacja, poradnictwo psychologiczne, interwencja kryzysowa lub psychoedukacja. W Przychodni Medyczna Gdynia: 210 zł.',
      },
      {
        id: 'psychotherapy',
        name: 'Psychoterapia indywidualna (nurt psychodynamiczny)',
        duration: '50–60 minut · Gabinet w Gdyni lub Online',
        price: '200–210 zł',
        note: 'Regularne sesje psychoterapii indywidualnej: 200 zł (60 min) w gabinecie przy ul. Chwarznieńskiej oraz 210 zł w Medycznej Gdyni.',
        highlighted: true,
      },
      {
        id: 'specialized-home',
        name: 'Terapia par · Seksuologia · Badania · Wizyta domowa',
        duration: 'Stacjonarnie, Online lub dojazd w Gdyni',
        price: 'od 200 zł',
        note: 'Konsultacje dla par i seksuologiczne (od 200 zł), badania psychologiczne i ocena stanu psychicznego (od 210 zł), wizyta domowa: 430 zł.',
      },
    ] as PricingItem[],
    policies: [
      'Akceptowane formy płatności: gotówka w gabinecie, BLIK, przelew na konto oraz Revolut (wizyty prywatne, bez NFZ).',
      'Język prowadzenia sesji: język polski oraz język rosyjski (stacjonarnie w Gdyni oraz online).',
      'Wszystkie spotkania objęte są bezwzględną tajemnicą zawodową i prowadzone pod stałą superwizją kliniczną.',
    ],
  },

  faq: [
    {
      question: 'Jak wygląda pierwsza konsultacja i czy muszę się do niej przygotować?',
      answer:
        'Nie musisz przygotowywać żadnego scenariusza. Podczas pierwszych konsultacji spokojnie rozmawiamy o tym, co sprowadza Cię do gabinetu i na czym polega Twoje cierpienie. Moją rolą jest uważnie wysłuchać, zadać pomocne pytania i wspólnie zastanowić się nad najlepszą formą dalszego wsparcia.',
    },
    {
      question: 'W jakim nurcie pracujesz i czym jest psychoterapia psychodynamiczna?',
      answer:
        'Pracuję w nurcie psychodynamicznym (w trakcie procesu certyfikacji), a także jako psychotraumatolog oraz seksuolog kliniczny w trakcie certyfikacji. Podejście psychodynamiczne pozwala sięgnąć głębiej niż tylko do powierzchownych objawów — pomaga zrozumieć źródła powtarzających się emocji, relacji i wewnętrznych konfliktów, prowadząc do trwałej ulgi.',
    },
    {
      question: 'Czy przyjmujesz również online lub w języku rosyjskim?',
      answer:
        'Tak. Prowadzę konsultacje stacjonarnie w Gdyni (ul. Chwarznieńska 136–138 oraz Przychodnia Medyczna Gdynia przy ul. Bema 16/2), a także zdalnie w formie wideokonsultacji i rozmów telefonicznych. Spotkania odbywają się w języku polskim oraz rosyjskim.',
    },
    {
      question: 'Z jakimi osobami pracujesz — czy przyjmujesz pary i młodzież?',
      answer:
        'Przyjmuję przede wszystkim osoby dorosłe (terapia indywidualna oraz terapia dla par), a w gabinecie przy ul. Chwarznieńskiej również dzieci i młodzież od 10 roku życia. Gabinet jest otwartą, bezpieczną przestrzenią przyjazną osobom LGBT+.',
    },
    {
      question: 'Jakie formy płatności są dostępne i czy przyjmujesz w ramach NFZ / ubezpieczeń?',
      answer:
        'Przyjmuję wyłącznie w ramach wizyt prywatnych. Możesz zapłacić gotówką na miejscu, BLIK-iem, przelewem na konto lub przez Revolut. Ceny konsultacji i psychoterapii wynoszą 200 zł w gabinecie przy ul. Chwarznieńskiej (210 zł w Medycznej Gdyni), a wizyta domowa 430 zł.',
    },
    {
      question: 'Czy rozmowy w gabinecie i online są całkowicie poufne?',
      answer:
        'Tak. Obowiązuje mnie bezwzględna tajemnica zawodowa psychologa oraz pełna zgodność z RODO. Swoją pracę poddaję stałej superwizji klinicznej, podczas której wszelkie informacje o pacjentach są zawsze ściśle zanonimizowane.',
    },
  ] as FaqItem[],

  crisisHelp: [
    { label: 'Centrum Wsparcia (24/7, bezpłatnie)', number: '800 70 2222' },
    { label: 'Kryzysowy Telefon Zaufania dla Dorosłych', number: '116 123' },
    { label: 'W nagłym zagrożeniu życia', number: '112' },
  ],
};
