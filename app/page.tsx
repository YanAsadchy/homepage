import { getPageBySlug } from '@/lib/mdx';
import { getPrevNext, getBreadcrumbs } from '@/lib/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageNavigation from '@/components/PageNavigation';
import TableOfContents from '@/components/TableOfContents';
import Footer from '@/components/Footer';
import MdxContent from '@/components/MdxContent';
import * as LucideIcons from 'lucide-react';

function getIcon(name: string, className: string = 'w-8 h-8') {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default async function HomePage() {
  const page = getPageBySlug('/');

  if (!page) {
    return <div>Page not found</div>;
  }

  const { prev, next } = getPrevNext('/');
  const breadcrumbs = getBreadcrumbs('/');

  return (
    <div className="md:pl-0">
      <div className="flex gap-8 px-6 py-8 max-w-5xl mx-auto">
        {/* Main content */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

          {/* Cover image */}
          {page.coverImage && (
            <div className="mb-8 -mx-6 md:mx-0 overflow-hidden rounded-lg">
              <img
                src={page.coverImage}
                alt={page.title}
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Page header */}
          <div className="mb-8">
            {page.icon && !page.coverImage && (
              <div className="mb-4 text-accent">
                {getIcon(page.icon, 'w-10 h-10')}
              </div>
            )}
            <h1 className="text-4xl font-heading font-normal text-foreground tracking-tight mb-3">
              {page.title}
            </h1>
            {page.description && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {page.description}
              </p>
            )}
          </div>

          {/* MDX content */}
          <MdxContent source={page.content} />

          {/* Prev/Next navigation */}
          <PageNavigation prev={prev} next={next} />

          {/* Footer */}
          <Footer />
        </article>

        {/* Table of Contents */}
        <TableOfContents headings={page.headings} />
      </div>
    </div>
  );
}
