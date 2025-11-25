'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetcher, apiPost } from '@/lib/api';

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [defaultRecruiterId, setDefaultRecruiterId] = useState('default-recruiter');
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    position: '',
    scheduledAt: '',
  });

  const fetchInterviews = () => {
    setLoading(true);
    fetcher('/api/interviews')
      .then((data) => {
        setInterviews(data.interviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch interviews:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInterviews();
    
    // Fetch default recruiter ID
    fetcher('/api/interviews/config/default-recruiter')
      .then((data) => {
        setDefaultRecruiterId(data.recruiterId);
      })
      .catch((err) => {
        console.error('Failed to fetch default recruiter ID:', err);
      });
  }, []);

  const handleCreateInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError('');

    try {
      // Convert local datetime to ISO format
      const scheduledAtISO = formData.scheduledAt 
        ? new Date(formData.scheduledAt).toISOString()
        : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // Default to tomorrow

      // Create interview with configured recruiter ID
      const interviewData = {
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        position: formData.position,
        scheduledAt: scheduledAtISO,
        recruiterId: defaultRecruiterId,
      };

      const result = await apiPost('/api/interviews', interviewData);
      
      // Initialize LiveKit agent for the interview
      try {
        await apiPost('/api/interviews/livekit-agent/initialize', {
          interviewId: result.interview.id,
        });
      } catch (agentError: any) {
        console.error('Failed to initialize LiveKit agent:', agentError);
        const errorDetails = agentError.details || agentError.message || 'Unknown error';
        // Don't fail the entire operation if agent initialization fails
        setCreateError(`Interview created successfully, but LiveKit agent initialization failed: ${errorDetails}. You can retry initialization later.`);
      }

      // Reset form and close modal
      setFormData({
        candidateName: '',
        candidateEmail: '',
        position: '',
        scheduledAt: '',
      });
      setShowCreateModal(false);
      
      // Refresh interviews list
      fetchInterviews();
    } catch (error: any) {
      console.error('Failed to create interview:', error);
      const errorMessage = error.details || error.message || 'An unexpected error occurred';
      setCreateError(`Failed to create interview: ${errorMessage}. Please check your input and try again.`);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading interviews...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Interviews</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              + Create Interview
            </button>
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Decision
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Scheduled
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/interviews/${interview.id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        {interview.candidateName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {interview.position}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          interview.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : interview.status === 'IN_PROGRESS'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {interview.score ? interview.score.toFixed(1) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {interview.decision ? (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            interview.decision.includes('HIRE')
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {interview.decision}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(interview.scheduledAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {interviews.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No interviews found. Create your first interview to get started.
          </div>
        )}

        {/* Create Interview Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6">Create New Interview</h2>
              
              {createError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {createError}
                </div>
              )}

              <form onSubmit={handleCreateInterview}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.candidateName}
                      onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Candidate Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.candidateEmail}
                      onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scheduled Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {creating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      'Create Interview'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setCreateError('');
                    }}
                    disabled={creating}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
