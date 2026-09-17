import {GuestRoute} from "@/components/auth/GuestRoute";
import {ROUTE_SEGMENTS} from "@/constants/routes";
import type {RouteObject} from "react-router";

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
