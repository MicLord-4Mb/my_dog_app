import {RootErrorBoundary} from "@/components/layout/RootErrorBoundary";
import {favoritesRoute} from "@/routes/favorites/favorites.route";
import { galleryRoute } from "@/routes/gallery/gallery.route";
import { homeRoute } from "@/routes/home/home.route";
import type { RouteObject } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { ROUTES } from "@/constants/routes";
import { PageLoader } from "@/components/common/PageLoader";
import { notFoundRoute } from "@/routes/not-found/not-found.route";


export const rootRoute:RouteObject = {
  path: ROUTES.HOME,
  element: <Layout />,
  errorElement: <RootErrorBoundary />,
  HydrateFallback: PageLoader,
  children: [
    homeRoute,
    galleryRoute,
    favoritesRoute,
    notFoundRoute,
  ],
}