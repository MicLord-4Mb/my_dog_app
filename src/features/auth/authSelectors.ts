import {REQUEST_STATUS} from "@/constants/status";
import type {RootState} from "@/store";

export const selectAuthToken = (state: RootState): string | null => state.token.token;

export const selectCurrentUser = (state: RootState) => state.user.request.data;

export const selectAuthStatus = (state: RootState) => state.user.request.status;

export const selectAuthError = (state: RootState) => state.user.request.error;

export const selectIsAuthenticated = (state: RootState): boolean => {
  const token = state.token.token;
  return Boolean(token);
};

export const selectIsAuthLoading = (state: RootState): boolean =>
  state.user.request.status === REQUEST_STATUS.LOADING;