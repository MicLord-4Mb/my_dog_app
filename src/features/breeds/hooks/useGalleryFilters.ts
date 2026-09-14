import { useSearchParams } from 'react-router';

/**
 * Return contract for the `useGalleryFilters` custom hook.
 */
export interface GalleryFiltersState {
  /** Active breed group name or `null` if unselected / all. */
  group: string | null;
  /** Current 1-based pagination page index. */
  currentPage: number;
  /** Active search query term. */
  searchQuery: string;
  /** Updates the active group in URL search params. Resets page to 1. */
  setGroup: (newGroup: string | null) => void;
  /** Updates the active search query in URL search params. Resets page to 1. */
  setSearchQuery: (newQuery: string) => void;
  /** Updates the active page parameter in URL search params. */
  setPage: (newPage: number) => void;
  /** Resets all URL query parameters to their initial default state. */
  resetFilters: () => void;
}

/**
 * Custom React hook that enforces URL as the Single Source of Truth for gallery filtering, searching, and pagination.
 * 
 * Synchronizes the UI state directly with browser search parameters (`?group=...&q=...&page=...`).
 * Changes to group or search query automatically reset the active page index to 1.
 * 
 * @returns {GalleryFiltersState} Object containing filter parameters and updater methods.
 */
export function useGalleryFilters(): GalleryFiltersState {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawGroup = searchParams.get('group');
  const group = rawGroup && rawGroup.trim() !== '' ? rawGroup : null;

  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const searchQuery = searchParams.get('q') || '';

  const setGroup = (newGroup: string | null) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newGroup && newGroup.trim() !== '') {
      nextParams.set('group', newGroup.trim());
    } else {
      nextParams.delete('group');
    }
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const setSearchQuery = (newQuery: string) => {
    const nextParams = new URLSearchParams(searchParams);
    const trimmed = newQuery.trim();
    if (trimmed) {
      nextParams.set('q', trimmed);
    } else {
      nextParams.delete('q');
    }
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const setPage = (newPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newPage > 1) {
      nextParams.set('page', String(newPage));
    } else {
      nextParams.delete('page');
    }
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    group,
    currentPage,
    searchQuery,
    setGroup,
    setSearchQuery,
    setPage,
    resetFilters,
  };
}
