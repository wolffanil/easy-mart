import { useTheme } from "@/shared/config";
import { AppIcon, Button } from "@/shared/ui";

import CircleIcon from "@/shared/assets/icons/Circle.svg?react";

function ThemeSwitcher() {
  const { toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} theme="ghost">
      <AppIcon Icon={CircleIcon} filled />
    </Button>
  );
}

export default ThemeSwitcher;
