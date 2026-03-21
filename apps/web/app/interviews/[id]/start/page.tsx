'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetcher, apiPost } from '@/lib/api';
import { ArrowLeft, Mic, Play, Square } from 'lucide-react';
import type { InterviewStatus } from '../../badges';

interface VoiceTranscript {
  text: string;
  confidence?: number;
  timestamp?: number;
}

type Interview = {
  id: string;
  candidateName: string;
  position: string;
  status: InterviewStatus;
};

type InterviewQuestion = {
  id: string;
  category: string;
  content: string;
  skillTags?: string[];
};

type VoiceSession = {
  roomUrl: string;
};

type VoiceCloneResponse = {
  voiceId: string;
  status: string;
};

export default function InterviewStartPage() {
  const params = useParams();
  const router = useRouter();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'starting' | 'active' | 'ending'>('idle');
  const [voiceSession, setVoiceSession] = useState<VoiceSession | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceTranscripts, setVoiceTranscripts] = useState<VoiceTranscript[]>([]);
  const [fullTranscript, setFullTranscript] = useState('');
  const [cloneForm, setCloneForm] = useState({ voiceName: '', sampleUrl: '', description: '' });
  const [cloneStatus, setCloneStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [cloneResponse, setCloneResponse] = useState<VoiceCloneResponse | null>(null);

  useEffect(() => {
    if (!params.id) return;

    fetcher(`/api/interviews/${params.id}`)
      .then((data) => {
        setInterview(data.interview);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch interview:', err);
        setLoading(false);
      });
  }, [params.id]);

  useEffect(() => {
    const interviewId = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!interviewId) return;
    if (loading) return;

    if (interview?.status === 'COMPLETED') {
      router.push(`/interviews/${interviewId}`);
    }
  }, [interview?.status, loading, params.id, router]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (voiceStatus === 'active') {
      interval = setInterval(() => {
        fetcher('/api/voice/transcripts')
          .then((data) => {
            setVoiceTranscripts(data.transcripts || []);
            setFullTranscript(data.fullTranscript || '');
          })
          .catch((err) => console.error('Failed to fetch transcripts:', err));
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [voiceStatus]);

  const startInterview = async () => {
    setStarting(true);
    try {
      const data = await apiPost(`/api/interviews/${params.id}/start`, {});
      setInterview(data.interview);
      setQuestions(data.questions);
      await startVoiceSession(data.interview);
    } catch (err) {
      console.error('Failed to start interview:', err);
      alert('Failed to start interview. Please try again.');
    } finally {
      setStarting(false);
    }
  };

  const startVoiceSession = async (interviewContext?: Interview) => {
    const activeInterview = interviewContext ?? interview;
    if (!activeInterview || voiceStatus !== 'idle') return;

    setVoiceError(null);
    setVoiceStatus('starting');
    try {
      const session = await apiPost('/api/voice/session/start', {
        interviewId: activeInterview.id,
        participantName: activeInterview.candidateName,
      });
      const raw = session.session;
      if (!raw || typeof raw.roomUrl !== 'string') {
        setVoiceSession(null);
        setVoiceStatus('idle');
        setVoiceError('Unable to start voice agent: missing room URL in session response.');
        throw new Error('Missing roomUrl in session response');
      }

      setVoiceSession({ roomUrl: raw.roomUrl });
      setVoiceStatus('active');
    } catch (err) {
      console.error('Failed to start voice session:', err);
      setVoiceStatus('idle');
      setVoiceError(
        (prev) => prev ?? 'Unable to start voice agent. Please verify LiveKit/Deepgram credentials.'
      );
      throw err;
    }
  };

  const endVoiceSession = async () => {
    if (voiceStatus !== 'active') return;
    setVoiceStatus('ending');
    try {
      await apiPost('/api/voice/session/end', {});
      setVoiceSession(null);
      setVoiceStatus('idle');
    } catch (err) {
      console.error('Failed to end voice session:', err);
      setVoiceStatus('active');
      setVoiceError('Unable to end voice session. Try again.');
    }
  };

  const handleCloneVoice = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cloneForm.voiceName || !cloneForm.sampleUrl) {
      setVoiceError('Voice name and sample URL are required.');
      return;
    }

    setCloneStatus('submitting');
    setVoiceError(null);
    try {
      const response = await apiPost('/api/voice/clone', cloneForm);
      const raw = response.clone;
      if (!raw || typeof raw.voiceId !== 'string' || typeof raw.status !== 'string') {
        setCloneResponse(null);
        setCloneStatus('error');
        setVoiceError(
          'Voice cloning response was missing expected fields. Please try again or check the AGI API.'
        );
        return;
      }

      setCloneResponse({ voiceId: raw.voiceId, status: raw.status });
      setCloneStatus('success');
    } catch (err) {
      console.error('Failed to clone voice:', err);
      setCloneStatus('error');
      setVoiceError('Voice cloning failed. Double-check AGI API access.');
    }
  };

  const updateCloneField = (field: keyof typeof cloneForm, value: string) => {
    setCloneForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitResponse = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      alert('Unable to submit response: question not found.');
      return;
    }

    if (!transcript.trim()) {
      alert('Please provide an answer');
      return;
    }

    setSubmitting(true);
    try {
      await apiPost(`/api/interviews/${params.id}/responses`, {
        questionId: currentQuestion.id,
        transcript,
        duration: 0,
      });

      setTranscript('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        await apiPost(`/api/interviews/${params.id}/finalize`, {});
        router.push(`/interviews/${params.id}`);
      }
    } catch (err) {
      console.error('Failed to submit response:', err);
      alert('Failed to submit response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="card p-6">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-10 w-72 mt-5" />
            <div className="skeleton h-4 w-52 mt-3" />
            <div className="skeleton h-4 w-40 mt-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 mt-3.5">
            <div className="card p-6">
              <div className="skeleton h-4 w-40" />
              <div className="skeleton h-28 w-full mt-4" />
            </div>
            <div className="card p-6">
              <div className="skeleton h-4 w-40" />
              <div className="skeleton h-28 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="card p-8 text-center">
            <div className="text-[13px] text-zinc-600">Interview not found.</div>
            <div className="mt-5">
              <Link href="/interviews" className="btn btn-ghost">
                <ArrowLeft size={14} />
                Back to interviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page-container">
        <div className="page-content max-w-4xl">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link href={`/interviews/${params.id}`} className="btn btn-ghost">
              <ArrowLeft size={14} />
              Back
            </Link>
          </div>

          <div className="card p-8">
            <div className="text-center">
              <h1 className="font-display text-[26px] font-bold text-zinc-100">Interview session</h1>
              <p className="text-[13px] text-zinc-400 mt-3">{interview.candidateName}</p>
              <p className="text-[12px] text-zinc-600 mt-1">Position: {interview.position}</p>
            </div>

            <div className="card-elevated p-5 mt-8">
              <div className="text-[12px] font-semibold text-zinc-100">Instructions</div>
              <ul className="list-disc list-inside space-y-2 text-[12px] text-zinc-400 mt-3">
                <li>You will be asked 5 questions about the role.</li>
                <li>Take your time to provide concrete examples.</li>
                <li>Responses are analyzed by the 7-agent swarm and reflexion loop.</li>
                <li>Average duration is 15–20 minutes.</li>
              </ul>
            </div>

            {voiceError && (
              <div className="mt-6 rounded-lg border border-rose-500/20 bg-rose-500/[0.06] px-4 py-3 text-[12px] text-rose-300">
                {voiceError}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-3.5 mt-6">
              <div className="card-elevated p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[12px] font-semibold text-zinc-100">Voice agent</div>
                    <p className="text-[11px] text-zinc-600 mt-1">LiveKit + Deepgram transcripts</p>
                  </div>
                  <div className={`status-dot ${voiceStatus === 'active' ? 'live' : 'idle'}`} />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void startVoiceSession(interview).catch(() => {});
                  }}
                  disabled={voiceStatus !== 'idle'}
                  className="btn btn-primary mt-5 w-full justify-center"
                >
                  <Mic size={14} />
                  {voiceStatus === 'starting'
                    ? 'Starting voice agent…'
                    : voiceStatus === 'active'
                    ? 'Voice agent active'
                    : 'Start voice agent'}
                </button>

                {voiceSession && (
                  <p className="mt-4 text-[10px] text-zinc-600 font-mono">Room: {voiceSession.roomUrl}</p>
                )}
              </div>

              <div className="card-elevated p-5">
                <div className="text-[12px] font-semibold text-zinc-100">Clone a voice</div>
                <p className="text-[11px] text-zinc-600 mt-1">
                  Optional: create a new voice profile from a sample.
                </p>

                <form className="space-y-3 mt-4" onSubmit={handleCloneVoice}>
                  <input
                    type="text"
                    placeholder="Voice name"
                    value={cloneForm.voiceName}
                    onChange={(e) => updateCloneField('voiceName', e.target.value)}
                    className="input"
                  />
                  <input
                    type="url"
                    placeholder="Sample audio URL"
                    value={cloneForm.sampleUrl}
                    onChange={(e) => updateCloneField('sampleUrl', e.target.value)}
                    className="input"
                  />
                  <textarea
                    placeholder="Describe the tone (optional)"
                    value={cloneForm.description}
                    onChange={(e) => updateCloneField('description', e.target.value)}
                    rows={3}
                    className="input"
                  />
                  <button
                    type="submit"
                    disabled={cloneStatus === 'submitting'}
                    className="btn btn-ghost w-full justify-center"
                  >
                    {cloneStatus === 'submitting' ? 'Cloning…' : 'Clone voice'}
                  </button>
                </form>

                {cloneResponse && (
                  <div className="mt-4 text-[10px] text-emerald-300 font-mono">
                    Voice ID: {cloneResponse.voiceId} · status: {cloneResponse.status}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={startInterview}
                disabled={starting}
                className="btn btn-primary px-10 py-4 text-[15px]"
              >
                <Play size={14} />
                {starting
                  ? 'Starting…'
                  : interview.status === 'IN_PROGRESS'
                  ? 'Continue interview'
                  : 'Start interview'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link href={`/interviews/${params.id}`} className="btn btn-ghost">
            <ArrowLeft size={14} />
            Back
          </Link>
          <div className="font-mono text-[11px] text-zinc-600">
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-zinc-600 font-mono">{Math.round(progress)}% complete</span>
            <span className="text-[11px] text-zinc-600 font-mono">{questions.length} total</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-3.5">
          <div className="lg:col-span-2 card p-6">
            <div>
              <span className="badge badge-scheduled">{currentQuestion.category}</span>
              <h2 className="font-display text-[18px] font-bold text-zinc-100 mt-4">
                {currentQuestion.content}
              </h2>
              {currentQuestion.skillTags && currentQuestion.skillTags.length > 0 ? (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {currentQuestion.skillTags.map((tag, idx) => (
                    <span key={`${tag}-${idx}`} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              <label className="text-[11px] text-zinc-500 font-medium">Your answer</label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="input mt-2"
                rows={10}
                placeholder="Type your answer here…"
              />
              <div className="mt-2 text-[10px] text-zinc-600 font-mono">
                {transcript.split(' ').filter(Boolean).length} words
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 mt-6">
              <div className="text-[11px] text-zinc-600">
                Tip: be specific and provide examples from your experience.
              </div>
              <button
                type="button"
                onClick={submitResponse}
                disabled={submitting || !transcript.trim()}
                className="btn btn-primary"
              >
                {submitting
                  ? 'Submitting…'
                  : currentQuestionIndex < questions.length - 1
                  ? 'Next question'
                  : 'Complete interview'}
              </button>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[12px] font-semibold text-zinc-100">Voice agent</div>
                  <p className="text-[11px] text-zinc-600 mt-1">LiveKit + Deepgram session</p>
                </div>
                <div className={`status-dot ${voiceStatus === 'active' ? 'live' : 'idle'}`} />
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    void startVoiceSession().catch(() => {});
                  }}
                  disabled={voiceStatus !== 'idle'}
                  className="btn btn-primary flex-1 justify-center"
                >
                  <Mic size={14} />
                  {voiceStatus === 'active' ? 'Running' : 'Start'}
                </button>
                <button
                  type="button"
                  onClick={endVoiceSession}
                  disabled={voiceStatus !== 'active'}
                  className="btn btn-ghost flex-1 justify-center"
                >
                  <Square size={14} />
                  Stop
                </button>
              </div>

              {voiceSession && (
                <div className="text-[10px] text-zinc-600 font-mono mt-4">
                  Room: {voiceSession.roomUrl}
                </div>
              )}
            </div>

            <div className="card p-6">
              <div className="text-[12px] font-semibold text-zinc-100">Live transcript</div>
              <p className="text-[11px] text-zinc-600 mt-1">Updates every few seconds</p>

              {voiceTranscripts.length === 0 ? (
                <p className="text-[12px] text-zinc-600 mt-4">No transcript yet.</p>
              ) : (
                <div className="max-h-56 overflow-y-auto space-y-3 mt-4">
                  {voiceTranscripts.map((t, idx) => (
                    <div key={t.timestamp || idx} className="transcript-entry">
                      <p>{t.text}</p>
                      {typeof t.confidence === 'number' ? (
                        <span className="transcript-confidence">
                          confidence {(t.confidence * 100).toFixed(1)}%
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}

              {fullTranscript ? (
                <div className="mt-4 text-[10px] text-zinc-600 font-mono truncate">
                  Full: {fullTranscript}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="card p-6 mt-3.5">
          <div className="text-[12px] font-semibold text-zinc-100">Interview details</div>
          <div className="grid grid-cols-2 gap-4 text-[12px] mt-4">
            <div>
              <div className="text-zinc-600">Candidate</div>
              <div className="text-zinc-200 mt-1">{interview.candidateName}</div>
            </div>
            <div>
              <div className="text-zinc-600">Position</div>
              <div className="text-zinc-200 mt-1">{interview.position}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
