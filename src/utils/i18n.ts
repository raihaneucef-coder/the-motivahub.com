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
