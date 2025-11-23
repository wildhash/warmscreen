import { Room, RoomEvent, Track, RemoteTrack, RemoteTrackPublication } from 'livekit-client';
import { AccessToken } from 'livekit-server-sdk';
import { AudioTranscript } from '@warmscreen/shared';

export interface LiveKitConfig {
  url: string;
  apiKey: string;
  apiSecret: string;
}

export class LiveKitManager {
  private config: LiveKitConfig;
  private room?: Room;
  private onTranscriptCallback?: (transcript: AudioTranscript) => void;

  constructor(config: LiveKitConfig) {
    this.config = config;
  }

  /**
   * Generate access token for a participant
   */
  async generateToken(
    roomName: string,
    participantName: string,
    metadata?: Record<string, any>
  ): Promise<string> {
    const token = new AccessToken(
      this.config.apiKey,
      this.config.apiSecret,
      {
        identity: participantName,
        name: participantName,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
      }
    );

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    return await token.toJwt();
  }

  /**
   * Connect to a LiveKit room
   */
  async connectToRoom(
    roomName: string,
    token: string
  ): Promise<Room> {
    this.room = new Room({
      adaptiveStream: true,
      dynacast: true,
    });

    // Setup event handlers
    this.setupRoomEventHandlers();

    // Connect to room
    await this.room.connect(this.config.url, token);

    return this.room;
  }

  /**
   * Setup room event handlers
   */
  private setupRoomEventHandlers(): void {
    if (!this.room) return;

    this.room
      .on(RoomEvent.TrackSubscribed, this.handleTrackSubscribed.bind(this))
      .on(RoomEvent.TrackUnsubscribed, this.handleTrackUnsubscribed.bind(this))
      .on(RoomEvent.Disconnected, this.handleDisconnected.bind(this))
      .on(RoomEvent.ParticipantConnected, (participant) => {
        console.log('Participant connected:', participant.identity);
      })
      .on(RoomEvent.ParticipantDisconnected, (participant) => {
        console.log('Participant disconnected:', participant.identity);
      });
  }

  private handleTrackSubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication
  ): void {
    if (track.kind === Track.Kind.Audio) {
      console.log('Audio track subscribed:', track.sid);
      // Audio track can be processed for transcription
    }
  }

  private handleTrackUnsubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication
  ): void {
    console.log('Track unsubscribed:', track.sid);
  }

  private handleDisconnected(): void {
    console.log('Disconnected from room');
  }

  /**
   * Disconnect from room
   */
  async disconnect(): Promise<void> {
    if (this.room) {
      await this.room.disconnect();
      this.room = undefined;
    }
  }

  /**
   * Get current room state
   */
  getRoomState(): any {
    if (!this.room) return null;

    return {
      name: this.room.name,
      participants: Array.from(this.room.remoteParticipants.values()).map(p => ({
        identity: p.identity,
        name: p.name,
        isSpeaking: p.isSpeaking,
      })),
      isConnected: this.room.state === 'connected',
    };
  }

  /**
   * Register callback for transcripts
   */
  onTranscript(callback: (transcript: AudioTranscript) => void): void {
    this.onTranscriptCallback = callback;
  }
}
