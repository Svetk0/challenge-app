import { cn } from "@/utils";
import styles from "./button.module.scss";

type Props = {
  text: string;
  color: string;
  type: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  color,
  onClick,
  type,
  disabled = false,
}: Props) {
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
