import React from 'react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  iconColorClass?: string;
}

const STYLES = {
  card: "p-3.5 sm:p-4 flex flex-col items-center text-center gap-1 border-secondary-fixed/40 bg-surface-container-low",
  iconWrapper: "w-8 h-8 rounded-full flex items-center justify-center mb-1",
  icon: "material-symbols-outlined text-[20px]",
  value: "stat-value text-sm sm:text-base",
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  iconColorClass = 'bg-primary/10 text-primary',
}) => (
  <Card className={STYLES.card}>
    <div className={`${STYLES.iconWrapper} ${iconColorClass}`}>
      <span className={STYLES.icon}>{icon}</span>
    </div>
    <span className="stat-label">{label}</span>
    <span className={STYLES.value}>{value}</span>
  </Card>
);
