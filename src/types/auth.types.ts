import type { RequestState } from "@/types/request.types";

/**
 * Credentials required for user authentication.
 */
export interface LoginCredentials {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
}

/**
 * Represents an authenticated user in the system.
 */
export interface AuthUser {
  /** Unique user identifier */
  id: string;
  /** User's email address */
  email: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** Role determining access permissions */
  role: 'user' | 'admin';
}

/**
 * Expected response payload from a successful login request.
 */
export interface LoginResponse {
  /** JWT or similar authentication token */
  token: string;
  /** Authenticated user details */
  user: AuthUser;
}

/**
 * State structure for the user slice in the Redux store.
 */
export interface UserSliceState {
  /** Request state wrapper for the authenticated user data */
  request: RequestState<AuthUser>;
}

/**
 * State structure for the token slice in the Redux store.
 */
export interface TokenSliceState {
  /** Currently active authentication token, or null if unauthenticated */
  token: string | null;
}
