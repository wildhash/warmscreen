import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/cn';

import {
  buttonSizeClasses,
  buttonVariantClasses,
  type ButtonSize,
  type ButtonVariant,
} from './button-styles';

export type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className' | 'children'> & {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] font-semibold transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        buttonSizeClasses[size],
        buttonVariantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
