import { lazy } from "react";

export const RegisterPageAsync = lazy(
  () =>
    new Promise((res) => {
      //@ts-ignore
      setTimeout(() => res(import("./RegisterPage")), 1500);
    })
);
