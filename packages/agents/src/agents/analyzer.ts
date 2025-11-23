import { BaseAgent } from './base-agent';
import { AgentInput, AgentOutput } from '@warmscreen/shared';
import { calculateConfidence, extractKeywords } from '@warmscreen/shared';

/**
 * Analyzer Agent
 * Analyzes interview responses for technical competency, communication skills, and domain knowledge
 */
export class AnalyzerAgent extends BaseAgent {
  constructor() {
    super('ANALYZER');
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { context, previousOutput, reflexionLoop = 0 } = input;
    const { transcript, questionCategory } = context;

    // If this is a reflexion loop, refine the analysis
    if (previousOutput && reflexionLoop > 0) {
      return this.refineAnalysis(transcript, questionCategory, previousOutput, reflexionLoop);
    }

    // Initial analysis
    const analysis = await this.analyzeResponse(transcript, questionCategory);
    const output = this.createOutput(analysis, analysis.confidence, {
      keywords: extractKeywords(transcript),
      wordCount: transcript.split(/\s+/).length,
    }, reflexionLoop);

    // Check if reflexion is needed
    if (output.shouldReflect && reflexionLoop < this.maxReflexionLoops) {
      return this.reflect(output, input);
    }

    return output;
  }

  private async analyzeResponse(transcript: string, category: string): Promise<any> {
    // Simulate AI analysis (in real implementation, would call OpenAI/LLM)
    const wordCount = transcript.split(/\s+/).length;
    const hasKeywords = this.checkKeywords(transcript, category);
    
    const technicalScore = hasKeywords ? 7.5 : 5.0;
    const communicationScore = wordCount > 50 ? 8.0 : 6.0;
    const depthScore = wordCount > 100 ? 7.5 : 5.5;

    const scores = {
      technical: technicalScore,
      communication: communicationScore,
      depth: depthScore,
    };

    const confidenceFactors = Object.values(scores).map(s => s / 10);
    const confidence = calculateConfidence(confidenceFactors);

    return {
      scores,
      confidence,
      insights: [
        wordCount > 50 ? 'Detailed response' : 'Brief response',
        hasKeywords ? 'Relevant technical terms' : 'Limited technical terms',
      ],
    };
  }

  private async refineAnalysis(
    transcript: string,
    category: string,
    previousOutput: AgentOutput,
    reflexionLoop: number
  ): Promise<AgentOutput> {
    // Refine based on previous analysis
    const previousScores = previousOutput.result.scores;
    const refinedScores = {
      technical: Math.min(10, previousScores.technical + 0.5),
      communication: Math.min(10, previousScores.communication + 0.5),
      depth: Math.min(10, previousScores.depth + 0.5),
    };

    const confidenceFactors = Object.values(refinedScores).map(s => s / 10);
    const confidence = Math.min(1, previousOutput.confidence + 0.1);

    return this.createOutput(
      {
        scores: refinedScores,
        confidence,
        insights: [...previousOutput.result.insights, `Refined in loop ${reflexionLoop}`],
      },
      confidence,
      { refined: true, reflexionLoop },
      reflexionLoop
    );
  }

  private checkKeywords(transcript: string, category: string): boolean {
    const techKeywords = ['algorithm', 'data structure', 'api', 'database', 'performance', 'scalability'];
    const lowerTranscript = transcript.toLowerCase();
    return techKeywords.some(keyword => lowerTranscript.includes(keyword));
  }
}
