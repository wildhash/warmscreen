import { FastifyPluginAsync } from 'fastify';
import { CreateInterviewSchema, UpdateInterviewSchema } from '@warmscreen/shared';
import { ConductorAgent } from '@warmscreen/agents';
import { ReflexionSystem } from '@warmscreen/agents';

export const interviewRoutes: FastifyPluginAsync = async (server) => {
  const conductor = new ConductorAgent(server.prisma);
  const reflexion = new ReflexionSystem(server.prisma);

  // List interviews
  server.get('/', async (request, reply) => {
    const interviews = await server.prisma.interview.findMany({
      include: {
        recruiter: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { scheduledAt: 'desc' },
      take: 50,
    });

    return { interviews };
  });

  // Get interview by ID
  server.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const interview = await server.prisma.interview.findUnique({
      where: { id },
      include: {
        recruiter: true,
        responses: {
          include: { question: true },
        },
        agentLogs: true,
        feedbackLoops: true,
      },
    });

    if (!interview) {
      return reply.code(404).send({ error: 'Interview not found' });
    }

    return { interview };
  });

  // Create interview
  server.post('/', async (request, reply) => {
    const data = CreateInterviewSchema.parse(request.body);

    const interview = await server.prisma.interview.create({
      data: {
        candidateName: data.candidateName,
        candidateEmail: data.candidateEmail,
        candidateId: `candidate-${Date.now()}`,
        position: data.position,
        scheduledAt: new Date(data.scheduledAt),
        recruiterId: data.recruiterId,
        status: 'SCHEDULED',
      },
    });

    return reply.code(201).send({ interview });
  });

  // Update interview
  server.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = UpdateInterviewSchema.parse(request.body);

    const interview = await server.prisma.interview.update({
      where: { id },
      data: {
        ...data,
        startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
        completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
      },
    });

    return { interview };
  });

  // Submit response
  server.post('/:id/responses', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { questionId, transcript, audioUrl, duration } = request.body as any;

    // Get interview and question
    const interview = await server.prisma.interview.findUnique({
      where: { id },
    });

    const question = await server.prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!interview || !question) {
      return reply.code(404).send({ error: 'Interview or question not found' });
    }

    // Process through agent swarm
    const agentResults = await conductor.processResponse({
      interviewId: id,
      questionId,
      transcript,
      questionCategory: question.category,
      position: interview.position,
    });

    // Create response record
    const response = await server.prisma.response.create({
      data: {
        interviewId: id,
        questionId,
        transcript,
        audioUrl,
        duration,
        scores: agentResults.analyzed.result.scores,
        tags: agentResults.tagged.result.skillTags,
        sentiment: agentResults.tagged.result.sentiment,
        confidence: agentResults.analyzed.confidence,
      },
    });

    return { response, agentResults };
  });

  // Finalize interview
  server.post('/:id/finalize', async (request, reply) => {
    const { id } = request.params as { id: string };

    const interview = await server.prisma.interview.findUnique({
      where: { id },
      include: {
        responses: true,
      },
    });

    if (!interview) {
      return reply.code(404).send({ error: 'Interview not found' });
    }

    // Get active scoring model
    const scoringModel = await server.prisma.scoringModel.findFirst({
      where: { position: interview.position, isActive: true },
    });

    // Finalize through conductor
    const results = await conductor.finalizeInterview({
      interviewId: id,
      responses: interview.responses,
      scoringModel,
      position: interview.position,
      candidateName: interview.candidateName,
    });

    // Update interview with results
    const updated = await server.prisma.interview.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        score: results.scoring.result.overallScore,
        decision: results.scoring.result.decision,
        explainability: results.explanation.result,
      },
    });

    // Trigger learning
    await reflexion.learnFromInterview(id);
    await conductor.performSelfHealing(id);

    return { interview: updated, results };
  });

  // Export interview results
  server.get('/:id/export', async (request, reply) => {
    const { id } = request.params as { id: string };

    const interview = await server.prisma.interview.findUnique({
      where: { id },
      include: {
        responses: {
          include: { question: true },
        },
        recruiter: true,
        agentLogs: true,
      },
    });

    if (!interview) {
      return reply.code(404).send({ error: 'Interview not found' });
    }

    return {
      export: {
        candidate: {
          name: interview.candidateName,
          email: interview.candidateEmail,
        },
        position: interview.position,
        decision: interview.decision,
        score: interview.score,
        explainability: interview.explainability,
        conductedAt: interview.completedAt,
        responses: interview.responses.map((r: any) => ({
          question: r.question.content,
          transcript: r.transcript,
          scores: r.scores,
          tags: r.tags,
        })),
      },
    };
  });
};
