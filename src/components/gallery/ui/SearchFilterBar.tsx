import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

/**
 * Props for the `SearchFilterBar` component.
 */
interface SearchFilterBarProps {
  /** Current text query string. */
  searchQuery: string;
  /** Callback fired whenever user types or clears the search bar. */
  onSearchChange: (value: string) => void;
}

const STYLES = {
  container: "relative w-full md:w-80 group",
  iconWrapper: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors",
  searchIcon: "h-4 w-4",
  input: "pl-10 pr-9 h-11 rounded-full bg-surface-container-low border-secondary-fixed/50 focus-visible:ring-primary text-sm shadow-xs",
  clearBtn: "absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer",
  clearIcon: "material-symbols-outlined text-[18px]",
};

/**
 * Search input field with embedded icon and quick clear button.
 */
export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  // RTFM Here!!!!!!!!!!!!!!!!!!!! Xa xa xa xa
  const [prevSQuery, setPrevSQuery] = useState(searchQuery);
  const onSearchChangeRef = useRef(onSearchChange);

  // Sync local state if parent changes (e.g. reset filters)
  if (prevSQuery !== searchQuery) {
    setLocalQuery(searchQuery);
    setPrevSQuery(searchQuery);
  }
  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  });

  // Debounce effect
  useEffect(() => {
    if (localQuery === searchQuery) return;

    const handler = setTimeout(() => {
      onSearchChangeRef.current(localQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, searchQuery]);

  return (
    <div className={STYLES.container}>
      {/* Magnifying search icon */}
      <div className={STYLES.iconWrapper}>
        <Search className={STYLES.searchIcon} />
      </div>

      <Input
        type="text"
        placeholder="Search breeds or temperament..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className={STYLES.input}
      />

      {/* Clear search button when input is not empty */}
      {localQuery && (
        <button
          type="button"
          onClick={() => {
            setLocalQuery('');
            onSearchChange('');
          }}
          className={STYLES.clearBtn}
          aria-label="Clear search query"
        >
          <span className={STYLES.clearIcon}>close</span>
        </button>
      )}
    </div>
  );
};
