import {Outlet,  type RouteObject} from "react-router";
import { Loader2 } from "lucide-react";
import {Layout} from "@/components/layout/Layout.tsx";
import {lazy, Suspense} from "react";
import {ROUTES} from "@/constants/routes.ts";
import {galleryLoader} from "@/routes/gallery.loader.ts";
import {GalleryErrorBoundary} from "@/routes/gallery.error.tsx";

// Lazy loading route pages for code splitting and faster initial load
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

/**
 * Suspense fallback loading indicator while page chunk is being fetched.
 */
const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
    <p className="text-on-surface-variant font-medium">Loading page...</p>
  </div>
);

const RootLayout = () => (
  <Layout>
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  </Layout>
)

export const rootRoute:RouteObject = {
  element: <RootLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: ROUTES.HOME,
      element: <HomePage />,
    },
    {
      path:ROUTES.GALLERY,
      element:<GalleryPage />,
      loader: galleryLoader,
      errorElement: <GalleryErrorBoundary />,
    },
    {
      path:ROUTES.GALLERY_BREED,
      element:<GalleryPage />,
      loader: galleryLoader,
      errorElement: <GalleryErrorBoundary />,
    },
    {
      path:ROUTES.GALLERY_GRID,
      element:<GalleryPage />,
      loader: galleryLoader,
      errorElement: <GalleryErrorBoundary />,
    },
    {
      path:ROUTES.NOT_FOUND,
      element:<NotFoundPage />,
    },
  ],
}