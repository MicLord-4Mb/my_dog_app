import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const STYLES = {
  card: "w-full max-w-md mx-auto",
  content: "p-8 flex flex-col items-center justify-center gap-4 text-center",
  iconWrapper: "w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-2",
  icon: "material-symbols-outlined text-[40px]",
  title: "font-headline text-xl font-bold text-on-surface",
  description: "text-sm text-on-surface-variant max-w-xs",
};

export const GalleryEmpty: React.FC = () => {
  return (
    <Card className={STYLES.card}>
      <CardContent className={STYLES.content}>
        <div className={STYLES.iconWrapper}>
          <span className={STYLES.icon}>search_off</span>
        </div>
        <h3 className={STYLES.title}>No Breed Found</h3>
        <p className={STYLES.description}>
          No dog breed matches your filter or search query. Try choosing another group or search term.
        </p>
      </CardContent>
    </Card>
  );
};
