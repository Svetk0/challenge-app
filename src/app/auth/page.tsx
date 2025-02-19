'use client';
import { useEffect } from 'react';
import { useGetAuthTestQuery, useGetAllChallengeListQuery } from '@/api/auth';
export default function Page() {
  const { data } = useGetAllChallengeListQuery();
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

  return (
    <>
      {data && <div>list challenges is loaded:</div>}
      <div>auth is sent {auth.data}</div>
    </>
  );
}
