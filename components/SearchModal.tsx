'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, ArrowRight } from 'lucide-react';
import { flattenNav, navigation, getBreadcrumbs } from '@/lib/navigation';

interface SearchItem {
  title: string;
  href: string;
  breadcrumb: string;
}

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Build search data from navigation
  const allPages: SearchItem[] = flattenNav(navigation).map((item) => {
    const crumbs = getBreadcrumbs(item.href);
    return {
      title: item.title,
      href: item.href,
      breadcrumb: crumbs.map((c) => c.title).join(' / '),
    };
  });

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q);
      if (!q.trim()) {
        setResults([]);
        setSelectedIndex(0);
        return;
      }

      const normalizedQuery = q.toLowerCase().trim();
      const filtered = allPages.filter((page) => {
        const searchText = `${page.title} ${page.breadcrumb}`.toLowerCase();
        return normalizedQuery.split(/\s+/).every((term) => searchText.includes(term));
      });

      setResults(filtered.slice(0, 8));
      setSelectedIndex(0);
    },
    [allPages]
  );

  const navigateToResult = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
      setQuery('');
      setResults([]);
    },
    [router, onClose]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Parent handles opening
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        setQuery('');
        setResults([]);
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        navigateToResult(results[selectedIndex].href);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex, navigateToResult]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search pages..."
            className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-muted transition-default"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {results.length > 0 && (
            <ul className="py-2">
              {results.map((result, index) => (
                <li key={result.href}>
                  <button
                    onClick={() => navigateToResult(result.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 text-left transition-default
                      ${
                        selectedIndex === index
                          ? 'bg-accent-light text-accent'
                          : 'text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <FileText className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{result.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.breadcrumb}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!query && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Type to search across all pages...
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-muted/50 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-card border border-border font-mono text-xs">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-card border border-border font-mono text-xs">↵</kbd>
            Open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-card border border-border font-mono text-xs">Esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
