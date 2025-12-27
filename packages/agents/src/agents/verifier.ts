import { BaseAgent } from './base-agent';
import { 
  AgentInput, 
  AgentOutput, 
  VerifierInput, 
  VerifierOutput,
  AnalyzerOutput,
  TaggerOutput,
  ScorerOutput,
  ContextKnowledge
} from '@warmscreen/shared';

export interface VerificationCheck {
  name: string;
  passed: boolean;
  message: string;
}

export interface VerificationResult {
  verified: boolean;
  checks: VerificationCheck[];
  issuesFound: number;
  recommendations: string[];
}

/**
 * Verifier Agent - Enhanced with three-stage verification
 * Stage 1: Consistency Check - Validates agent agreement
 * Stage 2: Factual Audit - Checks for technical inaccuracies
 * Stage 3: Reflexion Decision - Determines if refinement needed
 */
export class VerifierAgent extends BaseAgent {
  // Configuration constants
  private static readonly CONFIDENCE_PENALTIES = {
    SCORE_TAG_MISALIGNMENT: 0.35,
    AGENT_DISAGREEMENT_BASE: 0.15,
    FACTUAL_ERROR: 0.25,
    LOW_COVERAGE_MULTIPLIER: 0.1,
    SHORT_TRANSCRIPT: 0.2,
  } as const;

  private static readonly THRESHOLDS = {
    HIGH_SCORE: 0.8,
    LOW_CONFIDENCE: 0.8,
    AGENT_DISAGREEMENT: 0.2,
    SHORT_TRANSCRIPT_LENGTH: 50,
  } as const;

  // Related terms for concept matching
  private static readonly RELATED_TERMS: Record<string, string[]> = {
    'one-way binding': ['unidirectional', 'one way', 'single direction', 'props down'],
    'two-way binding': ['bidirectional', 'two way', 'both directions', 'v-model'],
    'component': ['components', 'ui element', 'widget'],
    'state management': ['state', 'redux', 'store', 'vuex'],
  };

  // Factual contradiction patterns
  private static readonly CONTRADICTIONS: Record<string, string[]> = {
    'React does not support two-way binding': ['two-way', 'bidirectional'],
    'Vue does not support one-way binding': ['one-way', 'unidirectional'],
  };

  constructor() {
    super('VERIFIER');
  }

  /**
   * Main execute method supporting both legacy and new input formats
   */
  async execute(input: VerifierInput | AgentInput): Promise<VerifierOutput | AgentOutput> {
    if (this.isVerifierInput(input)) {
      return this.executeVerification(input);
    }
    return this.executeLegacy(input);
  }

  /**
   * Type guard to discriminate input types
   */
  private isVerifierInput(input: any): input is VerifierInput {
    return 'candidateTranscript' in input && 'contextKnowledge' in input;
  }

  /**
   * Legacy execution path for backward compatibility
   */
  private async executeLegacy(input: AgentInput): Promise<AgentOutput> {
    const { context, previousOutput, reflexionLoop = 0 } = input;
    const { agentOutputs } = context;

    try {
      const verification = await this.verifyOutputs(agentOutputs);
      const confidence = this.calculateVerificationConfidence(verification);

      const output = this.createOutput(verification, confidence, {
        checksPerformed: verification.checks.length,
      }, reflexionLoop);

      if (output.shouldReflect && reflexionLoop < this.maxReflexionLoops) {
        return this.reflect(output, input);
      }

      return output;
    } catch (error) {
      console.error('[VerifierAgent] Legacy execution failed:', error);
      
      return this.createOutput(
        {
          verified: false,
          checks: [],
          issuesFound: 1,
          recommendations: ['Verification failed due to error'],
        },
        0,
        { error: error instanceof Error ? error.message : 'Unknown error' },
        reflexionLoop
      );
    }
  }

  /**
   * Enhanced three-stage verification process
   */
  private async executeVerification(input: VerifierInput): Promise<VerifierOutput> {
    try {
      // Input validation
      this.validateInput(input);

      const { candidateTranscript, question, contextKnowledge, agentOutputs } = input;

      // Stage 1: Consistency Check
      const consistencyResult = this.performConsistencyCheck(agentOutputs, candidateTranscript);

      // Stage 2: Factual Audit
      const factualResult = this.performFactualAudit(candidateTranscript, contextKnowledge);

      // Stage 3: Reflexion Decision
      const reflexionDecision = this.generateReflexionDecision(
        consistencyResult,
        factualResult,
        agentOutputs,
        candidateTranscript
      );

      return reflexionDecision;
    } catch (error) {
      console.error('[VerifierAgent] Execution failed:', error);
      
      // Return safe fallback instead of crashing
      return {
        confidence_score: 0,
        is_consistent: false,
        is_accurate: false,
        reflexion_required: true,
        critique_reasoning: `Verification failed due to error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        recommended_refinement: {
          agent_to_refine: 'None',
          critique_prompt_injection: 'Critical error occurred during verification.',
        },
      };
    }
  }

  /**
   * Validates input structure and types
   */
  private validateInput(input: VerifierInput): void {
    // Validate agentOutputs structure
    if (!input.agentOutputs?.analyzer || !input.agentOutputs?.tagger || !input.agentOutputs?.scorer) {
      throw new Error('Invalid agentOutputs: missing required agent outputs');
    }

    // Validate analyzer output
    if (typeof input.agentOutputs.analyzer.score !== 'number' || 
        typeof input.agentOutputs.analyzer.confidence !== 'number') {
      throw new Error('Invalid analyzer output: score and confidence must be numbers');
    }

    // Validate tagger output
    if (!Array.isArray(input.agentOutputs.tagger.tags)) {
      throw new Error('Invalid tagger output: tags must be an array');
    }

    // Validate scorer output
    if (typeof input.agentOutputs.scorer.score !== 'number') {
      throw new Error('Invalid scorer output: score must be a number');
    }

    // Validate required string fields
    if (typeof input.candidateTranscript !== 'string' || !input.candidateTranscript) {
      throw new Error('Invalid input: candidateTranscript must be a non-empty string');
    }

    if (typeof input.question !== 'string' || !input.question) {
      throw new Error('Invalid input: question must be a non-empty string');
    }

    // Validate contextKnowledge
    if (!input.contextKnowledge || typeof input.contextKnowledge !== 'object') {
      throw new Error('Invalid input: contextKnowledge must be an object');
    }

    if (!Array.isArray(input.contextKnowledge.expectedConcepts)) {
      throw new Error('Invalid contextKnowledge: expectedConcepts must be an array');
    }

    if (!Array.isArray(input.contextKnowledge.idealResponseCharacteristics)) {
      throw new Error('Invalid contextKnowledge: idealResponseCharacteristics must be an array');
    }

    if (!Array.isArray(input.contextKnowledge.keyFacts)) {
      throw new Error('Invalid contextKnowledge: keyFacts must be an array');
    }
  }

  /**
   * Stage 1: Consistency Check
   * Validates alignment between agent outputs
   */
  private performConsistencyCheck(
    agentOutputs: { analyzer: AnalyzerOutput; tagger: TaggerOutput; scorer: ScorerOutput },
    transcript: string
  ): { isConsistent: boolean; issues: string[] } {
    try {
      const issues: string[] = [];

      // Check score-tag alignment
      const hasHighScore = agentOutputs.analyzer.score > VerifierAgent.THRESHOLDS.HIGH_SCORE;
      const hasNegativeTags = this.hasNegativeTags(agentOutputs.tagger.tags);

      if (hasHighScore && hasNegativeTags) {
        issues.push('High analyzer score conflicts with negative tags');
      }

      // Check agent agreement
      const scores = [
        agentOutputs.analyzer.score,
        agentOutputs.scorer.score / 10, // Normalize to 0-1 range
      ];

      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const hasDisagreement = scores.some(s => Math.abs(s - avgScore) > VerifierAgent.THRESHOLDS.AGENT_DISAGREEMENT);

      if (hasDisagreement) {
        issues.push('Significant disagreement between analyzer and scorer');
      }

      // Check for short transcript
      if (transcript.length < VerifierAgent.THRESHOLDS.SHORT_TRANSCRIPT_LENGTH) {
        issues.push('Transcript too short for reliable verification');
      }

      return {
        isConsistent: issues.length === 0,
        issues,
      };
    } catch (error) {
      console.error('[VerifierAgent] Consistency check failed:', error);
      return {
        isConsistent: false,
        issues: ['Error during consistency check'],
      };
    }
  }

  /**
   * Stage 2: Factual Audit
   * Checks for technical inaccuracies against known facts
   */
  private performFactualAudit(
    candidateTranscript: string,
    contextKnowledge: ContextKnowledge
  ): { isAccurate: boolean; errors: string[] } {
    try {
      const errors: string[] = [];

      // Cache lowercased transcript for performance
      const lowerTranscript = candidateTranscript.toLowerCase();

      // Check for contradictions
      for (const [fact, keywords] of Object.entries(VerifierAgent.CONTRADICTIONS)) {
        const hasKeywords = keywords.some(kw => lowerTranscript.includes(kw.toLowerCase()));
        if (hasKeywords) {
          const isPositiveAssertion = this.checkPositiveAssertion(lowerTranscript, fact);
          if (isPositiveAssertion) {
            errors.push(`Factual error: ${fact}`);
          }
        }
      }

      // Check concept coverage
      const expectedConcepts = contextKnowledge.expectedConcepts || [];
      const mentionedConcepts = expectedConcepts.filter(concept => 
        lowerTranscript.includes(concept.toLowerCase()) || 
        this.hasRelatedTerm(lowerTranscript, concept)
      );

      const coverage = expectedConcepts.length > 0 
        ? mentionedConcepts.length / expectedConcepts.length 
        : 1;

      if (coverage < 0.3) {
        errors.push(`Low concept coverage: only ${Math.round(coverage * 100)}% of expected concepts mentioned`);
      }

      return {
        isAccurate: errors.length === 0,
        errors,
      };
    } catch (error) {
      console.error('[VerifierAgent] Factual audit failed:', error);
      return {
        isAccurate: false,
        errors: ['Error during factual audit'],
      };
    }
  }

  /**
   * Stage 3: Generate Reflexion Decision
   * Determines if refinement is needed and which agent should refine
   */
  private generateReflexionDecision(
    consistencyResult: { isConsistent: boolean; issues: string[] },
    factualResult: { isAccurate: boolean; errors: string[] },
    agentOutputs: { analyzer: AnalyzerOutput; tagger: TaggerOutput; scorer: ScorerOutput },
    transcript: string
  ): VerifierOutput {
    try {
      let confidenceScore = 1.0;
      const critiques: string[] = [];

      // Apply penalties for issues
      if (!consistencyResult.isConsistent) {
        confidenceScore -= VerifierAgent.CONFIDENCE_PENALTIES.AGENT_DISAGREEMENT_BASE;
        critiques.push(...consistencyResult.issues);
      }

      if (!factualResult.isAccurate) {
        confidenceScore -= VerifierAgent.CONFIDENCE_PENALTIES.FACTUAL_ERROR;
        critiques.push(...factualResult.errors);
      }

      // Additional penalties
      const hasHighScore = agentOutputs.analyzer.score > VerifierAgent.THRESHOLDS.HIGH_SCORE;
      const hasNegativeTags = this.hasNegativeTags(agentOutputs.tagger.tags);

      if (hasHighScore && hasNegativeTags) {
        confidenceScore -= VerifierAgent.CONFIDENCE_PENALTIES.SCORE_TAG_MISALIGNMENT;
      }

      if (transcript.length < VerifierAgent.THRESHOLDS.SHORT_TRANSCRIPT_LENGTH) {
        confidenceScore -= VerifierAgent.CONFIDENCE_PENALTIES.SHORT_TRANSCRIPT;
      }

      // Ensure confidence is in valid range
      confidenceScore = Math.max(0, Math.min(1, confidenceScore));

      // Determine which agent needs refinement
      let agentToRefine = 'None';
      let critiquePrompt = '';

      if (!consistencyResult.isConsistent) {
        agentToRefine = 'Analyzer';
        critiquePrompt = `Re-evaluate the transcript considering: ${consistencyResult.issues.join('; ')}`;
      } else if (!factualResult.isAccurate) {
        agentToRefine = 'Analyzer';
        critiquePrompt = `Address factual concerns: ${factualResult.errors.join('; ')}`;
      }

      return {
        confidence_score: confidenceScore,
        is_consistent: consistencyResult.isConsistent,
        is_accurate: factualResult.isAccurate,
        reflexion_required: confidenceScore < VerifierAgent.THRESHOLDS.LOW_CONFIDENCE,
        critique_reasoning: critiques.length > 0 
          ? critiques.join('; ') 
          : 'All verification checks passed',
        recommended_refinement: {
          agent_to_refine: agentToRefine,
          critique_prompt_injection: critiquePrompt,
        },
      };
    } catch (error) {
      console.error('[VerifierAgent] Reflexion decision generation failed:', error);
      return {
        confidence_score: 0,
        is_consistent: false,
        is_accurate: false,
        reflexion_required: true,
        critique_reasoning: 'Error generating reflexion decision',
        recommended_refinement: {
          agent_to_refine: 'None',
          critique_prompt_injection: 'Error occurred during verification',
        },
      };
    }
  }

  /**
   * Check if tags contain negative indicators
   */
  private hasNegativeTags(tags: string[]): boolean {
    if (!tags || tags.length === 0) return false;

    const negativeTags = ['weak', 'poor', 'incomplete', 'unclear', 'incorrect'];
    const lowerTags = tags.map(t => t.toLowerCase());
    
    return negativeTags.some(neg => lowerTags.some(tag => tag.includes(neg)));
  }

  /**
   * Check if transcript has related terms for a concept
   */
  private hasRelatedTerm(transcript: string, concept: string): boolean {
    const related = VerifierAgent.RELATED_TERMS[concept.toLowerCase()] || [];
    return related.some(term => transcript.includes(term.toLowerCase()));
  }

  /**
   * Check if a fact is asserted positively (handling negations)
   */
  private checkPositiveAssertion(transcript: string, factWithNegation: string): boolean {
    // Support multiple negation patterns
    const patterns = [
      /(.+?)\s+does not\s+(.+)/i,
      /(.+?)\s+doesn't\s+(.+)/i,
      /(.+?)\s+cannot\s+(.+)/i,
      /(.+?)\s+can't\s+(.+)/i,
      /(.+?)\s+is not\s+(.+)/i,
      /(.+?)\s+isn't\s+(.+)/i,
    ];

    for (const pattern of patterns) {
      const match = factWithNegation.match(pattern);
      if (match) {
        const [, subject, action] = match;
        // Check if transcript asserts the opposite (positive assertion of negated fact)
        const positivePattern = new RegExp(`${subject}\\s+(does|can|is)\\s+${action}`, 'i');
        if (positivePattern.test(transcript)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Legacy verification for backward compatibility
   */
  private async verifyOutputs(agentOutputs: AgentOutput[]): Promise<VerificationResult> {
    try {
      if (!Array.isArray(agentOutputs) || agentOutputs.length === 0) {
        return {
          verified: false,
          checks: [],
          issuesFound: 1,
          recommendations: ['No agent outputs to verify'],
        };
      }

      const checks: VerificationCheck[] = [];
      
      // Check consistency across agents
      const confidences = agentOutputs.map(o => o.confidence);
      const avgConfidence = confidences.reduce((a, b) => a + b, 0) / confidences.length;
      checks.push({
        name: 'confidence_consistency',
        passed: confidences.every(c => Math.abs(c - avgConfidence) < 0.3),
        message: 'Agent confidences are consistent',
      });

      // Check for outliers
      const scores = agentOutputs
        .filter(o => o.result?.scores)
        .flatMap(o => Object.values(o.result.scores) as number[]);
      
      if (scores.length > 0) {
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        checks.push({
          name: 'score_validation',
          passed: scores.every(s => s >= 0 && s <= 10),
          message: 'All scores within valid range',
        });
      }

      const allChecksPassed = checks.every(c => c.passed);

      return {
        verified: allChecksPassed,
        checks,
        issuesFound: checks.filter(c => !c.passed).length,
        recommendations: allChecksPassed ? [] : ['Re-run agents with failed checks'],
      };
    } catch (error) {
      console.error('[VerifierAgent] verifyOutputs failed:', error);
      return {
        verified: false,
        checks: [],
        issuesFound: 1,
        recommendations: ['Error during verification'],
      };
    }
  }

  /**
   * Calculate verification confidence from check results
   */
  private calculateVerificationConfidence(verification: VerificationResult): number {
    const passedChecks = verification.checks.filter(c => c.passed).length;
    const totalChecks = verification.checks.length;
    return totalChecks > 0 ? passedChecks / totalChecks : 0.5;
  }
}
