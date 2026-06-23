---
title: Hello TanStack Start
description: The first article in a local Content Collections setup for TanStack Start and Solid.
publishedAt: 2026-06-22
authors:
  - carl
tags:
  - tanstack
  - solid
---

This template treats content as local build input, not as a remote CMS integration.

The important thing is not to clone Astro's implementation. The important thing is to preserve the authoring contract:

- write content as files
- validate frontmatter
- generate typed imports
- keep routes TanStack-native
- keep build machinery mostly invisible

That gives you the parts of Astro that feel great while still respecting TanStack Start's route and server model.
