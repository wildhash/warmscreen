import { FastifyPluginAsync } from 'fastify';
import { VoiceManager } from '@warmscreen/voice';

export const voiceRoutes: FastifyPluginAsync = async (server) => {
  let voiceManager: VoiceManager | null = null;

  // Initialize voice manager if credentials available
  if (server.config.LIVEKIT_URL && server.config.DEEPGRAM_API_KEY) {
    voiceManager = new VoiceManager({
      livekit: {
        url: server.config.LIVEKIT_URL,
        apiKey: server.config.LIVEKIT_API_KEY || '',
        apiSecret: server.config.LIVEKIT_API_SECRET || '',
      },
      deepgram: {
        apiKey: server.config.DEEPGRAM_API_KEY,
      },
    });
  }

  // Start voice session
  server.post('/session/start', async (request, reply) => {
    if (!voiceManager) {
      return reply.code(503).send({ error: 'Voice service not configured' });
    }

    const { interviewId, participantName } = request.body as any;

    const roomName = `interview-${interviewId}`;
    const session = await voiceManager.startSession(roomName, participantName);

    return {
      session: {
        ...session,
        interviewId,
      },
    };
  });

  // End voice session
  server.post('/session/end', async (request, reply) => {
    if (!voiceManager) {
      return reply.code(503).send({ error: 'Voice service not configured' });
    }

    await voiceManager.endSession();

    return { message: 'Voice session ended' };
  });

  // Get transcripts
  server.get('/transcripts', async (request, reply) => {
    if (!voiceManager) {
      return reply.code(503).send({ error: 'Voice service not configured' });
    }

    const transcripts = voiceManager.getTranscripts();
    const fullTranscript = voiceManager.getFullTranscript();

    return { transcripts, fullTranscript };
  });

  // Transcribe recording
  server.post('/transcribe', async (request, reply) => {
    if (!voiceManager) {
      return reply.code(503).send({ error: 'Voice service not configured' });
    }

    const { audioUrl } = request.body as any;

    const transcript = await voiceManager.transcribeRecording(audioUrl);

    return { transcript };
  });

  // WebSocket for real-time transcription
  server.get('/ws', { websocket: true }, (connection, req) => {
    if (!voiceManager) {
      connection.socket.close();
      return;
    }

    voiceManager.onTranscript((transcript) => {
      connection.socket.send(JSON.stringify({
        type: 'transcript',
        data: transcript,
      }));
    });

    connection.socket.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
};
