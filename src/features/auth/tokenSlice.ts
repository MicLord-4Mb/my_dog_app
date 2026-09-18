import {getStoredAuthSession} from "@/api/authApi";
import {loginThunk, logoutThunk} from "@/features/auth/authThunks";
import type {TokenSliceState} from "@/types/auth.types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const storedAuthSession = getStoredAuthSession();

const initialState: TokenSliceState = {
  token: storedAuthSession.token,
};

/**
 * Redux slice managing the authentication token state.
 */
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null;
      });

  },
});

export const { setToken, logout } = tokenSlice.actions;
export default tokenSlice.reducer;