import { cn } from "@/shared/config/lib";
import type { FunctionComponent, SVGProps } from "react";
import styles from "./AppIcon.module.scss";

type AppIconTheme = "clean" | "background";

interface AppIconProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  theme?: AppIconTheme;
  size?: number;
  className?: string;
  filled?: boolean;
}

function AppIcon({
  Icon,
  className,
  theme = "clean",
  size = 24,
  filled = false,
}: AppIconProps) {
  const AppIcon = (
    <Icon
      width={size}
      height={size}
      className={cn(styles.icon, className, {
        [styles.filled]: filled,
      })}
    />
  );

  if (theme === "background") {
    return <div className={styles.wrapper}>{AppIcon}</div>;
  }

  return AppIcon;
}

export default AppIcon;
