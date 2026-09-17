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

export function useAuth() {
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectAuthToken);
  const user = useAppSelector(selectCurrentUser);
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsAuthLoading);

  // Got it!! hack a little
  const login = (credentials: LoginCredentials) => dispatch(loginThunk(credentials)).unwrap();

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