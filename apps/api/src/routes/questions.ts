import { FastifyPluginAsync } from 'fastify';
import { CreateQuestionSchema } from '@warmscreen/shared';
import { ReflexionSystem } from '@warmscreen/agents';
import {
  cacheGet,
  cacheSet,
  cacheDel,
  cacheInvalidatePattern,
  CacheKeys,
  CacheTTL,
} from '../lib/cache';

export const questionRoutes: FastifyPluginAsync = async (server) => {
  const reflexion = new ReflexionSystem(server.prisma);

  // List questions
  server.get('/', async (request, reply) => {
    const { position, category } = request.query as any;
    const cacheKey = CacheKeys.questionsList(position, category);

    // Try to get from cache first
    const cached = await cacheGet<{ questions: unknown[] }>(cacheKey);
    if (cached) {
      return cached;
    }

    const questions = await server.prisma.question.findMany({
      where: {
        ...(position && { position }),
        ...(category && { category }),
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { correlationScore: 'desc' },
    });

    const result = { questions };
    await cacheSet(cacheKey, result, CacheTTL.LONG);
    return result;
  });

  // Get question by ID
  server.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const cacheKey = CacheKeys.question(id);

    // Try to get from cache first
    const cached = await cacheGet<{ question: unknown }>(cacheKey);
    if (cached) {
      return cached;
    }

    const question = await server.prisma.question.findUnique({
      where: { id },
      include: {
        createdBy: true,
        responses: true,
      },
    });

    if (!question) {
      return reply.code(404).send({ error: 'Question not found' });
    }

    const result = { question };
    await cacheSet(cacheKey, result, CacheTTL.EXTENDED);
    return result;
  });

  // Create question
  server.post('/', async (request, reply) => {
    const data = CreateQuestionSchema.parse(request.body);

    // Get a user to be the creator (in real app, from auth)
    const user = await server.prisma.user.findFirst();
    if (!user) {
      return reply.code(400).send({ error: 'No users found' });
    }

    const question = await server.prisma.question.create({
      data: {
        content: data.content,
        category: data.category,
        difficulty: data.difficulty,
        position: data.position,
        skillTags: data.skillTags,
        generatedBy: data.generatedBy,
        generationPrompt: data.generationPrompt,
        createdById: user.id,
      },
    });

    // Invalidate questions list caches
    await cacheInvalidatePattern('questions:list:*');

    return reply.code(201).send({ question });
  });

  // Update question metrics
  server.post('/:id/metrics', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { avgScore, correlationScore } = request.body as any;

    const question = await server.prisma.question.update({
      where: { id },
      data: {
        avgScore,
        correlationScore,
        timesAsked: { increment: 1 },
        lastUsed: new Date(),
      },
    });

    // Invalidate caches
    await cacheDel(CacheKeys.question(id));
    await cacheInvalidatePattern('questions:list:*');

    return { question };
  });

  // Generate new questions
  server.post('/generate', async (request, reply) => {
    const { position } = request.body as any;

    const prompts = await reflexion.generateNewQuestions(position);

    return { prompts, message: 'Question generation prompts created' };
  });

  // Update correlation scores
  server.post('/update-correlations', async (request, reply) => {
    const { position } = request.body as any;

    await reflexion.updateQuestionCorrelations(position);

    return { message: 'Question correlations updated' };
  });

  // Bulk upload questions
  server.post('/bulk-upload', async (request, reply) => {
    const { questions } = request.body as any;

    if (!Array.isArray(questions) || questions.length === 0) {
      return reply.code(400).send({ error: 'Questions array is required' });
    }

    // Get a user to be the creator (in real app, from auth)
    const user = await server.prisma.user.findFirst();
    if (!user) {
      return reply.code(400).send({ error: 'No users found' });
    }

    // Validate and create questions
    const createdQuestions = [];
    const errors = [];

    for (let i = 0; i < questions.length; i++) {
      try {
        const data = CreateQuestionSchema.parse(questions[i]);
        
        const question = await server.prisma.question.create({
          data: {
            content: data.content,
            category: data.category,
            difficulty: data.difficulty,
            position: data.position,
            skillTags: data.skillTags,
            generatedBy: data.generatedBy,
            generationPrompt: data.generationPrompt,
            createdById: user.id,
          },
        });

        createdQuestions.push(question);
      } catch (error: any) {
        errors.push({ 
          index: i, 
          question: questions[i], 
          error: error.message 
        });
      }
    }

    // Invalidate questions list caches if any were created
    if (createdQuestions.length > 0) {
      await cacheInvalidatePattern('questions:list:*');
    }

    return {
      success: true,
      created: createdQuestions.length,
      failed: errors.length,
      questions: createdQuestions,
      errors: errors.length > 0 ? errors : undefined,
    };
  });
};
