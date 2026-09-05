import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const STYLES = {
  container: "w-full max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in",
  card: "p-4 md:p-8 flex flex-col gap-6",
  imageSkeleton: "w-full aspect-4/3 md:h-96 rounded-2xl",
  contentWrapper: "flex flex-col gap-4",
  headerRow: "flex justify-between items-start",
  titleGroup: "flex flex-col gap-2 w-2/3",
  badgeSkeleton: "h-4 w-28 rounded-full",
  titleSkeleton: "h-8 md:h-10 w-3/4 rounded-lg",
  avatarSkeleton: "w-10 h-10 rounded-full",
  bodySkeleton: "h-16 w-full rounded-lg",
  statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-2",
  statCardSkeleton: "h-24 rounded-xl",
};

export const GalleryLoading: React.FC = () => {
  return (
    <div className={STYLES.container}>
      <Card className={STYLES.card}>
        {/* Image skeleton */}
        <Skeleton className={STYLES.imageSkeleton} />

        {/* Content skeleton */}
        <div className={STYLES.contentWrapper}>
          <div className={STYLES.headerRow}>
            <div className={STYLES.titleGroup}>
              <Skeleton className={STYLES.badgeSkeleton} />
              <Skeleton className={STYLES.titleSkeleton} />
            </div>
            <Skeleton className={STYLES.avatarSkeleton} />
          </div>

          <Skeleton className={STYLES.bodySkeleton} />

          {/* Stats grid skeleton */}
          <div className={STYLES.statsGrid}>
            <Skeleton className={STYLES.statCardSkeleton} />
            <Skeleton className={STYLES.statCardSkeleton} />
            <Skeleton className={STYLES.statCardSkeleton} />
            <Skeleton className={STYLES.statCardSkeleton} />
          </div>
        </div>
      </Card>
    </div>
  );
};
