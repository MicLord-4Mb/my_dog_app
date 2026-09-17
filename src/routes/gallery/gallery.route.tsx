import {ProtectedRoute} from "@/components/auth/ProtectedRoute";
import { GalleryLayout } from '@/components/gallery/views/GalleryLayout';
import { ROUTES } from '@/constants/routes';
import { GalleryErrorBoundary } from '@/routes/gallery/gallery.error';
import {
  galleryLoader,
  galleryIndexLoader,
  breedDetailLoader,
  breedGridLoader,
} from '@/routes/gallery/gallery.loader';
import type { RouteObject } from 'react-router';

/**
 * Modular route configuration for the Gallery feature (`/gallery/*`).
 *
 * Encapsulates:
 * - `loader`: Redux-integrated data retrieval via `fetchBreeds()` thunk.
 * - `errorElement`: Scoped error boundary that preserves the outer application shell.
 * - `element`: `GalleryLayout` providing ambient visual wrapper and nested `<Outlet />`.
 * - `children`:
 *   - `/gallery`: Index route — redirects to the first breed detail page via `galleryIndexLoader`.
 *   - `/gallery/breed/:id`: Mounts `BreedDetailView` displaying the specified breed.
 *   - `/gallery/grid`: Mounts `BreedGrid` displaying the multi-column searchable catalog.
 */
export const galleryRoute: RouteObject = {
  path: ROUTES.GALLERY,
  id: ROUTES.GALLERY,
  loader: galleryLoader,
  errorElement: <GalleryErrorBoundary />,
  element: (
    <ProtectedRoute>
      <GalleryLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      loader: galleryIndexLoader,
      lazy: async () => {
        const { BreedDetailView } = await import('@/components/gallery/views/BreedDetailView');
        return { Component: BreedDetailView };
      }
    },
    {
      path: ROUTES.GALLERY_CHILDREN.BREED,
      loader: breedDetailLoader,
      lazy: async () => {
        const { BreedDetailView } = await import('@/components/gallery/views/BreedDetailView');
        return { Component: BreedDetailView };
      }
    },
    {
      path: ROUTES.GALLERY_CHILDREN.GRID,
      loader: breedGridLoader,
      lazy: async () => {
        const { BreedGrid } = await import('@/components/gallery/views/BreedGrid');
        return { Component: BreedGrid };
      }
    },
  ],
};
