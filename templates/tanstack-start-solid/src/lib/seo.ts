import { absoluteUrl, site } from '@/lib/site.ts';

type SeoInput = {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

export function seo(input: SeoInput) {
  const description = input.description ?? site.description;
  const image = absoluteUrl(input.image ?? site.defaultImage);

  return [
    { title: input.title },
    { name: 'description', content: description },
    { property: 'og:site_name', content: site.name },
    { property: 'og:title', content: input.title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: input.type ?? 'website' },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: input.title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    ...(input.noindex ? [{ name: 'robots', content: 'noindex,nofollow' }] : []),
  ];
}

export function canonical(pathOrUrl: string) {
  return [{ rel: 'canonical', href: absoluteUrl(pathOrUrl) }];
}
