import {GuestRoute} from "@/components/auth/GuestRoute";
import {ROUTE_SEGMENTS} from "@/constants/routes";
import type {RouteObject} from "react-router";

/**
 * Route configuration for the login page.
 * Uses `GuestRoute` to redirect already authenticated users away from the login page.
 */
export const loginRoute: RouteObject = {
  path: ROUTE_SEGMENTS.LOGIN,
  lazy: async () => {
    const { LoginPage } = await import('@/components/auth/LoginPage');
    return {
      Component: () => (
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      ),
    };
  },
};
