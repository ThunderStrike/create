# TanStack Start + Solid template

A Vite Plus bundled template for building Astro-grade sites on TanStack Start and Solid.

## What is included

- TanStack Start + Solid with Vite.
- TanStack Router file routes, root document, loaders, head metadata, and server routes.
- Content Collections for local Markdown content.
- Formisch + Valibot for schema-first Solid forms.
- Tailwind v4 through the Vite plugin.
- `unplugin-icons` with Solid output and local icon support.
- Fontaine for font fallback metrics.
- Unifont installed as the lower-level font metadata substrate, without forcing a custom font framework.

## First run

```sh
vp install
vp dev
```

TanStack Start generates `src/routeTree.gen.ts` during development/build. It is ignored because it is managed output.

## Content model

Content lives in `content/` and is defined by `content-collections.ts`.

```txt
content/
  authors/
  posts/
```

The app imports generated collections through the normal Content Collections import:

```ts
import { allPosts } from 'content-collections';
```

Project policy lives in `src/lib/content/index.ts`, not in a second content framework.

## Site config

TanStack owns route metadata through route `head` functions, the router owns defaults in `src/router.tsx`, and the tiny `src/lib/site.ts` module only stores genuinely shared site metadata.

## Caching and storage

The starter does not include `ocache` or `unstorage` by default. TanStack Router loader caching, TanStack Query, server route HTTP headers, static server functions, and ISR should be considered first. Add `ocache` or `unstorage` only when a concrete server-side TTL/SWR/dedupe or portable KV storage gap appears.

## MDX note

This starter defaults to Markdown because the Content Collections MDX runtime is React-oriented. If you need MDX as first-class Solid authoring, add it as a separate recipe after choosing the Solid MDX runtime strategy you want to support.
