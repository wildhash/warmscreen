import { 
  AnalyzerAgent, 
  VerifierAgent, 
  PlannerAgent, 
  TaggerAgent, 
  ScorerAgent, 
  NarratorAgent 
} from '../agents';
import { 
  AgentOutput, 
  AgentType, 
  VerifierOutput,
  AnalyzerOutput,
  TaggerOutput,
  ScorerOutput,
  ContextKnowledge
} from '@warmscreen/shared';
import { PrismaClient } from '@warmscreen/database';

/**
 * Conductor Agent - The Orchestrator
 * Coordinates all 7 agents and manages the reflexion loops
 */
export class ConductorAgent {
  private analyzer: AnalyzerAgent;
  private verifier: VerifierAgent;
  private planner: PlannerAgent;
  private tagger: TaggerAgent;
  private scorer: ScorerAgent;
  private narrator: NarratorAgent;
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.analyzer = new AnalyzerAgent();
    this.verifier = new VerifierAgent();
    this.planner = new PlannerAgent();
    this.tagger = new TaggerAgent();
    this.scorer = new ScorerAgent();
    this.narrator = new NarratorAgent();
    this.db = db;
  }

  /**
   * Process a single interview response through the agent swarm
   */
  async processResponse(context: {
    interviewId: string;
    questionId: string;
    questionText: string;
    transcript: string;
    questionCategory: string;
    position: string;
  }): Promise<{
    analyzed: AgentOutput;
    tagged: AgentOutput;
    scored: AgentOutput;
    verified: VerifierOutput | AgentOutput;
  }> {
    // Step 1: Analyzer analyzes the response
    const analyzedOutput = await this.analyzer.execute({
      type: 'ANALYZER',
      context: {
        transcript: context.transcript,
        questionCategory: context.questionCategory,
      },
    });

    // Step 2: Tagger tags the response
    const taggedOutput = await this.tagger.execute({
      type: 'TAGGER',
      context: {
        transcript: context.transcript,
        questionCategory: context.questionCategory,
        position: context.position,
      },
    });

    // Step 3: Scorer scores the response
    const scoredOutput = await this.scorer.execute({
      type: 'SCORER',
      context: {
        responses: [{ 
          questionId: context.questionId,
          transcript: context.transcript,
          duration: 0,
        }],
        scoringModel: { weights: {} },
        position: context.position,
      },
    });

    // Step 4: Verifier verifies all outputs with enhanced verification
    // Try to use the new verification format if we have all required data
    let verifiedOutput: VerifierOutput | AgentOutput;
    
    try {
      // Retrieve context knowledge from database
      const contextKnowledge = await this.retrieveContextKnowledge(context.questionId);
      
      // Map agent outputs to typed structures
      const analyzerData = this.mapToAnalyzerOutput(analyzedOutput);
      const taggerData = this.mapToTaggerOutput(taggedOutput);
      const scorerData = this.mapToScorerOutput(scoredOutput);

      // Use new verification format
      verifiedOutput = await this.verifier.execute({
        candidateTranscript: context.transcript,
        question: context.questionText,
        contextKnowledge,
        agentOutputs: {
          analyzer: analyzerData,
          tagger: taggerData,
          scorer: scorerData,
        },
      });
    } catch (error) {
      console.error('[ConductorAgent] New verification format failed, falling back to legacy:', error);
      
      // Fall back to legacy format for backward compatibility
      verifiedOutput = await this.verifier.execute({
        type: 'VERIFIER',
        context: {
          agentOutputs: [analyzedOutput, taggedOutput, scoredOutput],
        },
      });
    }

    // Log agent actions
    await this.logAgentActions(context.interviewId, [
      analyzedOutput,
      taggedOutput,
      scoredOutput,
      verifiedOutput as AgentOutput,
    ]);

    return {
      analyzed: analyzedOutput,
      tagged: taggedOutput,
      scored: scoredOutput,
      verified: verifiedOutput,
    };
  }

  /**
   * Retrieve context knowledge for verification
   */
  private async retrieveContextKnowledge(questionId: string): Promise<ContextKnowledge> {
    try {
      const question = await this.db.question.findUnique({
        where: { id: questionId },
      });

      if (!question) {
        return {
          expectedConcepts: [],
          idealResponseCharacteristics: [],
          keyFacts: [],
        };
      }

      // Extract from question metadata if available (metadata field doesn't exist in schema yet)
      // For now, return empty arrays
      return {
        expectedConcepts: [],
        idealResponseCharacteristics: [],
        keyFacts: [],
      };
    } catch (error) {
      console.error('[ConductorAgent] Failed to retrieve context knowledge:', error);
      return {
        expectedConcepts: [],
        idealResponseCharacteristics: [],
        keyFacts: [],
      };
    }
  }

  /**
   * Map AgentOutput to AnalyzerOutput
   */
  private mapToAnalyzerOutput(output: AgentOutput): AnalyzerOutput {
    const result = output.result || {};
    return {
      score: result.score || result.overallScore || output.confidence || 0,
      confidence: output.confidence,
      analysis: result.analysis || result.summary || JSON.stringify(result),
    };
  }

  /**
   * Map AgentOutput to TaggerOutput
   */
  private mapToTaggerOutput(output: AgentOutput): TaggerOutput {
    const result = output.result || {};
    return {
      tags: result.tags || [],
      confidence: output.confidence,
    };
  }

  /**
   * Map AgentOutput to ScorerOutput
   */
  private mapToScorerOutput(output: AgentOutput): ScorerOutput {
    const result = output.result || {};
    return {
      score: result.overallScore || result.score || 0,
      breakdown: result.scores || {},
    };
  }

  /**
   * Plan the next question in the interview
   */
  async planNextQuestion(context: {
    interviewId: string;
    currentResponses: any[];
    availableQuestions: any[];
    position: string;
  }): Promise<AgentOutput> {
    const planOutput = await this.planner.execute({
      type: 'PLANNER',
      context,
    });

    await this.logAgentActions(context.interviewId, [planOutput]);

    return planOutput;
  }

  /**
   * Calculate final scores and generate decision
   */
  async finalizeInterview(context: {
    interviewId: string;
    responses: any[];
    scoringModel: any;
    position: string;
    candidateName: string;
  }): Promise<{
    scoring: AgentOutput;
    explanation: AgentOutput;
  }> {
    // Step 1: Calculate scores
    const scoringOutput = await this.scorer.execute({
      type: 'SCORER',
      context: {
        responses: context.responses,
        scoringModel: context.scoringModel,
        position: context.position,
      },
    });

    // Step 2: Get all agent outputs for this interview
    const agentOutputs = await this.getInterviewAgentOutputs(context.interviewId);

    // Step 3: Generate explanation
    const explanationOutput = await this.narrator.execute({
      type: 'NARRATOR',
      context: {
        decision: scoringOutput.result.decision,
        score: scoringOutput.result.overallScore,
        responses: context.responses,
        agentOutputs: [...agentOutputs, scoringOutput],
        candidateName: context.candidateName,
        position: context.position,
      },
    });

    // Log final agent actions
    await this.logAgentActions(context.interviewId, [scoringOutput, explanationOutput]);

    return {
      scoring: scoringOutput,
      explanation: explanationOutput,
    };
  }

  /**
   * Self-healing: Analyze patterns and update models
   */
  async performSelfHealing(interviewId: string): Promise<void> {
    // Get interview data
    const interview = await this.db.interview.findUnique({
      where: { id: interviewId },
      include: {
        responses: true,
        agentLogs: true,
        feedbackLoops: true,
      },
    });

    if (!interview) return;

    // Analyze agent performance
    const agentPerformance = this.analyzeAgentPerformance(interview.agentLogs);

    // Detect patterns
    const patterns = await this.detectPatterns(interview);

    // Create feedback loops for learning
    for (const pattern of patterns) {
      await this.db.feedbackLoop.create({
        data: {
          interviewId,
          feedbackType: 'PATTERN_DETECTED',
          signal: {
            pattern: pattern.name,
            strength: pattern.strength,
            category: pattern.category,
          },
          actionTaken: 'Pattern recorded for amplification',
        },
      });
    }

    // Store high-signal patterns
    for (const pattern of patterns.filter(p => p.strength > 0.7)) {
      await this.amplifyPattern(pattern);
    }
  }

  private async logAgentActions(
    interviewId: string,
    outputs: AgentOutput[]
  ): Promise<void> {
    for (const output of outputs) {
      await this.db.agentLog.create({
        data: {
          interviewId,
          agentType: output.type,
          action: 'execute',
          input: {},
          output: output.result,
          reflexionLoop: output.reflexionLoop,
          performanceScore: output.confidence,
        },
      });
    }
  }

  private async getInterviewAgentOutputs(interviewId: string): Promise<AgentOutput[]> {
    const logs = await this.db.agentLog.findMany({
      where: { interviewId },
      orderBy: { createdAt: 'asc' },
    });

    return logs.map((log: any) => ({
      type: log.agentType as AgentType,
      result: log.output,
      confidence: log.performanceScore || 0.5,
      reflexionLoop: log.reflexionLoop,
    }));
  }

  private analyzeAgentPerformance(logs: any[]): Record<AgentType, number> {
    const performance: Record<string, number[]> = {};

    logs.forEach(log => {
      if (!performance[log.agentType]) {
        performance[log.agentType] = [];
      }
      if (log.performanceScore) {
        performance[log.agentType].push(log.performanceScore);
      }
    });

    const avgPerformance: any = {};
    Object.entries(performance).forEach(([agent, scores]) => {
      avgPerformance[agent] = scores.reduce((a, b) => a + b, 0) / scores.length;
    });

    return avgPerformance;
  }

  private async detectPatterns(interview: any): Promise<any[]> {
    const patterns: any[] = [];

    // Pattern: High confidence across all agents
    const agentConfidences = interview.agentLogs.map((l: any) => l.performanceScore || 0);
    const avgConfidence = agentConfidences.reduce((a: number, b: number) => a + b, 0) / agentConfidences.length;
    
    if (avgConfidence > 0.8) {
      patterns.push({
        name: 'high_confidence_consensus',
        category: 'agent_performance',
        strength: avgConfidence,
      });
    }

    // Pattern: Consistent high scores
    const scores = interview.responses
      .filter((r: any) => r.scores)
      .flatMap((r: any) => Object.values(r.scores));
    
    if (scores.length > 0) {
      const avgScore = scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
      if (avgScore > 7.5) {
        patterns.push({
          name: 'strong_performance',
          category: 'candidate_quality',
          strength: avgScore / 10,
        });
      }
    }

    return patterns;
  }

  private async amplifyPattern(pattern: any): Promise<void> {
    // Check if pattern already exists
    const existing = await this.db.pattern.findFirst({
      where: { name: pattern.name },
    });

    if (existing) {
      // Update occurrence count and strength
      await this.db.pattern.update({
        where: { id: existing.id },
        data: {
          occurrences: existing.occurrences + 1,
          strength: (existing.strength + pattern.strength) / 2,
          amplified: pattern.strength > 0.8,
        },
      });
    } else {
      // Create new pattern
      await this.db.pattern.create({
        data: {
          name: pattern.name,
          description: `Detected pattern: ${pattern.name}`,
          category: pattern.category,
          signal: pattern,
          strength: pattern.strength,
          amplified: pattern.strength > 0.8,
        },
      });
    }
  }
}
