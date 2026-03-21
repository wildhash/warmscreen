import Link from 'next/link';

import type { InterviewSummary } from '@/hooks/useInterviews';

import { Card } from '@/components/ui/Card';

import { DecisionBadge } from './DecisionBadge';
import { StatusBadge } from './StatusBadge';

export type InterviewsTableProps = {
  interviews: InterviewSummary[];
};

export function InterviewsTable({ interviews }: InterviewsTableProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/60 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted">
                Candidate
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted">
                Decision
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted">
                Scheduled
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {interviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-muted/50">
                <td className="px-6 py-4">
                  <Link
                    href={`/interviews/${interview.id}`}
                    className="font-semibold text-primary hover:text-primary-strong"
                  >
                    {interview.candidateName}
                  </Link>
                  <div className="mt-1 text-xs text-foreground-muted">
                    {interview.candidateEmail}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{interview.position}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={interview.status} />
                </td>
                <td className="px-6 py-4 text-sm">
                  {typeof interview.score === 'number' ? interview.score.toFixed(1) : '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  {interview.decision ? <DecisionBadge decision={interview.decision} /> : '-'}
                </td>
                <td className="px-6 py-4 text-sm text-foreground-muted">
                  {new Date(interview.scheduledAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
