import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: {
    default: 'Yan Asadchy — Product Designer & Researcher',
    template: '%s | Yan Asadchy',
  },
  description:
    'Strategic product designer and researcher with 8+ years of experience across tech, healthcare, legal, and cultural sectors. Based in Tallinn, Estonia.',
  keywords: [
    'product designer',
    'UX researcher',
    'Yan Asadchy',
    'Tallinn',
    'portfolio',
    'design',
    'HCI',
  ],
  authors: [{ name: 'Yan Asadchy' }],
  openGraph: {
    title: 'Yan Asadchy — Product Designer & Researcher',
    description:
      'Strategic product designer and researcher with 8+ years of experience across tech, healthcare, legal, and cultural sectors.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Yan Asadchy',
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
