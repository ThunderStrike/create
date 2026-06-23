---
title: Hello from Tanstack Start
description: A first article showing the local content pipeline, route metadata, RSS, and IPX image route.
excerpt: A first article showing the local content pipeline.
publishedAt: 2026-06-22
updatedAt: 2026-06-22
featured: true
authors:
  - carl
categories:
  - engineering
topics:
  - tanstack-start
  - content-systems
series: tanstack-start
seriesOrder: 1
hero:
  src: /images/cover.svg
  alt: Abstract preview graphic for the template
  caption: Local images can be served through the IPX route.
seo:
  title: Hello from Tanstack Start
  description: A first article powered by Content Collections and TanStack Start.
---

This starter keeps the public authoring surface boring:

- routes are normal TanStack route files,
- content is normal Markdown,
- schemas live in `content-collections.ts`,
- shared site metadata lives in a small TypeScript module,
- images can use the `/ipx/*` route when runtime optimization is useful.

## Content Collections

Content Collections validates frontmatter and creates generated TypeScript data. The app adds only the policy it needs: sorting posts, hiding drafts, and resolving references.

## TanStack Start

TanStack Start owns the route tree, loaders, head metadata, server routes, server functions, prerendering, and sitemap generation.
