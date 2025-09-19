export const AppRoutes = {
  HOME: "home",
  LOGIN: "login",
  REGISTER: "register",
  NOT_FOUND: "not_found",
} as const;

type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTER]: "/register",
  [AppRoutes.NOT_FOUND]: "*",
};
