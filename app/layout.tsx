import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import ClientLayout from '@/components/ClientLayout';

const BASE_URL = 'https://yanasadchy.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Yan Asadchy — Product Designer & Researcher',
    template: '%s | Yan Asadchy',
  },
  description:
    'Yan Asadchy is a strategic product designer and researcher with 8+ years of experience across tech, healthcare, legal, and cultural sectors. Based in Tallinn, Estonia. PhD candidate at Tallinn University, former MIT Media Lab research intern.',
  keywords: [
    'Yan Asadchy',
    'product designer',
    'UX researcher',
    'HCI researcher',
    'Tallinn Estonia',
    'MIT Media Lab',
    'CUDAN Open Lab',
    'cultural data analytics',
    'design systems',
    'data visualisation',
    'Generait',
    'legal tech design',
    'Figma',
    'Python data viz',
    'portfolio',
  ],
  authors: [{ name: 'Yan Asadchy', url: BASE_URL }],
  creator: 'Yan Asadchy',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Yan Asadchy — Product Designer & Researcher',
    description:
      'Strategic product designer and researcher with 8+ years of experience. MIT Media Lab intern, PhD candidate at Tallinn University. Specialises in design systems, data visualisation, and cultural analytics.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Yan Asadchy',
    url: BASE_URL,
    images: [
      {
        url: '/images/about-me-image.png',
        width: 1200,
        height: 630,
        alt: 'Yan Asadchy — Product Designer & Researcher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yan Asadchy — Product Designer & Researcher',
    description:
      'Strategic product designer and researcher. MIT Media Lab intern, PhD candidate. Design systems, data visualisation, cultural analytics.',
    images: ['/images/about-me-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
