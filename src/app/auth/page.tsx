'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetAuthTestQuery, useGetAllChallengeListQuery } from '@/shared/api/auth';
import { Button } from '@/shared/ui';
export default function Page() {
  const router = useRouter();
  const {
    data,
    //error
  } = useGetAllChallengeListQuery();
  const listCh = useGetAllChallengeListQuery();
  //   const { data: auth, error: errAuth, isSuccess: isSuccAuth } = useGetAuthTestQuery({});
  const auth = useGetAuthTestQuery();
  useEffect(() => {
    if (data) {
      console.log('listChallenges:', listCh, data);
    }
  }, [data]);
  useEffect(() => {
    if (auth) {
      console.log('auth:', auth);
    }
  }, [auth]);
  // if (error) {
  //   if ('status' in error) {
  //     throw new Error(`Error ${error.status}: Failed to load`);
  //   }
  //   throw error;
  // }
  return (
    <>
      {data && <div>list challenges is loaded:</div>}
      <div>auth is sent {auth.data}</div>
      <Button type='button' text={'Back'} color='black' onClick={() => router.back()} />
    </>
  );
}
