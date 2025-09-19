import { cn } from "@/shared/lib";
import {
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import styles from "./Input.module.scss";
import Button from "../Button/Button";
import HideIcon from "@/shared/assets/icons/Hide.svg?react";
import ShowIcon from "@/shared/assets/icons/Show.svg?react";

export type HTMLInputType = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
>;

export interface InputProps extends HTMLInputType {
  className?: string;
  value?: string;
  disabled?: boolean;
  rounded?: boolean;
  Icon?: ReactNode;
  onChange?: (value: string) => void;
  error?: boolean;
  label?: string;
  labelId?: string;
  ref?: Ref<HTMLInputElement>;
}

function Input({
  className,
  value,
  onChange,
  disabled = false,
  rounded = false,
  error = false,
  label,
  ref,
  Icon,
  id,
  type = "text",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [focus, setFocus] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <>
      {label && id && (
        <label
          htmlFor={id}
          className={cn(styles.label, {
            [styles.error]: error,
          })}
        >
          {label}
        </label>
      )}
      <div
        className={cn(styles.inputContainer, className, {
          [styles.rounded]: rounded,
          [styles.disabled]: disabled,
          [styles.focus]: focus,
          [styles.error]: error,
        })}
      >
        {Icon}
        <input
          type={showPassword && type === "password" ? "text" : type}
          ref={ref}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id={id}
          className={cn(styles.input, {
            [styles.disabled]: disabled,
            [styles.error]: error,
          })}
          {...rest}
        />
        {type === "password" && (
          <Button
            theme="ghost"
            type="button"
            className={styles.toggleVisibility}
            onClick={toggleShowPassword}
          >
            {showPassword ? <ShowIcon /> : <HideIcon />}
          </Button>
        )}
      </div>
    </>
  );
}

export default Input;
