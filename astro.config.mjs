import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wildfamily.vercel.app',
  integrations: [sitemap()],
});