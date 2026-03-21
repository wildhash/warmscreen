import type { ReactNode } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/cn';

export type PageHeaderProps = {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  backHref,
  backLabel = 'Back',
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}
    >
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-strong"
          >
            {backLabel}
          </Link>
        )}
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-2 text-sm text-foreground-muted">{description}</p>}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </header>
  );
}
