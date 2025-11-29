import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildTestServer, seedTestData, getMockData } from './test-helpers';

describe('Health Check', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildTestServer();
  });

  afterAll(async () => {
    await server.close();
  });

  it('should return ok status', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
  });
});

describe('Interview Routes', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildTestServer();
    await seedTestData(server);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET /api/interviews', () => {
    it('should list interviews', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/interviews',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.interviews).toBeDefined();
      expect(Array.isArray(body.interviews)).toBe(true);
      expect(body.interviews.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/interviews/:id', () => {
    it('should get an interview by ID', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/interviews/test-interview-1',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.interview).toBeDefined();
      expect(body.interview.id).toBe('test-interview-1');
      expect(body.interview.candidateName).toBe('John Doe');
    });

    it('should return 404 for non-existent interview', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/interviews/non-existent-id',
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.error).toBe('Interview not found');
    });
  });

  describe('POST /api/interviews', () => {
    it('should create a new interview', async () => {
      const interviewData = {
        candidateName: 'Jane Smith',
        candidateEmail: 'jane@example.com',
        position: 'Software Engineer',
        scheduledAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      };

      const response = await server.inject({
        method: 'POST',
        url: '/api/interviews',
        payload: interviewData,
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.interview).toBeDefined();
      expect(body.interview.candidateName).toBe('Jane Smith');
      expect(body.interview.candidateEmail).toBe('jane@example.com');
      expect(body.interview.position).toBe('Software Engineer');
      expect(body.interview.status).toBe('SCHEDULED');
    });

    it('should reject invalid interview data', async () => {
      const invalidData = {
        candidateName: '',
        candidateEmail: 'not-an-email',
        position: '',
      };

      const response = await server.inject({
        method: 'POST',
        url: '/api/interviews',
        payload: invalidData,
      });

      expect(response.statusCode).toBe(500); // Zod validation error
    });
  });

  describe('PATCH /api/interviews/:id', () => {
    it('should update an interview', async () => {
      const response = await server.inject({
        method: 'PATCH',
        url: '/api/interviews/test-interview-1',
        payload: {
          status: 'IN_PROGRESS',
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.interview).toBeDefined();
      expect(body.interview.status).toBe('IN_PROGRESS');
    });
  });

  describe('POST /api/interviews/:id/start', () => {
    it('should start an interview', async () => {
      // First, create a new interview to start
      const createResponse = await server.inject({
        method: 'POST',
        url: '/api/interviews',
        payload: {
          candidateName: 'Start Test',
          candidateEmail: 'start@test.com',
          position: 'Software Engineer',
          scheduledAt: new Date().toISOString(),
        },
      });

      const { interview } = JSON.parse(createResponse.body);

      const response = await server.inject({
        method: 'POST',
        url: `/api/interviews/${interview.id}/start`,
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.interview).toBeDefined();
      expect(body.interview.status).toBe('IN_PROGRESS');
      expect(body.interview.startedAt).toBeDefined();
      expect(body.questions).toBeDefined();
    });

    it('should return 404 for non-existent interview', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/interviews/non-existent/start',
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('GET /api/interviews/config/default-recruiter', () => {
    it('should return the default recruiter ID', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/interviews/config/default-recruiter',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.recruiterId).toBe('default-recruiter');
    });
  });

  describe('GET /api/interviews/livekit-agent/config', () => {
    it('should return LiveKit agent configuration status', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/interviews/livekit-agent/config',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.configured).toBeDefined();
      expect(typeof body.configured).toBe('boolean');
    });
  });
});

describe('Question Routes', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildTestServer();
    await seedTestData(server);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET /api/questions', () => {
    it('should list questions', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/questions',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.questions).toBeDefined();
      expect(Array.isArray(body.questions)).toBe(true);
      expect(body.questions.length).toBeGreaterThan(0);
    });

    it('should filter questions by position', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/questions?position=Software Engineer',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.questions).toBeDefined();
      body.questions.forEach((q: any) => {
        expect(q.position).toBe('Software Engineer');
      });
    });

    it('should filter questions by category', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/questions?category=technical',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.questions).toBeDefined();
      body.questions.forEach((q: any) => {
        expect(q.category).toBe('technical');
      });
    });
  });

  describe('GET /api/questions/:id', () => {
    it('should get a question by ID', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/questions/test-question-1',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.question).toBeDefined();
      expect(body.question.id).toBe('test-question-1');
      expect(body.question.content).toContain('closures');
    });

    it('should return 404 for non-existent question', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/questions/non-existent-id',
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.error).toBe('Question not found');
    });
  });

  describe('POST /api/questions', () => {
    it('should create a new question', async () => {
      const questionData = {
        content: 'What is your experience with React hooks?',
        category: 'technical',
        difficulty: 'MEDIUM',
        position: 'Frontend Engineer',
        skillTags: ['react', 'hooks', 'javascript'],
      };

      const response = await server.inject({
        method: 'POST',
        url: '/api/questions',
        payload: questionData,
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.question).toBeDefined();
      expect(body.question.content).toBe(questionData.content);
      expect(body.question.category).toBe('technical');
      expect(body.question.difficulty).toBe('MEDIUM');
    });

    it('should reject question with content too short', async () => {
      const invalidData = {
        content: 'Short',
        category: 'technical',
        difficulty: 'MEDIUM',
        position: 'Engineer',
        skillTags: [],
      };

      const response = await server.inject({
        method: 'POST',
        url: '/api/questions',
        payload: invalidData,
      });

      expect(response.statusCode).toBe(500); // Zod validation error
    });
  });

  describe('POST /api/questions/:id/metrics', () => {
    it('should update question metrics', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/questions/test-question-1/metrics',
        payload: {
          avgScore: 8.0,
          correlationScore: 0.85,
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.question).toBeDefined();
      expect(body.question.avgScore).toBe(8.0);
      expect(body.question.correlationScore).toBe(0.85);
    });
  });

  describe('POST /api/questions/bulk-upload', () => {
    it('should bulk upload questions', async () => {
      const questionsToUpload = [
        {
          content: 'Describe a time when you had to learn a new technology quickly.',
          category: 'behavioral',
          difficulty: 'EASY',
          position: 'Software Engineer',
          skillTags: ['learning', 'adaptability'],
        },
        {
          content: 'How do you approach debugging a complex issue?',
          category: 'technical',
          difficulty: 'MEDIUM',
          position: 'Software Engineer',
          skillTags: ['debugging', 'problem-solving'],
        },
      ];

      const response = await server.inject({
        method: 'POST',
        url: '/api/questions/bulk-upload',
        payload: { questions: questionsToUpload },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.created).toBe(2);
      expect(body.failed).toBe(0);
      expect(body.questions).toHaveLength(2);
    });

    it('should handle partial failures in bulk upload', async () => {
      const questionsToUpload = [
        {
          content: 'A valid question with enough content here.',
          category: 'technical',
          difficulty: 'MEDIUM',
          position: 'Engineer',
          skillTags: ['skills'],
        },
        {
          content: 'Short', // Too short
          category: 'technical',
          difficulty: 'MEDIUM',
          position: 'Engineer',
          skillTags: [],
        },
      ];

      const response = await server.inject({
        method: 'POST',
        url: '/api/questions/bulk-upload',
        payload: { questions: questionsToUpload },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.created).toBe(1);
      expect(body.failed).toBe(1);
      expect(body.errors).toBeDefined();
      expect(body.errors).toHaveLength(1);
    });
  });
});

describe('Agent Routes', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildTestServer();
    await seedTestData(server);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET /api/agents/logs', () => {
    it('should return empty logs initially', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/agents/logs',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.logs).toBeDefined();
      expect(Array.isArray(body.logs)).toBe(true);
    });
  });

  describe('GET /api/agents/performance', () => {
    it('should return agent performance metrics', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/agents/performance',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.performance).toBeDefined();
      expect(Array.isArray(body.performance)).toBe(true);
    });
  });

  describe('GET /api/agents/feedback', () => {
    it('should return feedback loops', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/agents/feedback',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.feedbackLoops).toBeDefined();
      expect(Array.isArray(body.feedbackLoops)).toBe(true);
    });
  });

  describe('GET /api/agents/patterns', () => {
    it('should return patterns', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/agents/patterns',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.patterns).toBeDefined();
      expect(Array.isArray(body.patterns)).toBe(true);
    });
  });

  describe('GET /api/agents/scoring-models', () => {
    it('should return scoring models', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/agents/scoring-models',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.models).toBeDefined();
      expect(Array.isArray(body.models)).toBe(true);
    });
  });
});

describe('Voice Routes', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildTestServer();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('POST /api/voice/session/start', () => {
    it('should return 503 when voice service is not configured', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/voice/session/start',
        payload: {
          interviewId: 'test-interview-1',
          participantName: 'Test Participant',
        },
      });

      // Voice service is not configured in tests
      expect(response.statusCode).toBe(503);
      const body = JSON.parse(response.body);
      expect(body.error).toBe('Voice service not configured');
    });
  });

  describe('GET /api/voice/transcripts', () => {
    it('should return 503 when voice service is not configured', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/voice/transcripts',
      });

      expect(response.statusCode).toBe(503);
    });
  });

  describe('POST /api/voice/clone', () => {
    it('should return 503 when voice cloning is not configured', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/voice/clone',
        payload: {
          voiceName: 'Test Voice',
          sampleUrl: 'https://example.com/sample.mp3',
        },
      });

      expect(response.statusCode).toBe(503);
      const body = JSON.parse(response.body);
      expect(body.error).toContain('not configured');
    });
  });
});

describe('Proctoring Routes', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildTestServer();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('POST /api/proctoring/start', () => {
    it('should start proctoring', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/proctoring/start',
        payload: {
          interviewId: 'test-interview-1',
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.message).toBe('Proctoring started');
      expect(body.interviewId).toBe('test-interview-1');
    });
  });

  describe('POST /api/proctoring/stop', () => {
    it('should stop proctoring', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/proctoring/stop',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.message).toBe('Proctoring stopped');
      expect(body.summary).toBeDefined();
    });
  });

  describe('GET /api/proctoring/snapshots', () => {
    it('should return snapshots', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/proctoring/snapshots',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.snapshots).toBeDefined();
      expect(Array.isArray(body.snapshots)).toBe(true);
    });
  });

  describe('GET /api/proctoring/attention', () => {
    it('should return attention metrics', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/proctoring/attention',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.metrics).toBeDefined();
    });
  });

  describe('GET /api/proctoring/summary', () => {
    it('should return proctoring summary', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/proctoring/summary',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.summary).toBeDefined();
    });
  });
});
