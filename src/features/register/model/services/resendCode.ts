import { extractErrorMessage, httpClient } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

type ResendArgs = {
  email?: string;
  phone?: string;
};

export const resendCode = createAsyncThunk<
  void,
  ResendArgs,
  { rejectValue: string }
>("features/resendCode", async (resendData, thunkApi) => {
  try {
    await httpClient.post("/auth/resend-code", resendData);

    return;
  } catch (error) {
    return thunkApi.rejectWithValue(extractErrorMessage(error));
  }
});
