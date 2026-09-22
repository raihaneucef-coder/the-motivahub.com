import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getFrenchSlug } from '../utils/i18n';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const publishedPosts = posts.filter((p) => !p.data.draft);
  
  const staticPages = [
    '/',
    '/about/',
    '/affiliate-disclosure/',
    '/author/youssef-raihane/',
    '/best/books/',
    '/best/focus-books/',
    '/best/habit-books/',
    '/best/stoicism-books/',
    '/bio/',
    '/books/',
    '/contact/',
    '/credits/',
    '/guides/atomic-habits-ultimate-guide/',
    '/journal/',
    '/memento-mori/',
    '/objectives/',
    '/pdf/30-days-discipline/',
    '/podcast/',
    '/privacy/',
    '/psychology/',
    '/quotes/',
    '/terms/',
    '/tools/cold-shower-tracker/',
    '/tools/discipline-quiz/',
    '/tools/habit-stacker/',
    '/tools/meditation-timer/',
    '/tools/reading-calculator/',
    '/topics/',
    '/tracker/',
  ];

  const urls: any[] = [];

  // EN static pages
  for (const page of staticPages) {
    urls.push({
      url: `https://the-motivahub.com${page}`,
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `https://the-motivahub.com${page}`,
          fr: `https://the-motivahub.com/fr${page}`,
          'x-default': `https://the-motivahub.com${page}`,
        },
      },
    });
  }

  // FR static pages
  for (const page of staticPages) {
    urls.push({
      url: `https://the-motivahub.com/fr${page}`,
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `https://the-motivahub.com${page}`,
          fr: `https://the-motivahub.com/fr${page}`,
          'x-default': `https://the-motivahub.com${page}`,
        },
      },
    });
  }

  // EN blog articles
  for (const post of publishedPosts) {
    urls.push({
      url: `https://the-motivahub.com/journal/${post.id}/`,
      lastmod: post.data.updatedDate || post.data.pubDate,
      changefreq: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `https://the-motivahub.com/journal/${post.id}/`,
          fr: `https://the-motivahub.com/fr/journal/${post.id}/`,
          'x-default': `https://the-motivahub.com/journal/${post.id}/`,
        },
      },
    });
  }

  // FR blog articles
  for (const post of publishedPosts) {
    const frSlug = getFrenchSlug(post.id);
    if (frSlug !== post.id) {
      urls.push({
        url: `https://the-motivahub.com/fr/journal/${frSlug}/`,
        lastmod: post.data.updatedDate || post.data.pubDate,
        changefreq: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `https://the-motivahub.com/journal/${post.id}/`,
            fr: `https://the-motivahub.com/fr/journal/${frSlug}/`,
            'x-default': `https://the-motivahub.com/journal/${post.id}/`,
          },
        },
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.map((u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod.toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${u.alternates.languages.en}" />
    <xhtml:link rel="alternate" hreflang="fr" href="${u.alternates.languages.fr}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.alternates.languages['x-default']}" />
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
