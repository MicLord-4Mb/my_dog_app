import {getStoredAuthSession} from "@/api/authApi";
import {REQUEST_STATUS} from "@/constants/status";
import {loginThunk, logoutThunk} from "@/features/auth/authThunks";
import type {AuthUser, UserSliceState} from "@/types/auth.types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import { logout as tokenLogoutAction } from "@/features/auth/tokenSlice"

const storedAuthSession = getStoredAuthSession();

const initialState: UserSliceState = {
  request: storedAuthSession.user
    ? { status: REQUEST_STATUS.SUCCESS, data: storedAuthSession.user, error: null }
    : { status: REQUEST_STATUS.IDLE, data: null, error: null }
};

/**
 * Redux slice managing the authenticated user's details and login request state.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      if (action.payload) {
        state.request = {
          status: REQUEST_STATUS.SUCCESS,
          data: action.payload,
          error: null,
        };
      } else {
        state.request = {
          status: REQUEST_STATUS.IDLE,
          data: null,
          error: null,
        };
      }
    },
    clearUser: (state) => {
      state.request = {
        status: REQUEST_STATUS.IDLE,
        data: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.request = {
          status: REQUEST_STATUS.LOADING,
          data: null,
          error: null,
        };
      })
      .addCase(loginThunk.fulfilled, (state, action ) => {
        state.request = {
          status: REQUEST_STATUS.SUCCESS,
          data: action.payload.user,
          error: null,
        };
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.request = {
          status: REQUEST_STATUS.ERROR,
          data: null,
          error: action.payload
            ?? { message: action.error.message ?? 'Login failed.' },
        };
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.request = {
          status: REQUEST_STATUS.IDLE,
          data: null,
          error: null,
        };
      })
      .addCase(tokenLogoutAction, (state) => {
        state.request = {
          status: REQUEST_STATUS.IDLE,
          data: null,
          error: null,
        };
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
