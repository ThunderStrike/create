import { Link } from '@tanstack/solid-router';
import type { Post } from '@/lib/content/index.ts';

export function PostCard(props: { post: Post }) {
  return (
    <article class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p class="text-sm text-neutral-500">{props.post.publishedAt} · {props.post.readingTime}</p>
      <h2 class="mt-3 text-2xl font-semibold tracking-tight">
        <Link to="/articles/$slug" params={{ slug: props.post.slug }}>
          {props.post.title}
        </Link>
      </h2>
      <p class="mt-2 leading-7 text-neutral-700">{props.post.description}</p>
    </article>
  );
}
