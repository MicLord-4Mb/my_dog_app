import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

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

const STYLES = {
  navIcon: "material-symbols-outlined text-[24px] sm:text-[28px] transition-transform",
};

export interface BreedHeroNavigationProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevBreedName?: string;
  nextBreedName?: string;
}

export const BreedHeroNavigation = ({
  onPrev,
  onNext,
  prevBreedName,
  nextBreedName,
}: BreedHeroNavigationProps) => {
  if (!onPrev && !onNext) return null;

  return (
    <>
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
    </>
  );
};
