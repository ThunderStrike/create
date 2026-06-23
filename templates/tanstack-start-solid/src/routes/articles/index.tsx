import { createFileRoute } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { PostCard } from '@/components/PostCard.tsx';
import { posts } from '@/lib/content/index.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/articles/')({
  head: () => ({
    meta: seo({ title: `Articles · ${site.name}`, description: 'Local Markdown articles powered by Content Collections.' }),
    links: canonical('/articles'),
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
        <For each={posts}>{(post) => <PostCard post={post} />}</For>
      </div>
    </main>
  );
}
