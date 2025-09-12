import { cn } from "@/shared/config/lib";
import {
  useState,
  type ChangeEvent,
  type EventHandler,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Input.module.scss";
import Button from "../Button/Button";
import HideIcon from "@/shared/assets/icons/Hide.svg?react";
import ShowIcon from "@/shared/assets/icons/Show.svg?react";

type HTMLInputType = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

interface InputProps extends HTMLInputType {
  className?: string;
  value?: string;
  disabled?: boolean;
  rounded?: boolean;
  Icon?: ReactNode;
  onChange?: (value: string) => void;
}

function Input({
  className,
  value,
  onChange,
  disabled = false,
  rounded = false,
  Icon,
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
    <div
      className={cn(styles.inputContainer, className, {
        [styles.rounded]: rounded,
        [styles.disabled]: disabled,
        [styles.focus]: focus,
      })}
    >
      {Icon}
      <input
        type={showPassword && type === "password" ? "text" : type}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(styles.input, {
          [styles.disabled]: disabled,
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
          {showPassword ? <HideIcon /> : <ShowIcon />}
        </Button>
      )}
    </div>
  );
}

export default Input;
