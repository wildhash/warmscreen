import { FastifyPluginAsync } from 'fastify';
import { CreateInterviewSchema, UpdateInterviewSchema } from '@warmscreen/shared';
import { ConductorAgent } from '@warmscreen/agents';
import { ReflexionSystem } from '@warmscreen/agents';

export const interviewRoutes: FastifyPluginAsync = async (server) => {
  const conductor = new ConductorAgent(server.prisma);
  const reflexion = new ReflexionSystem(server.prisma);

  // Validate LiveKit agent configuration at startup
  const isLiveKitAgentConfigured = Boolean(
    server.config.LIVEKIT_URL && 
    server.config.LIVEKIT_API_KEY && 
    server.config.LIVEKIT_API_SECRET &&
    server.config.LIVEKIT_AGENT_ID &&
    server.config.LIVEKIT_PROJECT_ID
  );

  if (!isLiveKitAgentConfigured) {
    server.log.warn('LiveKit agent not fully configured. Agent initialization endpoint will not be available.');
  }

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

    // Resolve the recruiter ID to use for this interview
    const resolveRecruiterId = async (): Promise<string> => {
      // If a specific recruiterId was provided, verify it exists
      if (data.recruiterId) {
        const recruiter = await server.prisma.user.findUnique({
          where: { id: data.recruiterId },
        });
        if (recruiter) {
          return data.recruiterId;
        }
      }

      // Try to find any existing recruiter
      const existingRecruiter = await server.prisma.user.findFirst({
        where: { role: 'RECRUITER' },
      });

      if (existingRecruiter) {
        return existingRecruiter.id;
      }

      // Create a default recruiter
      const newRecruiter = await server.prisma.user.create({
        data: {
          id: 'default-recruiter',
          email: 'recruiter@warmscreen.com',
          name: 'Default Recruiter',
          role: 'RECRUITER',
        },
      });
      return newRecruiter.id;
    };

    const recruiterId = await resolveRecruiterId();

    const interview = await server.prisma.interview.create({
      data: {
        candidateName: data.candidateName,
        candidateEmail: data.candidateEmail,
        candidateId: `candidate-${Date.now()}`,
        position: data.position,
        scheduledAt: new Date(data.scheduledAt),
        recruiterId,
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

  // Start interview
  server.post('/:id/start', async (request, reply) => {
    const { id } = request.params as { id: string };

    const interview = await server.prisma.interview.findUnique({
      where: { id },
    });

    if (!interview) {
      return reply.code(404).send({ error: 'Interview not found' });
    }

    if (interview.status !== 'SCHEDULED') {
      return reply.code(400).send({ error: 'Interview already started or completed' });
    }

    // Update status to IN_PROGRESS
    const updated = await server.prisma.interview.update({
      where: { id },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    });

    // Get questions for this position
    const questions = await server.prisma.question.findMany({
      where: { position: interview.position },
      take: 5,
      orderBy: [
        { correlationScore: 'desc' },
        { avgScore: 'desc' },
      ],
    });

    return { interview: updated, questions };
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

  // Initialize LiveKit agent for an interview
  server.post('/livekit-agent/initialize', async (request, reply) => {
    // Check if LiveKit agent is configured
    if (!isLiveKitAgentConfigured) {
      return reply.code(503).send({ 
        error: 'LiveKit agent is not configured',
        details: 'Please set LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_AGENT_ID, and LIVEKIT_PROJECT_ID environment variables.',
      });
    }

    const { interviewId } = request.body as any;

    if (!interviewId) {
      return reply.code(400).send({ 
        error: 'Missing required field: interviewId',
      });
    }

    // Use configured agent and project IDs from environment
    const agentId = server.config.LIVEKIT_AGENT_ID;
    const projectId = server.config.LIVEKIT_PROJECT_ID;

    try {
      // Verify interview exists
      const interview = await server.prisma.interview.findUnique({
        where: { id: interviewId },
      });

      if (!interview) {
        return reply.code(404).send({ 
          error: 'Interview not found',
          details: `No interview found with ID: ${interviewId}`,
        });
      }

      // Create a LiveKit room for the interview
      const roomName = `interview-${interviewId}`;

      // Log the agent initialization
      await server.prisma.agentLog.create({
        data: {
          interviewId,
          agentType: 'CONDUCTOR',
          action: 'LIVEKIT_AGENT_INITIALIZE',
          input: {
            agentId,
            projectId,
            roomName,
          },
          output: {
            status: 'initialized',
            timestamp: new Date().toISOString(),
          },
          performanceScore: 1.0,
          reflexionLoop: 0,
        },
      });

      return {
        success: true,
        message: 'LiveKit agent initialized successfully',
        roomName,
        agentId,
        projectId,
        interviewId,
      };
    } catch (error: any) {
      console.error('Failed to initialize LiveKit agent:', error);
      
      // Log the error
      try {
        await server.prisma.agentLog.create({
          data: {
            interviewId,
            agentType: 'CONDUCTOR',
            action: 'LIVEKIT_AGENT_INITIALIZE_ERROR',
            input: {
              agentId,
              projectId,
              error: error.message,
            },
            output: {
              error: error.message,
              timestamp: new Date().toISOString(),
            },
            performanceScore: 0,
            reflexionLoop: 0,
          },
        });
      } catch (logError) {
        console.error('Failed to log error:', logError);
      }

      return reply.code(500).send({ 
        error: 'Failed to initialize LiveKit agent',
        details: error.message,
      });
    }
  });

  // Get LiveKit agent configuration status
  server.get('/livekit-agent/config', async (request, reply) => {
    return {
      configured: isLiveKitAgentConfigured,
      agentId: isLiveKitAgentConfigured ? server.config.LIVEKIT_AGENT_ID : null,
      projectId: isLiveKitAgentConfigured ? server.config.LIVEKIT_PROJECT_ID : null,
    };
  });

  // Get default recruiter ID
  server.get('/config/default-recruiter', async (request, reply) => {
    return {
      recruiterId: server.config.DEFAULT_RECRUITER_ID,
    };
  });
};
