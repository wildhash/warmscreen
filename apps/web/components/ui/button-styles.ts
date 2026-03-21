export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-strong',
  secondary: 'bg-surface text-foreground border border-border hover:bg-muted',
  ghost: 'text-foreground-muted hover:text-foreground hover:bg-muted',
  danger: 'bg-danger text-white hover:opacity-95',
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};
