import { cn } from '@/utils';
import styles from './button.module.scss';

type Props = {
  text: React.ReactNode;
  color: string;
  type: 'submit' | 'button';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

export function Button({ text, color, onClick, type, disabled = false }: Props) {
  return (
    <button
      type={type}
      className={cn(styles.button, color && styles[color])}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
