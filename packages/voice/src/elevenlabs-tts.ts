import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { Readable } from 'stream';

export interface ElevenLabsConfig {
  apiKey: string;
}

export interface VoiceProfile {
  voiceId: string;
  name: string;
  category?: string;
}

/**
 * ElevenLabsManager
 * Handles text-to-speech with voice cloning using ElevenLabs API
 */
export class ElevenLabsManager {
  private client: ElevenLabsClient;
  private defaultVoiceId: string = '21m00Tcm4TlvDq8ikWAM'; // Default Rachel voice

  constructor(config: ElevenLabsConfig) {
    this.client = new ElevenLabsClient({
      apiKey: config.apiKey,
    });
  }

  /**
   * Convert text to speech using a specific voice
   */
  async textToSpeech(
    text: string,
    voiceId?: string,
    options?: {
      modelId?: string;
      stability?: number;
      similarityBoost?: number;
      style?: number;
      useSpeakerBoost?: boolean;
    }
  ): Promise<Buffer> {
    const voice = voiceId || this.defaultVoiceId;
    
    const audioStream = await this.client.textToSpeech.convert(voice, {
      text,
      modelId: options?.modelId || 'eleven_multilingual_v2',
      voiceSettings: {
        stability: options?.stability ?? 0.5,
        similarityBoost: options?.similarityBoost ?? 0.75,
        style: options?.style ?? 0,
        useSpeakerBoost: options?.useSpeakerBoost ?? true,
      },
    });

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk));
    }
    
    return Buffer.concat(chunks);
  }

  /**
   * Stream text to speech (for real-time playback)
   */
  async textToSpeechStream(
    text: string,
    voiceId?: string,
    options?: {
      modelId?: string;
      stability?: number;
      similarityBoost?: number;
    }
  ): Promise<AsyncIterable<Buffer>> {
    const voice = voiceId || this.defaultVoiceId;
    
    const audioStream = await this.client.textToSpeech.convert(voice, {
      text,
      modelId: options?.modelId || 'eleven_multilingual_v2',
      voiceSettings: {
        stability: options?.stability ?? 0.5,
        similarityBoost: options?.similarityBoost ?? 0.75,
      },
    });

    // Return async generator that yields buffers
    return (async function* () {
      for await (const chunk of audioStream) {
        yield Buffer.from(chunk);
      }
    })();
  }

  /**
   * List all available voices (including custom cloned voices)
   */
  async listVoices(): Promise<VoiceProfile[]> {
    const response = await this.client.voices.getAll();
    
    return response.voices.map((voice: any) => ({
      voiceId: voice.voice_id,
      name: voice.name,
      category: voice.category,
    }));
  }

  /**
   * Get voice details
   */
  async getVoice(voiceId: string): Promise<any> {
    return await this.client.voices.get(voiceId);
  }

  /**
   * Clone a voice from audio samples
   * @param name - Name for the cloned voice
   * @param audioFiles - Array of audio file paths or buffers
   * @param description - Optional description
   */
  async cloneVoice(
    name: string,
    audioFiles: string[] | Buffer[],
    description?: string
  ): Promise<{ voiceId: string; name: string }> {
    // Note: Voice cloning requires Pro+ subscription
    // This method requires specific API implementation based on ElevenLabs SDK version
    throw new Error('Voice cloning requires ElevenLabs Pro+ subscription and manual setup. Please clone voices through the ElevenLabs dashboard and use the voice ID here.');
    
    // Example code (may need adjustment based on SDK version):
    // const files = audioFiles.map((file, index) => {
    //   if (Buffer.isBuffer(file)) {
    //     return new File([file], `sample${index}.mp3`, { type: 'audio/mpeg' });
    //   }
    //   throw new Error('File path cloning not yet implemented. Please use buffers.');
    // });
    //
    // const response = await this.client.voices.add({
    //   name,
    //   description,
    //   files,
    // });
    //
    // return {
    //   voiceId: response.voice_id,
    //   name: response.name,
    // };
  }

  /**
   * Delete a cloned voice
   */
  async deleteVoice(voiceId: string): Promise<void> {
    await this.client.voices.delete(voiceId);
  }

  /**
   * Set default voice for TTS
   */
  setDefaultVoice(voiceId: string): void {
    this.defaultVoiceId = voiceId;
  }

  /**
   * Get current default voice ID
   */
  getDefaultVoiceId(): string {
    return this.defaultVoiceId;
  }

  /**
   * Get user subscription info
   */
  async getSubscriptionInfo(): Promise<any> {
    return this.client.user.subscription;
  }
}
