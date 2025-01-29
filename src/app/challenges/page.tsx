'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import Link from 'next/link';
import ListChallenges from '@/components/ListChallenges/ListChallenges';
export default function Home() {
  const router = useRouter();
  return (
    <>
      <ListChallenges />
      <Link href={'/challenges/create'}>
        <Button
          type='button'
          text={'Add new'}
          color='default'
          onClick={() => router.push('/challenges/create')}
        />
      </Link>
    </>
  );
}
