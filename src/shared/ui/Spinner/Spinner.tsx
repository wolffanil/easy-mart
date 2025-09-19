import { cn } from "@/shared/lib";
import styles from "./Spinner.module.scss";

type SpinnerSize = "lg" | "md" | "sm";
type SpinnerTheme = "primary" | "secondary";

interface SpinnerProps {
  size?: SpinnerSize;
  theme?: SpinnerTheme;
}

function Spinner({ size, theme }: SpinnerProps) {
  return (
    <div
      className={cn(styles.spinner, styles[theme ?? ""], styles[size ?? ""])}
    />
  );
}

export default Spinner;
