import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import { z } from 'zod';

const slugRef = z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use kebab-case slugs.');
const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'Use an ISO-like date such as 2026-06-22.');
const absoluteOrRootUrl = z.string().regex(/^(https?:\/\/|\/)/, 'Use an absolute URL or root-relative URL.');

const imageSchema = z.object({
  src: absoluteOrRootUrl,
  alt: z.string().min(1),
  caption: z.string().optional(),
  credit: z.string().optional(),
});

const seoSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: absoluteOrRootUrl.optional(),
  canonical: z.string().url().optional(),
  noindex: z.boolean().default(false),
}).default({});

const authors = defineCollection({
  name: 'authors',
  directory: 'content/authors',
  include: '**/*.md',
  schema: z.object({
    name: z.string().min(1),
    title: z.string().optional(),
    bio: z.string().optional(),
    avatar: imageSchema.optional(),
    website: z.string().url().optional(),
    socials: z.record(z.string(), z.string().url()).default({}),
    featured: z.boolean().default(false),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document);

    return {
      ...document,
      slug: document._meta.path,
      html,
    };
  },
});

const categories = defineCollection({
  name: 'categories',
  directory: 'content/categories',
  include: '**/*.md',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    order: z.number().int().default(0),
    seo: seoSchema,
  }),
  transform: async (document, context) => ({
    ...document,
    slug: document._meta.path,
    html: await compileMarkdown(context, document),
  }),
});

const topics = defineCollection({
  name: 'topics',
  directory: 'content/topics',
  include: '**/*.md',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: slugRef.optional(),
    order: z.number().int().default(0),
    seo: seoSchema,
  }),
  transform: async (document, context) => ({
    ...document,
    slug: document._meta.path,
    html: await compileMarkdown(context, document),
  }),
});

const series = defineCollection({
  name: 'series',
  directory: 'content/series',
  include: '**/*.md',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(['planned', 'active', 'complete']).default('active'),
    order: z.number().int().default(0),
    hero: imageSchema.optional(),
    seo: seoSchema,
  }),
  transform: async (document, context) => ({
    ...document,
    slug: document._meta.path,
    html: await compileMarkdown(context, document),
  }),
});

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    excerpt: z.string().optional(),
    publishedAt: dateString,
    updatedAt: dateString.optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    authors: z.array(slugRef).min(1),
    categories: z.array(slugRef).default([]),
    topics: z.array(slugRef).default([]),
    series: slugRef.optional(),
    seriesOrder: z.number().int().optional(),
    hero: imageSchema.optional(),
    seo: seoSchema,
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, {
      allowDangerousHtml: false,
    });

    return {
      ...document,
      slug: document._meta.path,
      html,
      readingTime: estimateReadingTime(document.content),
      wordCount: countWords(document.content),
      permalink: `/articles/${document._meta.path}`,
    };
  },
});

function countWords(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function estimateReadingTime(markdown: string) {
  const minutes = Math.max(1, Math.ceil(countWords(markdown) / 225));
  return `${minutes} min read`;
}

export default defineConfig({
  content: [authors, categories, topics, series, posts],
});
