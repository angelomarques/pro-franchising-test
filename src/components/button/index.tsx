import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = ({
  variant = "default",
  className,
  children,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(styles.container, className, {
        [styles.default]: variant === "default",
        [styles.outline]: variant === "outline",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
