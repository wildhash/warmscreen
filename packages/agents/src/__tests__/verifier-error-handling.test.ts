import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VerifierAgent } from '../agents/verifier';
import { 
  VerifierInput, 
  VerifierOutput, 
  AgentInput,
  AgentOutput 
} from '@warmscreen/shared';

describe('VerifierAgent - TDD-V008: Error Handling Tests', () => {
  let verifier: VerifierAgent;

  beforeEach(() => {
    verifier = new VerifierAgent();
  });

  describe('Error Scenarios', () => {
    it('should return safe fallback when verification throws unexpected error', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: ['test'],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: ['test'], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      // Mock the private method to throw an error
      const spy = vi.spyOn(verifier as any, 'performConsistencyCheck');
      spy.mockImplementation(() => {
        throw new Error('Unexpected error in consistency check');
      });

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
      expect((result as VerifierOutput).is_consistent).toBe(false);
      expect((result as VerifierOutput).is_accurate).toBe(false);
      expect((result as VerifierOutput).reflexion_required).toBe(true);
      expect((result as VerifierOutput).critique_reasoning).toContain('error');
      expect((result as VerifierOutput).recommended_refinement.agent_to_refine).toBe('None');
      
      spy.mockRestore();
    });

    it('should handle errors in consistency check gracefully', async () => {
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

      // Mock consistency check to throw
      const spy = vi.spyOn(verifier as any, 'performConsistencyCheck');
      spy.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
      expect((result as VerifierOutput).critique_reasoning).toContain('error');
      
      spy.mockRestore();
    });

    it('should handle errors in factual audit gracefully', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: ['test'],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      // Mock factual audit to throw
      const spy = vi.spyOn(verifier as any, 'performFactualAudit');
      spy.mockImplementation(() => {
        throw new Error('Pattern matching failed');
      });

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
      
      spy.mockRestore();
    });

    it('should handle errors in reflexion decision generation', async () => {
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

      // Mock reflexion decision to throw
      const spy = vi.spyOn(verifier as any, 'generateReflexionDecision');
      spy.mockImplementation(() => {
        throw new Error('Decision logic failed');
      });

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBe(0);
      
      spy.mockRestore();
    });

    it('should handle legacy format with errors gracefully', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as AgentOutput).confidence).toBeDefined();
      expect((result as AgentOutput).type).toBe('VERIFIER');
    });

    it('should log errors appropriately without exposing sensitive data', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const input: any = {
        candidateTranscript: 'SENSITIVE USER DATA',
        question: 'Test question',
        contextKnowledge: null, // This will cause validation error
      };

      await verifier.execute(input);
      
      expect(consoleSpy).toHaveBeenCalled();
      const loggedMessage = consoleSpy.mock.calls[0][0];
      expect(loggedMessage).not.toContain('SENSITIVE USER DATA');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Fallback Behavior', () => {
    it('should return structured error response with all required fields', async () => {
      const input: any = {
        candidateTranscript: null,
        question: null,
        contextKnowledge: null,
        agentOutputs: null,
      };

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBeDefined();
      expect((result as VerifierOutput).is_consistent).toBeDefined();
      expect((result as VerifierOutput).is_accurate).toBeDefined();
      expect((result as VerifierOutput).reflexion_required).toBeDefined();
      expect((result as VerifierOutput).critique_reasoning).toBeDefined();
      expect((result as VerifierOutput).recommended_refinement).toBeDefined();
      expect((result as VerifierOutput).recommended_refinement.agent_to_refine).toBeDefined();
      expect((result as VerifierOutput).recommended_refinement.critique_prompt_injection).toBeDefined();
    });

    it('should not crash process on null/undefined inputs', async () => {
      const inputs = [
        null,
        undefined,
        {},
        { candidateTranscript: null },
        { agentOutputs: null },
      ];

      for (const input of inputs) {
        const result = await verifier.execute(input as any);
        expect(result).toBeDefined();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long transcripts', async () => {
      const longTranscript = 'a'.repeat(100000);
      
      const input: VerifierInput = {
        candidateTranscript: longTranscript,
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
    });

    it('should handle unicode and special characters', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Test 测试 🚀 <script>alert("xss")</script>',
        question: 'Test question 问题',
        contextKnowledge: {
          expectedConcepts: ['test'],
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
    });

    it('should handle extreme score values', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 999, confidence: -10, analysis: 'Invalid' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: -999, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect(result).toBeDefined();
      expect((result as VerifierOutput).confidence_score).toBeGreaterThanOrEqual(0);
      expect((result as VerifierOutput).confidence_score).toBeLessThanOrEqual(1);
    });
  });
});
