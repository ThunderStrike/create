import { createFileRoute } from '@tanstack/solid-router';
import { createSiteFeed, feedHeaders } from '@/lib/feeds/index.ts';

export const Route = createFileRoute('/atom.xml')({
  server: {
    handlers: {
      GET: async () => new Response(createSiteFeed().atom1(), {
        headers: {
          ...feedHeaders,
          'content-type': 'application/atom+xml; charset=utf-8',
        },
      }),
    },
  },
});
