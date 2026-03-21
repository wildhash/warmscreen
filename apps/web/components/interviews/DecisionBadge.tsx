import { Badge } from '@/components/ui/Badge';

export type DecisionBadgeProps = {
  decision: string;
};

export function DecisionBadge({ decision }: DecisionBadgeProps) {
  const normalized = decision.toUpperCase();
  const isPositive = normalized === 'HIRE' || normalized === 'STRONG_HIRE';
  const isNegative = normalized === 'NO_HIRE' || normalized === 'STRONG_NO_HIRE';
  const variant = isPositive ? 'success' : isNegative ? 'danger' : 'default';
  return <Badge variant={variant}>{decision}</Badge>;
}
