import { Badge } from '@/components/ui/badge';
import { useBreedHeroContext } from './BreedHeroContext';

const STYLES = {
  groupBadge: "absolute bottom-4 left-4 z-20 bg-surface/90 backdrop-blur-md border-0 px-3 py-1.5 rounded-full shadow-sm gap-1.5",
  groupBadgeIcon: "material-symbols-outlined text-primary text-[16px]",
  groupBadgeText: "text-xs font-semibold text-on-surface",
  positionBadge: "absolute bottom-4 right-4 z-20 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-xs font-semibold text-on-surface select-none border border-secondary-fixed/30",
};

export interface BreedHeroBadgesProps {
  positionText?: string;
  customGroup?: string;
}

export const BreedHeroBadges = ({ positionText, customGroup }: BreedHeroBadgesProps) => {
  const { breed } = useBreedHeroContext();
  const displayGroup = customGroup || breed.breedGroup || 'Purebred';

  return (
    <>
      <Badge variant="outline" className={STYLES.groupBadge}>
        <span className={STYLES.groupBadgeIcon}>verified</span>
        <span className={STYLES.groupBadgeText}>{displayGroup}</span>
      </Badge>

      {positionText && (
        <div className={STYLES.positionBadge}>{positionText}</div>
      )}
    </>
  );
};
