import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import { Sniglet, Open_Sans } from 'next/font/google';
//import localFont from 'next/font/local';
import { Suspense } from 'react';
import { Footer } from '@/widgets';
import { Root } from '@/shared/core';
import { Loading } from '@/shared/ui';

import './_assets/globals.scss';

export const snigletFont = Sniglet({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sniglet',
  weight: ['400'],
});
export const openSansFont = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | My Challenges',
    default: 'Challenge App',
  },
  description: 'Track your personal challenges and goals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${snigletFont.variable} ${openSansFont.variable}`}>
      <StoreProvider>
        <body>
          <Root>
            <Suspense fallback={<Loading />}>
              <main>{children}</main>
              <Footer />
            </Suspense>
          </Root>
        </body>
      </StoreProvider>
    </html>
  );
}
