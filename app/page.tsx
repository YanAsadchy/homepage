import { getPageBySlug } from '@/lib/mdx';
import { getPrevNext, getBreadcrumbs } from '@/lib/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageNavigation from '@/components/PageNavigation';
import TableOfContents from '@/components/TableOfContents';
import Footer from '@/components/Footer';
import MdxContent from '@/components/MdxContent';
import JsonLd from '@/components/JsonLd';
import * as LucideIcons from 'lucide-react';

const BASE_URL = 'https://yanasadchy.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Yan Asadchy',
  givenName: 'Yan',
  familyName: 'Asadchy',
  jobTitle: 'Product Designer & Researcher',
  description:
    'Strategic product designer and researcher with 8+ years of experience across tech, healthcare, legal, and cultural sectors. PhD candidate at Tallinn University. Former MIT Media Lab research intern. Founder of Affinity OU.',
  url: BASE_URL,
  email: 'yan.asadchy@gmail.com',
  telephone: '+37256270701',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tallinn',
    addressCountry: 'EE',
  },
  sameAs: [
    'https://www.linkedin.com/in/yan-asadchy/',
  ],
  knowsAbout: [
    'Product Design',
    'UX Research',
    'Design Systems',
    'Data Visualisation',
    'Cultural Data Analytics',
    'Machine Learning',
    'Human-Computer Interaction',
    'Figma',
    'Python',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Tallinn University',
      url: 'https://www.tlu.ee',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Massachusetts Institute of Technology',
      url: 'https://www.mit.edu',
    },
  ],
  affiliation: [
    {
      '@type': 'Organization',
      name: 'Generait AI Solutions',
      url: 'https://generait.net',
    },
    {
      '@type': 'ResearchOrganization',
      name: 'CUDAN Open Lab',
      url: 'https://cudan.tlu.ee',
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Generait AI Solutions',
  },
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Yan Asadchy',
  url: BASE_URL,
  description: 'Personal academic portfolio of Yan Asadchy — product designer, researcher, and educator based in Tallinn, Estonia.',
  author: { '@id': `${BASE_URL}/#person` },
  inLanguage: 'en-US',
};

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
    <>
      <JsonLd schema={personSchema} />
      <JsonLd schema={webSiteSchema} />
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
