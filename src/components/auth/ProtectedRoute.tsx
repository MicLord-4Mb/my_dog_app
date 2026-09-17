import {ROUTES} from "@/constants/routes";
import {useAuth} from "@/features/auth/hooks/useAuth";
import type {ReactNode} from "react";
import {Navigate, useLocation} from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // for state lookup guestRoute component
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
