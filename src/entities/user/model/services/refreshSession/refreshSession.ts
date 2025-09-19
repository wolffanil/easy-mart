import { httpClient } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../types/UserSchema";
import { LOCAL_STORAGE_USER_KEY } from "@/shared/config";
import { userActions } from "../../slice/userSlice";

export const refreshSession = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("user/refreshSession", async (_, thunkApi) => {
  try {
    const res = await httpClient.post<User>("/auth/refresh");
    const user = res.data;
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    thunkApi.dispatch(userActions.setUserData(user));
  } catch (error) {
    thunkApi.dispatch(userActions.clearUserData());
    return thunkApi.rejectWithValue("refresh value");
  }
});
