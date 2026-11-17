import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://the-motivahub.com',
  // Astro 7 defaults to `compressHTML: 'jsx'`, which strips whitespace between
  // inline elements (React-style) and can glue words together. Keep the v5/v6
  // HTML-aware compression to preserve the current rendered output exactly.
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});