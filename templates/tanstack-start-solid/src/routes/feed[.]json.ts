import { createFileRoute } from '@tanstack/solid-router';
import { createSiteFeed, feedHeaders } from '@/lib/feeds/index.ts';

export const Route = createFileRoute('/feed.json')({
  server: {
    handlers: {
      GET: async () => new Response(createSiteFeed().json1(), {
        headers: {
          ...feedHeaders,
          'content-type': 'application/feed+json; charset=utf-8',
        },
      }),
    },
  },
});
