import {loginThunk, logoutThunk} from "@/features/auth/authThunks";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {
  selectAuthError,
  selectAuthStatus,
  selectAuthToken,
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAuthLoading,
} from "@/features/auth/authSelectors";
import type {LoginCredentials} from "@/types/auth.types";

/**
 * Custom React hook for accessing user authentication state and operations.
 * Abstracts Redux slice selectors and dispatching for login/logout thunks.
 *
 * @returns Object containing current auth state, loading status, and `login`/`logout` methods.
 */
export function useAuth() {
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectAuthToken);
  const user = useAppSelector(selectCurrentUser);
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsAuthLoading);

  /**
   * Dispatches the login thunk and unwraps the promise to handle errors locally.
   *
   * @param credentials - Email and password to authenticate.
   * @returns A promise resolving to the login response payload.
   */
  const login = (credentials: LoginCredentials) => dispatch(loginThunk(credentials)).unwrap();

  /**
   * Dispatches the logout thunk to clear session and state.
   */
  const logout = () => dispatch(logoutThunk());

  return {
    token,
    user,
    status,
    error,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}