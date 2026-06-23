# Architecture notes

## TanStack first

Route structure, route loaders, URL state, head metadata, server functions, and server routes should follow TanStack Start and TanStack Router patterns first.

## Content Collections first

Content Collections is the content engine. App code imports from `content-collections`, then `src/lib/content/index.ts` applies local project policy such as filtering drafts and sorting posts.

## No custom site config framework

The app uses a tiny `src/lib/site.ts` object for shared metadata. Route-specific metadata belongs in route `head` functions.

## Fonts

Fontaine is wired into Vite because it directly solves fallback font metrics. Unifont is installed for teams that want to build a stronger font resolver or provider abstraction later. The default template does not hide font behavior behind a custom framework.

## Cache and storage

Prefer TanStack Router loader cache, TanStack Query, server route HTTP caching, static server functions, and ISR. Add `ocache` or `unstorage` only when you have a concrete server-side cache or portable storage requirement.

## Images

The starter uses ordinary Vite/public asset behavior by default. Add IPX as an optional image optimization route when runtime image transformation is a real project requirement.
