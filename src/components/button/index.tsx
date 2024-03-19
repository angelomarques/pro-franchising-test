import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, children, ...props }: Props) => {
  return (
    <button className={clsx(styles.container, className)} {...props}>
      {children}
    </button>
  );
};
