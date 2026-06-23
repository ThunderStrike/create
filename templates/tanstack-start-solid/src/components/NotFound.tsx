import { Link } from '@tanstack/solid-router';

export function NotFound() {
  return (
    <main class="mx-auto grid max-w-3xl gap-4 px-6 py-16">
      <p class="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">404</p>
      <h1 class="text-4xl font-semibold tracking-tight">That page does not exist.</h1>
      <Link to="/" class="text-sm font-medium underline underline-offset-4">
        Go home
      </Link>
    </main>
  );
}
