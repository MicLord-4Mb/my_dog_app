import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectBreed, autoselectFirstInGroup } from '@/features/breeds/breedSlice';
import {
  selectAllBreedsArray,
  selectUniqueBreedGroups,
  selectCurrentBreed,
  selectBreedsByGroup,
  isBreedInGroup,
} from '@/features/breeds/breedSelectors';
import { LINKS } from '@/constants/routes';
import { selectFavoritesCount, selectFavoritesSet } from '@/features/favorites/favoritesSelectors';
import { useGalleryFilters } from '@/features/breeds/hooks/useGalleryFilters';
import { GroupFilterChips } from '@/components/gallery/filters/GroupFilterChips';
import { BreedCombobox } from '@/components/gallery/filters/BreedCombobox';
import { FAVORITES_GROUP_KEY } from '@/constants/routes';

const STYLES = {
  compactLayout: "w-full flex flex-col gap-3 relative z-30",
  compactComboboxGroup: "flex flex-col gap-1.5",
  compactLabelRow: "flex items-center justify-between px-1",
  countText: "text-[11px] text-on-surface-variant",
  sidebarAside: "w-full flex flex-col gap-6 bg-surface-container/60 rounded-2xl p-5 md:p-6 border border-secondary-fixed/40 backdrop-blur-sm shadow-xs self-start md:sticky md:top-24",
  desktopComboboxGroup: "flex flex-col gap-2",
  desktopLabelRow: "flex items-center justify-between",
  filterGroupArea: "flex flex-col gap-2.5",
  clearFilterBtn: "text-[11px] text-primary hover:underline cursor-pointer",
};

/**
 * Props for the `BreedSelect` component.
 */
interface BreedSelectProps {
  /** Visual variant: `sidebar` for desktop layout or `compact` for mobile layout. */
  variant?: 'sidebar' | 'compact';
}

/**
 * Searchable Combobox & Breed Selector component.
 * 
 * Provides:
 * - Searchable dropdown popover with instant filtering.
 * - Breed group filter chips with live counts.
 * - Synchronization with Redux state and URL routing.
 */
export const BreedSelect: React.FC<BreedSelectProps> = ({ variant = 'sidebar' }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const allBreeds = useAppSelector(selectAllBreedsArray);
  const breedGroups = useAppSelector(selectUniqueBreedGroups);
  const selectedBreed = useAppSelector(selectCurrentBreed);
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const favoritesSet = useAppSelector(selectFavoritesSet);

  // Hook managing filter query parameters and URL synchronization
  const { group: activeGroup, setGroup } = useGalleryFilters();

  // Breeds filtered by active group via memoized selector
  const filteredBreeds = useAppSelector((state) => selectBreedsByGroup(state, activeGroup));

  /**
   * Handles breed selection from the combobox list.
   * Dispatches Redux action and navigates to the breed route.
   * 
   * @param id - Unique identifier of the chosen breed.
   */
  const handleSelect = (id: string) => {
    dispatch(selectBreed(id));
    navigate(LINKS.breed(id, activeGroup));
  };

  /**
   * Toggles the active breed group filter.
   * Automatically navigates to the first matching breed in the group.
   * 
   * @param group - The group name to activate, or `null` for all groups.
   */
  const handleGroupToggle = (group: string | null) => {
    dispatch(autoselectFirstInGroup(group));

    let matchingFirstBreedId: string | null = null;
    if (group === FAVORITES_GROUP_KEY) {
      const firstFav = allBreeds.find((b) => favoritesSet.has(b.id));
      matchingFirstBreedId = firstFav ? firstFav.id : null;
    } else if (group) {
      const firstMatch = allBreeds.find((b) => isBreedInGroup(b, group));
      matchingFirstBreedId = firstMatch ? firstMatch.id : null;
    } else if (allBreeds.length > 0) {
      matchingFirstBreedId = allBreeds[0].id;
    }

    if (matchingFirstBreedId) {
      navigate(LINKS.breed(matchingFirstBreedId, group));
    } else {
      setGroup(group);
    }
  };

  // Mobile compact layout
  if (variant === 'compact') {
    return (
      <div className={STYLES.compactLayout}>
        {breedGroups.length > 0 && (
          <GroupFilterChips
            groups={breedGroups}
            activeGroup={activeGroup}
            onGroupSelect={handleGroupToggle}
            favoritesCount={favoritesCount}
            variant="compact-chips"
          />
        )}
        <div className={STYLES.compactComboboxGroup}>
          <div className={STYLES.compactLabelRow}>
            <label className="label-caption">Select a Breed</label>
            <span className={STYLES.countText}>
              {filteredBreeds.length} {filteredBreeds.length === 1 ? 'breed' : 'breeds'}
            </span>
          </div>
          <BreedCombobox
            breeds={filteredBreeds}
            selectedBreed={selectedBreed}
            onSelectBreed={handleSelect}
          />
        </div>
      </div>
    );
  }

  // Desktop sidebar layout
  return (
    <aside className={STYLES.sidebarAside}>
      <div className={STYLES.desktopComboboxGroup}>
        <div className={STYLES.desktopLabelRow}>
          <label className="label-caption">
            Select a Breed ({filteredBreeds.length})
          </label>
          {allBreeds.length > 0 && (
            <span className={STYLES.countText}>
              Total: {allBreeds.length}
            </span>
          )}
        </div>
        <BreedCombobox
          breeds={filteredBreeds}
          selectedBreed={selectedBreed}
          onSelectBreed={handleSelect}
        />
      </div>

      {breedGroups.length > 0 && (
        <div className={STYLES.filterGroupArea}>
          <div className={STYLES.desktopLabelRow}>
            <span className="label-caption">Filter by Group</span>
            {activeGroup && (
              <button
                onClick={() => handleGroupToggle(null)}
                className={STYLES.clearFilterBtn}
              >
                Clear
              </button>
            )}
          </div>
          <GroupFilterChips
            groups={breedGroups}
            activeGroup={activeGroup}
            onGroupSelect={handleGroupToggle}
            favoritesCount={favoritesCount}
            variant="chips"
          />
        </div>
      )}
    </aside>
  );
};
