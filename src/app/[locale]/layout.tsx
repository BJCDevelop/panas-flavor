import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Panas Flavor | Venezuelan Food Truck & Catering in Raleigh, NC',
  description: 'Authentic Venezuelan catering for events in Raleigh and the Triangle area. Arepas, tequeños, empanadas & more. Request a quote today!',
  openGraph: {
    title: 'Panas Flavor | Venezuelan Food Truck & Catering in Raleigh, NC',
    description: 'Authentic Venezuelan catering for events in Raleigh and the Triangle area.',
    url: 'https://panasflavor.com',
    siteName: 'Panas Flavor',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${montserrat.variable} ${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
