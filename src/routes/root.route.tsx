import type { RouteObject } from 'react-router';
import { RootErrorBoundary } from '@/components/layout/RootErrorBoundary';
import { booksRoute } from '@/routes/books/books.route';
import { favoritesRoute } from '@/routes/favorites/favorites.route';
import { galleryRoute } from '@/routes/gallery/gallery.route';
import { homeRoute } from '@/routes/home/home.route';
import { notFoundRoute } from '@/routes/not-found/not-found.route';
import { Layout } from '@/components/layout/Layout';
import { ROUTES } from '@/constants/routes';
import { PageLoader } from '@/components/common/PageLoader';

/**
 * Root Route configuration for the application.
 * 
 * Provides:
 * - Ambient application shell layout (`<Layout />`).
 * - Global error boundary fallback (`<RootErrorBoundary />`).
 * - Suspense / Hydration loader (`<PageLoader />`).
 * - Child routes hierarchy (`home`, `gallery`, `favorites`, `notFound`).
 */
export const rootRoute: RouteObject = {
  path: ROUTES.HOME,
  element: <Layout />,
  errorElement: <RootErrorBoundary />,
  HydrateFallback: PageLoader,
  children: [
    homeRoute,
    galleryRoute,
    booksRoute,
    favoritesRoute,
    notFoundRoute,
  ],
};