import {ProtectedRoute} from "@/components/auth/ProtectedRoute";
import {ROUTES} from "@/constants/routes";
import type {RouteObject} from "react-router";

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