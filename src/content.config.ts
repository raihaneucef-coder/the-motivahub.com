import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    topic: z.string(),
    readTime: z.string(),
    image: z.string().default('/images/hero.jpg'),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    keywords: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    wordCount: z.number().optional().default(0),
    bookSlug: z.string().optional(),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
  }),
});

export const collections = { blog };