import { Badge } from '@/components/ui/Badge';

export type DecisionBadgeProps = {
  decision: string;
};

export function DecisionBadge({ decision }: DecisionBadgeProps) {
  const variant = decision.includes('HIRE') ? 'success' : 'danger';
  return <Badge variant={variant}>{decision}</Badge>;
}
