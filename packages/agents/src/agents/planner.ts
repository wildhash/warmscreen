import { BaseAgent } from './base-agent';
import { AgentInput, AgentOutput } from '@warmscreen/shared';

/**
 * Planner Agent
 * Plans the interview flow and determines which questions to ask next
 */
export class PlannerAgent extends BaseAgent {
  constructor() {
    super('PLANNER');
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { context, previousOutput, reflexionLoop = 0 } = input;
    const { currentResponses, availableQuestions, position } = context;

    const plan = await this.createPlan(currentResponses, availableQuestions, position);
    const confidence = this.calculatePlanningConfidence(plan, currentResponses);

    const output = this.createOutput(plan, confidence, {
      questionsRemaining: plan.remainingQuestions.length,
    }, reflexionLoop);

    if (output.shouldReflect && reflexionLoop < this.maxReflexionLoops) {
      return this.reflect(output, input);
    }

    return output;
  }

  private async createPlan(
    currentResponses: any[],
    availableQuestions: any[],
    position: string
  ): Promise<any> {
    // Analyze current performance
    const avgScore = currentResponses.length > 0
      ? currentResponses.reduce((sum, r) => sum + (r.score || 5), 0) / currentResponses.length
      : 5;

    // Select next questions based on adaptive logic
    const nextQuestions = this.selectNextQuestions(
      availableQuestions,
      currentResponses,
      avgScore
    );

    return {
      nextQuestionId: nextQuestions[0]?.id,
      remainingQuestions: nextQuestions.slice(1),
      strategy: avgScore > 7 ? 'challenging' : avgScore < 5 ? 'foundational' : 'balanced',
      estimatedTimeRemaining: nextQuestions.length * 3, // 3 min per question
      shouldContinue: nextQuestions.length > 0 && currentResponses.length < 10,
    };
  }

  private selectNextQuestions(
    available: any[],
    responses: any[],
    avgScore: number
  ): any[] {
    // Adaptive question selection
    let targetDifficulty = 'MEDIUM';
    if (avgScore > 8) targetDifficulty = 'HARD';
    else if (avgScore > 9) targetDifficulty = 'EXPERT';
    else if (avgScore < 5) targetDifficulty = 'EASY';

    const askedIds = new Set(responses.map(r => r.questionId));
    const unasked = available.filter(q => !askedIds.has(q.id));

    // Prioritize high-correlation questions
    return unasked
      .sort((a, b) => {
        // Prefer target difficulty
        const diffMatch = (a.difficulty === targetDifficulty ? 1 : 0) - 
                         (b.difficulty === targetDifficulty ? 1 : 0);
        if (diffMatch !== 0) return -diffMatch;
        
        // Then by correlation score
        return (b.correlationScore || 0) - (a.correlationScore || 0);
      })
      .slice(0, 5);
  }

  private calculatePlanningConfidence(plan: any, responses: any[]): number {
    // Higher confidence with more data
    const dataConfidence = Math.min(responses.length / 5, 1);
    // Confidence in strategy selection
    const strategyConfidence = plan.strategy ? 0.8 : 0.5;
    return (dataConfidence + strategyConfidence) / 2;
  }
}
