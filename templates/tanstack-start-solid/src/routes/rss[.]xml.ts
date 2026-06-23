import { createFileRoute } from '@tanstack/solid-router';
import { posts } from '@/lib/content/index.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: async () => {
        const body = renderRss();

        return new Response(body, {
          headers: {
            'content-type': 'application/rss+xml; charset=utf-8',
            'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
          },
        });
      },
    },
  },
});

function renderRss() {
  const items = posts
    .map((post) => {
      const url = `${site.origin}/articles/${post.slug}`;

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <description>${escapeXml(post.description)}</description>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(site.name)}</title>
        <description>${escapeXml(site.description)}</description>
        <link>${site.origin}</link>
        ${items}
      </channel>
    </rss>`;
}

function escapeXml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}
