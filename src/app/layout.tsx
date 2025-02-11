import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import localFont from 'next/font/local';
import Footer from '@/components/Footer/Footer';
import '../styles/globals.scss';

const openSans = localFont({
  src: '../../public/fonts/OpenSans.woff',
  variable: '--font-geist-mono',
  weight: '300 400 600',
});

export const metadata: Metadata = {
  title: 'Challenge App',
  description: 'Track your personal challenges and goals',
  openGraph: {
    title: 'Challenge App',
    description: 'Track your personal challenges and goals',
    images: [
      {
        url: '/images/og_image.png',
        width: 1200,
        height: 730,
        alt: 'Challenge App Preview',
      },
    ],
    siteName: 'Challenge App',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Challenge App',
    description: 'Track your personal challenges and goals',
    images: ['/images/og_image.png'],
  },
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
          <main className='main'>{children}</main>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}
