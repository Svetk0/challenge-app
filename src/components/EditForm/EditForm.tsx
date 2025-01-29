'use client';
import { useRouter } from 'next/navigation';
//import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

//import { addChallenge } from '@/lib/features/challenges/challengeSlice';
import { useEditChallengeMutation, useGetChallengeByIDQuery } from '@/api/content';
import { configValidation } from '@/utils/configValidation';
import { TEditForm, TChallenge } from '@/types';
import staticData from '@/constants/data.json';

import { Button, Input, Switcher } from '@/components';

import styles from './editForm.module.scss';
import { getLocalStorage } from '@/utils/localStorage';

export default function EditForm({ id }: { id: number }) {
  const dt = staticData.challenge_form;
  const router = useRouter();
  //const dispatch = useDispatch();
  const [_startedDate, _setStartedDate] = useState('');
  const [editChallenge] = useEditChallengeMutation();
  const { data: challengeData, isLoading } = useGetChallengeByIDQuery({ id });
  const [isSwitcher, setIsSwitcher] = useState<boolean>(!!challengeData?.finished_at);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(!!challengeData?.is_finished);

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

      // Пробуем получить данные из localStorage
      const localData = getLocalStorage('challenges')?.find(
        (challenge: TChallenge) => challenge.id === id
      );
      if (localData) {
        return {
          description: localData.description,
          goal: localData.goal,
          period: localData.period,
          started_at: localData.started_at,
          finished_at: localData.finished_at,
          progress: localData.progress,
          is_finished: localData.is_finished,
        };
      }

      // Если нет данных ни с сервера, ни из localStorage, возвращаем дефолтные значения
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
  });

  const onSubmit: SubmitHandler<TEditForm> = async (data) => {
    setIsSubmitting(true);
    try {
      if (isSwitcher) {
        data.finished_at = null;
      }
      data.is_finished = isCompleted;

      await editChallenge({ id, dataEdit: data }).unwrap();
      router.push('/challenges');
    } catch (error) {
      console.error('Failed to edit challenge:', error);
    } finally {
      setIsSubmitting(false);
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
                  validate: fieldRules.validate as Record<
                    string,
                    (value: string | number | boolean | null) => true | string
                  >,
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
        <Button type='button' text={dt.buttons.back} color='black' onClick={() => router.back()} />
        <Button
          type='submit'
          text={isSubmitting ? dt.buttons.edit_load : dt.buttons.edit}
          color='default'
        />
      </div>
    </form>
  );
}
