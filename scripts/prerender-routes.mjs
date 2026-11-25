import fs from 'node:fs';
import path from 'node:path';

/**
 * Post-build static SEO route prerenderer for grochowskapsycholog.pl.
 * Generates dedicated HTML entry points for /terapia, /o-mnie, and /gabinety
 * so Googlebot & social crawlers receive exact per-route <title>, <meta description>,
 * <link rel="canonical">, OG/Twitter tags, BreadcrumbList, and FAQPage JSON-LD
 * directly in raw HTTP 200 HTML before JS hydration!
 */

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const ORIGIN = (process.env.VITE_SITE_URL || 'https://grochowskapsycholog.pl').replace(/\/$/, '');
const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

const FAQ_ITEMS = [
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
];

const SUBPAGES = [
  {
    slug: 'terapia',
    navLabel: 'Terapia',
    title: 'Psychoterapia, trauma, seksuologia Gdynia | L. Grochowska',
    description:
      'Psychoterapia psychodynamiczna, leczenie lęku i depresji, psychotraumatologia, seksuologia, fototerapia i terapia par w Gdyni oraz online (PL / RU).',
  },
  {
    slug: 'o-mnie',
    navLabel: 'O mnie',
    title: 'mgr Lucyna Grochowska — Psycholog Gdynia | Doświadczenie',
    description:
      '8 lat praktyki klinicznej (UKW, Triada, UAM, Poradnia MSWiA w Gdańsku). Praca pod stałą superwizją w języku polskim i rosyjskim, przestrzeń przyjazna LGBT+.',
  },
  {
    slug: 'gabinety',
    navLabel: 'Gabinety i cennik',
    title: 'Gabinety Gdynia i cennik (od 200 zł) — mgr L. Grochowska',
    description:
      'Gabinety w Gdyni: ul. Chwarznieńska 136–138 (Witomino) i ul. 3 Maja 30/21 (Medyczna Gdynia) oraz online PL / RU. Cennik od 200 zł, fototerapia, mapa i FAQ.',
    includeFaq: true,
  },
];

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

for (const page of SUBPAGES) {
  const canonicalUrl = `${ORIGIN}/${page.slug}`;
  const graph = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: page.navLabel, item: canonicalUrl },
      ],
    },
  ];

  if (page.includeFaq) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  const routeLdTag = `  <script id="route-structured-data" type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  })}</script>\n</head>`;

  let html = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeAttr(page.description)}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escapeAttr(page.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeAttr(page.description)}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`
    )
    .replace('</head>', routeLdTag);

  const outDir = path.join(DIST_DIR, page.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`Prerendered static SEO route: /${page.slug}/index.html -> ${canonicalUrl}`);
}
