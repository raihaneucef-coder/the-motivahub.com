import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://motiva-hub-you-d6e2.vercel.app',
  integrations: [sitemap()],
});