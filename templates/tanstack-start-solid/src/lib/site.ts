export const site = {
  name: 'Thunderstrike Start',
  description: 'A TanStack Start + Solid template with Astro-grade content, SEO, image, and form authoring ergonomics.',
  origin: import.meta.env.VITE_SITE_ORIGIN ?? 'http://localhost:3000',
  language: 'en-US',
  author: 'Thunderstrike',
  defaultImage: '/images/cover.svg',
} as const;

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, site.origin).toString();
}
