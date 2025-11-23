import { BaseAgent } from './base-agent';
import { AgentInput, AgentOutput } from '@warmscreen/shared';

/**
 * Verifier Agent
 * Verifies the accuracy and consistency of other agents' outputs
 */
export class VerifierAgent extends BaseAgent {
  constructor() {
    super('VERIFIER');
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { context, previousOutput, reflexionLoop = 0 } = input;
    const { agentOutputs } = context;

    const verification = await this.verifyOutputs(agentOutputs);
    const confidence = this.calculateVerificationConfidence(verification);

    const output = this.createOutput(verification, confidence, {
      checksPerformed: verification.checks.length,
    }, reflexionLoop);

    if (output.shouldReflect && reflexionLoop < this.maxReflexionLoops) {
      return this.reflect(output, input);
    }

    return output;
  }

  private async verifyOutputs(agentOutputs: AgentOutput[]): Promise<any> {
    const checks = [];
    
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
      .filter(o => o.result.scores)
      .flatMap(o => Object.values(o.result.scores) as number[]);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    checks.push({
      name: 'score_validation',
      passed: scores.every(s => s >= 0 && s <= 10),
      message: 'All scores within valid range',
    });

    const allChecksPassed = checks.every(c => c.passed);

    return {
      verified: allChecksPassed,
      checks,
      issuesFound: checks.filter(c => !c.passed).length,
      recommendations: allChecksPassed ? [] : ['Re-run agents with failed checks'],
    };
  }

  private calculateVerificationConfidence(verification: any): number {
    const passedChecks = verification.checks.filter((c: any) => c.passed).length;
    const totalChecks = verification.checks.length;
    return totalChecks > 0 ? passedChecks / totalChecks : 0.5;
  }
}
