export type InterviewStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';

export function getStatusBadgeClass(status: InterviewStatus) {
  switch (status) {
    case 'COMPLETED':
      return 'badge badge-completed';
    case 'IN_PROGRESS':
      return 'badge badge-in-progress';
    case 'SCHEDULED':
    default:
      return 'badge badge-scheduled';
  }
}

export function getDecisionBadgeClass(decision: string) {
  const normalized = decision.toUpperCase();
  if (normalized.includes('NO_HIRE')) return 'badge badge-no-hire';
  return 'badge badge-hire';
}
