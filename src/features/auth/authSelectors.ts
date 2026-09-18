import {REQUEST_STATUS} from "@/constants/status";
import type {RootState} from "@/store";

/**
 * Retrieves the current authentication token from the state.
 */
export const selectAuthToken = (state: RootState): string | null => state.token.token;

/**
 * Retrieves the currently authenticated user details.
 */
export const selectCurrentUser = (state: RootState) => state.user.request.data;

/**
 * Retrieves the status of the current authentication request.
 */
export const selectAuthStatus = (state: RootState) => state.user.request.status;

/**
 * Retrieves any errors that occurred during authentication.
 */
export const selectAuthError = (state: RootState) => state.user.request.error;

/**
 * Checks if the user is currently authenticated by verifying token presence.
 */
export const selectIsAuthenticated = (state: RootState): boolean => {
  const token = state.token.token;
  return Boolean(token);
};

/**
 * Checks if an authentication request is currently in progress.
 */
export const selectIsAuthLoading = (state: RootState): boolean =>
  state.user.request.status === REQUEST_STATUS.LOADING;