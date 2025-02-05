'use client';

import EditForm from '@/components/EditForm/EditForm';

export default function EditChallengePage({ params }: { params: { id: string } }) {
  return <EditForm id={params.id} />;
}
