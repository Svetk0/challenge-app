import { cn } from "@/utils";
import styles from "./button.module.scss";

type Props = {
  text: string;
  color: string;
  type: "submit" | "button";
  callback?: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  color,
  callback,
  type,
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      className={cn(styles.button, color && styles[color])}
      onClick={callback}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
