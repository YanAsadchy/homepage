import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { flattenNav, navigation } from '@/lib/navigation';

const BASE_URL = 'https://yanasadchy.com';

// Page priority by depth: root = 1.0, top-level = 0.9, nested = 0.8
function getPriority(href: string): number {
  if (href === '/') return 1.0;
  const depth = href.split('/').filter(Boolean).length;
  return depth === 1 ? 0.9 : 0.8;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = flattenNav(navigation);

  return pages.map((page) => ({
    url: `${BASE_URL}${page.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: getPriority(page.href),
  }));
}
