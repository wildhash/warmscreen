import { describe, it, expect, beforeEach } from 'vitest';
import { VerifierAgent } from '../agents/verifier';
import { AgentInput, AgentOutput } from '@warmscreen/shared';

describe('VerifierAgent - Backward Compatibility', () => {
  let verifier: VerifierAgent;

  beforeEach(() => {
    verifier = new VerifierAgent();
  });

  describe('Legacy Format Support', () => {
    it('should process legacy AgentInput format', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [
            {
              type: 'ANALYZER',
              result: { score: 8, analysis: 'Good' },
              confidence: 0.9,
              reflexionLoop: 0,
            },
            {
              type: 'TAGGER',
              result: { tags: ['technical'], scores: { technical: 8 } },
              confidence: 0.85,
              reflexionLoop: 0,
            },
          ],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as AgentOutput).type).toBe('VERIFIER');
      expect((result as AgentOutput).confidence).toBeDefined();
      expect((result as AgentOutput).result).toBeDefined();
      expect((result as AgentOutput).reflexionLoop).toBe(0);
    });

    it('should handle legacy format with empty agent outputs', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as AgentOutput).type).toBe('VERIFIER');
      expect((result as AgentOutput).result.verified).toBe(false);
    });

    it('should handle legacy format with scores', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [
            {
              type: 'SCORER',
              result: { scores: { technical: 8, communication: 7, clarity: 9 } },
              confidence: 0.9,
              reflexionLoop: 0,
            },
            {
              type: 'ANALYZER',
              result: { scores: { overall: 8 } },
              confidence: 0.85,
              reflexionLoop: 0,
            },
          ],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as AgentOutput).result.checks).toBeDefined();
      expect((result as AgentOutput).result.checks.length).toBeGreaterThan(0);
    });

    it('should trigger reflexion loop in legacy format when confidence is low', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [
            {
              type: 'ANALYZER',
              result: { score: 3 },
              confidence: 0.4,
              reflexionLoop: 0,
            },
            {
              type: 'TAGGER',
              result: { tags: [] },
              confidence: 0.3,
              reflexionLoop: 0,
            },
          ],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as AgentOutput).shouldReflect).toBe(true);
    });
  });

  describe('Type Guard', () => {
    it('should correctly identify VerifierInput', async () => {
      const verifierInput = {
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

      const result = await verifier.execute(verifierInput);
      
      // Should use new format
      expect(result).toBeDefined();
      expect('confidence_score' in result).toBe(true);
    });

    it('should correctly identify AgentInput', async () => {
      const agentInput: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(agentInput);
      
      // Should use legacy format
      expect(result).toBeDefined();
      expect('type' in result).toBe(true);
      expect((result as AgentOutput).type).toBe('VERIFIER');
    });
  });

  describe('Mixed Format Scenarios', () => {
    it('should handle input with both legacy and new properties gracefully', async () => {
      // This represents a transitional state where both formats might be present
      const mixedInput: any = {
        type: 'VERIFIER',
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        context: {
          agentOutputs: [],
        },
      };

      const result = await verifier.execute(mixedInput);
      
      expect(result).toBeDefined();
    });
  });

  describe('Legacy Error Handling', () => {
    it('should handle errors in legacy format gracefully', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [
            {
              type: 'ANALYZER',
              result: null, // Invalid result
              confidence: 0.9,
              reflexionLoop: 0,
            },
          ],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
      expect((result as AgentOutput).confidence).toBeGreaterThanOrEqual(0);
      expect((result as AgentOutput).confidence).toBeLessThanOrEqual(1);
    });

    it('should not crash when legacy format has undefined scores', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [
            {
              type: 'SCORER',
              result: { scores: undefined },
              confidence: 0.9,
              reflexionLoop: 0,
            },
          ],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect(result).toBeDefined();
    });
  });

  describe('Confidence Calculation - Legacy', () => {
    it('should calculate confidence correctly for legacy format', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [
            {
              type: 'ANALYZER',
              result: { scores: { technical: 8 } },
              confidence: 0.9,
              reflexionLoop: 0,
            },
            {
              type: 'TAGGER',
              result: { scores: { clarity: 7 } },
              confidence: 0.85,
              reflexionLoop: 0,
            },
            {
              type: 'SCORER',
              result: { scores: { overall: 8 } },
              confidence: 0.88,
              reflexionLoop: 0,
            },
          ],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect((result as AgentOutput).confidence).toBeDefined();
      expect((result as AgentOutput).confidence).toBeGreaterThan(0);
      expect((result as AgentOutput).confidence).toBeLessThanOrEqual(1);
    });

    it('should handle no checks in legacy format', async () => {
      const input: AgentInput = {
        type: 'VERIFIER',
        context: {
          agentOutputs: [
            {
              type: 'CUSTOM',
              result: {},
              confidence: 0.9,
              reflexionLoop: 0,
            },
          ],
        },
        reflexionLoop: 0,
      };

      const result = await verifier.execute(input);
      
      expect((result as AgentOutput).confidence).toBe(0.5); // Default confidence
    });
  });
});
