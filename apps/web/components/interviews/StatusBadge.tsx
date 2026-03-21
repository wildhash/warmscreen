import { Badge } from '@/components/ui/Badge';

export type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const variant =
    status === 'COMPLETED'
      ? 'success'
      : status === 'IN_PROGRESS'
        ? 'info'
        : status === 'SCHEDULED'
          ? 'warning'
          : 'default';

  return <Badge variant={variant}>{status}</Badge>;
}
