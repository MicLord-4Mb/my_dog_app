import {ROUTES} from "@/constants/routes";
import {useAuth} from "@/features/auth/hooks/useAuth";
import type {ReactNode} from "react";
import {Navigate, useLocation} from "react-router";

interface GuestRouteProps {
  children: ReactNode;
}

/**
 * Route guard for pages only for guest (ex. /signin).
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
