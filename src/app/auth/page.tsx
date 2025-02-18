'use client';
import { useEffect } from 'react';
import { useGetAuthTestQuery, useGetAllChallengeListQuery } from '@/api/auth';
export default function Page() {
  const { data, isLoading } = useGetAllChallengeListQuery();
  const listCh = useGetAllChallengeListQuery();
  const { data: auth, error: errAuth, isSuccess: isSuccAuth } = useGetAuthTestQuery({});
  useEffect(() => {
    if (data) {
      console.log('listChallenges:', listCh, data);
    }
  }, [isLoading]);
  useEffect(() => {
    if (auth) {
      console.log('auth:', auth);
    }
  }, [isSuccAuth]);
  if (errAuth) {
    return <div>Error...</div>;
  }
  return (
    <div>
      list challenges is loaded:
      <br />
      auth is sent: {isSuccAuth}
    </div>
  );
}
