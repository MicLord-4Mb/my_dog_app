import {ROUTES} from "@/constants/routes";
import {useAuth} from "@/features/auth/hooks/useAuth";
import type {ReactNode} from "react";
import {Navigate, useLocation} from "react-router";

interface GuestRouteProps {
  children: ReactNode;
}

/**
 * Route guard component that restricts access to unauthenticated users only.
 * Useful for login or registration pages. Redirects authenticated users back 
 * to their previous location or home page.
 * 
 * @param props - Component properties containing children.
 * @returns ReactNode with children or Navigate redirect.
 */
export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const fromPath = (location.state as { from?: { pathname: string } })?.from?.pathname || ROUTES.HOME;
    return <Navigate to={fromPath} replace />
  }

  return <>{children}</>;
}
