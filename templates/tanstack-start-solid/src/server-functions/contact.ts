import { createServerFn } from '@tanstack/solid-start';
import * as v from 'valibot';
import { ContactSchema } from '@/lib/forms/contact.ts';

export const sendContactMessage = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => v.parse(ContactSchema, input))
  .handler(async ({ data }) => {
    // Replace this with email, database, queue, or webhook work.
    // The server function is the trust boundary, so the schema is parsed again here.
    console.info('contact message received', data.email);

    return {
      ok: true,
    };
  });
