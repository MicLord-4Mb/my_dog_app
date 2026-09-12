import {ROUTES} from "@/constants/routes";
import type { RouteObject } from 'react-router';

export const notFoundRoute: RouteObject = {
  path: ROUTES.NOT_FOUND,
  lazy: async () => {
    const { NotFoundPage } = await import('@/components/not-found/NotFoundPage');
    return { Component: NotFoundPage };
  },
};
