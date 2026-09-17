import type { RequestState } from "@/types/request.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface UserSliceState {
  request: RequestState<AuthUser>;
}

export interface TokenSliceState {
  token: string | null;
}
