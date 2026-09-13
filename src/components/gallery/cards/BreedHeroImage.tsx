import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const STYLES = {
  container: "relative w-full h-64 sm:h-80 md:h-[420px] bg-surface-container-high overflow-hidden group",
  placeholderContainer: "w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-surface-container-low to-surface-container-highest text-on-surface-variant",
  placeholderIconWrap: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary",
  placeholderIcon: "material-symbols-outlined text-[44px]",
  placeholderTitle: "font-headline font-semibold text-base text-on-surface",
  placeholderSub: "text-xs text-on-surface-variant mt-1",
  ambientBlur: "absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 pointer-events-none select-none",
  overlayGradient: "absolute inset-0 z-10 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80 pointer-events-none",
  navIcon: "material-symbols-outlined text-[24px] sm:text-[28px] transition-transform",
  groupBadge: "absolute bottom-4 left-4 z-20 bg-surface/90 backdrop-blur-md border-0 px-3 py-1.5 rounded-full shadow-sm gap-1.5",
  groupBadgeIcon: "material-symbols-outlined text-primary text-[16px]",
  groupBadgeText: "text-xs font-semibold text-on-surface",
  positionBadge: "absolute bottom-4 right-4 z-20 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-xs font-semibold text-on-surface select-none border border-secondary-fixed/30",
  actionToolbar: "absolute top-4 right-4 z-20 flex items-center gap-2",
  actionIcon: "material-symbols-outlined text-[20px]",
  bookmarkIcon: "material-symbols-outlined text-[22px]",
};

const heroImageVariants = cva(
  'relative z-10 w-full h-full cursor-zoom-in transition-all duration-500 ease-out',
  {
    variants: {
      fitMode: {
        cover: 'object-cover object-[center_20%] group-hover:scale-105',
        contain: 'object-contain object-center p-3 sm:p-4 hover:scale-[1.02]',
      },
    },
    defaultVariants: {
      fitMode: 'cover',
    },
  }
);

const navButtonVariants = cva(
  'absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface/85 hover:bg-surface text-on-surface hover:text-primary backdrop-blur-md shadow-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  {
    variants: {
      side: {
        left: 'left-3.5 group/prev',
        right: 'right-3.5 group/next',
      },
    },
  }
);

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

interface BreedHeroImageProps extends VariantProps<typeof heroImageVariants> {
  breedName: string;
  breedGroup: string;
  imageUrl: string;
  showPlaceholder: boolean;
  onImageError: () => void;
  onLightboxOpen: () => void;
  onToggleFitMode: () => void;
  isInFavorites: boolean;
  onToggleFavorite: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevBreedName?: string;
  nextBreedName?: string;
  positionText?: string;
  fitMode: 'cover' | 'contain';
}

export const BreedHeroImage = ({
  breedName,
  breedGroup,
  imageUrl,
  showPlaceholder,
  onImageError,
  onLightboxOpen,
  fitMode,
  onToggleFitMode,
  isInFavorites,
  onToggleFavorite,
  onPrev,
  onNext,
  prevBreedName,
  nextBreedName,
  positionText,
}:BreedHeroImageProps ) => {
  return (
    <div className={STYLES.container}>
      {showPlaceholder ? (
        <div className={STYLES.placeholderContainer}>
          <div className={STYLES.placeholderIconWrap}>
            <span className={STYLES.placeholderIcon}>pets</span>
          </div>
          <p className={STYLES.placeholderTitle}>{breedName}</p>
          <span className={STYLES.placeholderSub}>No official image available from API</span>
        </div>
      ) : (
        <>
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className={STYLES.ambientBlur}
          />
          <img
            src={imageUrl}
            alt={breedName}
            onError={onImageError}
            onClick={onLightboxOpen}
            className={cn(heroImageVariants({ fitMode }))}
            loading="lazy"
          />
        </>
      )}

      <div className={STYLES.overlayGradient} />

      {onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label={prevBreedName ? `Previous breed: ${prevBreedName}` : 'Previous breed'}
          title={prevBreedName ? `Previous: ${prevBreedName} (←)` : 'Previous (←)'}
          className={cn(navButtonVariants({ side: 'left' }))}
        >
          <span className={cn(STYLES.navIcon, "group-hover/prev:-translate-x-0.5")}>
            chevron_left
          </span>
        </button>
      )}

      {onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label={nextBreedName ? `Next breed: ${nextBreedName}` : 'Next breed'}
          title={nextBreedName ? `Next: ${nextBreedName} (→)` : 'Next (→)'}
          className={cn(navButtonVariants({ side: 'right' }))}
        >
          <span className={cn(STYLES.navIcon, "group-hover/next:translate-x-0.5")}>
            chevron_right
          </span>
        </button>
      )}

      <Badge variant="outline" className={STYLES.groupBadge}>
        <span className={STYLES.groupBadgeIcon}>verified</span>
        <span className={STYLES.groupBadgeText}>{breedGroup || 'Purebred'}</span>
      </Badge>

      {positionText && (
        <div className={STYLES.positionBadge}>{positionText}</div>
      )}

      <div className={STYLES.actionToolbar}>
        {!showPlaceholder && (
          <>
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

            <Button
              variant="ghost"
              size="icon"
              aria-label={fitMode === 'cover' ? 'Show whole photo (fit)' : 'Fill card (cover)'}
              title={fitMode === 'cover' ? 'Show whole photo (fit)' : 'Fill card (cover)'}
              onClick={onToggleFitMode}
              className={cn(actionButtonVariants({ variant: 'ghost' }))}
            >
              <span className={STYLES.actionIcon}>
                {fitMode === 'cover' ? 'aspect_ratio' : 'crop_free'}
              </span>
            </Button>
          </>
        )}

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
      </div>
    </div>
  );
};
