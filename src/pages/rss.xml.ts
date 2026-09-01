import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { detectLangFromSlug } from '../utils/lang';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 50);

  return rss({
    title: 'Motiva Hub — Journal',
    description: 'Motivation, growth, and better habits, delivered daily — essays on mindset, discipline, and the long ascent.',
    site: context.site!,
    customData: `<language>en-us</language><language>fr-fr</language><atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>`,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: posts.map((post) => {
      const lang = detectLangFromSlug(post.id);
      const imgUrl = post.data.image.startsWith('http') ? post.data.image : new URL(post.data.image, context.site!).href;
      const categories = [post.data.topic, post.data.readTime].filter(Boolean);
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/journal/${post.id}/`,
        author: `newsletter@the-motivahub.com (Youssef Raihane)`,
        categories,
        customData: `<dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">Youssef Raihane</dc:creator><enclosure url="${imgUrl}" type="image/jpeg"/><content:encoded xmlns:content="http://purl.org/rss/1.0/modules/content/">${encodeURIComponent(`<![CDATA[<img src="${imgUrl}" alt="${post.data.title.replace(/"/g, '&quot;')}" /><p>${post.data.description}</p>]]>`)}</content:encoded>`,
      };
    }),
    stylesheet: '/rss-styles.xsl',
  });
}