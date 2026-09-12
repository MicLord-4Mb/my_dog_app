import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { FAVORITES_GROUP_KEY } from '@/constants/routes';

// CVA configurations for container layout variants
const containerVariants = cva('', {
  variants: {
    variant: {
      pills: 'flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar',
      chips: 'flex flex-wrap gap-1.5',
      'compact-chips': 'flex flex-nowrap gap-1.5 overflow-x-auto pb-1 no-scrollbar',
    },
  },
  defaultVariants: {
    variant: 'chips',
  },
});

// CVA configurations for filter item buttons (pills vs chips vs compact-chips)
const chipVariants = cva(
  'font-medium transition-all cursor-pointer shrink-0 inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        pills: 'px-4 py-2 rounded-full font-semibold text-xs hover:scale-105 h-9',
        chips: 'px-2.5 py-1 text-xs rounded-md',
        'compact-chips': 'px-2.5 py-1 text-xs rounded-full whitespace-nowrap',
      },
      state: {
        active: 'bg-primary text-on-primary font-semibold shadow-xs',
        inactive: '',
      },
    },
    compoundVariants: [
      {
        variant: 'pills',
        state: 'active',
        class: 'shadow-sm',
      },
      {
        variant: 'pills',
        state: 'inactive',
        class: 'bg-surface-container text-on-surface hover:bg-surface-variant',
      },
      {
        variant: ['chips', 'compact-chips'],
        state: 'inactive',
        class: 'bg-surface-container-lowest text-on-surface-variant border border-secondary-fixed hover:bg-surface-container',
      },
    ],
    defaultVariants: {
      variant: 'chips',
      state: 'inactive',
    },
  }
);

const STYLES = {
  countBadge: 'opacity-70 ml-1 text-[11px]',
};

/**
 * Props for the `GroupFilterChips` molecule.
 */
interface GroupFilterChipsProps {
  /** Array of available breed group names. */
  groups: string[];
  /** Currently active breed group, or `null` for all groups. */
  activeGroup: string | null;
  /** Callback triggered when a group is selected or toggled off. */
  onGroupSelect: (group: string | null) => void;
  /** Total count of all breeds across groups. */
  totalCount?: number;
  /** Map of group names to their respective breed count. */
  groupCounts?: Record<string, number>;
  /** Optional number of bookmarked favorite breeds. */
  favoritesCount?: number;
  /** Display style variant. */
  variant?: 'pills' | 'chips' | 'compact-chips';
}

/**
 * Reusable filter chip list for selecting breed categories.
 * 
 * Supports:
 * - Large horizontal scrollable pills for catalog header.
 * - Compact wrapped chips for sidebars.
 * - Horizontal compact chips for mobile headers.
 */
export const GroupFilterChips: React.FC<GroupFilterChipsProps> = ({
  groups,
  activeGroup,
  onGroupSelect,
  totalCount,
  groupCounts = {},
  favoritesCount,
  variant = 'pills',
}) => {
  const allLabel =
    variant === 'pills'
      ? `All Breeds ${totalCount !== undefined ? `(${totalCount})` : ''}`
      : variant === 'compact-chips'
        ? 'All'
        : 'All Groups';

  const isAllActive = !activeGroup || activeGroup.toLowerCase() === 'all';

  return (
    <div className={containerVariants({ variant })}>
      <button
        type="button"
        onClick={() => onGroupSelect('all')}
        className={cn(chipVariants({ variant, state: isAllActive ? 'active' : 'inactive' }))}
      >
        {allLabel}
      </button>

      {favoritesCount !== undefined && (
        <button
          type="button"
          onClick={() =>
            onGroupSelect(activeGroup === FAVORITES_GROUP_KEY ? 'all' : FAVORITES_GROUP_KEY)
          }
          className={cn(
            chipVariants({
              variant,
              state: activeGroup === FAVORITES_GROUP_KEY ? 'active' : 'inactive',
            }),
            activeGroup === FAVORITES_GROUP_KEY
              ? 'bg-primary text-on-primary shadow-sm'
              : 'hover:text-primary'
          )}
        >
          <span
            className="material-symbols-outlined text-[16px] mr-1"
            style={{ fontVariationSettings: activeGroup === FAVORITES_GROUP_KEY ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          <span>Favorites</span>
          <span className={STYLES.countBadge}>({favoritesCount})</span>
        </button>
      )}

      {groups.map((group) => {
        const count = groupCounts[group];
        const isSelected = !isAllActive && activeGroup?.toLowerCase() === group.toLowerCase();

        return (
          <button
            key={group}
            type="button"
            onClick={() => onGroupSelect(isSelected ? 'all' : group)}
            className={cn(chipVariants({ variant, state: isSelected ? 'active' : 'inactive' }))}
          >
            {group}
            {variant === 'pills' && count !== undefined && (
              <span className={STYLES.countBadge}>({count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
