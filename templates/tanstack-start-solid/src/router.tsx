import { createRouter } from '@tanstack/solid-router';
import { routeTree } from './routeTree.gen';
import { createQueryClient } from './lib/query/client.ts';

export function getRouter() {
  const queryClient = createQueryClient();

  return createRouter({
    routeTree,
    context: {
      queryClient,
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultStaleTime: 30_000,
  });
}

declare module '@tanstack/solid-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
