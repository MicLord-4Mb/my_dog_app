import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  hasBlurBackground?: boolean;
}

const STYLES = {
  card: 'p-4 sm:p-5 relative overflow-hidden flex flex-col justify-center shadow-xs transition-shadow hover:shadow-sm border-secondary-fixed/50',
  titleContainer: 'font-headline text-base font-bold mb-1 relative z-10 flex items-center gap-1.5',
  description: 'text-xs sm:text-sm text-on-surface-variant relative z-10 leading-relaxed',
  blurBg: 'absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none',
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  description,
  className,
  children,
  hasBlurBackground,
}) => {
  return (
    <Card className={cn(STYLES.card, className)}>
      {hasBlurBackground && <div className={STYLES.blurBg} />}
      
      <div className={cn(children && "flex items-center justify-between")}>
        <div className="flex flex-col gap-1">
          <h3 className={cn(STYLES.titleContainer, hasBlurBackground ? "text-primary" : "text-on-surface")}>
            {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
            {title}
          </h3>
          {description && (
            <p className={cn(STYLES.description, children && "max-w-[200px]")}>
              {description}
            </p>
          )}
        </div>
        
        {children && (
          <div className="relative flex-shrink-0 z-10">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
};
