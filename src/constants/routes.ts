/**
 * Application route path constants for React Router.
 */
export const ROUTES = {
  /** Landing / Home page */
  HOME: '/',
  /** Single breed view page */
  GALLERY: '/gallery',
  /** Direct link to specific breed details */
  GALLERY_BREED: '/gallery/breed/:id',
  /** Catalog grid view */
  GALLERY_GRID: '/gallery/grid',
  /** Catch-all 404 page */
  NOT_FOUND: '*',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Builds a dynamic path for a specific breed detail page.
 * 
 * @param id - The breed ID.
 * @param group - Optional breed group filter to preserve in the URL.
 * @returns The formatted path string.
 */
export const buildBreedPath = (id: string, group?: string | null): string => {
  const path = `/gallery/breed/${id}`;
  if (group) {
    return `${path}?group=${encodeURIComponent(group)}`;
  }
  return path;
};
