import { allAuthors, allPosts } from 'content-collections';

export type Post = (typeof allPosts)[number];
export type Author = (typeof allAuthors)[number];

export const posts = allPosts
  .filter((post) => !post.draft)
  .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));

export const authors = allAuthors.sort((left, right) => left.name.localeCompare(right.name));

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getAuthorsForPost(post: Post): Author[] {
  return post.authors
    .map((slug) => getAuthorBySlug(slug))
    .filter((author): author is Author => Boolean(author));
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter((post) => post.tags.includes(tag));
}
