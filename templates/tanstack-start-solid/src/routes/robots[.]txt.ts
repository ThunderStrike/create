import { createFileRoute } from '@tanstack/solid-router';
import { site } from '../lib/site.ts';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          'User-agent: *',
          'Allow: /',
          `Sitemap: ${site.origin}/sitemap.xml`,
          '',
        ].join('\n');

        return new Response(body, {
          headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, max-age=3600',
          },
        });
      },
    },
  },
});
