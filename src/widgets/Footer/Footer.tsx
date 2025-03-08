'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/widgets';

export const Footer = () => {
  const pathname = usePathname();

  const showFooterPaths = ['/challenges', '/dashboard', '/history'];

  const shouldShowFooter = showFooterPaths.includes(pathname);

  if (!shouldShowFooter) return null;

  return (
    <footer>
      <Navigation />
    </footer>
  );
};
