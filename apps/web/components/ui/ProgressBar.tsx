import { cn } from '@/lib/cn';

export type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn('h-2 w-full rounded-full bg-border/40', className)} aria-hidden>
      <div
        className="h-2 rounded-full bg-primary transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
