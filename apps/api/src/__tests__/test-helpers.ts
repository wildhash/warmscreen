import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import websocket from '@fastify/websocket';
import { PrismaClient } from '@warmscreen/database';
import { interviewRoutes } from '../routes/interviews';
import { questionRoutes } from '../routes/questions';
import { agentRoutes } from '../routes/agents';
import { voiceRoutes } from '../routes/voice';
import { proctoringRoutes } from '../routes/proctoring';
import { initCache } from '../lib/cache';
import { API_INFO } from '../lib/api-info';

// Extend Fastify types to include our decorations
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    redis: null;
    config: {
      PORT: number;
      DATABASE_URL: string;
      REDIS_URL?: string;
      SENTRY_DSN?: string;
      LIVEKIT_URL?: string;
      LIVEKIT_API_KEY?: string;
      LIVEKIT_API_SECRET?: string;
      LIVEKIT_AGENT_ID?: string;
      LIVEKIT_PROJECT_ID?: string;
      DEEPGRAM_API_KEY?: string;
      ELEVENLABS_API_KEY?: string;
      INTERVIEWER_VOICE_ID?: string;
      AGI_API_KEY?: string;
      AGI_API_BASE_URL?: string;
      DEFAULT_RECRUITER_ID: string;
    };
  }
}

/**
 * Mock PrismaClient for testing
 * Creates an in-memory mock that tracks operations
 */
export function createMockPrismaClient() {
  const mockData = {
    users: new Map<string, any>(),
    interviews: new Map<string, any>(),
    questions: new Map<string, any>(),
    responses: new Map<string, any>(),
    feedbackLoops: new Map<string, any>(),
    agentLogs: new Map<string, any>(),
    patterns: new Map<string, any>(),
    scoringModels: new Map<string, any>(),
  };

  // Seed default user
  mockData.users.set('default-recruiter', {
    id: 'default-recruiter',
    email: 'recruiter@warmscreen.com',
    name: 'Default Recruiter',
    role: 'RECRUITER',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const createMockOperations = (collectionName: keyof typeof mockData) => {
    const collection = mockData[collectionName];
    
    return {
      findMany: async (opts?: any) => {
        let results = Array.from(collection.values());
        
        if (opts?.where) {
          results = results.filter((item: any) => {
            return Object.entries(opts.where).every(([key, value]: [string, any]) => {
              if (value === undefined) return true;
              if (typeof value === 'object' && value !== null) {
                if ('not' in value) {
                  return item[key] !== value.not && item[key] !== null;
                }
                return item[key] === value;
              }
              return item[key] === value;
            });
          });
        }
        
        if (opts?.orderBy) {
          const orderBy = Array.isArray(opts.orderBy) ? opts.orderBy[0] : opts.orderBy;
          const [key, order] = Object.entries(orderBy)[0] as [string, string];
          results.sort((a: any, b: any) => {
            if (order === 'desc') return b[key] > a[key] ? 1 : -1;
            return a[key] > b[key] ? 1 : -1;
          });
        }
        
        if (opts?.take) {
          results = results.slice(0, opts.take);
        }
        
        return results;
      },
      
      findUnique: async (opts: { where: { id: string } }) => {
        return collection.get(opts.where.id) || null;
      },
      
      findFirst: async (opts?: any) => {
        const results = await createMockOperations(collectionName).findMany(opts);
        return results[0] || null;
      },
      
      create: async (opts: { data: any }) => {
        const id = opts.data.id || `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const record = {
          ...opts.data,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        collection.set(id, record);
        return record;
      },
      
      update: async (opts: { where: { id: string }; data: any }) => {
        const existing = collection.get(opts.where.id);
        if (!existing) {
          throw new Error(`Record not found: ${opts.where.id}`);
        }
        const updated = { ...existing, ...opts.data, updatedAt: new Date() };
        
        // Handle increment
        if (opts.data.timesAsked?.increment) {
          updated.timesAsked = (existing.timesAsked || 0) + opts.data.timesAsked.increment;
        }
        
        collection.set(opts.where.id, updated);
        return updated;
      },
      
      upsert: async (opts: { where: { id: string }; create: any; update: any }) => {
        const existing = collection.get(opts.where.id);
        if (existing) {
          return await createMockOperations(collectionName).update({
            where: opts.where,
            data: opts.update,
          });
        }
        return await createMockOperations(collectionName).create({
          data: { ...opts.create, id: opts.where.id },
        });
      },
      
      delete: async (opts: { where: { id: string } }) => {
        const existing = collection.get(opts.where.id);
        if (existing) {
          collection.delete(opts.where.id);
        }
        return existing;
      },
    };
  };

  return {
    user: createMockOperations('users'),
    interview: createMockOperations('interviews'),
    question: createMockOperations('questions'),
    response: createMockOperations('responses'),
    feedbackLoop: createMockOperations('feedbackLoops'),
    agentLog: createMockOperations('agentLogs'),
    pattern: createMockOperations('patterns'),
    scoringModel: createMockOperations('scoringModels'),
    $connect: async () => {},
    $disconnect: async () => {},
    _mockData: mockData,
  } as unknown as PrismaClient & { _mockData: typeof mockData };
}

/**
 * Build a test server with mock dependencies
 */
export async function buildTestServer(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: false,
  });

  // Mock config
  const mockConfig = {
    PORT: 3001,
    DATABASE_URL: 'mock://database',
    DEFAULT_RECRUITER_ID: 'default-recruiter',
  };

  server.decorate('config', mockConfig);

  // Initialize mock Prisma
  const mockPrisma = createMockPrismaClient();
  server.decorate('prisma', mockPrisma);

  // Mock Redis (disabled for tests)
  server.decorate('redis', null);
  initCache();

  // Register plugins
  await server.register(cors, {
    origin: true,
    credentials: true,
  });

  await server.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  });

  await server.register(websocket);

  // Root route
  server.get('/', async () => {
    return API_INFO;
  });

  // Health check
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Register routes
  await server.register(interviewRoutes, { prefix: '/api/interviews' });
  await server.register(questionRoutes, { prefix: '/api/questions' });
  await server.register(agentRoutes, { prefix: '/api/agents' });
  await server.register(voiceRoutes, { prefix: '/api/voice' });
  await server.register(proctoringRoutes, { prefix: '/api/proctoring' });

  return server;
}

/**
 * Helper to get the mock data store from a test server
 */
export function getMockData(server: FastifyInstance) {
  return (server.prisma as any)._mockData;
}

/**
 * Seed test data
 */
export async function seedTestData(server: FastifyInstance) {
  const prisma = server.prisma as any;

  // Create a test user
  await prisma.user.create({
    data: {
      id: 'test-user-1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'RECRUITER',
    },
  });

  // Create some test questions
  await prisma.question.create({
    data: {
      id: 'test-question-1',
      content: 'Explain the concept of closures in JavaScript.',
      category: 'technical',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['javascript', 'closures', 'fundamentals'],
      createdById: 'test-user-1',
      avgScore: 7.5,
      correlationScore: 0.75,
      timesAsked: 10,
    },
  });

  await prisma.question.create({
    data: {
      id: 'test-question-2',
      content: 'Describe a challenging project you worked on.',
      category: 'behavioral',
      difficulty: 'EASY',
      position: 'Software Engineer',
      skillTags: ['communication', 'problem-solving'],
      createdById: 'test-user-1',
      avgScore: 6.8,
      correlationScore: 0.65,
      timesAsked: 15,
    },
  });

  // Create a test interview
  await prisma.interview.create({
    data: {
      id: 'test-interview-1',
      candidateId: 'candidate-1',
      candidateName: 'John Doe',
      candidateEmail: 'john@example.com',
      position: 'Software Engineer',
      status: 'SCHEDULED',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      recruiterId: 'test-user-1',
    },
  });
}
