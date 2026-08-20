import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
  return rss({
    title: 'Motiva Hub — Journal',
    description: 'Motivation, growth, and better habits, delivered daily — essays on mindset, discipline, and the long ascent.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/journal/${post.id}/`,
    })),
  });
}