import { createFileRoute } from '@tanstack/solid-router';
import { posts } from '@/lib/content/index.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const body = renderSitemap();

        return new Response(body, {
          headers: {
            'content-type': 'application/xml; charset=utf-8',
            'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
          },
        });
      },
    },
  },
});

function renderSitemap() {
  const urls = [
    `${site.origin}/`,
    `${site.origin}/articles`,
    ...posts.map((post) => `${site.origin}/articles/${post.slug}`),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map((url) => `<url><loc>${url}</loc></url>`).join('\n')}
    </urlset>`;
}
