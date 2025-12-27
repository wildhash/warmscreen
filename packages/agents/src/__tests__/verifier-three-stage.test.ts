import { describe, it, expect, beforeEach } from 'vitest';
import { VerifierAgent } from '../agents/verifier';
import { VerifierInput, VerifierOutput } from '@warmscreen/shared';

describe('VerifierAgent - Three-Stage Verification Logic', () => {
  let verifier: VerifierAgent;

  beforeEach(() => {
    verifier = new VerifierAgent();
  });

  describe('Stage 1: Consistency Check', () => {
    it('should detect score-tag misalignment', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'This is a test response about React',
        question: 'Explain React data binding',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.95, confidence: 0.9, analysis: 'Excellent' },
          tagger: { tags: ['weak', 'poor', 'incomplete'], confidence: 0.9 },
          scorer: { score: 9.5, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).is_consistent).toBe(false);
      expect((result as VerifierOutput).critique_reasoning).toContain('conflicts');
      expect((result as VerifierOutput).confidence_score).toBeLessThan(0.7);
    });

    it('should detect agent disagreement', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Test transcript',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.9, confidence: 0.9, analysis: 'Great' },
          tagger: { tags: ['excellent'], confidence: 0.9 },
          scorer: { score: 3, breakdown: {} }, // Low score conflicts with high analyzer score
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).is_consistent).toBe(false);
      expect((result as VerifierOutput).critique_reasoning).toContain('disagreement');
    });

    it('should detect short transcript issues', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Short', // Less than 50 characters
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
      
      expect((result as VerifierOutput).critique_reasoning).toContain('short');
    });

    it('should pass consistency check with aligned outputs', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React uses one-way data binding where data flows from parent to child components through props.',
        question: 'Explain React data binding',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good explanation' },
          tagger: { tags: ['technical', 'clear'], confidence: 0.9 },
          scorer: { score: 8.5, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).is_consistent).toBe(true);
    });
  });

  describe('Stage 2: Factual Audit', () => {
    it('should detect factual contradictions', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React supports two-way data binding out of the box',
        question: 'Explain React data binding',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: ['React does not support two-way binding'],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).is_accurate).toBe(false);
      expect((result as VerifierOutput).critique_reasoning).toContain('Factual');
    });

    it('should check concept coverage', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React is a JavaScript library for building user interfaces',
        question: 'Explain React data binding, component lifecycle, and state management',
        contextKnowledge: {
          expectedConcepts: ['data binding', 'lifecycle', 'state management', 'hooks', 'props'],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Incomplete' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 5, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).is_accurate).toBe(false);
      expect((result as VerifierOutput).critique_reasoning).toContain('coverage');
    });

    it('should recognize related terms', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React uses unidirectional data flow where information moves in a single direction',
        question: 'Explain one-way binding in React',
        contextKnowledge: {
          expectedConcepts: ['one-way binding'],
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
      
      // Should recognize 'unidirectional' as related to 'one-way binding'
      expect((result as VerifierOutput).is_accurate).toBe(true);
    });

    it('should pass factual audit with accurate content', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React uses one-way data binding with props and components for building UIs',
        question: 'Explain React basics',
        contextKnowledge: {
          expectedConcepts: ['one-way binding', 'props', 'component'],
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
      
      expect((result as VerifierOutput).is_accurate).toBe(true);
    });
  });

  describe('Stage 3: Reflexion Decision', () => {
    it('should require reflexion when confidence is low', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Test',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: ['concept1', 'concept2', 'concept3'],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.95, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: ['weak', 'poor'], confidence: 0.9 },
          scorer: { score: 2, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).reflexion_required).toBe(true);
      expect((result as VerifierOutput).confidence_score).toBeLessThan(0.8);
      expect((result as VerifierOutput).recommended_refinement.agent_to_refine).not.toBe('None');
    });

    it('should recommend analyzer refinement for consistency issues', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Test transcript with decent length to avoid short penalty',
        question: 'Test question',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.9, confidence: 0.9, analysis: 'Great' },
          tagger: { tags: ['excellent'], confidence: 0.9 },
          scorer: { score: 3, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).recommended_refinement.agent_to_refine).toBe('Analyzer');
      expect((result as VerifierOutput).recommended_refinement.critique_prompt_injection).toContain('Re-evaluate');
    });

    it('should recommend analyzer refinement for factual errors', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React supports two-way binding by default unlike Vue',
        question: 'Compare React and Vue',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: ['React does not support two-way binding'],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).recommended_refinement.agent_to_refine).toBe('Analyzer');
      expect((result as VerifierOutput).recommended_refinement.critique_prompt_injection).toContain('factual');
    });

    it('should not require reflexion when all checks pass', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React uses one-way data binding with props flowing from parent to child components through a unidirectional data flow.',
        question: 'Explain React data binding',
        contextKnowledge: {
          expectedConcepts: ['one-way binding', 'props', 'component'],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good explanation' },
          tagger: { tags: ['technical', 'clear'], confidence: 0.9 },
          scorer: { score: 8.5, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).is_consistent).toBe(true);
      expect((result as VerifierOutput).is_accurate).toBe(true);
      expect((result as VerifierOutput).reflexion_required).toBe(false);
      expect((result as VerifierOutput).confidence_score).toBeGreaterThanOrEqual(0.8);
      expect((result as VerifierOutput).critique_reasoning).toContain('passed');
    });
  });

  describe('Confidence Score Calculation', () => {
    it('should apply correct penalties', async () => {
      const baseInput: VerifierInput = {
        candidateTranscript: 'React uses one-way data binding with props',
        question: 'Explain React',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8.5, breakdown: {} },
        },
      };

      const baseResult = await verifier.execute(baseInput);
      const baseConfidence = (baseResult as VerifierOutput).confidence_score;

      // Test with score-tag misalignment
      const misalignedInput: VerifierInput = {
        ...baseInput,
        agentOutputs: {
          analyzer: { score: 0.95, confidence: 0.9, analysis: 'Excellent' },
          tagger: { tags: ['weak', 'poor'], confidence: 0.9 },
          scorer: { score: 9.5, breakdown: {} },
        },
      };

      const misalignedResult = await verifier.execute(misalignedInput);
      const misalignedConfidence = (misalignedResult as VerifierOutput).confidence_score;

      expect(misalignedConfidence).toBeLessThan(baseConfidence);
    });

    it('should ensure confidence is always between 0 and 1', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Bad',
        question: 'Test',
        contextKnowledge: {
          expectedConcepts: ['a', 'b', 'c', 'd', 'e'],
          idealResponseCharacteristics: [],
          keyFacts: [],
        },
        agentOutputs: {
          analyzer: { score: 0.95, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: ['weak', 'poor', 'incomplete'], confidence: 0.9 },
          scorer: { score: 2, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      
      expect((result as VerifierOutput).confidence_score).toBeGreaterThanOrEqual(0);
      expect((result as VerifierOutput).confidence_score).toBeLessThanOrEqual(1);
    });
  });

  describe('Negation Pattern Detection', () => {
    it('should detect "does not" patterns', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React does support two-way binding',
        question: 'Test',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: ['React does not support two-way binding'],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect((result as VerifierOutput).is_accurate).toBe(false);
    });

    it('should detect "cannot" patterns', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'Vue can use one-way binding',
        question: 'Test',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: ['Vue cannot use one-way binding'],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect((result as VerifierOutput).is_accurate).toBe(false);
    });

    it('should detect "isn\'t" patterns', async () => {
      const input: VerifierInput = {
        candidateTranscript: 'React is bidirectional',
        question: 'Test',
        contextKnowledge: {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: ['React isn\'t bidirectional'],
        },
        agentOutputs: {
          analyzer: { score: 0.85, confidence: 0.9, analysis: 'Good' },
          tagger: { tags: [], confidence: 0.9 },
          scorer: { score: 8, breakdown: {} },
        },
      };

      const result = await verifier.execute(input);
      expect((result as VerifierOutput).is_accurate).toBe(false);
    });
  });
});
