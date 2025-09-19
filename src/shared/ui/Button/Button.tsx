import { cn } from "@/shared/lib";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";
import Spinner from "../Spinner/Spinner";

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
  fullWidth?: boolean;
  isLoading?: boolean;
}

function Button({
  children,
  disabled = false,
  size = "sm",
  form = "pill",
  theme = "primary",
  fullWidth = false,
  isLoading = false,
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
          [styles.fullWidth]: fullWidth,
          [styles.isLoading]: isLoading,
        }
      )}
    >
      {isLoading && <Spinner size="sm" theme="secondary" />}
      {children}
    </button>
  );
}

export default Button;
