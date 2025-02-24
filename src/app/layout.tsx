import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import localFont from 'next/font/local';
import { Footer } from '@/widgets';
import { Root } from '@/shared/core';
import '../shared/styles/globals.scss';

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
            <main>{children}</main>
            <Footer />
          </Root>
        </body>
      </StoreProvider>
    </html>
  );
}
