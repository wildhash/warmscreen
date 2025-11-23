import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { AudioTranscript, TranscriptWord } from '@warmscreen/shared';

export interface DeepgramConfig {
  apiKey: string;
}

export class DeepgramManager {
  private client: any;
  private connection?: any;
  private onTranscriptCallback?: (transcript: AudioTranscript) => void;

  constructor(config: DeepgramConfig) {
    this.client = createClient(config.apiKey);
  }

  /**
   * Start live transcription
   */
  async startLiveTranscription(options?: {
    language?: string;
    model?: string;
    punctuate?: boolean;
    diarize?: boolean;
  }): Promise<void> {
    const defaultOptions = {
      language: 'en-US',
      model: 'nova-2',
      punctuate: true,
      diarize: false,
      smart_format: true,
      interim_results: true,
      ...options,
    };

    this.connection = this.client.listen.live(defaultOptions);

    // Setup event handlers
    this.connection.on(LiveTranscriptionEvents.Open, () => {
      console.log('Deepgram connection opened');
    });

    this.connection.on(LiveTranscriptionEvents.Transcript, (data: any) => {
      this.handleTranscript(data);
    });

    this.connection.on(LiveTranscriptionEvents.Error, (error: any) => {
      console.error('Deepgram error:', error);
    });

    this.connection.on(LiveTranscriptionEvents.Close, () => {
      console.log('Deepgram connection closed');
    });
  }

  /**
   * Handle incoming transcript
   */
  private handleTranscript(data: any): void {
    const channel = data.channel;
    const alternatives = channel?.alternatives || [];
    
    if (alternatives.length === 0) return;

    const alternative = alternatives[0];
    
    // Only process final transcripts
    if (!data.is_final) return;

    const transcript: AudioTranscript = {
      text: alternative.transcript,
      confidence: alternative.confidence,
      words: alternative.words?.map((word: any) => ({
        word: word.word,
        start: word.start,
        end: word.end,
        confidence: word.confidence,
      })),
      timestamp: Date.now(),
    };

    if (this.onTranscriptCallback) {
      this.onTranscriptCallback(transcript);
    }
  }

  /**
   * Send audio data for transcription
   */
  sendAudio(audioData: Buffer): void {
    if (this.connection) {
      this.connection.send(audioData);
    }
  }

  /**
   * Stop live transcription
   */
  async stopLiveTranscription(): Promise<void> {
    if (this.connection) {
      this.connection.finish();
      this.connection = undefined;
    }
  }

  /**
   * Transcribe pre-recorded audio file
   */
  async transcribeFile(audioUrl: string): Promise<AudioTranscript> {
    const { result, error } = await this.client.listen.prerecorded.transcribeUrl(
      { url: audioUrl },
      {
        model: 'nova-2',
        smart_format: true,
        punctuate: true,
        paragraphs: true,
        utterances: true,
      }
    );

    if (error) {
      throw new Error(`Deepgram transcription error: ${error.message}`);
    }

    const channel = result.results?.channels?.[0];
    const alternative = channel?.alternatives?.[0];

    if (!alternative) {
      throw new Error('No transcription result');
    }

    return {
      text: alternative.transcript,
      confidence: alternative.confidence,
      words: alternative.words?.map((word: any) => ({
        word: word.word,
        start: word.start,
        end: word.end,
        confidence: word.confidence,
      })),
      timestamp: Date.now(),
    };
  }

  /**
   * Register callback for transcripts
   */
  onTranscript(callback: (transcript: AudioTranscript) => void): void {
    this.onTranscriptCallback = callback;
  }
}
