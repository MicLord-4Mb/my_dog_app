import {clearStoredAuthSession, loginUserApi} from "@/api/authApi";
import type {ApiError} from "@/types/api.types";
import type {LoginCredentials, LoginResponse} from "@/types/auth.types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: ApiError }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginUserApi(credentials);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      return rejectWithValue({message});
    }
  });

export const logoutThunk = createAsyncThunk<void,void>(
  'auth/logout',
  async () => {
    clearStoredAuthSession();
  });
