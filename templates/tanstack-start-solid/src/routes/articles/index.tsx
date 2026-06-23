import { createFileRoute, Link } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { posts } from '@/lib/content/index.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/articles/')({
  head: () => ({
    meta: [
      { title: `Articles · ${site.name}` },
      { name: 'description', content: 'Local Markdown articles powered by Content Collections.' },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  return (
    <main class="mx-auto grid max-w-4xl gap-8 px-6 py-16">
      <header class="grid gap-3">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Content Collections</p>
        <h1 class="text-4xl font-semibold tracking-tight">Articles</h1>
        <p class="text-neutral-700">Local Markdown, validated frontmatter, generated TypeScript types, and normal app imports.</p>
      </header>

      <div class="grid gap-5">
        <For each={posts}>
          {(post) => (
            <article class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p class="text-sm text-neutral-500">{post.publishedAt}</p>
              <h2 class="mt-3 text-2xl font-semibold">
                <Link to="/articles/$slug" params={{ slug: post.slug }}>
                  {post.title}
                </Link>
              </h2>
              <p class="mt-2 leading-7 text-neutral-700">{post.description}</p>
            </article>
          )}
        </For>
      </div>
    </main>
  );
}
