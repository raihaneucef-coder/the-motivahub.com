import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import frSlugs from '../i18n/slugs-fr.json';

export type Locale = 'en' | 'fr';

export function getLangFromUrl(url: URL): Locale {
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] === 'fr') return 'fr';
  return 'en';
}

export function getPathWithoutLocale(url: URL): string {
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] === 'fr' || parts[0] === 'en') {
    return '/' + parts.slice(1).join('/');
  }
  return url.pathname;
}

export function getLocalePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  if (locale === 'fr') {
    if (clean === '/' || clean.startsWith('/fr')) return clean;
    return '/fr' + clean;
  }
  return clean;
}

export function getFrenchSlug(enSlug: string): string {
  return frSlugs[enSlug] || enSlug;
}

export function getEnglishSlug(frSlug: string): string {
  const entry = Object.entries(frSlugs).find(([, v]) => v === frSlug);
  return entry ? entry[0] : frSlug;
}

// التحقق مما إذا كان الرابط (Slug) فرنسياً عبر البحث في قيم ملف slugs-fr.json
export function isFrenchSlug(slug: string): boolean {
  const cleanSlug = slug.replace(/^\/|\/$/g, '');
  return Object.values(frSlugs).includes(cleanSlug);
}

const MONTHS_FR: Record<string, string> = {
  Jan: 'janvier', Feb: 'février', Mar: 'mars', Apr: 'avril', May: 'mai', Jun: 'juin',
  Jul: 'juillet', Aug: 'août', Sep: 'septembre', Oct: 'octobre', Nov: 'novembre', Dec: 'décembre',
};

// "Aug 19, 2026" -> "19 août 2026". Anything that is not that exact shape
// (e.g. the "Full workshop" label) is returned unchanged.
export function formatFrenchDate(date: string): string {
  const m = date.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
  return m ? `${m[2]} ${MONTHS_FR[m[1]] ?? m[1]} ${m[3]}` : date;
}

type PodcastFrCopy = { title?: string; description?: string; date?: string };

// French copy for the curated listening list, keyed by podcast id. Parsed once
// per build and cached; ids missing from the file fall back to the English dataset.
let podcastFrCache: Record<string, PodcastFrCopy> | null = null;
function getPodcastFrCopy(): Record<string, PodcastFrCopy> {
  if (!podcastFrCache) {
    const parsed: Record<string, PodcastFrCopy> = JSON.parse(
      readFileSync(join(process.cwd(), 'public', 'i18n', 'podcasts-fr.json'), 'utf-8')
    );
    podcastFrCache = parsed;
    return parsed;
  }
  return podcastFrCache;
}

// Localise the displayed fields of a podcast entry. Dates, durations, ids, covers
// and links stay exactly as the dataset holds them.
export function localizePodcast<T extends { id: string; title: string; description: string; date: string }>(podcast: T): T {
  const copy = getPodcastFrCopy()[podcast.id] ?? {};
  return {
    ...podcast,
    title: copy.title ?? podcast.title,
    description: copy.description ?? podcast.description,
    date: copy.date ?? formatFrenchDate(podcast.date),
  };
}
