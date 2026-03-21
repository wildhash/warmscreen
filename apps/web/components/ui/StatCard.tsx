import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Card } from './Card';

type Tone = 'default' | 'primary' | 'success' | 'warning' | 'danger';

const toneClasses: Record<Tone, string> = {
  default: 'text-foreground',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

export type StatCardProps = {
  label: string;
  value: ReactNode;
  tone?: Tone;
  className?: string;
};

export function StatCard({ label, value, tone = 'default', className }: StatCardProps) {
  return (
    <Card className={cn('p-5', className)}>
      <div className="text-sm text-foreground-muted">{label}</div>
      <div className={cn('mt-2 text-3xl font-bold tracking-tight', toneClasses[tone])}>{value}</div>
    </Card>
  );
}
