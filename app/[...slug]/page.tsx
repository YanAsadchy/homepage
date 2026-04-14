import { notFound } from 'next/navigation';
import { getPageBySlug, getAllPages } from '@/lib/mdx';
import { getPrevNext, getBreadcrumbs } from '@/lib/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageNavigation from '@/components/PageNavigation';
import TableOfContents from '@/components/TableOfContents';
import Footer from '@/components/Footer';
import MdxContent from '@/components/MdxContent';
import JsonLd from '@/components/JsonLd';
import * as LucideIcons from 'lucide-react';
import { Metadata } from 'next';

const BASE_URL = 'https://yanasadchy.com';

function getIcon(name: string, className: string = 'w-8 h-8') {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const pages = getAllPages();
  return pages
    .filter((page) => page.slug !== '/')
    .map((page) => ({
      slug: page.slug.split('/').filter(Boolean),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = '/' + slug.join('/');
  const page = getPageBySlug(slugPath);

  if (!page) {
    return { title: 'Not Found' };
  }

  const pageUrl = `${BASE_URL}${slugPath}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${page.title} | Yan Asadchy`,
      description: page.description,
      url: pageUrl,
      images: page.coverImage
        ? [{ url: page.coverImage, alt: page.title }]
        : [{ url: '/images/about-me-image.png', alt: 'Yan Asadchy' }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${page.title} | Yan Asadchy`,
      description: page.description,
      images: page.coverImage ? [page.coverImage] : ['/images/about-me-image.png'],
    },
  };
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = '/' + slug.join('/');
  const page = getPageBySlug(slugPath);

  if (!page) {
    notFound();
  }

  const { prev, next } = getPrevNext(slugPath);
  const breadcrumbs = getBreadcrumbs(slugPath);
  const pageUrl = `${BASE_URL}${slugPath}`;

  // BreadcrumbList schema — helps AI engines understand site hierarchy
  const breadcrumbSchema = breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          ...breadcrumbs.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: crumb.title,
            item: `${BASE_URL}${crumb.href}`,
          })),
        ],
      }
    : null;

  // Course schema for teaching pages
  const courseSchema = slugPath.startsWith('/teaching/')
    ? {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: page.title,
        description: page.description,
        url: pageUrl,
        provider: {
          '@type': 'Person',
          name: 'Yan Asadchy',
          url: BASE_URL,
        },
        instructor: {
          '@type': 'Person',
          name: 'Yan Asadchy',
          url: BASE_URL,
        },
      }
    : null;

  // Article schema for all other content pages
  const articleSchema = !slugPath.startsWith('/teaching/')
    ? {
        '@context': 'https://schema.org',
        '@type': slugPath === '/about/publications' ? 'ScholarlyArticle' : 'Article',
        headline: page.title,
        description: page.description,
        url: pageUrl,
        author: {
          '@type': 'Person',
          name: 'Yan Asadchy',
          url: BASE_URL,
        },
        ...(page.coverImage ? { image: `${BASE_URL}${page.coverImage}` } : {}),
      }
    : null;

  return (
    <>
      {breadcrumbSchema && <JsonLd schema={breadcrumbSchema} />}
      {courseSchema && <JsonLd schema={courseSchema} />}
      {articleSchema && <JsonLd schema={articleSchema} />}
      <div className="md:pl-0">
        <div className="flex gap-8 px-6 py-8 max-w-5xl mx-auto">
          {/* Main content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

            {/* Cover image */}
            {page.coverImage && (
              <div className="mb-8 -mx-6 md:mx-0">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={page.coverImage}
                    alt={page.title}
                    className="w-full h-48 sm:h-64 md:h-80 object-cover"
                  />
                </div>
                {page.coverCaption && (
                  <p className="mt-2 text-xs text-muted-foreground italic px-6 md:px-0">{page.coverCaption}</p>
                )}
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
    </>
  );
}
