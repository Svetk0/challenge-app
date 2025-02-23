'use client';
import { useRouter } from 'next/navigation';
//import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

//import { addChallenge } from '@/lib/features/challenges/challengeSlice';
import { useCreateChallengeMutation } from '@/api/content';
import { configValidation } from '@/shared/utils/configValidation';
import { TCreateForm } from '@/shared/types';

import staticData from '@/shared/constants/data.json';
import { Button, Input, Switcher } from '@/components';

import styles from './CCreateForm.module.scss';

export function CreateForm() {
  const dt = staticData.challenge_form;
  const router = useRouter();
  //const dispatch = useDispatch();
  const [_startedDate, _setStartedDate] = useState('');
  const [createChallenge] = useCreateChallengeMutation({});
  const [isSwitcher, setIsSwitcher] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const addNewChallenge = async (newChallenge: TCreateForm) => {
    setIsSubmitting(true);
    try {
      //dispatch(addChallenge(newChallenge));
      await createChallenge({ dataAdd: newChallenge }).unwrap();
    } catch (error) {
      console.error('Failed to add challenge:', error);
    } finally {
      setIsSubmitting(false);
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
    console.log(data);
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
