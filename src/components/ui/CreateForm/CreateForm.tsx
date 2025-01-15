'use client';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { addChallenge } from '@/lib/features/challenges/challengeSlice';

import { TCreateForm } from '@/types';
import staticData from '@/constants/data.json';

import Button from '@/components/ui/Button/Button';

import styles from './createForm.module.scss';

export default function CreateForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const dt = staticData.challenge_form;
  //const [_description, setDescription] = useState('');
  const [startedDate, _setStartedDate] = useState('');
  const addNewChallenge = (newChallenge: TCreateForm) => {
    localStorage.setItem('last_challenge', JSON.stringify(newChallenge));
    dispatch(addChallenge(newChallenge));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    getValues,
    clearErrors,
  } = useForm<TCreateForm>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<TCreateForm> = (data) => {
    //setdescription(data.description.trimStart());
    addNewChallenge(data);
    console.log(data);
    reset();
    router.push('/challenges');
  };

  const handleValidation = (fieldName: keyof TCreateForm) => ({
    onBlur: () => trigger(fieldName),
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
        <div className={styles.inputWrapper}>
          <label htmlFor='description' className={styles.label}>
            {dt.name.label}
          </label>
          <textarea
            className={styles.textarea}
            placeholder={dt.name.placeholder}
            id='description'
            {...register('description', {
              required: dt.name.require_message,
              validate: {
                minLength: (v) => v.trim().length >= 2 || dt.name.error_message,
                maxLength: (v) => v.length <= 50 || dt.name.error_message,
                noSpaces: (v) => v.trim().length > 0 || dt.name.error_message,
              },
              ...handleValidation('description'),
            })}
          />
          {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        </div>
        <div className={styles.rowWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor='goal' className={styles.label}>
              {dt.goal.label}
            </label>
            <input
              id='goal'
              placeholder={dt.goal.placeholder}
              className={`${styles.input} ${styles.input_short}`}
              type='number'
              {...register('goal', {
                required: dt.goal.require_message,
                validate: {
                  min: (v) => v >= 1 || dt.goal.error_message,
                },
                ...handleValidation('goal'),
              })}
            />
            {errors.goal && <p className={styles.error}>{errors.goal.message}</p>}
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor='period'>
              {dt.period.label}
            </label>

            <select
              id='period'
              defaultValue=''
              aria-describedby='period-error'
              className={`${styles.input} ${styles.input_short}`}
              {...register('period', {
                required: dt.period.require_message,

                ...handleValidation('period'),
              })}
            >
              {dt.period.time.map((value) => (
                <option key={value.value}>{value.value}</option>
              ))}
            </select>
            {errors.period && <p className={styles.error}>{errors.period.message}</p>}
          </div>
        </div>
        {/* description PERIOD */}
        <div className={styles.rowWrapper}>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor='started_at'>
              {dt.date_start.label}
            </label>

            <input
              className={`${styles.input} ${styles.input_short}`}
              aria-describedby='started_at-error'
              id='started_at'
              type='date'
              placeholder={dt.date_start.placeholder}
              defaultValue='' // Добавьте это
              {...register('started_at', {
                required: dt.date_start.require_message,
                validate: {
                  min: (v) => v >= '2010-01-01' || dt.date_start.error_message,
                },

                ...handleValidation('started_at'),
              })}
            />
            {errors.started_at && <p className={styles.error}>{errors.started_at.message}</p>}
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor='finished_at'>
              {dt.date_finish.label}
            </label>
            <input
              disabled={false}
              className={`${styles.input} ${styles.input_short}`}
              aria-describedby='finished_at-error'
              id='finished_at'
              type='date'
              {...register('finished_at', {
                required: dt.date_finish.require_message,
                validate: {
                  min: (v) => v > String(startedDate) || dt.date_finish.error_message,
                },
                ...handleValidation('finished_at'),
              })}
            />
            {errors.finished_at && <p className={styles.error}>{errors.finished_at.message}</p>}
          </div>
        </div>
      </div>
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
