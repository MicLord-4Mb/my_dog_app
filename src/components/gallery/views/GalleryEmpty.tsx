import React from 'react';
import { EmptyState } from '@/components/common/EmptyState';

/**
 * Empty state view displayed when no breeds match the current filter or search criteria.
 *
 * @returns {React.JSX.Element} Configured EmptyState layout.
 */
export const GalleryEmpty: React.FC = () => {
  return (
    <EmptyState
      icon="search_off"
      title="No Breed Found"
      description="No dog breed matches your filter or search query. Try choosing another group or search term."
    />
  );
};

