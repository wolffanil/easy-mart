import { cn } from "@/shared/config/lib";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonsSize = "xs" | "sm" | "md" | "lg";
type ButtonForm = "rounded" | "pill" | "circle";
type ButtonTheme = "primary" | "secondary" | "tertiary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  size?: ButtonsSize;
  form?: ButtonForm;
  theme?: ButtonTheme;
  disabled?: boolean;
}

function Button({
  children,
  disabled = false,
  size = "sm",
  form = "pill",
  theme = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(
        styles.button,
        className,
        styles[size],
        styles[form],
        styles[theme],
        {
          [styles.disabled]: disabled,
        }
      )}
    >
      {children}
    </button>
  );
}

export default Button;
