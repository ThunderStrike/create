import { createQueryClient } from './lib/query/client.ts';
import { createRouter } from '@tanstack/solid-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/solid-router-ssr-query';
import { routeTree } from './routeTree.gen';
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary.tsx';
import { NotFound } from './components/NotFound.tsx';

export function getRouter() {
  const queryClient = createQueryClient();

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
    defaultStaleTime: 30_000,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module '@tanstack/solid-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
