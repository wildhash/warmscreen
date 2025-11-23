import { LiveKitManager, LiveKitConfig } from './livekit';
import { DeepgramManager, DeepgramConfig } from './deepgram';
import { AudioTranscript } from '@warmscreen/shared';

export interface VoiceManagerConfig {
  livekit: LiveKitConfig;
  deepgram: DeepgramConfig;
}

/**
 * VoiceManager
 * Integrates LiveKit for voice communication and Deepgram for STT
 */
export class VoiceManager {
  private livekit: LiveKitManager;
  private deepgram: DeepgramManager;
  private transcripts: AudioTranscript[] = [];
  private onTranscriptCallback?: (transcript: AudioTranscript) => void;

  constructor(config: VoiceManagerConfig) {
    this.livekit = new LiveKitManager(config.livekit);
    this.deepgram = new DeepgramManager(config.deepgram);

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
}
