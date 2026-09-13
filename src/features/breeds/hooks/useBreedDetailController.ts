import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '@/store/hooks';
import {
  selectAllBreedsArray,
  selectCurrentBreed,
  selectBreedEntities,
} from '@/features/breeds/breedSelectors';
import { selectFavoritesIds } from '@/features/favorites/favoritesSelectors';
import { FAVORITES_GROUP_KEY } from '@/constants/routes';
import { useBreedNavigation } from '@/features/breeds/hooks/useBreedNavigation';
import { useGalleryFilters } from '@/features/breeds/hooks/useGalleryFilters';
import type { DogBreed } from '@/features/breeds/breedSlice';

/**
 * Return contract for the `useBreedDetailController` hook.
 */
export interface BreedDetailControllerReturn {
  /** The currently selected dog breed model to be displayed in detail view. */
  displayBreed: DogBreed | null;
  /** List of sibling breeds in the currently active group. */
  groupBreeds: DogBreed[];
  /** 0-based index of the currently active breed within the group. */
  currentIndex: number;
  /** Circular previous breed in the group. */
  prevBreed: DogBreed | null;
  /** Circular next breed in the group. */
  nextBreed: DogBreed | null;
  /** Position indicator text (e.g., '3 / 12'). */
  positionText?: string;
  /** Navigates to a specific breed. */
  handleNavigateBreed: (targetBreed: DogBreed | null) => void;
}

/**
 * Controller Hook for the `BreedDetailView` feature.
 * 
 * Responsibilities:
 * - Enforces URL as Single Source of Truth for the active breed `:id` (from React Router route params).
 * - Derives display breed based on active URL group (including favorites mode fallback).
 * - Integrates with `useBreedNavigation` for circular prev/next navigation and keyboard shortcuts.
 * - Provides RTK-ready state contract to presentation components.
 * 
 * @returns {BreedDetailControllerReturn} State and navigation handlers for the detail view.
 */
export function useBreedDetailController(): BreedDetailControllerReturn {
  const { id } = useParams<{ id?: string }>();

  // --- Store Selectors ---
  const allBreeds = useAppSelector(selectAllBreedsArray);
  const breedEntities = useAppSelector(selectBreedEntities);
  const selectedBreedFromState = useAppSelector(selectCurrentBreed);
  const favoritesIds = useAppSelector(selectFavoritesIds);
  const { group: activeGroup } = useGalleryFilters();

  /**
   * Calculates display breed by prioritizing explicit URL parameter `:id`,
   * followed by active favorites group matching, or defaulting to first breed in store.
   */
  const displayBreed = useMemo(() => {
    if (id) {
      return breedEntities[id] || null;
    }
    if (activeGroup === FAVORITES_GROUP_KEY) {
      const firstFavorite = allBreeds.find((b) => favoritesIds.includes(b.id));
      if (firstFavorite) return firstFavorite;
      return null;
    }
    return selectedBreedFromState || allBreeds[0] || null;
  }, [id, breedEntities, allBreeds, selectedBreedFromState, activeGroup, favoritesIds]);

  // --- Circular Group Navigation ---
  const {
    groupBreeds,
    currentIndex,
    prevBreed,
    nextBreed,
    handleNavigateBreed,
  } = useBreedNavigation({
    currentBreed: displayBreed,
  });

  const positionText =
    groupBreeds.length > 1 && currentIndex !== -1
      ? `${currentIndex + 1} / ${groupBreeds.length}`
      : undefined;

  return {
    displayBreed,
    groupBreeds,
    currentIndex,
    prevBreed,
    nextBreed,
    positionText,
    handleNavigateBreed,
  };
}
