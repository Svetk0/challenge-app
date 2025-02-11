'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation/Navigation';

const Footer = () => {
  const pathname = usePathname();

  const showFooterPaths = ['/challenges', '/dashboards', '/history'];

  const shouldShowFooter = showFooterPaths.includes(pathname);

  if (!shouldShowFooter) return null;

  return (
    <footer>
      <Navigation />
    </footer>
  );
};

export default Footer;
