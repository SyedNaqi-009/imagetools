import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://imagetools.dev'),
  title: {
    default: 'ImageTools — Free Online Image Tools',
    template: '%s | ImageTools — Free Online Image Tools',
  },
  description:
    'Free online image tools. Compress, resize, convert, and edit images instantly in your browser. No upload to servers. 100% private.',
  keywords: [
    'image compressor',
    'image resizer',
    'image converter',
    'jpg to png',
    'png to jpg',
    'heic to jpg',
    'webp to jpg',
    'free online image tools',
    'privacy-focused image editor',
  ],
  authors: [{ name: 'ImageTools Team' }],
  creator: 'ImageTools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imagetools.dev',
    siteName: 'ImageTools',
    title: 'ImageTools — Free Online Image Tools',
    description:
      'Free online image tools. Compress, resize, convert, and edit images instantly in your browser. No upload to servers. 100% private.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImageTools — Free Online Image Tools',
    description:
      'Free online image tools. Compress, resize, convert, and edit images instantly in your browser. No upload to servers. 100% private.',
  },
  alternates: {
    canonical: 'https://imagetools.dev',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        {/* Google AdSense Script Placeholder */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
