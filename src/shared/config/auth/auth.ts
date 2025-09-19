export const AuthProviders = {
  LOCAL: "LOCAL",
  GOOGLE: "GOOGLE",
} as const;

export type AuthProvidersType =
  (typeof AuthProviders)[keyof typeof AuthProviders];

export const AuthMethod = {
  EMAIL: "email",
  PHONE: "phone",
} as const;

export const LOCAL_STORAGE_USER_KEY = "user";

export type AuthMethodType = (typeof AuthMethod)[keyof typeof AuthMethod];
