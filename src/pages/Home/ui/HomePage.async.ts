import { lazy } from "react";

export const HomePageAsync = lazy(
  () =>
    new Promise((res) => {
      //@ts-ignore
      setTimeout(() => res(import("./HomePage")), 1500);
    })
);
