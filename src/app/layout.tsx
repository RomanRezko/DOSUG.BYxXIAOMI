import type { Metadata } from 'next';
import { Unbounded, Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import './globals.css';

const unbounded = Unbounded({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-unbounded',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DOSUG.BY × Xiaomi — каталог со сравнением цен',
    template: '%s | DOSUG.BY × Xiaomi',
  },
  description:
    'Каталог умной техники Xiaomi: сравнение цен в магазинах-партнёрах Беларуси. Смартфоны, телевизоры, роботы-пылесосы, аэрогрили и другое — по выгодным ценам.',
  keywords: ['Xiaomi', 'каталог Xiaomi', 'сравнение цен', 'Xiaomi Беларусь', 'умная техника', 'DOSUG.BY'],
  authors: [{ name: 'DOSUG.BY' }],
  openGraph: {
    type: 'website',
    locale: 'ru_BY',
    url: 'https://dosug.by',
    siteName: 'DOSUG.BY × Xiaomi',
    title: 'DOSUG.BY × Xiaomi — каталог со сравнением цен',
    description: 'Умная техника Xiaomi со сравнением цен в магазинах-партнёрах Беларуси.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOSUG.BY × Xiaomi — каталог со сравнением цен',
    description: 'Умная техника Xiaomi со сравнением цен в магазинах-партнёрах.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
