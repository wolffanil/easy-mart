import { routePaths, AppRoutes } from "./router/routePaths";
import {
  Theme,
  ThemeContext,
  type ThemeType,
  LOCAL_STORAGE_THEME_KEY,
} from "./theme/ThemeContextProps";
import { useTheme } from "./theme/useTheme";
import {
  type SupportedLngsType,
  languageIconList,
} from "./i18n/LangaugeIconList";
import {
  type AuthProvidersType,
  AuthProviders,
  type AuthMethodType,
  AuthMethod,
  LOCAL_STORAGE_USER_KEY,
} from "./auth/auth";
import { API_URL } from "./api/api";

export {
  routePaths,
  AppRoutes,
  Theme,
  ThemeContext,
  AuthProviders,
  languageIconList,
  useTheme,
  LOCAL_STORAGE_THEME_KEY,
  LOCAL_STORAGE_USER_KEY,
  AuthMethod,
  API_URL,
  type AuthMethodType,
  type ThemeType,
  type SupportedLngsType,
  type AuthProvidersType,
};
