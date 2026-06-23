# TanStack Start + Solid site template

A Vite Plus bundled template for building Astro-grade sites on TanStack Start and Solid.

## First run

```sh
vp install
vp dev
```

TanStack Start generates `src/routeTree.gen.ts` during development and build. It is ignored because it is managed output.

## Why there is no `index.html`

This is a TanStack Start app, not a plain Vite SPA. Start's documented required app files are the router configuration and the root route. The root route renders the full HTML document with `HeadContent`, `HydrationScript`, and `Scripts`, so a hand-written `index.html` is not part of the normal Start app shape.

## What is included

See `docs/capabilities.md` for the exact split between wired defaults and intentional recipes.


- TanStack Start + Solid with Vite.
- TanStack Router file routes, root document, loaders, head metadata, prerendering, and built-in sitemap generation.
- Content Collections for local Markdown content.
- Stronger content schemas for posts, authors, categories, topics, and series.
- `feed` for RSS, Atom, and JSON Feed server routes.
- IPX image optimization at `/ipx/*`, local `public/` files by default and remote domains only when allowlisted.
- Formisch + Valibot for schema-first Solid forms.
- Tailwind v4 through the Vite plugin.
- `unplugin-icons` with Solid output and local icon support.
- Fontaine for font fallback metrics.
- Unifont as a font metadata inspection substrate, without forcing a custom font framework.

## Content model

Content lives in `content/` and is defined by `content-collections.ts`.

```txt
content/
  authors/
  categories/
  posts/
  series/
  topics/
```

The app imports generated collections through the normal Content Collections import:

```ts
import { allPosts } from 'content-collections';
```

Project policy lives in `src/lib/content/index.ts`: filtering drafts, sorting posts, resolving author/topic/category/series references, and surfacing graph diagnostics.

## Sitemap and feeds

Sitemaps use TanStack Start's built-in sitemap generation through `tanstackStart({ prerender, sitemap })` in `vite.config.ts`. Use a custom `sitemap.xml` server route only when you need dynamic lastmod, priority, i18n, or multiple sitemap indexes.

Feeds use normal Start server routes:

- `/rss.xml`
- `/atom.xml`
- `/feed.json`

## Images

Local runtime image optimization is available at `/ipx/*`:

```txt
/ipx/w_800,f_auto/images/cover.svg
```

The `Image` component uses IPX for root-relative local images. Remote images pass through unchanged unless you explicitly allowlist domains with `IPX_HTTP_DOMAINS` and update the component policy.

## Site metadata

TanStack owns route metadata through route `head` functions, the router owns defaults in `src/router.tsx`, and the tiny `src/lib/site.ts` module only stores genuinely shared site metadata.

## Caching and storage

The starter does not include `ocache` or `unstorage` by default. TanStack Router loader caching, TanStack Query, server route HTTP headers, static server functions, and ISR should be considered first. Add `ocache` or `unstorage` only when a concrete server-side TTL/SWR/dedupe or portable KV storage gap appears.

## Markdown and MDX

This starter defaults to Markdown because it is the safest Solid-compatible Content Collections path today. Astro 7 raises the bar with Rust-powered Markdown and MDX processing, but that exact pipeline is Astro-specific. Treat first-class Solid MDX as an explicit recipe once you choose the runtime strategy, rather than sneaking in a React-oriented MDX renderer.
