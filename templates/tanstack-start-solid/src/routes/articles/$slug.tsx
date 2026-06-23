import { createFileRoute, notFound } from '@tanstack/solid-router';
import { For, Show } from 'solid-js';
import { Image } from '@/components/Image.tsx';
import { getAuthorsForPost, getPostBySlug } from '@/lib/content/index.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { absoluteUrl, site } from '@/lib/site.ts';

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
    meta: seo({
      title: `${loaderData.post.seo.title ?? loaderData.post.title} · ${site.name}`,
      description: loaderData.post.seo.description ?? loaderData.post.description,
      image: loaderData.post.seo.image ?? loaderData.post.hero?.src,
      type: 'article',
      noindex: loaderData.post.seo.noindex,
    }),
    links: canonical(loaderData.post.seo.canonical ?? loaderData.post.permalink),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: loaderData.post.title,
          description: loaderData.post.description,
          image: loaderData.post.hero ? absoluteUrl(loaderData.post.hero.src) : undefined,
          datePublished: loaderData.post.publishedAt,
          dateModified: loaderData.post.updatedAt ?? loaderData.post.publishedAt,
          author: loaderData.authors.map((author) => ({ '@type': 'Person', name: author.name, url: author.website })),
        }),
      },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const loaderData = Route.useLoaderData();

  return (
    <main class="mx-auto grid max-w-3xl gap-8 px-6 py-16">
      <header class="grid gap-4">
        <p class="text-sm text-neutral-500">{loaderData().post.publishedAt} · {loaderData().post.readingTime}</p>
        <h1 class="text-5xl font-semibold tracking-tight text-neutral-950">{loaderData().post.title}</h1>
        <p class="text-xl leading-8 text-neutral-700">{loaderData().post.description}</p>
        <div class="flex flex-wrap gap-2 text-sm text-neutral-600">
          <For each={loaderData().authors}>{(author) => <span>{author.name}</span>}</For>
        </div>
      </header>

      <Show when={loaderData().post.hero}>
        {(hero) => (
          <figure class="grid gap-2">
            <Image src={hero().src} alt={hero().alt} width={1200} class="w-full rounded-3xl border border-neutral-200" loading="eager" />
            <Show when={hero().caption}>
              <figcaption class="text-sm text-neutral-500">{hero().caption}</figcaption>
            </Show>
          </figure>
        )}
      </Show>

      <article class="prose prose-neutral max-w-none" innerHTML={loaderData().post.html} />
    </main>
  );
}
