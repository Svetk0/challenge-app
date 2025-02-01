import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Input } from '@/components/';
import { setAuthToken } from '@/utils/auth';
import styles from './authForm.module.scss';

type AuthFormProps = {
  onAuthSuccess: (id: string) => void;
};

type FormInputs = {
  auth_id_input: number;
};

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const authId = String(data.auth_id_input);
    setAuthToken(authId);
    onAuthSuccess(authId);
    reset();
  };

  return (
    <form className={styles.formId} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder={'type your id'} type={'number'} {...register('auth_id_input')} />
      <Button type='submit' text={'Submit'} color='default' />
    </form>
  );
}
