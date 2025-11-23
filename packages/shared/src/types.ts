// Agent Types
export type AgentType = 
  | 'ANALYZER' 
  | 'VERIFIER' 
  | 'PLANNER' 
  | 'CONDUCTOR' 
  | 'TAGGER' 
  | 'SCORER' 
  | 'NARRATOR';

export interface AgentInput {
  type: AgentType;
  context: any;
  previousOutput?: any;
  reflexionLoop?: number;
}

export interface AgentOutput {
  type: AgentType;
  result: any;
  confidence: number;
  metadata?: any;
  shouldReflect?: boolean;
  reflexionLoop: number;
}

// Interview Types
export interface InterviewSession {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  currentQuestionIndex: number;
  responses: InterviewResponse[];
  agentState: AgentState;
}

export interface InterviewResponse {
  questionId: string;
  transcript: string;
  audioUrl?: string;
  duration: number;
  scores?: Record<string, number>;
  tags?: string[];
  sentiment?: number;
}

export interface AgentState {
  currentAgent: AgentType;
  history: AgentOutput[];
  pendingReflexion: boolean;
}

// Voice Integration Types
export interface VoiceConfig {
  provider: 'livekit' | 'telnyx';
  roomName?: string;
  phoneNumber?: string;
  sttProvider: 'deepgram';
}

export interface AudioTranscript {
  text: string;
  confidence: number;
  words?: TranscriptWord[];
  timestamp: number;
}

export interface TranscriptWord {
  word: string;
  start: number;
  end: number;
  confidence: number;
}

// Proctoring Types
export interface ProctoringSnapshot {
  timestamp: number;
  imageUrl: string;
  flags: ProctoringFlag[];
  faceDetected: boolean;
  attention: number; // 0-1
}

export interface ProctoringFlag {
  type: 'MULTIPLE_FACES' | 'NO_FACE' | 'LOOKING_AWAY' | 'PHONE_DETECTED' | 'SUSPICIOUS_ACTIVITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  timestamp: number;
  description: string;
}

// Learning & Feedback Types
export interface QuestionFeedback {
  questionId: string;
  effectiveness: number; // 0-1
  avgScore: number;
  correlationWithSuccess: number;
  timesAsked: number;
}

export interface ScoringModelUpdate {
  position: string;
  weights: Record<string, number>;
  thresholds: Record<string, number>;
  accuracy: number;
  sampleSize: number;
}

// Export & Explainability Types
export interface InterviewDecision {
  decision: 'STRONG_HIRE' | 'HIRE' | 'NO_HIRE' | 'STRONG_NO_HIRE';
  score: number;
  explainability: DecisionExplanation;
}

export interface DecisionExplanation {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  keyFactors: KeyFactor[];
  scoringBreakdown: Record<string, number>;
  agentContributions: Record<AgentType, string>;
}

export interface KeyFactor {
  factor: string;
  impact: number; // -1 to 1
  evidence: string[];
}

// Pattern Recognition Types
export interface Pattern {
  id: string;
  name: string;
  category: string;
  signal: any;
  strength: number;
  successRate?: number;
  amplified: boolean;
}

export interface PatternMatch {
  pattern: Pattern;
  matchScore: number;
  context: any;
}
