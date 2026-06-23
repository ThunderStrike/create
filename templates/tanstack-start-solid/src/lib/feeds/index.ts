import { Feed } from 'feed';
import { posts, getAuthorsForPost } from '@/lib/content/index.ts';
import { absoluteUrl, site } from '@/lib/site.ts';

export function createSiteFeed() {
  const feed = new Feed({
    title: site.name,
    description: site.description,
    id: site.origin,
    link: site.origin,
    language: site.language,
    image: absoluteUrl(site.defaultImage),
    favicon: absoluteUrl('/favicon.svg'),
    copyright: `© ${new Date().getFullYear()} ${site.author}`,
    generator: 'TanStack Start + Content Collections + feed',
    feedLinks: {
      rss: absoluteUrl('/rss.xml'),
      atom: absoluteUrl('/atom.xml'),
      json: absoluteUrl('/feed.json'),
    },
  });

  for (const post of posts) {
    const url = absoluteUrl(post.permalink);
    const authors = getAuthorsForPost(post);

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.html,
      date: new Date(post.publishedAt),
      image: post.hero ? absoluteUrl(post.hero.src) : undefined,
      author: authors.map((author) => ({
        name: author.name,
        link: author.website,
      })),
      category: post.topics.map((topic) => ({ name: topic })),
    });
  }

  return feed;
}

export const feedHeaders = {
  'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
};
