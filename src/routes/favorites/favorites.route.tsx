import {ProtectedRoute} from "@/components/auth/ProtectedRoute";
import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import {LINKS, FAVORITES_GROUP_KEY} from '@/constants/routes';

/**
 * Route configuration for `/favorites`.
 * Automatically redirects to the integrated catalog favorites filter view.
 */
export const favoritesRoute: RouteObject = {
  path: FAVORITES_GROUP_KEY,
  element: (
    <ProtectedRoute>
      <Navigate to={LINKS.favorites()} replace />
    </ProtectedRoute>
  ),
};
