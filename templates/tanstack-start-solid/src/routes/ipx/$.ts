import { createFileRoute } from '@tanstack/solid-router';
import { handleImageRequest } from '@/lib/images/ipx.ts';

export const Route = createFileRoute('/ipx/$')({
  server: {
    handlers: {
      GET: async ({ request }) => handleImageRequest(request),
      HEAD: async ({ request }) => handleImageRequest(request),
    },
  },
});
