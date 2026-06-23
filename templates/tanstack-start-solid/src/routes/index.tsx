import { createFileRoute, Link } from '@tanstack/solid-router';
import ArrowRight from '~icons/lucide/arrow-right';
import { For } from 'solid-js';
import { featuredPosts, posts, topics } from '@/lib/content/index.ts';
import { Image } from '@/components/Image.tsx';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const highlighted = featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3);

  return (
    <main class="mx-auto grid max-w-6xl gap-16 px-6 py-16">
      <section class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div class="grid gap-6">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Vite Plus template</p>
          <div class="grid gap-4">
            <h1 class="max-w-3xl text-5xl font-semibold tracking-tight text-neutral-950">
              Astro-grade authoring on TanStack Start and Solid.
            </h1>
            <p class="max-w-2xl text-lg leading-8 text-neutral-700">
              TanStack owns routes, loaders, server functions, server routes, SEO, prerendering, and sitemap generation. Content Collections owns local content. Vite and UnJS tools power icons, fonts, and runtime images.
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
        </div>
        <div class="rounded-[2rem] border border-neutral-200 bg-white p-3 shadow-sm">
          <Image src="/images/cover.svg" alt="Abstract site template preview" width={900} class="aspect-[4/3] w-full rounded-[1.5rem] object-cover" loading="eager" />
        </div>
      </section>

      <section class="grid gap-4">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Content Collections</p>
            <h2 class="mt-2 text-3xl font-semibold tracking-tight">Latest content</h2>
          </div>
          <Link to="/articles" class="text-sm font-medium underline underline-offset-4">View all</Link>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <For each={highlighted}>{(post) => <ArticleMiniCard post={post} />}</For>
        </div>
      </section>

      <section class="grid gap-4">
        <h2 class="text-2xl font-semibold tracking-tight">Topics</h2>
        <div class="flex flex-wrap gap-2">
          <For each={topics}>
            {(topic) => (
              <Link to="/topics/$slug" params={{ slug: topic.slug }} class="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm">
                {topic.title}
              </Link>
            )}
          </For>
        </div>
      </section>
    </main>
  );
}

function ArticleMiniCard(props: { post: (typeof posts)[number] }) {
  return (
    <article class="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p class="text-sm text-neutral-500">{props.post.publishedAt} · {props.post.readingTime}</p>
      <h3 class="mt-3 text-lg font-semibold">
        <Link to="/articles/$slug" params={{ slug: props.post.slug }}>
          {props.post.title}
        </Link>
      </h3>
      <p class="mt-2 text-sm leading-6 text-neutral-600">{props.post.description}</p>
    </article>
  );
}
