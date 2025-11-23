import { BaseAgent } from './base-agent';
import { AgentInput, AgentOutput, DecisionExplanation } from '@warmscreen/shared';

/**
 * Narrator Agent
 * Generates human-readable explanations of interview outcomes and decisions
 */
export class NarratorAgent extends BaseAgent {
  constructor() {
    super('NARRATOR');
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { context, previousOutput, reflexionLoop = 0 } = input;
    const { 
      decision, 
      score, 
      responses, 
      agentOutputs,
      candidateName,
      position 
    } = context;

    const explanation = await this.generateExplanation(
      decision,
      score,
      responses,
      agentOutputs,
      candidateName,
      position
    );

    const confidence = this.calculateNarrationConfidence(explanation);

    const output = this.createOutput(explanation, confidence, {
      wordCount: explanation.summary.split(/\s+/).length,
    }, reflexionLoop);

    if (output.shouldReflect && reflexionLoop < this.maxReflexionLoops) {
      return this.reflect(output, input);
    }

    return output;
  }

  private async generateExplanation(
    decision: string,
    score: number,
    responses: any[],
    agentOutputs: AgentOutput[],
    candidateName: string,
    position: string
  ): Promise<DecisionExplanation> {
    // Generate summary
    const summary = this.generateSummary(candidateName, position, decision, score);

    // Extract strengths and weaknesses
    const { strengths, weaknesses } = this.extractStrengthsWeaknesses(responses, agentOutputs);

    // Identify key factors
    const keyFactors = this.identifyKeyFactors(agentOutputs);

    // Create scoring breakdown
    const scoringBreakdown = this.createScoringBreakdown(agentOutputs);

    // Generate agent contributions
    const agentContributions = this.generateAgentContributions(agentOutputs);

    return {
      summary,
      strengths,
      weaknesses,
      keyFactors,
      scoringBreakdown,
      agentContributions,
    };
  }

  private generateSummary(
    candidateName: string,
    position: string,
    decision: string,
    score: number
  ): string {
    const decisionText = decision.replace(/_/g, ' ').toLowerCase();
    return `${candidateName} interviewed for ${position} position and received a ${decisionText} recommendation with an overall score of ${score.toFixed(1)}/100. The assessment is based on comprehensive analysis across technical competency, communication skills, problem-solving ability, and cultural alignment.`;
  }

  private extractStrengthsWeaknesses(
    responses: any[],
    agentOutputs: AgentOutput[]
  ): { strengths: string[]; weaknesses: string[] } {
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    // Analyze from Analyzer outputs
    const analyzerOutputs = agentOutputs.filter(o => o.type === 'ANALYZER');
    analyzerOutputs.forEach(output => {
      const scores = output.result.scores || {};
      Object.entries(scores).forEach(([key, value]) => {
        if ((value as number) >= 8) {
          strengths.push(`Strong ${key} skills demonstrated`);
        } else if ((value as number) < 6) {
          weaknesses.push(`Limited ${key} ability shown`);
        }
      });
    });

    // Analyze from Tagger outputs
    const taggerOutputs = agentOutputs.filter(o => o.type === 'TAGGER');
    taggerOutputs.forEach(output => {
      const tags = output.result;
      if (tags.skillTags?.length > 3) {
        strengths.push('Broad skill set demonstrated');
      }
      if (tags.behavioralTags?.includes('growth-mindset')) {
        strengths.push('Shows continuous learning mindset');
      }
    });

    return {
      strengths: strengths.slice(0, 5),
      weaknesses: weaknesses.slice(0, 3),
    };
  }

  private identifyKeyFactors(agentOutputs: AgentOutput[]): any[] {
    const factors: any[] = [];

    // Extract from Scorer
    const scorerOutput = agentOutputs.find(o => o.type === 'SCORER');
    if (scorerOutput) {
      const scores = scorerOutput.result.componentScores || {};
      Object.entries(scores).forEach(([factor, value]) => {
        const impact = ((value as number) - 5) / 5; // Normalize to -1 to 1
        factors.push({
          factor: factor.replace(/([A-Z])/g, ' $1').toLowerCase(),
          impact,
          evidence: [`Scored ${(value as number).toFixed(1)}/10 in this area`],
        });
      });
    }

    return factors.slice(0, 5);
  }

  private createScoringBreakdown(agentOutputs: AgentOutput[]): Record<string, number> {
    const scorerOutput = agentOutputs.find(o => o.type === 'SCORER');
    if (scorerOutput && scorerOutput.result.componentScores) {
      return scorerOutput.result.componentScores;
    }
    return {};
  }

  private generateAgentContributions(agentOutputs: AgentOutput[]): Record<string, string> {
    const contributions: Record<string, string> = {};

    agentOutputs.forEach(output => {
      const type = output.type;
      let contribution = '';

      switch (type) {
        case 'ANALYZER':
          contribution = 'Analyzed technical and communication competencies';
          break;
        case 'VERIFIER':
          contribution = 'Verified consistency and accuracy of assessments';
          break;
        case 'PLANNER':
          contribution = 'Optimized interview flow and question selection';
          break;
        case 'TAGGER':
          contribution = 'Identified skills, behaviors, and competencies';
          break;
        case 'SCORER':
          contribution = 'Calculated weighted scores and final decision';
          break;
        default:
          contribution = 'Contributed to overall assessment';
      }

      contributions[type] = contribution;
    });

    return contributions;
  }

  private calculateNarrationConfidence(explanation: DecisionExplanation): number {
    // More comprehensive explanation = higher confidence
    const hasStrengths = explanation.strengths.length > 0;
    const hasWeaknesses = explanation.weaknesses.length > 0;
    const hasKeyFactors = explanation.keyFactors.length > 0;
    const hasBreakdown = Object.keys(explanation.scoringBreakdown).length > 0;

    const completeness = [hasStrengths, hasWeaknesses, hasKeyFactors, hasBreakdown]
      .filter(Boolean).length / 4;

    return Math.max(0.5, completeness);
  }
}
