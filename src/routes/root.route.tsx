import {favoritesRoute} from "@/routes/favorites/favorites.route";
import { galleryRoute } from "@/routes/gallery/gallery.route";
import { homeRoute } from "@/routes/home/home.route";
import type { RouteObject } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { lazy } from "react";
import { ROUTES } from "@/constants/routes";
import { PageLoader } from "@/components/common/PageLoader";
import { notFoundRoute } from "@/routes/not-found/not-found.route";

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export const rootRoute:RouteObject = {
  path: ROUTES.HOME,
  element: <Layout />,
  //TODO: change that page
  errorElement: <NotFoundPage />,
  HydrateFallback: PageLoader,
  children: [
    homeRoute,
    galleryRoute,
    favoritesRoute,
    notFoundRoute,
  ],
}