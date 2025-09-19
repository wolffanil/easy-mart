import type { UnknownAction } from "@reduxjs/toolkit";
import type { User } from "../../types/UserSchema";
import { LOCAL_STORAGE_USER_KEY } from "@/shared/config";
import { userActions } from "../../slice/userSlice";

export const applyUserSession = (
  user: User,
  dispatch: (action: UnknownAction) => unknown
) => {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  dispatch(userActions.setUserData(user));
};
