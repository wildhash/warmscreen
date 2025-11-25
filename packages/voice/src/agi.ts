import fetch from 'node-fetch';

export interface AGIVoiceConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface VoiceCloneOptions {
  voiceName: string;
  sampleUrl: string;
  description?: string;
}

export interface VoiceCloneResponse {
  voiceId: string;
  status: string;
  readyAt?: string;
  manifestUrl?: string;
}

export class AGIVoiceClient {
  private baseUrl: string;

  constructor(private config: AGIVoiceConfig) {
    this.baseUrl = config.baseUrl || 'https://api.agi.run/v1';
  }

  async cloneVoice(options: VoiceCloneOptions): Promise<VoiceCloneResponse> {
    const response = await fetch(`${this.baseUrl}/voices/clone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to clone voice: ${errorText}`);
    }

    return response.json() as Promise<VoiceCloneResponse>;
  }
}
