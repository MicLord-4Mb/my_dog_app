import {BreedStatsGrid} from "@/components/gallery/cards/BreedStatsGrid";
import {InfoCard} from "@/components/gallery/cards/InfoCard";
import {CircularProgressIcon} from "@/components/icons/CircularProgressIcon";
import {CardContent} from "@/components/ui/card";
import {Badge} from '@/components/ui/badge';
import type {DogBreed} from "@/types/breed.types";

const STYLES = {
  content: "p-5 sm:p-7 md:p-8 flex flex-col gap-6 -mt-6 md:-mt-8 relative z-10",
  headerRow: "flex flex-col md:flex-row md:items-end justify-between gap-3",
  badgeGroup: "inline-flex items-center gap-2 mb-1",
  groupBadge: "rounded-sm text-[11px] uppercase tracking-wider",
  originText: "text-xs text-on-surface-variant font-medium",
  title: "font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight",
  temperamentWrapper: "flex flex-wrap gap-1.5",
  temperamentBadge: "text-xs font-medium",
  description: "text-sm md:text-base text-on-surface-variant leading-relaxed",
  widgetsGrid: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-1",
  circularProgressWrapper: "w-20 h-20",
  circularProgressSvg: "w-full h-full transform -rotate-90",
  circularProgressBg: "text-surface-container-high",
  circularProgressFg: "text-primary",
  circularProgressText: "absolute inset-0 flex items-center justify-center font-headline text-base font-bold text-on-surface",
}

interface BreedCardContentProps {
  breed: DogBreed;
}

export const BreedCardContent = ({ breed }:BreedCardContentProps) => {
  const temperamentList = breed.temperament;

  return (
    <CardContent className={STYLES.content}>
      <div className={STYLES.headerRow}>
        <div>
          <div className={STYLES.badgeGroup}>
            <Badge variant="secondary" className={STYLES.groupBadge}>
              {breed.breedGroup || 'General Dog Breed'}
            </Badge>
            {breed.origin && (
              <span className={STYLES.originText}>• {breed.origin}</span>
            )}
          </div>
          <h1 className={STYLES.title}>{breed.name}</h1>
        </div>

        {temperamentList.length > 0 && (
          <div className={STYLES.temperamentWrapper}>
            {temperamentList.map((trait) => (
              <Badge key={trait} variant="default" className={STYLES.temperamentBadge}>
                {trait}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <p className={STYLES.description}>
        {breed.description ||
          (breed.bredFor
            ? `Originally bred for ${breed.bredFor.toLowerCase()}. Known for being ${breed.temperament.join(', ').toLowerCase() || 'a wonderful companion'}.`
            : `${breed.name} is a distinctive dog breed celebrated for its unique character, intelligence, and companionship.`)}
      </p>

      <BreedStatsGrid breed={breed} />

      <div className={STYLES.widgetsGrid}>
        <InfoCard
          title="Trainability & Activity"
          description="Requires regular mental exercise and daily walks to stay healthy and happy."
        >
          <div className={STYLES.circularProgressWrapper}>
            <CircularProgressIcon
              className={STYLES.circularProgressSvg}
              bgClassName={STYLES.circularProgressBg}
              fgClassName={STYLES.circularProgressFg}
            />
            <div className={STYLES.circularProgressText}>85%</div>
          </div>
        </InfoCard>

        <InfoCard
          title="Did you know?"
          icon="lightbulb"
          description={breed.history || `The ${breed.name} possesses exceptional sensory skills and adapts wonderfully to home environments with proper socialization and care.`}
          hasBlurBackground
          className="bg-surface-tint/5 border-primary/20"
        />
      </div>
    </CardContent>
  )
};
