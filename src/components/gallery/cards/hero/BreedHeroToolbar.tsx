import { Button } from '@/components/ui/button';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useBreedHeroContext } from './BreedHeroContext';

const actionButtonVariants = cva(
  'w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md shadow-sm transition-all',
  {
    variants: {
      variant: {
        ghost: 'bg-surface/80 hover:bg-surface text-on-surface hover:text-primary',
        active: 'bg-primary text-on-primary scale-105 hover:bg-primary/90',
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  }
);

const STYLES = {
  actionToolbar: "absolute top-4 right-4 z-20 flex items-center gap-2",
  actionIcon: "material-symbols-outlined text-[20px]",
  bookmarkIcon: "material-symbols-outlined text-[22px]",
};

export interface BreedHeroToolbarProps {
  isInFavorites?: boolean;
  onToggleFavorite?: () => void;
  children?: React.ReactNode;
}

export const BreedHeroToolbar = ({
  isInFavorites = false,
  onToggleFavorite,
  children,
}: BreedHeroToolbarProps) => {
  const { fitMode, toggleFitMode, showPlaceholder, onLightboxOpen } = useBreedHeroContext();

  return (
    <div className={STYLES.actionToolbar}>
      {!showPlaceholder && (
        <>
          {onLightboxOpen && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="View full image"
              title="View full image"
              onClick={onLightboxOpen}
              className={cn(actionButtonVariants({ variant: 'ghost' }))}
            >
              <span className={STYLES.actionIcon}>fullscreen</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            aria-label={fitMode === 'cover' ? 'Show whole photo (fit)' : 'Fill card (cover)'}
            title={fitMode === 'cover' ? 'Show whole photo (fit)' : 'Fill card (cover)'}
            onClick={toggleFitMode}
            className={cn(actionButtonVariants({ variant: 'ghost' }))}
          >
            <span className={STYLES.actionIcon}>
              {fitMode === 'cover' ? 'aspect_ratio' : 'crop_free'}
            </span>
          </Button>
        </>
      )}

      {onToggleFavorite && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Save to favorites"
          title="Save to favorites"
          onClick={onToggleFavorite}
          className={cn(actionButtonVariants({ variant: isInFavorites ? 'active' : 'ghost' }))}
        >
          <span
            className={STYLES.bookmarkIcon}
            style={{ fontVariationSettings: isInFavorites ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </Button>
      )}

      {children}
    </div>
  );
};
