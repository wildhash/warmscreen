import { PrismaClient } from '@warmscreen/database';
import type { Redis } from 'ioredis';
import '@fastify/env';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    redis: Redis | null;
    config: {
      PORT: number;
      DATABASE_URL: string;
      REDIS_URL?: string;
      SENTRY_DSN?: string;
      LIVEKIT_URL?: string;
      LIVEKIT_API_KEY?: string;
      LIVEKIT_API_SECRET?: string;
      DEEPGRAM_API_KEY?: string;
      ELEVENLABS_API_KEY?: string;
      INTERVIEWER_VOICE_ID?: string;
      LIVEKIT_AGENT_ID?: string;
      LIVEKIT_PROJECT_ID?: string;
      DEFAULT_RECRUITER_ID: string;
      AGI_API_KEY?: string;
      AGI_API_BASE_URL: string;
    };
  }
}
