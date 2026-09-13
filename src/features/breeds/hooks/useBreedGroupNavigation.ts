import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { autoselectFirstInGroup } from '@/features/breeds/breedSlice';
import { selectAllBreedsArray } from '@/features/breeds/breedSelectors';
import { selectFavoritesSet } from '@/features/favorites/favoritesSelectors';
import { isBreedInGroup } from '@/lib/breedUtils';
import { useGalleryFilters } from '@/features/breeds/hooks/useGalleryFilters';
import { FAVORITES_GROUP_KEY, LINKS } from '@/constants/routes';

/**
 * Return contract for the `useBreedGroupNavigation` hook.
 */
export interface BreedGroupNavigationReturn {
  /**
   * Navigates to the first breed in the specified group.
   * Dispatches `autoselectFirstInGroup` and performs a React Router navigation.
   * Falls back to URL-only group update if no matching breeds are found.
   *
   * @param group - Target group name, or `null` to reset to all breeds.
   */
  navigateToGroup: (group: string | null) => void;
}

/**
 * Custom hook encapsulating breed group navigation logic.
 *
 * Responsibilities:
 * - Resolves the first breed ID within the target group (including favorites).
 * - Dispatches Redux `autoselectFirstInGroup` action.
 * - Navigates to the breed detail route or falls back to URL group update.
 *
 * Extracted from `BreedSelect` to enable reuse across detail and grid views.
 *
 * @returns {BreedGroupNavigationReturn} Object containing the `navigateToGroup` handler.
 */
export function useBreedGroupNavigation(): BreedGroupNavigationReturn {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allBreeds = useAppSelector(selectAllBreedsArray);
  const favoritesSet = useAppSelector(selectFavoritesSet);
  const { setGroup } = useGalleryFilters();

  const navigateToGroup = useCallback((group: string | null) => {
    dispatch(autoselectFirstInGroup(group));

    let firstBreedId: string | null = null;

    if (group === FAVORITES_GROUP_KEY) {
      firstBreedId = allBreeds.find((b) => favoritesSet.has(b.id))?.id ?? null;
    } else if (group) {
      firstBreedId = allBreeds.find((b) => isBreedInGroup(b, group))?.id ?? null;
    } else if (allBreeds.length > 0) {
      firstBreedId = allBreeds[0].id;
    }

    if (firstBreedId) {
      navigate(LINKS.breed(firstBreedId, group));
    } else {
      setGroup(group);
    }
  }, [dispatch, navigate, allBreeds, favoritesSet, setGroup]);

  return { navigateToGroup };
}
