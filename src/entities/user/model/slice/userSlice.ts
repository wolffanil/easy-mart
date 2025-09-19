import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserSchema } from "../types/UserSchema";
import { LOCAL_STORAGE_USER_KEY } from "@/shared/config";

const initialState: UserSchema = {
  userData: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = undefined;
    },
    initUserData: (state) => {
      const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

      if (user) {
        try {
          console.log(JSON.parse(user));
          state.userData = JSON.parse(user);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
