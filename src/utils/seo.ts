import { PRACTICE } from '../data/practice';
import { PRACTICE_RU } from '../data/practice.ru';
import { getRoutes, isHashRouting, SITE_ORIGIN, type Locale, type PageId } from '../types/navigation';

const ROUTE_LD_SCRIPT_ID = 'route-structured-data';

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Synchronizes `<html lang>`, `<title>`, meta descriptions, Open Graph / Twitter tags,
 * per-route canonical URL, and localized route-specific JSON-LD (`BreadcrumbList`, `FAQPage`).
 */
export function syncRouteSeo(page: PageId, lang: Locale = 'pl'): void {
  const routes = getRoutes(lang);
  const meta = routes[page];
  const practice = lang === 'ru' ? PRACTICE_RU : PRACTICE;

  document.documentElement.lang = lang;
  document.title = meta.seoTitle;
  upsertMeta('name', 'description', meta.seoDescription);
  upsertMeta('property', 'og:locale', lang === 'ru' ? 'ru_RU' : 'pl_PL');
  upsertMeta('property', 'og:title', meta.seoTitle);
  upsertMeta('property', 'og:description', meta.seoDescription);
  upsertMeta('name', 'twitter:title', meta.seoTitle);
  upsertMeta('name', 'twitter:description', meta.seoDescription);

  const canonicalUrl = isHashRouting()
    ? `${SITE_ORIGIN}/`
    : page === 'home'
      ? `${SITE_ORIGIN}/`
      : `${SITE_ORIGIN}${meta.cleanPath}`;
  upsertCanonical(canonicalUrl);
  upsertMeta('property', 'og:url', canonicalUrl);

  const existing = document.getElementById(ROUTE_LD_SCRIPT_ID);
  if (page === 'home') {
    existing?.remove();
    return;
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: routes.home.navLabel,
          item: `${SITE_ORIGIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.navLabel,
          ...(isHashRouting() ? {} : { item: canonicalUrl }),
        },
      ],
    },
  ];

  // Attach FAQPage ONLY when FAQ items are actively mounted & visible on the Gabinety view
  if (page === 'gabinety') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: practice.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  const payload = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });

  if (existing) {
    existing.textContent = payload;
  } else {
    const script = document.createElement('script');
    script.id = ROUTE_LD_SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = payload;
    document.head.appendChild(script);
  }
}
