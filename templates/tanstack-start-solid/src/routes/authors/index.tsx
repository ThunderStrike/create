import { createFileRoute, Link } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { authors } from '@/lib/content/index.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/authors/')({
  head: () => ({ meta: seo({ title: `Authors · ${site.name}` }), links: canonical('/authors') }),
  component: AuthorsPage,
});

function AuthorsPage() {
  return (
    <main class="mx-auto grid max-w-4xl gap-8 px-6 py-16">
      <h1 class="text-4xl font-semibold tracking-tight">Authors</h1>
      <div class="grid gap-4 sm:grid-cols-2">
        <For each={authors}>
          {(author) => (
            <Link to="/authors/$slug" params={{ slug: author.slug }} class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 class="text-xl font-semibold">{author.name}</h2>
              <p class="mt-2 text-neutral-700">{author.title}</p>
            </Link>
          )}
        </For>
      </div>
    </main>
  );
}
