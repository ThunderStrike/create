import { createFileRoute, notFound } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { PostCard } from '@/components/PostCard.tsx';
import { getPostsByTopic, getTopicBySlug } from '@/lib/content/index.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/topics/$slug')({
  loader: ({ params }) => {
    const topic = getTopicBySlug(params.slug);
    if (!topic) throw notFound();
    return { topic, posts: getPostsByTopic(topic.slug) };
  },
  head: ({ loaderData }) => ({
    meta: seo({ title: `${loaderData.topic.title} · ${site.name}`, description: loaderData.topic.description }),
    links: canonical(`/topics/${loaderData.topic.slug}`),
  }),
  component: TopicPage,
});

function TopicPage() {
  const data = Route.useLoaderData();
  return (
    <main class="mx-auto grid max-w-4xl gap-8 px-6 py-16">
      <header class="grid gap-3">
        <h1 class="text-4xl font-semibold tracking-tight">{data().topic.title}</h1>
        <p class="text-neutral-700">{data().topic.description}</p>
      </header>
      <div class="grid gap-5">
        <For each={data().posts}>{(post) => <PostCard post={post} />}</For>
      </div>
    </main>
  );
}
