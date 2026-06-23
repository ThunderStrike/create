import { createFileRoute, Link } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { topics } from '@/lib/content/index.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/topics/')({
  head: () => ({ meta: seo({ title: `Topics · ${site.name}` }), links: canonical('/topics') }),
  component: TopicsPage,
});

function TopicsPage() {
  return (
    <main class="mx-auto grid max-w-4xl gap-8 px-6 py-16">
      <h1 class="text-4xl font-semibold tracking-tight">Topics</h1>
      <div class="grid gap-4 sm:grid-cols-2">
        <For each={topics}>
          {(topic) => (
            <Link to="/topics/$slug" params={{ slug: topic.slug }} class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="text-xl font-semibold">{topic.title}</h2>
              <p class="mt-2 text-neutral-700">{topic.description}</p>
            </Link>
          )}
        </For>
      </div>
    </main>
  );
}
