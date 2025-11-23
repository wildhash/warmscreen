import { BaseAgent } from './base-agent';
import { AgentInput, AgentOutput } from '@warmscreen/shared';
import { extractKeywords } from '@warmscreen/shared';

/**
 * Tagger Agent
 * Tags responses with relevant skills, competencies, and behavioral patterns
 */
export class TaggerAgent extends BaseAgent {
  constructor() {
    super('TAGGER');
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { context, previousOutput, reflexionLoop = 0 } = input;
    const { transcript, questionCategory, position } = context;

    const tags = await this.generateTags(transcript, questionCategory, position);
    const confidence = this.calculateTaggingConfidence(tags, transcript);

    const output = this.createOutput(tags, confidence, {
      totalTags: tags.skillTags.length + tags.behavioralTags.length,
    }, reflexionLoop);

    if (output.shouldReflect && reflexionLoop < this.maxReflexionLoops) {
      return this.reflect(output, input);
    }

    return output;
  }

  private async generateTags(
    transcript: string,
    category: string,
    position: string
  ): Promise<any> {
    const keywords = extractKeywords(transcript, 10);
    
    // Extract skill tags
    const skillTags = this.extractSkillTags(transcript, category);
    
    // Extract behavioral tags
    const behavioralTags = this.extractBehavioralTags(transcript);
    
    // Extract competency tags
    const competencyTags = this.extractCompetencyTags(transcript, position);

    return {
      skillTags,
      behavioralTags,
      competencyTags,
      keywords,
      sentiment: this.analyzeSentiment(transcript),
    };
  }

  private extractSkillTags(transcript: string, category: string): string[] {
    const lower = transcript.toLowerCase();
    const skillPatterns = {
      technical: ['programming', 'algorithm', 'database', 'api', 'architecture', 'testing'],
      leadership: ['team', 'led', 'managed', 'mentored', 'coordinated'],
      communication: ['explained', 'presented', 'documented', 'collaborated'],
      problemSolving: ['solved', 'debugged', 'optimized', 'improved', 'analyzed'],
    };

    const tags: string[] = [];
    for (const [skill, patterns] of Object.entries(skillPatterns)) {
      if (patterns.some(pattern => lower.includes(pattern))) {
        tags.push(skill);
      }
    }

    return tags;
  }

  private extractBehavioralTags(transcript: string): string[] {
    const lower = transcript.toLowerCase();
    const tags: string[] = [];

    if (lower.includes('i think') || lower.includes('in my opinion')) {
      tags.push('thoughtful');
    }
    if (lower.includes('for example') || lower.includes('such as')) {
      tags.push('concrete-examples');
    }
    if (lower.includes('learned') || lower.includes('improved')) {
      tags.push('growth-mindset');
    }
    if (lower.includes('team') || lower.includes('together')) {
      tags.push('collaborative');
    }

    return tags;
  }

  private extractCompetencyTags(transcript: string, position: string): string[] {
    // Position-specific competencies
    const tags: string[] = [];
    const lower = transcript.toLowerCase();

    // Generic competencies
    if (lower.length > 200) tags.push('articulate');
    if (lower.includes('metric') || lower.includes('measure')) tags.push('data-driven');
    if (lower.includes('customer') || lower.includes('user')) tags.push('user-focused');

    return tags;
  }

  private analyzeSentiment(transcript: string): number {
    // Simple sentiment analysis (-1 to 1)
    const positiveWords = ['good', 'great', 'excellent', 'love', 'enjoy', 'excited', 'successful'];
    const negativeWords = ['bad', 'difficult', 'hard', 'problem', 'issue', 'struggle', 'failed'];
    
    const lower = transcript.toLowerCase();
    let score = 0;
    
    positiveWords.forEach(word => {
      if (lower.includes(word)) score += 0.1;
    });
    negativeWords.forEach(word => {
      if (lower.includes(word)) score -= 0.1;
    });

    return Math.max(-1, Math.min(1, score));
  }

  private calculateTaggingConfidence(tags: any, transcript: string): number {
    const totalTags = tags.skillTags.length + tags.behavioralTags.length + tags.competencyTags.length;
    const transcriptLength = transcript.split(/\s+/).length;
    
    // More tags with longer transcript = higher confidence
    const tagDensity = totalTags / Math.max(transcriptLength / 50, 1);
    return Math.min(1, Math.max(0.3, tagDensity));
  }
}
