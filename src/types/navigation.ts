export type PageId = 'home' | 'terapia' | 'o-mnie' | 'gabinety';

export interface RouteMeta {
  id: PageId;
  hash: string;
  navLabel: string;
  curtainTitle: string;
  curtainSubtitle: string;
  chapter: string;
}

export const ROUTES: Record<PageId, RouteMeta> = {
  home: {
    id: 'home',
    hash: '#/',
    navLabel: 'Start',
    curtainTitle: 'Lucyna Grochowska',
    curtainSubtitle: 'Psycholog · Psychotraumatolog · Gdynia',
    chapter: '00',
  },
  terapia: {
    id: 'terapia',
    hash: '#/terapia',
    navLabel: 'Terapia',
    curtainTitle: 'Terapia i obszary pracy',
    curtainSubtitle: 'Psychodynamiczna · Psychotraumatologia · Seksuologia',
    chapter: '01',
  },
  'o-mnie': {
    id: 'o-mnie',
    hash: '#/o-mnie',
    navLabel: 'O mnie',
    curtainTitle: 'O mnie i doświadczenie',
    curtainSubtitle: '8 lat praktyki · Superwizja · Opinie 5,0',
    chapter: '02',
  },
  gabinety: {
    id: 'gabinety',
    hash: '#/gabinety',
    navLabel: 'Gabinety i cennik',
    curtainTitle: 'Gabinety, opinie i cennik',
    curtainSubtitle: 'Gdynia Witomino · Śródmieście · Online',
    chapter: '03',
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
