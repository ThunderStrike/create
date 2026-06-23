import { allAuthors, allCategories, allPosts, allSeries, allTopics } from 'content-collections';

export type Author = (typeof allAuthors)[number];
export type Category = (typeof allCategories)[number];
export type Post = (typeof allPosts)[number];
export type Series = (typeof allSeries)[number];
export type Topic = (typeof allTopics)[number];

export const authors = [...allAuthors].sort((left, right) => left.name.localeCompare(right.name));
export const categories = [...allCategories].sort((left, right) => left.order - right.order || left.title.localeCompare(right.title));
export const topics = [...allTopics].sort((left, right) => left.order - right.order || left.title.localeCompare(right.title));
export const series = [...allSeries].sort((left, right) => left.order - right.order || left.title.localeCompare(right.title));

export const posts = [...allPosts]
  .filter((post) => !post.draft)
  .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));

export const featuredPosts = posts.filter((post) => post.featured);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return series.find((item) => item.slug === slug);
}

export function getAuthorsForPost(post: Post): Author[] {
  return post.authors.map((slug) => getAuthorBySlug(slug)).filter((author): author is Author => Boolean(author));
}

export function getPostsByAuthor(slug: string): Post[] {
  return posts.filter((post) => post.authors.includes(slug));
}

export function getPostsByCategory(slug: string): Post[] {
  return posts.filter((post) => post.categories.includes(slug));
}

export function getPostsByTopic(slug: string): Post[] {
  return posts.filter((post) => post.topics.includes(slug));
}

export function getPostsBySeries(slug: string): Post[] {
  return posts
    .filter((post) => post.series === slug)
    .sort((left, right) => (left.seriesOrder ?? 0) - (right.seriesOrder ?? 0));
}

export function getContentDiagnostics() {
  const authorSlugs = new Set(authors.map((author) => author.slug));
  const categorySlugs = new Set(categories.map((category) => category.slug));
  const topicSlugs = new Set(topics.map((topic) => topic.slug));
  const seriesSlugs = new Set(series.map((item) => item.slug));

  return posts.flatMap((post) => {
    const messages: string[] = [];

    for (const slug of post.authors) {
      if (!authorSlugs.has(slug)) messages.push(`Missing author '${slug}' referenced by '${post.slug}'.`);
    }

    for (const slug of post.categories) {
      if (!categorySlugs.has(slug)) messages.push(`Missing category '${slug}' referenced by '${post.slug}'.`);
    }

    for (const slug of post.topics) {
      if (!topicSlugs.has(slug)) messages.push(`Missing topic '${slug}' referenced by '${post.slug}'.`);
    }

    if (post.series && !seriesSlugs.has(post.series)) {
      messages.push(`Missing series '${post.series}' referenced by '${post.slug}'.`);
    }

    return messages;
  });
}
