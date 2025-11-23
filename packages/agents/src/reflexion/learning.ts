import { PrismaClient } from '@warmscreen/database';
import { calculateCorrelation } from '@warmscreen/shared';

/**
 * Reflexion System
 * Manages learning from interview outcomes to improve future performance
 */
export class ReflexionSystem {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  /**
   * Learn from interview outcome to improve question selection
   */
  async learnFromInterview(interviewId: string): Promise<void> {
    const interview = await this.db.interview.findUnique({
      where: { id: interviewId },
      include: {
        responses: {
          include: { question: true },
        },
      },
    });

    if (!interview || !interview.decision) return;

    const isSuccessful = ['HIRE', 'STRONG_HIRE'].includes(interview.decision);
    const outcomeScore = isSuccessful ? 1 : 0;

    // Update question effectiveness metrics
    for (const response of interview.responses) {
      await this.updateQuestionMetrics(
        response.questionId,
        outcomeScore,
        response.scores as any
      );
    }

    // Create feedback loop
    await this.db.feedbackLoop.create({
      data: {
        interviewId,
        feedbackType: 'QUESTION_EFFECTIVENESS',
        signal: {
          outcome: interview.decision,
          questionsUsed: interview.responses.map((r: any) => r.questionId),
        },
        actionTaken: 'Updated question correlation scores',
      },
    });
  }

  /**
   * Update question metrics based on outcomes
   */
  private async updateQuestionMetrics(
    questionId: string,
    outcomeScore: number,
    responseScores: Record<string, number>
  ): Promise<void> {
    const question = await this.db.question.findUnique({
      where: { id: questionId },
    });

    if (!question) return;

    const avgResponseScore = Object.values(responseScores).reduce((a, b) => a + b, 0) / 
                             Object.values(responseScores).length;

    // Update cumulative metrics
    const newTimesAsked = question.timesAsked + 1;
    const newAvgScore = (question.avgScore * question.timesAsked + avgResponseScore) / newTimesAsked;

    await this.db.question.update({
      where: { id: questionId },
      data: {
        timesAsked: newTimesAsked,
        avgScore: newAvgScore,
        lastUsed: new Date(),
      },
    });
  }

  /**
   * Refine scoring model based on historical data
   */
  async refineScoringModel(position: string): Promise<void> {
    // Get completed interviews for this position
    const interviews = await this.db.interview.findMany({
      where: {
        position,
        status: 'COMPLETED',
        decision: { not: null },
      },
      include: {
        responses: true,
      },
    });

    if (interviews.length < 5) {
      // Need minimum sample size
      return;
    }

    // Collect data for correlation analysis
    const outcomes: number[] = [];
    const technicalScores: number[] = [];
    const communicationScores: number[] = [];
    const problemSolvingScores: number[] = [];

    interviews.forEach((interview: any) => {
      const isHire = ['HIRE', 'STRONG_HIRE'].includes(interview.decision!);
      outcomes.push(isHire ? 1 : 0);

      // Aggregate scores
      let techSum = 0, commSum = 0, psSum = 0, count = 0;
      interview.responses.forEach((response: any) => {
        const scores = response.scores as any;
        if (scores) {
          techSum += scores.technical || 5;
          commSum += scores.communication || 5;
          psSum += scores.problemSolving || 5;
          count++;
        }
      });

      if (count > 0) {
        technicalScores.push(techSum / count);
        communicationScores.push(commSum / count);
        problemSolvingScores.push(psSum / count);
      }
    });

    // Calculate correlations
    const techCorr = calculateCorrelation(technicalScores, outcomes);
    const commCorr = calculateCorrelation(communicationScores, outcomes);
    const psCorr = calculateCorrelation(problemSolvingScores, outcomes);

    // Normalize to weights (positive correlations only)
    const totalCorr = Math.max(techCorr, 0) + Math.max(commCorr, 0) + Math.max(psCorr, 0);
    
    if (totalCorr > 0) {
      const newWeights = {
        technical: Math.max(techCorr, 0.1) / totalCorr,
        communication: Math.max(commCorr, 0.1) / totalCorr,
        problemSolving: Math.max(psCorr, 0.1) / totalCorr,
        cultural: 0.1, // Default weight
      };

      // Get current active model
      const currentModel = await this.db.scoringModel.findFirst({
        where: { position, isActive: true },
      });

      // Deactivate current model
      if (currentModel) {
        await this.db.scoringModel.update({
          where: { id: currentModel.id },
          data: { isActive: false },
        });
      }

      // Create new refined model
      const creator = await this.db.user.findFirst();
      if (creator) {
        await this.db.scoringModel.create({
          data: {
            position,
            version: (currentModel?.version || 0) + 1,
            weights: newWeights,
            thresholds: currentModel?.thresholds || {
              hire: 70,
              strong_hire: 85,
            },
            sampleSize: interviews.length,
            isActive: true,
            createdById: creator.id,
          },
        });

        // Create feedback loop
        await this.db.feedbackLoop.create({
          data: {
            interviewId: interviews[0].id,
            feedbackType: 'SCORING_ACCURACY',
            signal: {
              newWeights,
              correlations: { techCorr, commCorr, psCorr },
              sampleSize: interviews.length,
            },
            actionTaken: 'Created refined scoring model',
          },
        });
      }
    }
  }

  /**
   * Auto-generate new questions based on gaps
   */
  async generateNewQuestions(position: string): Promise<string[]> {
    // Analyze existing questions
    const questions = await this.db.question.findMany({
      where: { position },
    });

    // Identify gaps (categories/skills with few questions)
    const categoryCount = new Map<string, number>();
    questions.forEach((q: any) => {
      categoryCount.set(q.category, (categoryCount.get(q.category) || 0) + 1);
    });

    const lowCoverageCategories = Array.from(categoryCount.entries())
      .filter(([_, count]) => count < 3)
      .map(([category]) => category);

    // Generate prompts for new questions
    const prompts: string[] = [];
    lowCoverageCategories.forEach(category => {
      prompts.push(
        `Generate a ${category} interview question for ${position} position that assesses practical experience`
      );
    });

    // In real implementation, would call LLM API here
    // For now, just log the prompts
    console.log('Question generation prompts:', prompts);

    return prompts;
  }

  /**
   * Update question correlation scores based on interview outcomes
   */
  async updateQuestionCorrelations(position: string): Promise<void> {
    const interviews = await this.db.interview.findMany({
      where: {
        position,
        status: 'COMPLETED',
        decision: { not: null },
      },
      include: {
        responses: {
          include: { question: true },
        },
      },
    });

    if (interviews.length < 3) return;

    // Track question outcomes
    const questionOutcomes = new Map<string, { scores: number[]; outcomes: number[] }>();

    interviews.forEach((interview: any) => {
      const isHire = ['HIRE', 'STRONG_HIRE'].includes(interview.decision!);
      const outcome = isHire ? 1 : 0;

      interview.responses.forEach((response: any) => {
        if (!questionOutcomes.has(response.questionId)) {
          questionOutcomes.set(response.questionId, { scores: [], outcomes: [] });
        }

        const data = questionOutcomes.get(response.questionId)!;
        const scores = response.scores as Record<string, number>;
        if (scores) {
          const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / 
                          Object.values(scores).length;
          data.scores.push(avgScore);
          data.outcomes.push(outcome);
        }
      });
    });

    // Calculate and update correlations
    for (const [questionId, data] of questionOutcomes.entries()) {
      if (data.scores.length > 2) {
        const correlation = calculateCorrelation(data.scores, data.outcomes);
        
        await this.db.question.update({
          where: { id: questionId },
          data: { correlationScore: correlation },
        });
      }
    }
  }
}
