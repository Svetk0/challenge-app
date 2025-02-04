'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useEditChallengeMutation, useGetChallengeByIDQuery } from '@/api/content';
import { configValidation } from '@/utils/configValidation';
import { TEditForm } from '@/types';
import staticData from '@/constants/data.json';
import { Button, Input, Switcher } from '@/components';

import styles from './editForm.module.scss';

export default function EditForm({ id }: { id: number }) {
  const dt = staticData.challenge_form;
  const router = useRouter();
  const [_startedDate, _setStartedDate] = useState('');
  const [editChallenge] = useEditChallengeMutation();
  const {
    data: challengeData,
    isLoading,
    error,
  } = useGetChallengeByIDQuery(
    { id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [isSwitcher, setIsSwitcher] = useState<boolean>(challengeData?.finished_at === null);
  const [isCompleted, setIsCompleted] = useState<boolean>(!!challengeData?.is_finished);

  useEffect(() => {
    setIsSwitcher(challengeData?.finished_at === null);
  }, [challengeData, isLoading, error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    clearErrors,
  } = useForm<TEditForm>({
    defaultValues: async (): Promise<TEditForm> => {
      if (challengeData) {
        console.log('Query state:', { challengeData, isLoading, error });
        return {
          description: challengeData.description,
          goal: challengeData.goal,
          period: challengeData.period,
          started_at: challengeData.started_at,
          finished_at: challengeData.finished_at,
          progress: challengeData.progress,
          is_finished: challengeData.is_finished,
        };
      }

      return {
        description: '',
        goal: 1,
        period: 'week',
        started_at: '',
        finished_at: null,
        progress: 0,
        is_finished: false,
      };
    },
    values: challengeData,
  });

  const onSubmit: SubmitHandler<TEditForm> = async (data) => {
    try {
      if (isSwitcher) {
        data.finished_at = null;
      }
      data.is_finished = isCompleted;

      await editChallenge({ id, dataEdit: data }).unwrap();
      router.push('/challenges');
    } catch (error) {
      console.error('Failed to edit challenge:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleValidation = (fieldName: keyof TEditForm) => ({
    onBlur: () => {
      trigger(fieldName);
      if (fieldName === 'goal' && getValues('goal') < 1) {
        setValue('goal', 1);
      }
    },
    onChange: () => {
      if (getValues(fieldName)) {
        clearErrors(fieldName);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}> {dt.title_edit}</h2>
      <div className={styles.inputsContainer}>
        {['description', 'goal', 'period', 'started_at', 'finished_at', 'progress'].map(
          (fieldName) => {
            const config = configValidation[fieldName];
            if (!config) return null;
            const normalizedConfig = typeof config === 'function' ? config('') : config;

            const { label, placeholder, type, ...fieldRules } = normalizedConfig;
            return (
              <Input
                key={fieldName}
                tagType={
                  fieldName === 'period'
                    ? 'select'
                    : fieldName === 'description'
                      ? 'textarea'
                      : 'input'
                }
                label={label}
                placeholder={placeholder}
                type={type}
                isDisabled={fieldName === 'finished_at' ? isSwitcher : false}
                options={fieldName === 'period' ? dt.period.time : undefined}
                error={errors[fieldName as keyof TEditForm]?.message}
                registration={register(fieldName as keyof TEditForm, {
                  required: fieldRules.required,
                  validate: fieldRules.validate || {},
                  onBlur: () => handleValidation(fieldName as keyof TEditForm).onBlur(),
                  onChange: () => handleValidation(fieldName as keyof TEditForm).onChange(),
                })}
              />
            );
          }
        )}
        <Switcher label={dt.switcher.label} isActive={isSwitcher} setIsActive={setIsSwitcher} />
        <div className={styles.columnWrapper}>
          <Switcher
            label={dt.switcher.label_complete}
            isActive={isCompleted}
            setIsActive={setIsCompleted}
          />
        </div>
      </div>

      <div className={styles.rowWrapper}>
        <Button type='button' text={'Back'} color='black' onClick={() => router.back()} />
        <Button type='submit' text={'Edit'} color='default' />
      </div>
    </form>
  );
}
