import { createFileRoute, notFound } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { getAuthorsForPost, getPostBySlug } from '@/lib/content/index.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/articles/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);

    if (!post) {
      throw notFound();
    }

    return {
      post,
      authors: getAuthorsForPost(post),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.post.title} · ${site.name}` },
      { name: 'description', content: loaderData.post.description },
      { property: 'og:title', content: loaderData.post.title },
      { property: 'og:description', content: loaderData.post.description },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const loaderData = Route.useLoaderData();

  return (
    <main class="mx-auto grid max-w-3xl gap-8 px-6 py-16">
      <header class="grid gap-4">
        <p class="text-sm text-neutral-500">{loaderData().post.publishedAt}</p>
        <h1 class="text-5xl font-semibold tracking-tight text-neutral-950">{loaderData().post.title}</h1>
        <p class="text-xl leading-8 text-neutral-700">{loaderData().post.description}</p>
        <div class="flex flex-wrap gap-2 text-sm text-neutral-600">
          <For each={loaderData().authors}>{(author) => <span>{author.name}</span>}</For>
        </div>
      </header>

      <article class="prose prose-neutral max-w-none" innerHTML={loaderData().post.html} />
    </main>
  );
}
