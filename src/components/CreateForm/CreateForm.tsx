'use client';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { addChallenge } from '@/lib/features/challenges/challengeSlice';
import { useCreateChallengeMutation } from '@/api/content';
import { configValidation } from '@/utils/configValidation';
import { TCreateForm } from '@/types';
import staticData from '@/constants/data.json';

import Button from '@/components/ui/Button/Button';

import styles from './createForm.module.scss';

export default function CreateForm() {
  const dt = staticData.challenge_form;
  const router = useRouter();
  const dispatch = useDispatch();
  const [_startedDate, _setStartedDate] = useState('');
  const [createChallenge] = useCreateChallengeMutation({});

  const addNewChallenge = async (newChallenge: TCreateForm) => {
    try {
      localStorage.setItem('last_challenge', JSON.stringify(newChallenge));
      dispatch(addChallenge(newChallenge));
      await createChallenge({ dataAdd: newChallenge }).unwrap();
    } catch (error) {
      console.error('Failed to add challenge:', error);
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
    await addNewChallenge(data);
    console.log(data);
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

          const { label, placeholder, type, isShort = true, ...fieldRules } = normalizedConfig;
          return (
            <div key={fieldName} className={styles.inputWrapper}>
              <label className={styles.label}>{label}</label>
              <input
                //id='goal'
                autoComplete='off'
                placeholder={placeholder}
                className={!isShort ? `${styles.input}` : `${styles.input} ${styles.input_short}  `}
                type={type}
                {...register(fieldName as keyof TCreateForm, {
                  required: fieldRules.required,
                  validate: fieldRules.validate || {},
                  onBlur: () => handleValidation(fieldName as keyof TCreateForm).onBlur(),
                  onChange: () => handleValidation(fieldName as keyof TCreateForm).onChange(),
                })}
              />
              {errors[fieldName as keyof TCreateForm] && (
                <p className={styles.error}>{errors[fieldName as keyof TCreateForm]?.message}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* WITHOUT MAP */}

      <div className={styles.rowWrapper}>
        <Button type='button' text={'Back'} color='black' onClick={() => router.back()} />
        <Button
          type='submit'
          text={'Create'}
          color='default'
          //disabled={!isValid}
          //onClick={() => router.push("/challenges")}
        />
      </div>
    </form>
  );
}
