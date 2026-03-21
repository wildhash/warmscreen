import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type SectionProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  actions?: ReactNode;
};

export function Section({
  title,
  description,
  actions,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn('space-y-4', className)} {...props}>
      {(title || description || actions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && <h2 className="text-xl font-bold tracking-tight">{title}</h2>}
            {description && <p className="mt-1 text-sm text-foreground-muted">{description}</p>}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}

      {children}
    </section>
  );
}
