'use client';

import { PageMeta } from './navigation-types';

export interface SearchResult {
  title: string;
  description: string;
  href: string;
  breadcrumb: string;
}

// Simple client-side search using string matching
// FlexSearch will be initialized on the client
export function searchPages(pages: SearchResult[], query: string): SearchResult[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const terms = normalizedQuery.split(/\s+/);

  return pages
    .filter((page) => {
      const searchText = `${page.title} ${page.description} ${page.breadcrumb}`.toLowerCase();
      return terms.every((term) => searchText.includes(term));
    })
    .slice(0, 8);
}
