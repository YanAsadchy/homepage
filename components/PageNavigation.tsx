import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavItem } from '@/lib/navigation';

interface PageNavigationProps {
  prev: NavItem | null;
  next: NavItem | null;
}

export default function PageNavigation({ prev, next }: PageNavigationProps) {
  return (
    <div className="flex items-stretch gap-4 mt-12 pt-8 border-t border-border">
      {prev ? (
        <Link
          href={prev.href}
          className="flex-1 flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent-light/50 transition-default group"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-default" />
          <div className="text-right flex-1">
            <p className="text-xs text-muted-foreground mb-0.5">Previous</p>
            <p className="text-sm font-medium text-foreground group-hover:text-accent transition-default">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="flex-1 flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent-light/50 transition-default group"
        >
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-0.5">Next</p>
            <p className="text-sm font-medium text-foreground group-hover:text-accent transition-default">
              {next.title}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-default" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
