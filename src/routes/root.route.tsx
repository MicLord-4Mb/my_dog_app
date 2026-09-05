import {galleryRoute} from "@/routes/gallery/gallery.route";
import {homeRoute} from "@/routes/home/home.route";
import {Outlet,  type RouteObject} from "react-router";
import {Layout} from "@/components/layout/Layout";
import {lazy, Suspense} from "react";
import {ROUTES} from "@/constants/routes";
import {PageLoader} from "@/components/common/PageLoader";
import {notFoundRoute} from "@/routes/not-found/not-found.route";

// Lazy loading route pages for code splitting and faster initial load
// const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
// const GalleryPage = lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const RootLayout = () => (
  <Layout>
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  </Layout>
)

export const rootRoute:RouteObject = {
  path: ROUTES.HOME,
  //TODO: refactor this
  Component: RootLayout,
  //TODO: change that page
  errorElement: <NotFoundPage />,
  HydrateFallback: PageLoader,
  children: [
    homeRoute,
    ...galleryRoute,
    notFoundRoute,

    // {
    //   path: ROUTES.HOME,
    //   element: <HomePage />,
    // },
    // {
    //   path:ROUTES.GALLERY,
    //   element:<GalleryPage />,
    //   loader: galleryLoader,
    //   errorElement: <GalleryErrorBoundary />,
    // },
    // {
    //   path:ROUTES.GALLERY_BREED,
    //   element:<GalleryPage />,
    //   loader: galleryLoader,
    //   errorElement: <GalleryErrorBoundary />,
    // },
    // {
    //   path:ROUTES.GALLERY_GRID,
    //   element:<GalleryPage />,
    //   loader: galleryLoader,
    //   errorElement: <GalleryErrorBoundary />,
    // },
    // {
    //   path:ROUTES.NOT_FOUND,
    //   element:<NotFoundPage />,
    // },
  ],
}