/**
 * API information for the root route response
 */
export const API_INFO = {
  name: 'Warmscreen API',
  version: '0.1.0',
  status: 'ok',
  endpoints: {
    health: '/health',
    interviews: '/api/interviews',
    questions: '/api/questions',
    agents: '/api/agents',
    voice: '/api/voice',
    proctoring: '/api/proctoring',
  },
} as const;
