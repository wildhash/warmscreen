import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn('rounded-[var(--radius-md)] border border-border bg-surface p-6', className)}
    >
      <div className="text-base font-semibold">{title}</div>
      {description && <div className="mt-1 text-sm text-foreground-muted">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
