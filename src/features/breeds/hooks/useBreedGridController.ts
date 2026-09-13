import { useMemo, type RefObject } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAllBreedsArray,
  selectUniqueBreedGroups,
  selectBreedGroupCounts,
  selectBreedsByGroup,
} from '@/features/breeds/breedSelectors';
import { selectFavoritesSet, selectFavoritesCount } from '@/features/favorites/favoritesSelectors';
import { toggleFavorite } from '@/features/favorites/favoritesSlice';
import { useGalleryFilters } from '@/features/breeds/hooks/useGalleryFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { FAVORITES_GROUP_KEY } from '@/constants/routes';
import type { DogBreed } from '@/features/breeds/breedSlice';

/** Default number of breed items rendered per desktop page and per mobile pagination batch. */
export const PAGE_SIZE = 8;

/**
 * Return contract for the `useBreedGridController` hook.
 * Encapsulates all state, computed slices, and event handlers required by presentation components.
 */
export interface BreedGridControllerReturn {
  // --- Filter & Viewport State ---
  /** Active group filter key (e.g. 'Hound', 'favorites', or `null` for all). */
  activeGroup: string | null;
  /** Active search query string. */
  searchQuery: string;
  /** Whether the current view mode is set to favorites. */
  isFavoritesMode: boolean;
  /** Whether the current viewport matches desktop breakpoint (>=768px). */
  isDesktop: boolean;

  // --- Domain & Count Metadata ---
  /** List of all unique breed group names available in the catalog. */
  breedGroups: string[];
  /** Record mapping each group name to its total breed count. */
  groupCounts: Record<string, number>;
  /** Total count of favorite breeds. */
  favoritesCount: number;
  /** Total count of all breeds loaded in the system. */
  totalBreedsCount: number;
  /** Total count of breeds matching current group and search filters. */
  filteredCount: number;

  // --- Slices & Favorites ---
  /** Paginated slice of breeds for desktop rendering. */
  desktopBreeds: DogBreed[];
  /** Progressively accumulated slice of breeds for mobile rendering. */
  mobileBreeds: DogBreed[];
  /** Set of IDs of favorited dog breeds for O(1) membership checks. */
  favoritesSet: Set<string>;

  // --- Pagination & Infinite Scroll State ---
  /** Current 1-based page index for desktop pagination. */
  currentPage: number;
  /** Total calculated pages for desktop view based on PAGE_SIZE. */
  totalPages: number;
  /** Page size constant. */
  pageSize: number;
  /** Current item count rendered in mobile view. */
  mobileCount: number;
  /** Ref attached to the DOM sentinel node for IntersectionObserver infinite scroll. */
  sentinelRef: RefObject<HTMLDivElement | null>;

  // --- Action Handlers ---
  /** Updates search query in URL. */
  setSearchQuery: (query: string) => void;
  /** Sets page index in URL. */
  setPage: (page: number) => void;
  /** Handles group filter selection change. */
  handleGroupSelect: (group: string | null) => void;
  /** Resets all search and group filters. */
  handleResetFilters: () => void;
  /** Dispatches favorite toggle action for specified breed ID. */
  handleToggleFavorite: (breedId: string) => void;
  /** Manually loads next batch of items for mobile view. */
  loadMoreMobile: () => void;
}

/**
 * Controller Hook for the `BreedGrid` feature.
 * 
 * Responsibilities:
 * - Abstracts Redux store selectors (`breeds`, `groups`, `favorites`).
 * - Enforces URL as the Single Source of Truth for group, search, and page state.
 * - Performs responsive viewport evaluation (`useMediaQuery`).
 * - Computes filtered breed lists and paginated/infinite-scrolled slices.
 * - Provides a clean, RTK-ready API contract to presentation components.
 * 
 * @returns {BreedGridControllerReturn} Complete controller state and action suite.
 */
export function useBreedGridController(): BreedGridControllerReturn {
  const dispatch = useAppDispatch();

  // --- Store Selectors ---
  const breeds = useAppSelector(selectAllBreedsArray);
  const breedGroups = useAppSelector(selectUniqueBreedGroups);
  const groupCounts = useAppSelector(selectBreedGroupCounts);
  const favoritesSet = useAppSelector(selectFavoritesSet);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  // --- URL Filters State ---
  const {
    group: activeGroup,
    currentPage,
    searchQuery,
    setGroup,
    setSearchQuery,
    setPage,
    resetFilters,
  } = useGalleryFilters();

  // --- Calculated View Modes ---
  const isFavoritesMode = activeGroup === FAVORITES_GROUP_KEY;
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // --- Breeds Filtering ---
  const baseBreeds = useAppSelector((state) => selectBreedsByGroup(state, activeGroup));

  const filteredBreeds = useMemo(() => {
    if (!searchQuery) return baseBreeds;
    const query = searchQuery.toLowerCase();
    return baseBreeds.filter(
      (breed) =>
        breed.name.toLowerCase().includes(query) ||
        breed.temperament.some((trait) => trait.toLowerCase().includes(query)) ||
        (breed.origin && breed.origin.toLowerCase().includes(query))
    );
  }, [baseBreeds, searchQuery]);

  // --- Mobile Infinite Scroll ---
  const { itemCount: mobileCount, setItemCount: setMobileCount, sentinelRef } = useInfiniteScroll({
    totalItems: filteredBreeds.length,
    pageSize: PAGE_SIZE,
  });

  // --- Pagination Slices ---
  const totalPages = Math.ceil(filteredBreeds.length / PAGE_SIZE) || 1;

  const desktopBreeds = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBreeds.slice(start, start + PAGE_SIZE);
  }, [filteredBreeds, currentPage]);

  const mobileBreeds = useMemo(() => {
    return filteredBreeds.slice(0, mobileCount);
  }, [filteredBreeds, mobileCount]);

  // --- Action Handlers ---
  const handleGroupSelect = (group: string | null) => {
    setGroup(group);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const handleToggleFavorite = (breedId: string) => {
    dispatch(toggleFavorite(breedId));
  };

  const loadMoreMobile = () => {
    setMobileCount((prev) => Math.min(prev + PAGE_SIZE, filteredBreeds.length));
  };

  return {
    activeGroup,
    searchQuery,
    isFavoritesMode,
    isDesktop,
    breedGroups,
    groupCounts,
    favoritesCount,
    totalBreedsCount: breeds.length,
    filteredCount: filteredBreeds.length,
    desktopBreeds,
    mobileBreeds,
    favoritesSet,
    currentPage,
    totalPages,
    pageSize: PAGE_SIZE,
    mobileCount,
    sentinelRef,
    setSearchQuery,
    setPage,
    handleGroupSelect,
    handleResetFilters,
    handleToggleFavorite,
    loadMoreMobile,
  };
}
