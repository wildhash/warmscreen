import { FastifyPluginAsync } from 'fastify';
import { ProctoringManager } from '@warmscreen/proctoring';

export const proctoringRoutes: FastifyPluginAsync = async (server) => {
  const proctoringManager = new ProctoringManager();
  await proctoringManager.initialize();

  // Start proctoring
  server.post('/start', async (request, reply) => {
    const { interviewId } = request.body as any;

    await proctoringManager.startProctoring();

    return { message: 'Proctoring started', interviewId };
  });

  // Stop proctoring
  server.post('/stop', async (request, reply) => {
    proctoringManager.stopProctoring();

    const summary = proctoringManager.getSummary();

    return { message: 'Proctoring stopped', summary };
  });

  // Process snapshot
  server.post('/snapshot', async (request, reply) => {
    const data = await request.file();
    
    if (!data) {
      return reply.code(400).send({ error: 'No file uploaded' });
    }

    const buffer = await data.toBuffer();
    const imageUrl = `snapshot-${Date.now()}.jpg`; // In real app, upload to storage

    const snapshot = await proctoringManager.processSnapshot(buffer, imageUrl);

    return { snapshot };
  });

  // Get snapshots
  server.get('/snapshots', async (request, reply) => {
    const snapshots = proctoringManager.getSnapshots();
    return { snapshots };
  });

  // Get attention metrics
  server.get('/attention', async (request, reply) => {
    const metrics = proctoringManager.getAttentionMetrics();
    return { metrics };
  });

  // Get proctoring summary
  server.get('/summary', async (request, reply) => {
    const summary = proctoringManager.getSummary();
    return { summary };
  });

  // Save proctoring data to interview
  server.post('/:id/save', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    const summary = proctoringManager.getSummary();
    const snapshots = proctoringManager.getSnapshots();

    await server.prisma.interview.update({
      where: { id },
      data: {
        proctoringData: {
          summary,
          snapshots: snapshots.slice(-10),
        } as any,
      },
    });

    return { message: 'Proctoring data saved' };
  });
};
