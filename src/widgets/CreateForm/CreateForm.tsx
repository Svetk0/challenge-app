'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateChallengeMutation } from '@/shared/api/content';
import { configValidation } from '@/shared/utils';
import { TCreateForm } from '@/shared/types';
import { Button, Input, Switcher } from '@/shared/ui';

import staticData from '@/shared/constants/data.json';
import styles from './CreateForm.module.scss';

const dt = staticData.challenge_form;

export function CreateForm() {
  const router = useRouter();
  const [errorCatched, setErrorCatched] = useState<string | null>(null);
  const [createChallenge] = useCreateChallengeMutation({});
  const [isSwitcher, setIsSwitcher] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const addNewChallenge = async (newChallenge: TCreateForm) => {
    setIsSubmitting(true);
    try {
      await createChallenge({ dataAdd: newChallenge }).unwrap();
    } catch (error) {
      setIsSubmitting(false);
      console.warn(error);
      if (typeof error === 'object' && error !== null && 'status' in error) {
        setErrorCatched(dt.errors.create_new);
      }

      throw error;
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    getValues,
    setValue,
    clearErrors,
  } = useForm<TCreateForm>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<TCreateForm> = async (data) => {
    if (isSwitcher) {
      data.finished_at = null;
    }
    await addNewChallenge(data);
    reset();
    router.push('/challenges');
  };

  const handleValidation = (fieldName: keyof TCreateForm) => ({
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
      <h2 className={styles.title}> {dt.title_create}</h2>
      <div className={styles.inputsContainer}>
        {['description', 'goal', 'period', 'started_at', 'finished_at'].map((fieldName) => {
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
              error={errors[fieldName as keyof TCreateForm]?.message}
              registration={register(fieldName as keyof TCreateForm, {
                required: fieldRules.required,
                validate: fieldRules.validate as Record<
                  string,
                  (value: string | number | boolean | null) => true | string
                >,
                onBlur: () => handleValidation(fieldName as keyof TCreateForm).onBlur(),
                onChange: () => handleValidation(fieldName as keyof TCreateForm).onChange(),
              })}
            />
          );
        })}
        <Switcher label={dt.switcher.label} isActive={isSwitcher} setIsActive={setIsSwitcher} />
      </div>

      <div className={styles.rowWrapper}>
        {errorCatched && <div className={styles.error}> {errorCatched}</div>}
        <Button type='button' text={dt.buttons.back} color='black' onClick={() => router.back()} />
        <Button
          type='submit'
          text={isSubmitting ? dt.buttons.create_load : dt.buttons.create}
          color='default'
        />
      </div>
    </form>
  );
}
