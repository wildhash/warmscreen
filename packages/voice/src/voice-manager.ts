import { LiveKitManager, LiveKitConfig } from './livekit';
import { DeepgramManager, DeepgramConfig } from './deepgram';
import { ElevenLabsManager, ElevenLabsConfig } from './elevenlabs-tts';
import { AGIVoiceClient, AGIVoiceConfig, VoiceCloneOptions, VoiceCloneResponse } from './agi';
import { AudioTranscript } from '@warmscreen/shared';

export interface VoiceManagerConfig {
  livekit: LiveKitConfig;
  deepgram: DeepgramConfig;
  elevenlabs?: ElevenLabsConfig;
  agi?: AGIVoiceConfig;
}

/**
 * VoiceManager
 * Integrates LiveKit for voice communication, Deepgram for STT, ElevenLabs for TTS, and AGI for voice cloning
 */
export class VoiceManager {
  private livekit: LiveKitManager;
  private deepgram: DeepgramManager;
  private elevenlabs?: ElevenLabsManager;
  private agiClient?: AGIVoiceClient;
  private transcripts: AudioTranscript[] = [];
  private onTranscriptCallback?: (transcript: AudioTranscript) => void;

  constructor(config: VoiceManagerConfig) {
    this.livekit = new LiveKitManager(config.livekit);
    this.deepgram = new DeepgramManager(config.deepgram);
    
    // Initialize ElevenLabs if config provided
    if (config.elevenlabs) {
      this.elevenlabs = new ElevenLabsManager(config.elevenlabs);
    }

    // Initialize AGI client for voice cloning if config provided
    if (config.agi?.apiKey) {
      this.agiClient = new AGIVoiceClient(config.agi);
    }

    // Forward transcripts from Deepgram
    this.deepgram.onTranscript((transcript) => {
      this.transcripts.push(transcript);
      if (this.onTranscriptCallback) {
        this.onTranscriptCallback(transcript);
      }
    });
  }

  /**
   * Start voice interview session
   */
  async startSession(
    roomName: string,
    participantName: string
  ): Promise<{
    token: string;
    roomUrl: string;
  }> {
    // Generate LiveKit token
    const token = await this.livekit.generateToken(roomName, participantName, {
      role: 'interviewer',
    });

    // Start Deepgram transcription
    await this.deepgram.startLiveTranscription({
      language: 'en-US',
      model: 'nova-2',
      punctuate: true,
    });

    return {
      token,
      roomUrl: roomName,
    };
  }

  /**
   * Connect to interview room
   */
  async connectToRoom(roomName: string, token: string): Promise<void> {
    await this.livekit.connectToRoom(roomName, token);
  }

  /**
   * End voice session
   */
  async endSession(): Promise<void> {
    await this.livekit.disconnect();
    await this.deepgram.stopLiveTranscription();
  }

  /**
   * Get all transcripts from session
   */
  getTranscripts(): AudioTranscript[] {
    return this.transcripts;
  }

  /**
   * Get full transcript text
   */
  getFullTranscript(): string {
    return this.transcripts.map(t => t.text).join(' ');
  }

  /**
   * Clear transcripts
   */
  clearTranscripts(): void {
    this.transcripts = [];
  }

  /**
   * Register callback for new transcripts
   */
  onTranscript(callback: (transcript: AudioTranscript) => void): void {
    this.onTranscriptCallback = callback;
  }

  /**
   * Get current room state
   */
  getRoomState(): any {
    return this.livekit.getRoomState();
  }

  /**
   * Transcribe recorded audio file
   */
  async transcribeRecording(audioUrl: string): Promise<AudioTranscript> {
    return await this.deepgram.transcribeFile(audioUrl);
  }

  /**
   * Convert text to speech (for interviewer questions)
   */
  async speakText(
    text: string,
    voiceId?: string,
    options?: {
      stability?: number;
      similarityBoost?: number;
    }
  ): Promise<Buffer> {
    if (!this.elevenlabs) {
      throw new Error('ElevenLabs not configured. Set ELEVENLABS_API_KEY.');
    }
    return await this.elevenlabs.textToSpeech(text, voiceId, options);
  }

  /**
   * List available voices
   */
  async listVoices() {
    if (!this.elevenlabs) {
      throw new Error('ElevenLabs not configured. Set ELEVENLABS_API_KEY.');
    }
    return await this.elevenlabs.listVoices();
  }

  /**
   * Clone a voice from audio samples (using ElevenLabs)
   */
  async cloneVoice(name: string, audioFiles: string[] | Buffer[], description?: string) {
    if (!this.elevenlabs) {
      throw new Error('ElevenLabs not configured. Set ELEVENLABS_API_KEY.');
    }
    return await this.elevenlabs.cloneVoice(name, audioFiles, description);
  }

  /**
   * Clone a voice using AGI API (alternative method)
   */
  async cloneVoiceWithAGI(options: VoiceCloneOptions): Promise<VoiceCloneResponse> {
    if (!this.agiClient) {
      throw new Error('AGI voice cloning is not configured. Set AGI_API_KEY.');
    }
    return this.agiClient.cloneVoice(options);
  }

  /**
   * Set default interviewer voice
   */
  setInterviewerVoice(voiceId: string): void {
    if (this.elevenlabs) {
      this.elevenlabs.setDefaultVoice(voiceId);
    }
  }

  /**
   * Get TTS manager (if available)
   */
  getTTSManager(): ElevenLabsManager | undefined {
    return this.elevenlabs;
  }

  /**
   * Get AGI client (if available)
   */
  getAGIClient(): AGIVoiceClient | undefined {
    return this.agiClient;
  }
}
