import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

type InputProps = {
  tagType?: 'input' | 'textarea' | 'select';
  label?: string;
  error?: string;
  isDisabled?: boolean;
  options?: { value: string }[];
  registration?: UseFormRegisterReturn;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  'ref'
>;

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>(
  (
    {
      tagType = 'input',
      label,
      error,
      options,
      isDisabled = false,
      registration,
      className,
      ...rest
    },
    ref
  ) => {
    const renderField = () => {
      switch (tagType) {
        case 'textarea':
          return (
            <textarea
              ref={ref as React.RefObject<HTMLTextAreaElement>}
              className={`${styles.textarea} ${className || ''}`}
              {...registration}
              {...rest}
            />
          );
        case 'select':
          return (
            <select
              ref={ref as React.RefObject<HTMLSelectElement>}
              className={`${styles.input} ${styles.input_short}`}
              {...registration}
              {...rest}
            >
              <option value='' disabled>
                {rest.placeholder}
              </option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          );
        default:
          return (
            <input
              ref={ref as React.RefObject<HTMLInputElement>}
              className={
                isDisabled
                  ? `${styles.input} ${styles.input_short} ${styles.input_disabled}`
                  : `${styles.input} ${styles.input_short}`
              }
              {...registration}
              {...rest}
            />
          );
      }
    };

    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.label}>{label}</label>}
        {renderField()}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
