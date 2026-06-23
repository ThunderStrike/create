import { createFileRoute, notFound } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { PostCard } from '@/components/PostCard.tsx';
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/content/index.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/authors/$slug')({
  loader: ({ params }) => {
    const author = getAuthorBySlug(params.slug);
    if (!author) throw notFound();
    return { author, posts: getPostsByAuthor(author.slug) };
  },
  head: ({ loaderData }) => ({
    meta: seo({ title: `${loaderData.author.name} · ${site.name}`, description: loaderData.author.bio ?? site.description }),
    links: canonical(`/authors/${loaderData.author.slug}`),
  }),
  component: AuthorPage,
});

function AuthorPage() {
  const data = Route.useLoaderData();
  return (
    <main class="mx-auto grid max-w-4xl gap-8 px-6 py-16">
      <header class="grid gap-3">
        <h1 class="text-4xl font-semibold tracking-tight">{data().author.name}</h1>
        <p class="text-neutral-700">{data().author.bio}</p>
      </header>
      <div class="grid gap-5">
        <For each={data().posts}>{(post) => <PostCard post={post} />}</For>
      </div>
    </main>
  );
}
