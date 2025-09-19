import { AuthMethod, type AuthMethodType } from "@/shared/config";
import {
  FormSteps,
  type FormStepsType,
  type RegisterFormSchema,
} from "../types/registerForm";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { register } from "../services/register";

const initialState: RegisterFormSchema = {
  email: "",
  phone: "",
  password: "",
  isLoading: false,
  method: AuthMethod.EMAIL,
  step: FormSteps.CREDENTIALS,
  error: undefined,
};

export const registerSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setMethod: (state, action: PayloadAction<AuthMethodType>) => {
      state.method = action.payload;
    },
    setStep: (state, action: PayloadAction<FormStepsType>) => {
      state.step = action.payload;
    },
    resetForm: (state) => {
      state.email = "";
      state.phone = "";
      state.password = "";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
