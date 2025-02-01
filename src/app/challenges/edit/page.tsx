'use client';
import { useParams } from 'next/navigation';
import EditForm from '@/components/EditForm/EditForm';

export default function Page() {
  const params = useParams();
  const id = params?.id; // безопасное получение id

  // Ensure id is a number
  const challengeId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : typeof id === 'string'
      ? parseInt(id, 10)
      : 0; // или другое значение по умолчанию

  return <EditForm id={challengeId} />;
}
