import { Dashboard } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};
export default function Page() {
  return <Dashboard />;
}
