import { EditForm } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit',
};
export default function EditChallengePage({ params }: { params: { id: string } }) {
  return <EditForm id={params.id} />;
}
