'use client';

import { EditForm } from '@/components/';

export default function EditChallengePage({ params }: { params: { id: string } }) {
  return <EditForm id={params.id} />;
}
