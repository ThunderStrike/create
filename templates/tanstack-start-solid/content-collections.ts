import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';

const authors = defineCollection({
  name: 'authors',
  directory: 'content/authors',
  include: '**/*.md',
  schema: (z) => ({
    name: z.string().min(1),
    title: z.string().optional(),
    avatar: z.string().optional(),
    url: z.string().url().optional(),
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

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: (z) => ({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.string().min(1),
    updatedAt: z.string().optional(),
    draft: z.boolean().default(false),
    authors: z.array(z.string().min(1)).default([]),
    tags: z.array(z.string().min(1)).default([]),
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

export default defineConfig({
  collections: [authors, posts],
});
