import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  title: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
      <Link href="/" className="hover:text-foreground transition-default">
        Home
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium">{item.title}</span>
          ) : (
            <Link href={item.href} className="hover:text-foreground transition-default">
              {item.title}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
