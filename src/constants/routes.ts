/**
 * Individual URL path segment constants.
 * Used to compose absolute and relative route paths without hardcoded strings.
 */
export const ROUTE_SEGMENTS = {
  GALLERY: 'gallery',
  GRID: 'grid',
  BREED: 'breed/:id',
} as const;

/**
 * Application route path patterns.
 * Provides a single source of truth for all absolute URLs and nested relative segments.
 */
export const ROUTES = {
  HOME: '/',
  GALLERY: `/${ROUTE_SEGMENTS.GALLERY}`,
  GALLERY_GRID: `/${ROUTE_SEGMENTS.GALLERY}/${ROUTE_SEGMENTS.GRID}`,
  GALLERY_BREED: `/${ROUTE_SEGMENTS.GALLERY}/${ROUTE_SEGMENTS.BREED}`,

  /** Relative route paths for nested child routes in React Router */
  GALLERY_CHILDREN: {
    GRID: ROUTE_SEGMENTS.GRID,
    BREED: ROUTE_SEGMENTS.BREED,
  },
} as const;

export type RoutePattern =
  | typeof ROUTES.HOME
  | typeof ROUTES.GALLERY
  | typeof ROUTES.GALLERY_GRID
  | typeof ROUTES.GALLERY_BREED;

const getGroupQuery = (group?: string | null) => {
  const targetGroup = group && group.trim() !== '' ? group.trim() : 'all';
  return `?group=${encodeURIComponent(targetGroup)}`;
};

export const LINKS = {
  home: () => ROUTES.HOME,

  gallery: () => ROUTES.GALLERY,

  grid: (group?: string | null) =>
    `${ROUTES.GALLERY_GRID}${getGroupQuery(group)}` as const,

  favorites: () =>
    `${ROUTES.GALLERY_GRID}?group=favorites` as const,

  breed: (id: string, group?: string | null) =>
    `${ROUTES.GALLERY_BREED.replace(':id', encodeURIComponent(id))}${getGroupQuery(group)}` as const,
} as const;

export type AppUrl = ReturnType<(typeof LINKS)[keyof typeof LINKS]>;
