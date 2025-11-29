import { describe, it, expect } from 'vitest';
import {
  AgentInputSchema,
  AgentOutputSchema,
  CreateInterviewSchema,
  UpdateInterviewSchema,
  CreateQuestionSchema,
  AudioTranscriptSchema,
  ProctoringSnapshotSchema,
} from '../schemas';

describe('Schemas', () => {
  describe('AgentInputSchema', () => {
    it('should validate correct agent input', () => {
      const input = {
        type: 'ANALYZER',
        context: { transcript: 'Hello world' },
        previousOutput: null,
        reflexionLoop: 0,
      };
      expect(() => AgentInputSchema.parse(input)).not.toThrow();
    });

    it('should reject invalid agent type', () => {
      const input = {
        type: 'INVALID',
        context: {},
      };
      expect(() => AgentInputSchema.parse(input)).toThrow();
    });

    it('should accept all valid agent types', () => {
      const types = ['ANALYZER', 'VERIFIER', 'PLANNER', 'CONDUCTOR', 'TAGGER', 'SCORER', 'NARRATOR'];
      types.forEach((type) => {
        expect(() => AgentInputSchema.parse({ type, context: {} })).not.toThrow();
      });
    });
  });

  describe('AgentOutputSchema', () => {
    it('should validate correct agent output', () => {
      const output = {
        type: 'SCORER',
        result: { score: 85 },
        confidence: 0.9,
        reflexionLoop: 1,
      };
      expect(() => AgentOutputSchema.parse(output)).not.toThrow();
    });

    it('should reject confidence outside 0-1', () => {
      const output = {
        type: 'SCORER',
        result: {},
        confidence: 1.5,
        reflexionLoop: 0,
      };
      expect(() => AgentOutputSchema.parse(output)).toThrow();
    });
  });

  describe('CreateInterviewSchema', () => {
    it('should validate correct interview creation data', () => {
      const data = {
        candidateName: 'John Doe',
        candidateEmail: 'john@example.com',
        position: 'Software Engineer',
        scheduledAt: '2024-12-01T10:00:00Z',
      };
      expect(() => CreateInterviewSchema.parse(data)).not.toThrow();
    });

    it('should reject empty candidate name', () => {
      const data = {
        candidateName: '',
        candidateEmail: 'john@example.com',
        position: 'Software Engineer',
        scheduledAt: '2024-12-01T10:00:00Z',
      };
      expect(() => CreateInterviewSchema.parse(data)).toThrow();
    });

    it('should reject invalid email', () => {
      const data = {
        candidateName: 'John Doe',
        candidateEmail: 'not-an-email',
        position: 'Software Engineer',
        scheduledAt: '2024-12-01T10:00:00Z',
      };
      expect(() => CreateInterviewSchema.parse(data)).toThrow();
    });

    it('should accept optional recruiterId', () => {
      const data = {
        candidateName: 'John Doe',
        candidateEmail: 'john@example.com',
        position: 'Software Engineer',
        scheduledAt: '2024-12-01T10:00:00Z',
        recruiterId: 'recruiter-123',
      };
      expect(() => CreateInterviewSchema.parse(data)).not.toThrow();
    });
  });

  describe('UpdateInterviewSchema', () => {
    it('should validate partial update', () => {
      const data = { status: 'IN_PROGRESS' };
      expect(() => UpdateInterviewSchema.parse(data)).not.toThrow();
    });

    it('should validate all update fields', () => {
      const data = {
        status: 'COMPLETED',
        startedAt: '2024-12-01T10:00:00Z',
        completedAt: '2024-12-01T11:00:00Z',
        score: 85.5,
        decision: 'HIRE',
        explainability: { summary: 'Good candidate' },
      };
      expect(() => UpdateInterviewSchema.parse(data)).not.toThrow();
    });

    it('should reject invalid status', () => {
      expect(() => UpdateInterviewSchema.parse({ status: 'INVALID' })).toThrow();
    });

    it('should accept valid decision values', () => {
      const decisions = ['STRONG_HIRE', 'HIRE', 'NO_HIRE', 'STRONG_NO_HIRE'];
      decisions.forEach((decision) => {
        expect(() => UpdateInterviewSchema.parse({ decision })).not.toThrow();
      });
    });
  });

  describe('CreateQuestionSchema', () => {
    it('should validate correct question data', () => {
      const data = {
        content: 'Explain the concept of closures in JavaScript.',
        category: 'technical',
        difficulty: 'MEDIUM',
        position: 'Software Engineer',
        skillTags: ['javascript', 'closures'],
      };
      expect(() => CreateQuestionSchema.parse(data)).not.toThrow();
    });

    it('should reject content that is too short', () => {
      const data = {
        content: 'Short',
        category: 'technical',
        difficulty: 'MEDIUM',
        position: 'Engineer',
        skillTags: [],
      };
      expect(() => CreateQuestionSchema.parse(data)).toThrow();
    });

    it('should accept all difficulty levels', () => {
      const difficulties = ['EASY', 'MEDIUM', 'HARD', 'EXPERT'];
      difficulties.forEach((difficulty) => {
        const data = {
          content: 'This is a valid question with enough content.',
          category: 'technical',
          difficulty,
          position: 'Engineer',
          skillTags: [],
        };
        expect(() => CreateQuestionSchema.parse(data)).not.toThrow();
      });
    });

    it('should accept optional fields', () => {
      const data = {
        content: 'This is a valid question with enough content.',
        category: 'technical',
        difficulty: 'MEDIUM',
        position: 'Engineer',
        skillTags: ['skill1'],
        generatedBy: 'agent',
        generationPrompt: 'Generate a technical question',
      };
      expect(() => CreateQuestionSchema.parse(data)).not.toThrow();
    });
  });

  describe('AudioTranscriptSchema', () => {
    it('should validate correct transcript data', () => {
      const data = {
        text: 'Hello, this is a test transcript.',
        confidence: 0.95,
        timestamp: Date.now(),
      };
      expect(() => AudioTranscriptSchema.parse(data)).not.toThrow();
    });

    it('should accept optional words array', () => {
      const data = {
        text: 'Hello world',
        confidence: 0.9,
        timestamp: Date.now(),
        words: [
          { word: 'Hello', start: 0, end: 0.5, confidence: 0.95 },
          { word: 'world', start: 0.5, end: 1.0, confidence: 0.92 },
        ],
      };
      expect(() => AudioTranscriptSchema.parse(data)).not.toThrow();
    });

    it('should reject confidence outside 0-1', () => {
      const data = {
        text: 'Hello',
        confidence: 1.5,
        timestamp: Date.now(),
      };
      expect(() => AudioTranscriptSchema.parse(data)).toThrow();
    });
  });

  describe('ProctoringSnapshotSchema', () => {
    it('should validate correct snapshot data', () => {
      const data = {
        timestamp: Date.now(),
        imageUrl: 'https://example.com/snapshot.jpg',
        flags: [],
        faceDetected: true,
        attention: 0.95,
      };
      expect(() => ProctoringSnapshotSchema.parse(data)).not.toThrow();
    });

    it('should validate snapshot with flags', () => {
      const data = {
        timestamp: Date.now(),
        imageUrl: 'https://example.com/snapshot.jpg',
        flags: [
          {
            type: 'LOOKING_AWAY',
            severity: 'LOW',
            timestamp: Date.now(),
            description: 'Candidate looked away briefly',
          },
        ],
        faceDetected: true,
        attention: 0.7,
      };
      expect(() => ProctoringSnapshotSchema.parse(data)).not.toThrow();
    });

    it('should reject invalid flag type', () => {
      const data = {
        timestamp: Date.now(),
        imageUrl: 'https://example.com/snapshot.jpg',
        flags: [
          {
            type: 'INVALID_FLAG',
            severity: 'LOW',
            timestamp: Date.now(),
            description: 'Test',
          },
        ],
        faceDetected: true,
        attention: 0.5,
      };
      expect(() => ProctoringSnapshotSchema.parse(data)).toThrow();
    });

    it('should accept all valid flag types', () => {
      const flagTypes = ['MULTIPLE_FACES', 'NO_FACE', 'LOOKING_AWAY', 'PHONE_DETECTED', 'SUSPICIOUS_ACTIVITY'];
      flagTypes.forEach((type) => {
        const data = {
          timestamp: Date.now(),
          imageUrl: 'https://example.com/snapshot.jpg',
          flags: [
            { type, severity: 'MEDIUM', timestamp: Date.now(), description: 'Test' },
          ],
          faceDetected: true,
          attention: 0.5,
        };
        expect(() => ProctoringSnapshotSchema.parse(data)).not.toThrow();
      });
    });

    it('should reject attention outside 0-1', () => {
      const data = {
        timestamp: Date.now(),
        imageUrl: 'https://example.com/snapshot.jpg',
        flags: [],
        faceDetected: true,
        attention: 1.5,
      };
      expect(() => ProctoringSnapshotSchema.parse(data)).toThrow();
    });
  });
});
