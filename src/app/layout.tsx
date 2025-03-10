import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { Footer } from '@/widgets';
import { Root } from '@/shared/core';
import { Loading } from '@/shared/ui';

import './_assets/globals.scss';

const openSans = localFont({
  src: '../../public/fonts/OpenSans.woff',
  variable: '--font-geist-mono',
  weight: '300 400 600',
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
    <html lang='en'>
      <StoreProvider>
        <body className={`${openSans.className}`}>
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
