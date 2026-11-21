import type React from 'react';

export type PageId = 'home' | 'terapia' | 'o-mnie' | 'gabinety';
export type Locale = 'pl' | 'ru';
export type Theme = 'light' | 'dark';

export const SITE_ORIGIN = (
  import.meta.env.VITE_SITE_URL || 'https://bengolinirolande.github.io/gabinet-lucyna'
).replace(/\/$/, '');

export interface RouteMeta {
  id: PageId;
  hash: string;
  cleanPath: string;
  navLabel: string;
  curtainTitle: string;
  curtainSubtitle: string;
  chapter: string;
  seoTitle: string;
  seoDescription: string;
}

export const ROUTES_BY_LANG: Record<Locale, Record<PageId, RouteMeta>> = {
  pl: {
    home: {
      id: 'home',
      hash: '#/',
      cleanPath: '/',
      navLabel: 'Start',
      curtainTitle: 'Lucyna Grochowska',
      curtainSubtitle: 'Psycholog · Psychotraumatolog · Gdynia',
      chapter: '00',
      seoTitle: 'Psycholog Gdynia i online — mgr Lucyna Grochowska',
      seoDescription:
        'mgr Lucyna Grochowska — psycholog, psychotraumatolog i psychoterapeutka w Gdyni (Witomino, Śródmieście) oraz online (PL / RU). 8 lat praktyki. Umów konsultację.',
    },
    terapia: {
      id: 'terapia',
      hash: '#/terapia',
      cleanPath: '/terapia',
      navLabel: 'Terapia',
      curtainTitle: 'Terapia i obszary wsparcia',
      curtainSubtitle: 'Psychoterapia · Psychotraumatologia · Seksuologia',
      chapter: '01',
      seoTitle: 'Psychoterapia, trauma, seksuologia Gdynia | L. Grochowska',
      seoDescription:
        'Psychoterapia psychodynamiczna, leczenie lęku i depresji, psychotraumatologia, seksuologia i terapia par w Gdyni oraz online (PL / RU). Sprawdź zakres pomocy.',
    },
    'o-mnie': {
      id: 'o-mnie',
      hash: '#/o-mnie',
      cleanPath: '/o-mnie',
      navLabel: 'O mnie',
      curtainTitle: 'O mnie i doświadczenie',
      curtainSubtitle: '8 lat praktyki · Wykształcenie · Superwizja',
      chapter: '02',
      seoTitle: 'mgr Lucyna Grochowska — Psycholog Gdynia | Doświadczenie',
      seoDescription:
        '8 lat praktyki klinicznej (UKW, Triada, UAM, Poradnia MSWiA w Gdańsku). Praca pod stałą superwizją w języku polskim i rosyjskim, przestrzeń przyjazna LGBT+.',
    },
    gabinety: {
      id: 'gabinety',
      hash: '#/gabinety',
      cleanPath: '/gabinety',
      navLabel: 'Gabinety i cennik',
      curtainTitle: 'Gabinety, dojazd i cennik',
      curtainSubtitle: 'Gdynia Witomino · Śródmieście · Online',
      chapter: '03',
      seoTitle: 'Gabinety Gdynia i cennik (od 200 zł) — mgr L. Grochowska',
      seoDescription:
        'Gabinety w Gdyni: ul. Chwarznieńska 136–138 (Witomino) i ul. gen. Bema 16/2 (Medyczna Gdynia) oraz online PL / RU. Cennik od 200 zł, dojazd, mapa i FAQ.',
    },
  },
  ru: {
    home: {
      id: 'home',
      hash: '#/',
      cleanPath: '/',
      navLabel: 'Главная',
      curtainTitle: 'Луцина Гроховская',
      curtainSubtitle: 'Психолог · Психотравматолог · Гдыня',
      chapter: '00',
      seoTitle: 'Психолог в Гдыне и онлайн — mgr Луцина Гроховская',
      seoDescription:
        'Луцина Гроховская — психолог, психотравматолог и психотерапевт в Гдыне (Витомино, центр) и онлайн (RU / PL). 8 лет клинической практики. Запись на консультацию.',
    },
    terapia: {
      id: 'terapia',
      hash: '#/terapia',
      cleanPath: '/terapia',
      navLabel: 'Терапия',
      curtainTitle: 'Терапия и направления помощи',
      curtainSubtitle: 'Психотерапия · Психотравматология · Сексология',
      chapter: '01',
      seoTitle: 'Психотерапия, травма и сексология в Гдыне | Л. Гроховская',
      seoDescription:
        'Психодинамическая психотерапия, помощь при тревоге и депрессии, психотравматология, сексология и терапия пар в Гдыне и онлайн (RU / PL).',
    },
    'o-mnie': {
      id: 'o-mnie',
      hash: '#/o-mnie',
      cleanPath: '/o-mnie',
      navLabel: 'Обо мне',
      curtainTitle: 'Обо мне и клинический опыт',
      curtainSubtitle: '8 лет практики · Образование · Супервизия',
      chapter: '02',
      seoTitle: 'mgr Луцина Гроховская — Психолог Гдыня | Опыт и дипломы',
      seoDescription:
        '8 лет клинической практики (UKW, Институт «Triada», UAM, клиника MSWiA в Гданьске). Постоянная супервизия, консультации на русском и польском, ЛГБТ+ friendly.',
    },
    gabinety: {
      id: 'gabinety',
      hash: '#/gabinety',
      cleanPath: '/gabinety',
      navLabel: 'Кабинеты и цены',
      curtainTitle: 'Кабинеты, адреса и стоимость',
      curtainSubtitle: 'Гдыня Витомино · Центр · Онлайн',
      chapter: '03',
      seoTitle: 'Кабинеты в Гдыне и цены (от 200 zł) — mgr Л. Гроховская',
      seoDescription:
        'Кабинеты в Гдыне: ul. Chwarznieńska 136–138 (Витомино) и ul. gen. Bema 16/2 (Medyczna Gdynia), а также онлайн RU / PL. Цены от 200 zł, карта и ответы на вопросы.',
    },
  },
};

export const ROUTES: Record<PageId, RouteMeta> = ROUTES_BY_LANG.pl;

export function getRoutes(lang: Locale): Record<PageId, RouteMeta> {
  return ROUTES_BY_LANG[lang];
}

export const NAV_ORDER: PageId[] = ['home', 'terapia', 'o-mnie', 'gabinety'];

export function parseHashToPage(hash: string): PageId {
  const clean = hash.replace(/^#\/?/, '').split('?')[0].trim().toLowerCase();
  if (clean === 'terapia') return 'terapia';
  if (clean === 'o-mnie') return 'o-mnie';
  if (clean === 'gabinety' || clean === 'cennik' || clean === 'kontakt') return 'gabinety';
  return 'home';
}

/**
 * Allows standard left-clicks to trigger the Awwwards curtain transition while keeping
 * real `<a href>` semantics for Googlebot, right-click copy, and Cmd/Ctrl/middle-click new tab.
 */
export function handleRouteLinkClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  navigate: () => void
): void {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
    return;
  }
  e.preventDefault();
  navigate();
}
