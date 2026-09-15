import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://the-motivahub.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});