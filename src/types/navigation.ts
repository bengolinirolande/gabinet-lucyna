import type React from 'react';

export type PageId = 'home' | 'terapia' | 'o-mnie' | 'gabinety';

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

export const ROUTES: Record<PageId, RouteMeta> = {
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
};

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
