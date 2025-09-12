import { useContext } from "react";
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
  type ThemeType,
} from "./ThemeContextProps";

interface useThemeReturn {
  theme?: ThemeType;
  toggleTheme: () => void;
}

export function useTheme(): useThemeReturn {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.PINK ? Theme.BLUE : Theme.PINK;
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme, toggleTheme };
}
