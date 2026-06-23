---
title: Template capabilities checklist
description: A checklist for the main capabilities this starter is trying to preserve from an Astro-style content site.
publishedAt: 2026-06-23
draft: false
authors:
  - carl
categories:
  - engineering
topics:
  - content-systems
series: tanstack-start
seriesOrder: 2
---

The goal is not to clone Astro. The goal is to keep the authoring quality while using the right primitives from TanStack, Vite, Solid, and UnJS.

## Included by default

- file-based routes,
- local validated content collections,
- feed generation,
- built-in sitemap generation,
- schema-first forms,
- runtime image optimization,
- Tailwind v4,
- icon imports,
- font fallback metrics.

## Deliberately not default

`ocache` and `unstorage` are not part of the default app path. Add them when a concrete server-side caching or portable storage gap appears.
