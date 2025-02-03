'use client';
import { useParams } from 'next/navigation';
import EditForm from '@/components/EditForm/EditForm';

export default function Page() {
  const params = useParams();
  const challengeId = params ? parseInt(params.id as string, 10) : 0;

  return <EditForm id={challengeId} />;
}
