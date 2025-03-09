import { InProgressChallengesList } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Actual',
};
export default function Page() {
  return (
    <>
      <InProgressChallengesList />
    </>
  );
}
