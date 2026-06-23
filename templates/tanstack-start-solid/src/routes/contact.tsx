import { createFileRoute } from '@tanstack/solid-router';
import { createForm, Field, Form } from '@formisch/solid';
import { createSignal, Show } from 'solid-js';
import { ContactSchema } from '@/lib/forms/contact.ts';
import { sendContactMessage } from '@/server-functions/contact.ts';
import { site } from '@/lib/site.ts';

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: `Contact · ${site.name}` },
      { name: 'description', content: 'A Formisch + Valibot form that submits through a TanStack Start server function.' },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = createSignal(false);
  const contactForm = createForm({
    schema: ContactSchema,
  });

  return (
    <main class="mx-auto grid max-w-xl gap-8 px-6 py-16">
      <header class="grid gap-3">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Formisch</p>
        <h1 class="text-4xl font-semibold tracking-tight">Contact</h1>
        <p class="text-neutral-700">
          The client form uses Formisch for Solid DX. The server function validates the same schema again at the trust boundary.
        </p>
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
