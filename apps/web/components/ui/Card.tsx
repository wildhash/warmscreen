import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-md)] border border-border bg-surface shadow-sm',
        className
      )}
      {...props}
    />
  );
}
