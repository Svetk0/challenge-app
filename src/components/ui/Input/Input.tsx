import { JSX } from "react";
import styles from "./input.module.scss";

export type InputProps = {
  tagType?: "input" | "textarea";
  label?: string;
} & JSX.IntrinsicElements["input"] &
  JSX.IntrinsicElements["textarea"];

const Input = (props: InputProps) => {
  const { tagType = "input", label, placeholder, type, ...rest } = props;

  return (
    <>
      <label className={styles.label}>
        {tagType === "input" ? (
          <input
            className={styles.input}
            autoComplete="on"
            placeholder={placeholder}
            type={type || "text"}
            {...rest}
          />
        ) : (
          <textarea
            className={styles.textarea}
            autoComplete="off"
            placeholder={placeholder}
            {...rest}
          />
        )}

        <p className="input_placeholder">{placeholder}</p>
      </label>
    </>
  );
};

export default Input;
