import { cn } from '@/lib/cn';

export type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({ label = 'Loading...', className }: LoadingStateProps) {
  return (
    <div
      className={cn('flex items-center gap-3 text-sm text-foreground-muted', className)}
      role="status"
      aria-live="polite"
    >
      <svg
        className="h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
        <path
          d="M22 12a10 10 0 0 1-10 10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}
