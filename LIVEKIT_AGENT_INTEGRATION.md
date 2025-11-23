# LiveKit Agent Integration Guide

## Overview

This document describes the integration of the LiveKit Cloud agent (Agent ID: `ab_15cy5pu678o`, Project ID: `p_ds8e1g76bj2`) with the WarmScreen interview system.

## Features

### Create Interview Button
- Located on the interviews list page (`/interviews`)
- Opens a modal form for creating new interviews
- Automatically initializes the LiveKit agent when an interview is created

### Interview Creation Flow

1. User clicks "Create Interview" button
2. Modal form appears with the following fields:
   - Candidate Name (required)
   - Candidate Email (required)
   - Position (required)
   - Scheduled Date & Time (required)

3. On form submission:
   - Interview is created via POST `/api/interviews`
   - LiveKit agent is initialized via POST `/api/interviews/livekit-agent/initialize`
   - Interview list is refreshed automatically

4. UI feedback:
   - Loading spinner during creation
   - Error messages if something fails
   - Form automatically resets on success

## API Endpoints

### Initialize LiveKit Agent

**Endpoint:** `POST /api/interviews/livekit-agent/initialize`

**Request Body:**
```json
{
  "interviewId": "clxyz123...",
  "agentId": "ab_15cy5pu678o",
  "projectId": "p_ds8e1g76bj2"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "LiveKit agent initialized successfully",
  "roomName": "interview-clxyz123...",
  "agentId": "ab_15cy5pu678o",
  "projectId": "p_ds8e1g76bj2",
  "interviewId": "clxyz123..."
}
```

**Error Responses:**

- **400 Bad Request:** Missing required fields
```json
{
  "error": "Missing required fields: interviewId, agentId, projectId"
}
```

- **404 Not Found:** Interview doesn't exist
```json
{
  "error": "Interview not found"
}
```

- **503 Service Unavailable:** LiveKit not configured
```json
{
  "error": "LiveKit is not configured. Please set LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET environment variables."
}
```

- **500 Internal Server Error:** Initialization failed
```json
{
  "error": "Failed to initialize LiveKit agent",
  "details": "Error details here"
}
```

## Environment Variables

The following environment variables must be set in `apps/api/.env` for the LiveKit agent to function:

```env
# LiveKit Configuration
LIVEKIT_URL=wss://your-livekit-instance.com
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

## Error Handling

### Frontend Error Handling

1. **Network Errors:** Displays "Failed to create interview. Please try again."
2. **Agent Initialization Errors:** Displays "Interview created but LiveKit agent initialization failed. You can retry later."
3. **Validation Errors:** HTML5 form validation for required fields

### Backend Error Handling

1. **Configuration Check:** Validates LiveKit credentials before attempting initialization
2. **Interview Validation:** Verifies interview exists before initializing agent
3. **Error Logging:** All initialization attempts (success and failure) are logged to `AgentLog` table
4. **Graceful Degradation:** If agent initialization fails, the interview is still created (non-blocking)

## Agent Logging

All LiveKit agent operations are logged to the `AgentLog` table with:

- **Agent Type:** `CONDUCTOR`
- **Actions:**
  - `LIVEKIT_AGENT_INITIALIZE` - Successful initialization
  - `LIVEKIT_AGENT_INITIALIZE_ERROR` - Failed initialization
- **Input:** Contains agentId, projectId, roomName
- **Output:** Contains status or error details
- **Performance Score:** 1.0 for success, 0 for failure

## Room Naming Convention

LiveKit rooms are created with the naming pattern: `interview-{interviewId}`

Example: `interview-clxyz123abc456`

## Usage Example

### Creating an Interview with LiveKit Agent

```typescript
// Frontend example (React)
const handleCreateInterview = async () => {
  const interviewData = {
    candidateName: 'Jane Doe',
    candidateEmail: 'jane@example.com',
    position: 'Senior Software Engineer',
    scheduledAt: '2024-01-15T10:00:00Z',
    recruiterId: 'default-recruiter',
  };

  // Create interview
  const result = await apiPost('/api/interviews', interviewData);
  
  // Initialize LiveKit agent
  await apiPost('/api/interviews/livekit-agent/initialize', {
    interviewId: result.interview.id,
    agentId: 'ab_15cy5pu678o',
    projectId: 'p_ds8e1g76bj2',
  });
};
```

### Backend Integration

```typescript
// API example (Fastify)
server.post('/interviews/livekit-agent/initialize', async (request, reply) => {
  const { interviewId, agentId, projectId } = request.body;
  
  // Validate configuration
  if (!server.config.LIVEKIT_URL) {
    return reply.code(503).send({ error: 'LiveKit not configured' });
  }
  
  // Create room and log
  const roomName = `interview-${interviewId}`;
  await server.prisma.agentLog.create({
    data: {
      interviewId,
      agentType: 'CONDUCTOR',
      action: 'LIVEKIT_AGENT_INITIALIZE',
      input: { agentId, projectId, roomName },
      output: { status: 'initialized' },
    },
  });
  
  return { success: true, roomName };
});
```

## Testing

### Manual Testing Steps

1. Start the API server: `npm run dev` (from apps/api)
2. Start the web app: `npm run dev` (from apps/web)
3. Navigate to http://localhost:3000/interviews
4. Click "Create Interview" button
5. Fill in the form:
   - Candidate Name: Test Candidate
   - Candidate Email: test@example.com
   - Position: Software Engineer
   - Scheduled Date: Select a future date/time
6. Click "Create Interview"
7. Verify:
   - Loading spinner appears
   - Modal closes on success
   - New interview appears in the list
   - Check browser console for any errors

### Verifying Agent Initialization

Check the `AgentLog` table in the database:

```sql
SELECT * FROM "AgentLog" 
WHERE action LIKE 'LIVEKIT_AGENT_%' 
ORDER BY "createdAt" DESC 
LIMIT 10;
```

## Troubleshooting

### "LiveKit is not configured" Error

**Solution:** Ensure `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET` are set in `apps/api/.env`

### Agent Initialization Fails Silently

**Solution:** Check the `AgentLog` table for error details. Common issues:
- Invalid credentials
- Network connectivity to LiveKit Cloud
- Incorrect agent ID or project ID

### Interview Created But Agent Not Initialized

This is expected behavior - the system is designed to be resilient. The interview creation will succeed even if agent initialization fails, allowing you to retry initialization later.

## Future Enhancements

Potential improvements for this integration:

1. **Retry Mechanism:** Automatic retry of failed agent initializations
2. **Status Indicator:** Show agent initialization status on interview detail page
3. **Manual Retry:** Button to manually retry agent initialization
4. **Real-time Updates:** WebSocket notifications when agent is ready
5. **Agent Health Check:** Periodic checks of agent status
6. **Configuration UI:** Admin interface to configure agent settings

## Related Documentation

- [Voice Interviewer Guide](./VOICE_INTERVIEWER_GUIDE.md)
- [README](./README.md)
- [LiveKit Documentation](https://docs.livekit.io/)

## Support

For issues or questions about the LiveKit agent integration:
- Check the `AgentLog` table for detailed error information
- Review the API logs for initialization attempts
- Verify environment variables are correctly set
- Consult the [LiveKit Cloud Console](https://cloud.livekit.io/) for agent status
