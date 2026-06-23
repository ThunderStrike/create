import type { ErrorComponentProps } from '@tanstack/solid-router';

export function DefaultCatchBoundary(props: ErrorComponentProps) {
  return (
    <main class="mx-auto grid max-w-3xl gap-4 px-6 py-16">
      <p class="text-sm font-medium uppercase tracking-[0.25em] text-red-700">Route error</p>
      <h1 class="text-4xl font-semibold tracking-tight">Something went wrong.</h1>
      <pre class="overflow-auto rounded-2xl bg-neutral-950 p-4 text-sm text-white">
        {props.error instanceof Error ? props.error.message : String(props.error)}
      </pre>
    </main>
  );
}
