import type { QueryClient } from '@tanstack/solid-query';
import { QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
} from '@tanstack/solid-router';
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools';
import type * as Solid from 'solid-js';
import { HydrationScript } from 'solid-js/web';
import { site } from '@/lib/site.ts';
import { seo } from '@/lib/seo.ts';
import appCss from '@/styles/global.css?url';
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary.tsx';
import { NotFound } from '@/components/NotFound.tsx';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({ title: site.name, description: site.description }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'alternate', type: 'application/rss+xml', title: `${site.name} RSS`, href: '/rss.xml' },
      { rel: 'alternate', type: 'application/atom+xml', title: `${site.name} Atom`, href: '/atom.xml' },
      { rel: 'alternate', type: 'application/feed+json', title: `${site.name} JSON Feed`, href: '/feed.json' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  return (
    <QueryClientProvider client={router.options.context.queryClient}>
      <div class="min-h-screen bg-canvas text-neutral-950">
        <header class="border-b border-neutral-200 bg-white/80 backdrop-blur">
          <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm">
            <Link to="/" class="font-semibold tracking-tight">
              {site.name}
            </Link>
            <div class="flex gap-4 text-neutral-600">
              <Link to="/articles" activeProps={{ class: 'text-neutral-950 font-medium' }}>Articles</Link>
              <Link to="/topics" activeProps={{ class: 'text-neutral-950 font-medium' }}>Topics</Link>
              <Link to="/series" activeProps={{ class: 'text-neutral-950 font-medium' }}>Series</Link>
              <Link to="/contact" activeProps={{ class: 'text-neutral-950 font-medium' }}>Contact</Link>
            </div>
          </nav>
        </header>
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
      <SolidQueryDevtools />
    </QueryClientProvider>
  );
}

function RootDocument(props: Readonly<{ children: Solid.JSX.Element }>) {
  return (
    <html lang="en">
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}
