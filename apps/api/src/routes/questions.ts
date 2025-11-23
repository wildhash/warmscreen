import { FastifyPluginAsync } from 'fastify';
import { CreateQuestionSchema } from '@warmscreen/shared';
import { ReflexionSystem } from '@warmscreen/agents';

export const questionRoutes: FastifyPluginAsync = async (server) => {
  const reflexion = new ReflexionSystem(server.prisma);

  // List questions
  server.get('/', async (request, reply) => {
    const { position, category } = request.query as any;

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

    return { questions };
  });

  // Get question by ID
  server.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

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

    return { question };
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
};
