import {ProtectedRoute} from "@/components/auth/ProtectedRoute";
import {ROUTES} from "@/constants/routes";
import type {RouteObject} from "react-router";

/**
 * Route configuration for the user profile page.
 * Uses `ProtectedRoute` to ensure only authenticated users can access the route.
 */
export const profileRoute: RouteObject = {
  path: ROUTES.PROFILE,
  lazy: async () => {
    const { ProfilePage } = await import('@/components/auth/ProfilePage');
    return {
      Component: () => (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    };
  },
};