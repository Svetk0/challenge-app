import { FinishedChallengesList } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finished',
};
export default function Page() {
  return <FinishedChallengesList />;
}
