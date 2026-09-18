import {ROUTES} from "@/constants/routes";
import {useAuth} from "@/features/auth/hooks/useAuth";
import type {ReactNode} from "react";
import {Navigate, useLocation} from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Route guard component that restricts access to authenticated users only.
 * Redirects unauthenticated users to the login page while preserving their 
 * intended destination via location state.
 * 
 * @param props - Component properties containing children to protect.
 * @returns ReactNode with children or Navigate redirect.
 */
export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // for state lookup guestRoute component
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
