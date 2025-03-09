import { forwardRef } from 'react';
import { cn } from '@/shared/utils';
import styles from './Button.module.scss';

type ButtonProps = {
  text: React.ReactNode;
  color: string;
  type: 'submit' | 'button';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, color, onClick, type, disabled = false }, ref) => {
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type={type}
        className={cn(styles.button, color && styles[color])}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
);
Button.displayName = 'Button';
