import { createFileRoute, Link } from '@tanstack/solid-router';
import ArrowRight from '~icons/lucide/arrow-right';
import { For } from 'solid-js';
import { posts } from '@/lib/content/index.ts';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const featured = posts.slice(0, 3);

  return (
    <main class="mx-auto grid min-h-screen max-w-5xl gap-12 px-6 py-16">
      <section class="grid gap-6">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Vite Plus template</p>
        <div class="grid gap-4">
          <h1 class="max-w-3xl text-5xl font-semibold tracking-tight text-neutral-950">
            Astro-grade authoring on TanStack Start and Solid.
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-neutral-700">
            TanStack owns routing and server boundaries, Content Collections owns local content, and Vite plugins own the build-time authoring experience.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <Link to="/articles" class="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white">
            Read articles
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/contact" class="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-950">
            Try Formisch
          </Link>
        </div>
      </section>

      <section class="grid gap-4">
        <h2 class="text-xl font-semibold">Latest content</h2>
        <div class="grid gap-4 md:grid-cols-3">
          <For each={featured}>
            {(post) => (
              <article class="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p class="text-sm text-neutral-500">{post.publishedAt}</p>
                <h3 class="mt-3 text-lg font-semibold">
                  <Link to="/articles/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h3>
                <p class="mt-2 text-sm leading-6 text-neutral-600">{post.description}</p>
              </article>
            )}
          </For>
        </div>
      </section>
    </main>
  );
}
