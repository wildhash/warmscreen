import { describe, it, expect, beforeEach } from 'vitest';
import { VerifierAgent } from '../agents/verifier';
import { 
  VerifierInput, 
  VerifierOutput, 
  AgentInput 
} from '@warmscreen/shared';

describe('VerifierAgent - TDD-V007: Malformed Input Tests', () => {
  let verifier: VerifierAgent;

  beforeEach(() => {
    verifier = new VerifierAgent();
  });

  describe('Input Validation', () => {
    it('should throw error when agentOutputs is missing', async () => {
      const input = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
      } as any;

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
      expect((result as VerifierOutput).is_consistent).toBe(false);
    });

    it('should throw error when analyzer output is missing', async () => {
      const input: any = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });

    it('should throw error when tagger output is missing', async () => {
      const input: any = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });

    it('should throw error when scorer output is missing', async () => {
      const input: any = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });

    it('should throw error when analyzer.score is not a number', async () => {
      const input: any = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 'invalid', confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });

    it('should throw error when analyzer.confidence is not a number', async () => {
      const input: any = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 'invalid', analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });

    it('should throw error when tagger.tags is not an array', async () => {
      const input: any = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: 'invalid', confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });

    it('should throw error when scorer.score is not a number', async () => {
      const input: any = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 'invalid', breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });

    it('should throw error when candidateTranscript is empty', async () => {
      const input: any = {
        candidateTranscript: '',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });

    it('should throw error when contextKnowledge.expectedConcepts is not an array', async () => {
      const input: any = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: 'invalid',
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
    });
  });

  describe('Valid Input Processing', () => {
    it('should process valid input successfully', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React uses one-way data binding with props flowing down from parent to child components.',
        question: 'Explain data binding in React',
        contextKnowledge: {
          expectedConcepts: ['one-way binding', 'props', 'component'],
          idealResponseCharacteristics: ['clear', 'concise'],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good explanation' },
          tagger: { tags: ['technical', 'framework'], confidence: 0.9 },
          scorer: { score: 8.5, breakdown: { technical: 9, clarity: 8 } },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBeGreaterThan(0);
      expect((result as VerifierOutput).is_consistent).toBeDefined();
      expect((result as VerifierOutput).is_accurate).toBeDefined();
    });

    it('should handle empty arrays gracefully', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBeGreaterThan(0);
    });
  });
});
