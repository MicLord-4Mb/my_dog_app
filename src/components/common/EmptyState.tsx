import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const STYLES = {
  card: 'w-full max-w-md mx-auto',
  content: 'p-8 flex flex-col items-center justify-center gap-3 text-center',
  iconWrapper:
    'w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-1',
  icon: 'material-symbols-outlined text-[36px]',
  title: 'font-headline text-lg font-bold text-on-surface',
  description: 'text-sm text-on-surface-variant max-w-xs leading-relaxed',
};

/**
 * Reusable empty state component for displaying placeholder content when data is missing.
 * Configurable with custom icon, title, description, and optional action buttons as children.
 *
 * @param props - Component configuration.
 * @returns {React.FC} The empty state placeholder component.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search_off',
  title,
  description,
  children,
  className,
}) => {
  return (
    <Card className={cn(STYLES.card, className)}>
      <CardContent className={STYLES.content}>
        <div className={STYLES.iconWrapper}>
          <span className={STYLES.icon}>{icon}</span>
        </div>
        <h3 className={STYLES.title}>{title}</h3>
        {description && <p className={STYLES.description}>{description}</p>}
        {children}
      </CardContent>
    </Card>
  );
};
