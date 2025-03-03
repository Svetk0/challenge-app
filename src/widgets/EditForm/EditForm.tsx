'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { useEditChallengeMutation, useGetChallengeByIDQuery } from '@/shared/api/content';
import { configValidation, validateAndAdjustDates } from '@/shared/utils';
import { TEditForm } from '@/shared/types';
import { Button, Input, Switcher } from '@/shared/ui';
import staticData from '@/shared/constants/data.json';
import styles from './EditForm.module.scss';

const dt = staticData.challenge_form;
const notify = () => toast('Here is your toast.');

export function EditForm({ id }: { id: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorCatched, setErrorCatched] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [editChallenge] = useEditChallengeMutation();
  const {
    data: challengeData,
    isLoading,
    error,
  } = useGetChallengeByIDQuery(
    { uuid: id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [isSwitcher, setIsSwitcher] = useState<boolean>(challengeData?.finished_at === null);
  const [isCompleted, setIsCompleted] = useState<boolean>(!!challengeData?.is_finished);

  useEffect(() => {
    setIsSwitcher(challengeData?.finished_at === null);
  }, [challengeData, isLoading, error]);
  useEffect(() => {}, [errorCatched]);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
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
        goal: 0,
        period: 'week',
        started_at: '',
        finished_at: null,
        progress: 0,
        is_finished: false,
      };
    },
    values: challengeData,
  });

  if (error) {
    if ('status' in error) {
      throw new Error(` ${error.status}: ${dt.errors.get_id}`);
    }
    setErrorCatched(dt.errors.get_id);
    throw error;
  }

  const onSubmit: SubmitHandler<TEditForm> = async (data) => {
    try {
      setIsSubmitting(true);

      const changedFields = Object.fromEntries(
        Object.entries(data).filter(([key]) => key in dirtyFields)
      ) as Partial<TEditForm>;

      if (isSwitcher !== (challengeData?.finished_at === null)) {
        changedFields.finished_at = isSwitcher ? null : data.finished_at;
      }

      if (isCompleted !== challengeData?.is_finished) {
        changedFields.is_finished = isCompleted;
      }

      if (Object.keys(changedFields).length > 0) {
        await editChallenge({
          uuid: id,
          dataEdit: changedFields,
        }).unwrap();
      }
      notify();
      router.push('/challenges');
    } catch (error) {
      setIsSubmitting(false);
      console.warn(error);
      if (typeof error === 'object' && error !== null && 'status' in error) {
        setErrorCatched(dt.errors.save_changes);
      }

      throw error;
    }
  };

  const handleValidation = (fieldName: keyof TEditForm) => ({
    onBlur: () => {
      trigger(fieldName);
      if (fieldName === 'goal' && getValues('goal') < 1) {
        setValue('goal', 1);
      }
      if (fieldName === 'progress' && getValues('progress') < 0) {
        setValue('progress', 0);
      }
    },
    onChange: () => {
      if (getValues(fieldName)) {
        clearErrors(fieldName);
      }
      if ((fieldName === 'started_at' || fieldName === 'finished_at') && getValues('finished_at')) {
        setValue(
          'finished_at',
          validateAndAdjustDates({
            started_at: getValues('started_at'),
            finished_at: getValues('finished_at'),
            setUserErrorMessage: setErrorCatched,
          })
        );
      }
    },
  });

  useEffect(() => {
    if ((getValues('finished_at') === '' || !getValues('finished_at')) && !isSwitcher) {
      setWarning(dt.warnings.end_required);
    } else if (isCompleted) {
      setWarning(dt.warnings.complete_today);
    } else if (isSwitcher && getValues('finished_at')) {
      setWarning(dt.warnings.all_time);
    } else {
      setWarning(null);
    }
  }, [warning, isSwitcher, isCompleted, getValues('finished_at')]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}> {dt.title_edit}</h2>
      <div
        className={styles.inputsContainer}
        onClick={() => {
          setErrorCatched(null);
          setWarning(null);
        }}
      >
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
        {errorCatched && <div className={styles.error}> {errorCatched}</div>}
        {warning && <div className={styles.warning}> {warning}</div>}
        <Button type='button' text={dt.buttons.back} color='black' onClick={() => router.back()} />
        <Button
          type='submit'
          text={isSubmitting ? dt.buttons.edit_load : dt.buttons.edit}
          color='default'
        />
      </div>
      <Toaster />
    </form>
  );
}
