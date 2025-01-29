'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';
import { TChallenge } from '@/types';
import { useGetAllChallengeListQuery } from '@/api/content';
import { setLocalStorage } from '@/utils/localStorage';
import { setChallenges } from '@/lib/features/challenges/challengeSlice';
import { EditIcon } from '@/components/ui/Icons/EditIcon';
import styles from './listChallenges.module.scss';
import { Button } from '@/components/ui';

export default function ListChallenges() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [local, setLocal] = useState<TChallenge[]>([]);
  const { data, error, isLoading, isSuccess } = useGetAllChallengeListQuery();
  const challengeData = useSelector((state: RootState) => state.challenge.challenges);

  console.log('fetchData', data, error, isLoading, isSuccess);
  console.log('storeRedux', challengeData);

  useEffect(() => {
    if (data) {
      setLocalStorage('challenges', data);
      dispatch(setChallenges(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const MY_CHALLENGES = JSON.parse(localStorage.getItem('challenges') ?? '[]');
    setLocal(MY_CHALLENGES);
    if (isSuccess) {
      setLocal(data);
    }
    console.log('local ', local);
  }, [isSuccess, data, local]);

  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push(`/challenges/edit/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>My Challenges List</h2>
      <ol className={styles.list}>
        {data?.map((item: TChallenge) => (
          <li key={`challenge-${item.id}`} className={styles.listItem}>
            <span className={styles.description}>{item.description}</span>
            <button
              className={styles.editButton}
              onClick={(e) => handleEditClick(e, item.id)}
              aria-label={`Edit challenge: ${item.description}`}
            >
              <EditIcon
                id={`editIcon-${item.id}`}
                color={item.is_finished ? '#6FCF97' : '#9199F3'}
              />
            </button>
            <Button
              type='button'
              text={'+'}
              color='round'
              //onClick={() => router.push('/challenges/create')}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
