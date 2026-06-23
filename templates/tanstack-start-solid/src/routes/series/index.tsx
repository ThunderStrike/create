import { createFileRoute, Link } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { series } from '@/lib/content/index.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/series/')({
  head: () => ({ meta: seo({ title: `Series · ${site.name}` }), links: canonical('/series') }),
  component: SeriesIndexPage,
});

function SeriesIndexPage() {
  return (
    <main class="mx-auto grid max-w-4xl gap-8 px-6 py-16">
      <h1 class="text-4xl font-semibold tracking-tight">Series</h1>
      <div class="grid gap-4">
        <For each={series}>
          {(item) => (
            <Link to="/series/$slug" params={{ slug: item.slug }} class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p class="text-sm uppercase tracking-[0.2em] text-neutral-500">{item.status}</p>
              <h2 class="mt-2 text-xl font-semibold">{item.title}</h2>
              <p class="mt-2 text-neutral-700">{item.description}</p>
            </Link>
          )}
        </For>
      </div>
    </main>
  );
}
