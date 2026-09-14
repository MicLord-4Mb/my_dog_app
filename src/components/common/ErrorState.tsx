import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const STYLES = {
  container:
    'w-full max-w-lg mx-auto bg-error-container rounded-2xl p-6 shadow-sm border border-error/20 flex flex-col items-center text-center gap-4 animate-fade-in',
  iconWrapper: 'w-14 h-14 rounded-full bg-error/10 flex items-center justify-center text-error',
  icon: 'material-symbols-outlined text-[32px]',
  textBlock: 'flex flex-col gap-1',
  title: 'font-headline text-lg font-bold text-on-error-container',
  description: 'text-sm text-on-error-container/80 max-w-sm',
  retryBtn: 'mt-2 inline-flex items-center gap-2 rounded-full px-6',
  retryIcon: 'material-symbols-outlined text-[18px]',
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'An error occurred',
  message,
  onRetry,
  retryLabel = 'Try Again',
  className,
}) => {
  return (
    <div className={cn(STYLES.container, className)}>
      <div className={STYLES.iconWrapper}>
        <span className={STYLES.icon}>error</span>
      </div>
      <div className={STYLES.textBlock}>
        <h3 className={STYLES.title}>{title}</h3>
        <p className={STYLES.description}>{message}</p>
      </div>
      {onRetry && (
        <Button variant="destructive" onClick={onRetry} className={STYLES.retryBtn}>
          <span className={STYLES.retryIcon}>refresh</span>
          {retryLabel}
        </Button>
      )}
    </div>
  );
};
