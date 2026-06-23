import * as v from 'valibot';

export const ContactSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, 'Name is required.')),
  email: v.pipe(v.string(), v.trim(), v.email('Use a valid email address.')),
  message: v.pipe(v.string(), v.trim(), v.minLength(10, 'Use at least 10 characters.')),
});

export type ContactInput = v.InferInput<typeof ContactSchema>;
export type ContactOutput = v.InferOutput<typeof ContactSchema>;
