import { FastifyPluginAsync } from 'fastify';
import { ReflexionSystem } from '@warmscreen/agents';

export const agentRoutes: FastifyPluginAsync = async (server) => {
  const reflexion = new ReflexionSystem(server.prisma);

  // Get agent logs
  server.get('/logs', async (request, reply) => {
    const { interviewId, agentType } = request.query as any;

    const logs = await server.prisma.agentLog.findMany({
      where: {
        ...(interviewId && { interviewId }),
        ...(agentType && { agentType }),
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return { logs };
  });

  // Get agent performance metrics
  server.get('/performance', async (request, reply) => {
    const logs = await server.prisma.agentLog.findMany({
      where: {
        performanceScore: { not: null },
      },
    });

    // Calculate metrics by agent type
    const metricsByAgent: Record<string, any> = {};

    logs.forEach(log => {
      if (!metricsByAgent[log.agentType]) {
        metricsByAgent[log.agentType] = {
          scores: [],
          reflexionLoops: [],
        };
      }
      metricsByAgent[log.agentType].scores.push(log.performanceScore);
      metricsByAgent[log.agentType].reflexionLoops.push(log.reflexionLoop);
    });

    const performance = Object.entries(metricsByAgent).map(([agent, data]) => ({
      agent,
      avgScore: data.scores.reduce((a: number, b: number) => a + b, 0) / data.scores.length,
      avgReflexionLoops: data.reflexionLoops.reduce((a: number, b: number) => a + b, 0) / data.reflexionLoops.length,
      totalExecutions: data.scores.length,
    }));

    return { performance };
  });

  // Get feedback loops
  server.get('/feedback', async (request, reply) => {
    const { type, interviewId } = request.query as any;

    const feedbackLoops = await server.prisma.feedbackLoop.findMany({
      where: {
        ...(type && { feedbackType: type }),
        ...(interviewId && { interviewId }),
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return { feedbackLoops };
  });

  // Get patterns
  server.get('/patterns', async (request, reply) => {
    const { category, amplified } = request.query as any;

    const patterns = await server.prisma.pattern.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
        ...(amplified !== undefined && { amplified: amplified === 'true' }),
      },
      orderBy: { strength: 'desc' },
    });

    return { patterns };
  });

  // Refine scoring model
  server.post('/refine-scoring', async (request, reply) => {
    const { position } = request.body as any;

    await reflexion.refineScoringModel(position);

    return { message: 'Scoring model refinement initiated' };
  });

  // Get scoring models
  server.get('/scoring-models', async (request, reply) => {
    const { position } = request.query as any;

    const models = await server.prisma.scoringModel.findMany({
      where: {
        ...(position && { position }),
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { models };
  });
};
