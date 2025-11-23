import { BaseAgent } from './base-agent';
import { AgentInput, AgentOutput } from '@warmscreen/shared';
import { calculateAverageScore, normalizeScore } from '@warmscreen/shared';

/**
 * Scorer Agent
 * Calculates weighted scores based on position-specific scoring models
 */
export class ScorerAgent extends BaseAgent {
  constructor() {
    super('SCORER');
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { context, previousOutput, reflexionLoop = 0 } = input;
    const { responses, scoringModel, position } = context;

    const scoring = await this.calculateScores(responses, scoringModel);
    const confidence = this.calculateScoringConfidence(scoring, responses);

    const output = this.createOutput(scoring, confidence, {
      modelVersion: scoringModel?.version || 1,
    }, reflexionLoop);

    if (output.shouldReflect && reflexionLoop < this.maxReflexionLoops) {
      return this.reflect(output, input);
    }

    return output;
  }

  private async calculateScores(responses: any[], scoringModel: any): Promise<any> {
    // Default weights if no model provided
    const weights = scoringModel?.weights || {
      technical: 0.4,
      communication: 0.3,
      problemSolving: 0.2,
      cultural: 0.1,
    };

    const thresholds = scoringModel?.thresholds || {
      strong_hire: 85,
      hire: 70,
      no_hire: 55,
    };

    // Aggregate scores across all responses
    const aggregateScores: Record<string, number[]> = {};
    responses.forEach(response => {
      if (response.scores) {
        Object.entries(response.scores).forEach(([key, value]) => {
          if (!aggregateScores[key]) aggregateScores[key] = [];
          aggregateScores[key].push(value as number);
        });
      }
    });

    // Calculate averages
    const avgScores: Record<string, number> = {};
    Object.entries(aggregateScores).forEach(([key, values]) => {
      avgScores[key] = calculateAverageScore({ [key]: values.reduce((a, b) => a + b, 0) / values.length });
    });

    // Apply weights
    let weightedScore = 0;
    Object.entries(weights).forEach(([key, weight]) => {
      const score = avgScores[key] || 5;
      weightedScore += score * (weight as number);
    });

    weightedScore = normalizeScore(weightedScore * 10, 0, 100);

    // Determine decision
    let decision = 'NO_HIRE';
    if (weightedScore >= thresholds.strong_hire) decision = 'STRONG_HIRE';
    else if (weightedScore >= thresholds.hire) decision = 'HIRE';
    else if (weightedScore >= thresholds.no_hire) decision = 'NO_HIRE';
    else decision = 'STRONG_NO_HIRE';

    return {
      overallScore: weightedScore,
      componentScores: avgScores,
      decision,
      thresholds,
      weights,
    };
  }

  private calculateScoringConfidence(scoring: any, responses: any[]): number {
    // More responses = higher confidence
    const sampleConfidence = Math.min(responses.length / 8, 1);
    
    // Score variance analysis
    const scores = Object.values(scoring.componentScores) as number[];
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;
    const varianceConfidence = 1 - Math.min(variance / 10, 1);

    return (sampleConfidence + varianceConfidence) / 2;
  }
}
