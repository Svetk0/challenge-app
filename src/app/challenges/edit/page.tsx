'use client';
import { useParams } from 'next/navigation';
import EditForm from '@/components/EditForm/EditForm';

export default function Page() {
  const params = useParams();
  console.log('params', params);
  const challengeId = params ? (params.id as string) : '';

  return <EditForm id={challengeId} />;
}
