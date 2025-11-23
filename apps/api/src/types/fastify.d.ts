import { PrismaClient } from '@warmscreen/database';
import '@fastify/env';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    config: {
      PORT: number;
      DATABASE_URL: string;
      SENTRY_DSN?: string;
      LIVEKIT_URL?: string;
      LIVEKIT_API_KEY?: string;
      LIVEKIT_API_SECRET?: string;
      DEEPGRAM_API_KEY?: string;
      ELEVENLABS_API_KEY?: string;
      INTERVIEWER_VOICE_ID?: string;
    };
  }
}
