import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import {LINKS} from '@/constants/routes';

/**
 * Route configuration for `/favorites`.
 * Automatically redirects to the integrated catalog favorites filter view.
 */
export const favoritesRoute: RouteObject = {
  path: 'favorites',
  element: <Navigate to={LINKS.favorites()} replace />,
};
