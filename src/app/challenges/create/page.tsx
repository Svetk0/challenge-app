import { CreateForm } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create',
};
export default function Page() {
  return <CreateForm />;
}
