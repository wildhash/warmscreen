import { z } from 'zod';

// Agent Schemas
export const AgentInputSchema = z.object({
  type: z.enum(['ANALYZER', 'VERIFIER', 'PLANNER', 'CONDUCTOR', 'TAGGER', 'SCORER', 'NARRATOR']),
  context: z.any(),
  previousOutput: z.any().optional(),
  reflexionLoop: z.number().optional().default(0),
});

export const AgentOutputSchema = z.object({
  type: z.enum(['ANALYZER', 'VERIFIER', 'PLANNER', 'CONDUCTOR', 'TAGGER', 'SCORER', 'NARRATOR']),
  result: z.any(),
  confidence: z.number().min(0).max(1),
  metadata: z.any().optional(),
  shouldReflect: z.boolean().optional(),
  reflexionLoop: z.number(),
});

// Interview Schemas
export const CreateInterviewSchema = z.object({
  candidateName: z.string().min(1),
  candidateEmail: z.string().email(),
  position: z.string().min(1),
  scheduledAt: z.string().datetime(),
  recruiterId: z.string(),
});

export const UpdateInterviewSchema = z.object({
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  score: z.number().optional(),
  decision: z.enum(['STRONG_HIRE', 'HIRE', 'NO_HIRE', 'STRONG_NO_HIRE']).optional(),
  explainability: z.any().optional(),
});

// Question Schemas
export const CreateQuestionSchema = z.object({
  content: z.string().min(10),
  category: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']),
  position: z.string(),
  skillTags: z.array(z.string()),
  generatedBy: z.string().optional(),
  generationPrompt: z.string().optional(),
});

// Voice Schemas
export const AudioTranscriptSchema = z.object({
  text: z.string(),
  confidence: z.number().min(0).max(1),
  words: z.array(z.object({
    word: z.string(),
    start: z.number(),
    end: z.number(),
    confidence: z.number(),
  })).optional(),
  timestamp: z.number(),
});

// Proctoring Schemas
export const ProctoringSnapshotSchema = z.object({
  timestamp: z.number(),
  imageUrl: z.string().url(),
  flags: z.array(z.object({
    type: z.enum(['MULTIPLE_FACES', 'NO_FACE', 'LOOKING_AWAY', 'PHONE_DETECTED', 'SUSPICIOUS_ACTIVITY']),
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    timestamp: z.number(),
    description: z.string(),
  })),
  faceDetected: z.boolean(),
  attention: z.number().min(0).max(1),
});
