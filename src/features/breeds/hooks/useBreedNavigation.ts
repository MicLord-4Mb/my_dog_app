import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectBreed } from '@/features/breeds/breedActions';
import type { DogBreed } from '@/types/dog';
import { selectBreedsByGroup } from '@/features/breeds/breedSelectors';
import {LINKS} from '@/constants/routes';
import { useGalleryFilters } from '@/features/breeds/hooks/useGalleryFilters';

/**
 * Options for the `useBreedNavigation` custom hook.
 */
interface UseBreedNavigationProps {
  /** The currently focused dog breed. */
  currentBreed?: DogBreed | null;
  /** Flag indicating whether the modal image lightbox is open (to disable global hotkeys). */
  isLightboxOpen?: boolean;
}

/**
 * Custom hook to manage circular group navigation between sibling dog breeds.
 * 
 * Features:
 * - Calculates previous and next breeds within active group.
 * - Attaches global keyboard listeners (`ArrowLeft` / `ArrowRight`) with input element guarding.
 * - Handles Redux state update and React Router navigation.
 * 
 * @param props - Hook configuration containing current breed and modal status.
 * @returns Object containing group list, current index, sibling breeds, and navigation handler.
 */
export function useBreedNavigation({ currentBreed, isLightboxOpen = false }: UseBreedNavigationProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Active group filter from URL
  const { group: activeGroup } = useGalleryFilters();
  
  // Breeds belonging to the currently selected group via memoized selector
  const groupBreeds = useAppSelector((state) => selectBreedsByGroup(state, activeGroup));

  // Find the position of the current breed in the active group's list
  const currentIndex = currentBreed
    ? groupBreeds.findIndex((b) => b.id === currentBreed.id)
    : -1;

  // Circular previous breed calculation
  const prevBreed =
    groupBreeds.length > 0 && currentIndex !== -1
      ? groupBreeds[(currentIndex - 1 + groupBreeds.length) % groupBreeds.length]
      : null;

  // Circular next breed calculation
  const nextBreed =
    groupBreeds.length > 0 && currentIndex !== -1
      ? groupBreeds[(currentIndex + 1) % groupBreeds.length]
      : null;

  /**
   * Navigates to the specified target breed.
   * 
   * @param targetBreed - The breed to select and display.
   */
  const handleNavigateBreed = useCallback((targetBreed: DogBreed | null) => {
    if (!targetBreed) return;
    dispatch(selectBreed(targetBreed.id));
    navigate(LINKS.breed(targetBreed.id, activeGroup));
  }, [dispatch, navigate, activeGroup]);

  // Global keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) return;
      
      // Do not intercept if user is typing inside an input or textarea
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'ArrowLeft' && prevBreed) {
        e.preventDefault();
        handleNavigateBreed(prevBreed);
      } else if (e.key === 'ArrowRight' && nextBreed) {
        e.preventDefault();
        handleNavigateBreed(nextBreed);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevBreed, nextBreed, isLightboxOpen, handleNavigateBreed]);

  return {
    groupBreeds,
    currentIndex,
    prevBreed,
    nextBreed,
    handleNavigateBreed,
  };
}
