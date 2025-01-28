'use client';
import { useParams } from 'next/navigation';
import EditForm from '@/components/EditForm/EditForm';

export default function Page() {
  const { id } = useParams(); // Get the id from the URL parameters

  // Ensure id is a number
  const challengeId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

  return <EditForm id={challengeId} />;
}
