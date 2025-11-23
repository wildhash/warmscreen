import { FastifyPluginAsync } from 'fastify';
import { VoiceManager } from '@warmscreen/voice';
import { VoiceInterviewerAgent } from '@warmscreen/agents';

export const voiceRoutes: FastifyPluginAsync = async (server) => {
  let voiceManager: VoiceManager | null = null;
  let interviewerAgent: VoiceInterviewerAgent | null = null;

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
      elevenlabs: server.config.ELEVENLABS_API_KEY ? {
        apiKey: server.config.ELEVENLABS_API_KEY,
      } : undefined,
    });

    // Initialize interviewer agent if TTS is available
    if (server.config.ELEVENLABS_API_KEY) {
      interviewerAgent = new VoiceInterviewerAgent({
        voiceManager,
        voiceId: server.config.INTERVIEWER_VOICE_ID,
      });
    }
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

  // TTS: Convert text to speech
  server.post('/tts/speak', async (request, reply) => {
    if (!voiceManager) {
      return reply.code(503).send({ error: 'Voice service not configured' });
    }

    const { text, voiceId } = request.body as any;

    if (!text) {
      return reply.code(400).send({ error: 'Text is required' });
    }

    try {
      const audioBuffer = await voiceManager.speakText(text, voiceId);
      
      reply.header('Content-Type', 'audio/mpeg');
      return reply.send(audioBuffer);
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  // List available voices
  server.get('/tts/voices', async (request, reply) => {
    if (!voiceManager) {
      return reply.code(503).send({ error: 'Voice service not configured' });
    }

    try {
      const voices = await voiceManager.listVoices();
      return { voices };
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  // Clone a voice
  server.post('/tts/clone', async (request, reply) => {
    if (!voiceManager) {
      return reply.code(503).send({ error: 'Voice service not configured' });
    }

    const data = await request.file();
    
    if (!data) {
      return reply.code(400).send({ error: 'Audio file is required' });
    }

    // Extract fields from multipart data
    const nameField = data.fields.name;
    const descriptionField = data.fields.description;
    
    const name = nameField && typeof nameField === 'object' && 'value' in nameField 
      ? String(nameField.value) 
      : undefined;
    const description = descriptionField && typeof descriptionField === 'object' && 'value' in descriptionField 
      ? String(descriptionField.value) 
      : undefined;

    if (!name) {
      return reply.code(400).send({ error: 'Voice name is required' });
    }

    try {
      // Convert uploaded file to buffer
      const buffer = await data.toBuffer();
      
      const result = await voiceManager.cloneVoice(name, [buffer], description);
      return { 
        success: true, 
        voice: result,
        message: 'Voice cloned successfully. You can now use this voice ID for TTS.',
      };
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  // Interview: Start interview with greeting
  server.post('/interview/start', async (request, reply) => {
    if (!interviewerAgent) {
      return reply.code(503).send({ error: 'Interviewer agent not configured' });
    }

    const { candidateName } = request.body as any;

    if (!candidateName) {
      return reply.code(400).send({ error: 'Candidate name is required' });
    }

    try {
      const audioBuffer = await interviewerAgent.startInterview(candidateName);
      
      reply.header('Content-Type', 'audio/mpeg');
      return reply.send(audioBuffer);
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  // Interview: Ask a question
  server.post('/interview/ask-question', async (request, reply) => {
    if (!interviewerAgent) {
      return reply.code(503).send({ error: 'Interviewer agent not configured' });
    }

    const { question } = request.body as any;

    if (!question || !question.id || !question.content) {
      return reply.code(400).send({ error: 'Valid question object is required' });
    }

    try {
      const audioBuffer = await interviewerAgent.askQuestion(question);
      
      reply.header('Content-Type', 'audio/mpeg');
      return reply.send(audioBuffer);
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  // Interview: Acknowledge response
  server.post('/interview/acknowledge', async (request, reply) => {
    if (!interviewerAgent) {
      return reply.code(503).send({ error: 'Interviewer agent not configured' });
    }

    const { type = 'neutral' } = request.body as any;

    try {
      const audioBuffer = await interviewerAgent.acknowledge(type);
      
      reply.header('Content-Type', 'audio/mpeg');
      return reply.send(audioBuffer);
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  // Interview: End interview
  server.post('/interview/end', async (request, reply) => {
    if (!interviewerAgent) {
      return reply.code(503).send({ error: 'Interviewer agent not configured' });
    }

    try {
      const audioBuffer = await interviewerAgent.endInterview();
      
      reply.header('Content-Type', 'audio/mpeg');
      return reply.send(audioBuffer);
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  // Interview: Set voice
  server.post('/interview/set-voice', async (request, reply) => {
    if (!interviewerAgent) {
      return reply.code(503).send({ error: 'Interviewer agent not configured' });
    }

    const { voiceId } = request.body as any;

    if (!voiceId) {
      return reply.code(400).send({ error: 'Voice ID is required' });
    }

    try {
      interviewerAgent.setVoiceId(voiceId);
      return { success: true, message: 'Interviewer voice updated' };
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });
};
