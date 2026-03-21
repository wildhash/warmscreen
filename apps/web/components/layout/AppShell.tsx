import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type AppShellProps = {
  children: ReactNode;
  className?: string;
};

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
