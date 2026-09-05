import React from 'react';
import type { DogBreed } from '@/types/dog';
import { StatCard } from '@/components/gallery/StatCard';

/**
 * Props for the `BreedStatsGrid` molecule.
 */
interface BreedStatsGridProps {
  /** Dog breed entity containing physical and care metrics. */
  breed: DogBreed;
}

const STYLES = {
  grid: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4",
};

/**
 * Grid displaying the key vital statistics of a breed (Height, Weight, Life Span, Energy).
 */
export const BreedStatsGrid: React.FC<BreedStatsGridProps> = ({ breed }) => {
  return (
    <div className={STYLES.grid}>
      <StatCard
        icon="height"
        label="Height"
        value={breed.heightMetric ? `${breed.heightMetric} cm` : (breed.heightImperial ? `${breed.heightImperial} in` : 'N/A')}
      />
      <StatCard
        icon="scale"
        label="Weight"
        value={breed.weightMetric ? `${breed.weightMetric} kg` : (breed.weightImperial ? `${breed.weightImperial} lbs` : 'N/A')}
      />
      <StatCard
        icon="favorite"
        label="Life Span"
        value={breed.lifeSpan || 'N/A'}
        iconColorClass="bg-tertiary/10 text-tertiary"
      />
      {breed.bredFor && (
        <StatCard
          icon="bolt"
          label="Bred For"
          value={breed.bredFor}
          iconColorClass="bg-primary-container/20 text-on-primary-container"
        />
      )}
    </div>
  );
};
