'use client';

import { EditForm } from '@/widgets';

export default function EditChallengePage({ params }: { params: { id: string } }) {
  return <EditForm id={params.id} />;
}
