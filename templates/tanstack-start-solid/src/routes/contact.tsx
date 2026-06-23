import { createForm, Field, Form } from '@formisch/solid';
import { createFileRoute } from '@tanstack/solid-router';
import { Show, createSignal } from 'solid-js';
import { ContactSchema } from '@/lib/forms/contact.ts';
import { canonical, seo } from '@/lib/seo.ts';
import { site } from '@/lib/site.ts';
import { sendContactMessage } from '@/server-functions/contact.ts';

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: seo({ title: `Contact · ${site.name}`, description: 'A small Formisch + Valibot form backed by a TanStack server function.' }),
    links: canonical('/contact'),
  }),
  component: ContactPage,
});

function ContactPage() {
  const contactForm = createForm({ schema: ContactSchema });
  const [sent, setSent] = createSignal(false);

  return (
    <main class="mx-auto grid max-w-2xl gap-8 px-6 py-16">
      <header class="grid gap-3">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Formisch</p>
        <h1 class="text-4xl font-semibold tracking-tight">Schema-first Solid forms</h1>
        <p class="text-neutral-700">Formisch owns the client form. The server function parses the same Valibot schema again at the trust boundary.</p>
      </header>

      <Show when={sent()}>
        <p class="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          Message accepted by the server function.
        </p>
      </Show>

      <Form
        of={contactForm}
        class="grid gap-5"
        onSubmit={async (output) => {
          await sendContactMessage({ data: output });
          setSent(true);
        }}
      >
        <Field of={contactForm} path={["name"]}>
          {(field) => (
            <label class="grid gap-2">
              <span class="text-sm font-medium">Name</span>
              <input class="rounded-2xl border border-neutral-300 px-4 py-3" value={field.input ?? ''} {...field.props} />
              <FieldError error={field.error} />
            </label>
          )}
        </Field>

        <Field of={contactForm} path={["email"]}>
          {(field) => (
            <label class="grid gap-2">
              <span class="text-sm font-medium">Email</span>
              <input class="rounded-2xl border border-neutral-300 px-4 py-3" type="email" value={field.input ?? ''} {...field.props} />
              <FieldError error={field.error} />
            </label>
          )}
        </Field>

        <Field of={contactForm} path={["message"]}>
          {(field) => (
            <label class="grid gap-2">
              <span class="text-sm font-medium">Message</span>
              <textarea class="min-h-36 rounded-2xl border border-neutral-300 px-4 py-3" value={field.input ?? ''} {...field.props} />
              <FieldError error={field.error} />
            </label>
          )}
        </Field>

        <button class="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white" type="submit">
          Send message
        </button>
      </Form>
    </main>
  );
}

function FieldError(props: { error: unknown }) {
  return (
    <Show when={props.error}>
      <p class="text-sm text-red-700">{String(props.error)}</p>
    </Show>
  );
}
