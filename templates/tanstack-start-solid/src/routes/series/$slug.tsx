import { createFileRoute, notFound } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { PostCard } from '@/components/PostCard.tsx';
import { getPostsBySeries, getSeriesBySlug } from '@/lib/content/index.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/series/$slug')({
  loader: ({ params }) => {
    const item = getSeriesBySlug(params.slug);
    if (!item) throw notFound();
    return { series: item, posts: getPostsBySeries(item.slug) };
  },
  head: ({ loaderData }) => ({
    meta: seo({ title: `${loaderData.series.title} · ${site.name}`, description: loaderData.series.description }),
    links: canonical(`/series/${loaderData.series.slug}`),
  }),
  component: SeriesPage,
});

function SeriesPage() {
  const data = Route.useLoaderData();
  return (
    <main class="mx-auto grid max-w-4xl gap-8 px-6 py-16">
      <header class="grid gap-3">
        <p class="text-sm uppercase tracking-[0.2em] text-neutral-500">{data().series.status}</p>
        <h1 class="text-4xl font-semibold tracking-tight">{data().series.title}</h1>
        <p class="text-neutral-700">{data().series.description}</p>
      </header>
      <div class="grid gap-5">
        <For each={data().posts}>{(post) => <PostCard post={post} />}</For>
      </div>
    </main>
  );
}
