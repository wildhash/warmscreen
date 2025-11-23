import { VoiceManager } from '@warmscreen/voice';

export interface InterviewerAgentConfig {
  voiceManager: VoiceManager;
  voiceId?: string;
  greetingMessage?: string;
  closingMessage?: string;
}

export interface Question {
  id: string;
  content: string;
  category: string;
  difficulty: string;
}

/**
 * VoiceInterviewerAgent
 * Conducts voice interviews by asking questions using TTS and listening to responses
 */
export class VoiceInterviewerAgent {
  private voiceManager: VoiceManager;
  private voiceId?: string;
  private currentQuestion?: Question;
  private greetingMessage: string;
  private closingMessage: string;
  private isInterviewing: boolean = false;

  constructor(config: InterviewerAgentConfig) {
    this.voiceManager = config.voiceManager;
    this.voiceId = config.voiceId;
    this.greetingMessage = config.greetingMessage || 
      "Hello! I'm your interviewer today. I'll be asking you a series of questions to better understand your skills and experience. Please take your time with each answer, and feel free to ask for clarification if needed. Let's begin!";
    this.closingMessage = config.closingMessage || 
      "Thank you for taking the time to interview with us today. We appreciate your thoughtful responses. We'll review your interview and get back to you soon. Have a great day!";
  }

  /**
   * Start the interview with a greeting
   */
  async startInterview(candidateName: string): Promise<Buffer> {
    this.isInterviewing = true;
    const personalizedGreeting = `Hello ${candidateName}! ${this.greetingMessage}`;
    return await this.speak(personalizedGreeting);
  }

  /**
   * Ask a question via TTS
   */
  async askQuestion(question: Question): Promise<Buffer> {
    if (!this.isInterviewing) {
      throw new Error('Interview not started');
    }

    this.currentQuestion = question;
    
    // Format the question for speaking
    let spokenText = question.content;
    
    // Add natural pauses for better comprehension
    if (!spokenText.endsWith('?') && !spokenText.endsWith('.')) {
      spokenText += '?';
    }

    return await this.speak(spokenText);
  }

  /**
   * Provide follow-up or clarification
   */
  async followUp(followUpText: string): Promise<Buffer> {
    if (!this.isInterviewing) {
      throw new Error('Interview not started');
    }

    return await this.speak(followUpText);
  }

  /**
   * Acknowledge the candidate's response
   */
  async acknowledge(acknowledgmentType: 'positive' | 'neutral' | 'encouragement' = 'neutral'): Promise<Buffer> {
    const acknowledgments = {
      positive: [
        "That's a great answer! Let's move on to the next question.",
        "Excellent! I appreciate that detailed response.",
        "Thank you for that comprehensive answer.",
      ],
      neutral: [
        "Thank you for your response.",
        "I understand. Let's continue.",
        "Noted. Moving forward.",
      ],
      encouragement: [
        "Take your time. There's no rush.",
        "Feel free to elaborate if you'd like.",
        "That's a good start. Is there anything else you'd like to add?",
      ],
    };

    const options = acknowledgments[acknowledgmentType];
    const message = options[Math.floor(Math.random() * options.length)];
    
    return await this.speak(message);
  }

  /**
   * End the interview with a closing message
   */
  async endInterview(): Promise<Buffer> {
    this.isInterviewing = false;
    this.currentQuestion = undefined;
    return await this.speak(this.closingMessage);
  }

  /**
   * Speak text using TTS
   */
  private async speak(text: string): Promise<Buffer> {
    try {
      return await this.voiceManager.speakText(text, this.voiceId, {
        stability: 0.5,
        similarityBoost: 0.75,
      });
    } catch (error) {
      console.error('TTS error:', error);
      throw new Error(`Failed to generate speech: ${error}`);
    }
  }

  /**
   * Get current question being asked
   */
  getCurrentQuestion(): Question | undefined {
    return this.currentQuestion;
  }

  /**
   * Check if interview is active
   */
  isActive(): boolean {
    return this.isInterviewing;
  }

  /**
   * Set the voice ID for the interviewer
   */
  setVoiceId(voiceId: string): void {
    this.voiceId = voiceId;
    this.voiceManager.setInterviewerVoice(voiceId);
  }

  /**
   * Update greeting message
   */
  setGreetingMessage(message: string): void {
    this.greetingMessage = message;
  }

  /**
   * Update closing message
   */
  setClosingMessage(message: string): void {
    this.closingMessage = message;
  }
}
