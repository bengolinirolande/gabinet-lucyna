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
    curtainTitle: 'Lucyna Kamińska',
    curtainSubtitle: 'Gabinet Psychologiczny · Trójmiasto',
    chapter: '00',
  },
  terapia: {
    id: 'terapia',
    hash: '#/terapia',
    navLabel: 'Terapia',
    curtainTitle: 'Terapia i obszary pracy',
    curtainSubtitle: 'CBT · Terapia Schematów · Pierwsza wizyta',
    chapter: '01',
  },
  'o-mnie': {
    id: 'o-mnie',
    hash: '#/o-mnie',
    navLabel: 'O mnie',
    curtainTitle: 'O mnie i doświadczenie',
    curtainSubtitle: 'Wykształcenie · Superwizja · Głosy pacjentów',
    chapter: '02',
  },
  gabinety: {
    id: 'gabinety',
    hash: '#/gabinety',
    navLabel: 'Gabinety i cennik',
    curtainTitle: 'Gabinety, Google i cennik',
    curtainSubtitle: 'Gdańsk Wrzeszcz · Gdynia · Online',
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
