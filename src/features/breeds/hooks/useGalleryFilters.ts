import { useSearchParams } from 'react-router';

/**
 * Custom hook to synchronize and manage URL query parameters for gallery filtering.
 * 
 * Manages:
 * - `group`: Active breed group category (`?group=Hound`).
 * - `q`: Search keyword query (`?q=terrier`).
 * - `page`: Current pagination page number (`?page=2`).
 * 
 * Automatically resets `page` back to 1 upon changing group or search query.
 * 
 * @returns Filter values and updater functions.
 */
export function useGalleryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const group = searchParams.get('group');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('q') || '';

  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  /**
   * Sets or clears the active breed group filter in URL search params.
   * 
   * @param newGroup - Group name to set or `null` to clear.
   */
  const setGroup = (newGroup: string | null) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newGroup) {
      nextParams.set('group', newGroup);
    } else {
      nextParams.delete('group');
    }
    nextParams.delete('page'); // Reset to page 1 on filter change
    setSearchParams(nextParams);
  };

  /**
   * Sets or clears the search query string in URL search params.
   * 
   * @param newQuery - Keyword string to filter by.
   */
  const setSearchQuery = (newQuery: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newQuery.trim()) {
      nextParams.set('q', newQuery.trim());
    } else {
      nextParams.delete('q');
    }
    nextParams.delete('page'); // Reset to page 1 on search change
    setSearchParams(nextParams);
  };

  /**
   * Sets the active page number and smoothly scrolls window to the top.
   * 
   * @param newPage - 1-based page index.
   */
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

  /**
   * Resets all search parameters, clearing search, group, and page.
   */
  const resetFilters = () => {
    const nextParams = new URLSearchParams();
    setSearchParams(nextParams);
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
