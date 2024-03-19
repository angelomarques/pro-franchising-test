import { InputHTMLAttributes, forwardRef } from "react";

import styles from "./input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <label className={styles.container}>
        {label ? label : null}
        <input {...props} ref={ref} />

        {error ? <p className="error">{error}</p> : error}
      </label>
    );
  }
);
