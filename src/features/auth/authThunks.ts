import {clearStoredAuthSession, loginUserApi} from "@/api/authApi";
import type {ApiError} from "@/types/api.types";
import type {LoginCredentials, LoginResponse} from "@/types/auth.types";
import {createAsyncThunk} from "@reduxjs/toolkit";

/**
 * Asynchronous thunk to handle user login.
 * Dispatches pending/fulfilled/rejected actions based on the API response.
 */
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

/**
 * Asynchronous thunk to handle user logout.
 * Clears stored session data and resets related state slices.
 */
export const logoutThunk = createAsyncThunk<void,void>(
  'auth/logout',
  async () => {
    clearStoredAuthSession();
  });
