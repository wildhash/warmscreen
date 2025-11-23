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
  "interviewId": "clxyz123..."
}
```

**Note:** The `agentId` and `projectId` are now automatically loaded from environment variables (`LIVEKIT_AGENT_ID` and `LIVEKIT_PROJECT_ID`) instead of being passed in the request.

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

- **400 Bad Request:** Missing required field
```json
{
  "error": "Missing required field: interviewId"
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
# LiveKit Configuration (Required for agent functionality)
LIVEKIT_URL=wss://your-livekit-instance.com
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret

# LiveKit Agent Configuration (Required)
# These values are from the LiveKit Cloud agent builder
LIVEKIT_AGENT_ID=ab_15cy5pu678o
LIVEKIT_PROJECT_ID=p_ds8e1g76bj2

# Default recruiter ID for interviews (Optional, defaults to 'default-recruiter')
DEFAULT_RECRUITER_ID=default-recruiter
```

**Note:** The agent ID and project ID are now configured via environment variables instead of being hardcoded. This improves security and allows for easy configuration across different environments (dev, staging, prod).

## Error Handling

### Frontend Error Handling

1. **Network Errors:** Displays "Failed to create interview: [error details]. Please check your input and try again."
2. **Agent Initialization Errors:** Displays "Interview created successfully, but LiveKit agent initialization failed: [error details]. You can retry initialization later."
3. **Validation Errors:** HTML5 form validation for required fields
4. **Detailed Error Messages:** Error responses from the API are parsed and displayed to users with actionable information

### Backend Error Handling

1. **Configuration Check at Startup:** Validates LiveKit credentials and agent configuration when the server starts (fail-fast approach)
2. **Request Validation:** Validates required fields before processing
3. **Interview Validation:** Verifies interview exists with detailed error messages
4. **Error Logging:** All initialization attempts (success and failure) are logged to `AgentLog` table
5. **Graceful Degradation:** If agent initialization fails, the interview is still created (non-blocking)
6. **Detailed Error Responses:** API returns specific error messages with details for troubleshooting

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
  };

  // Fetch default recruiter ID (automatically loaded from config)
  const configData = await fetcher('/api/interviews/config/default-recruiter');
  
  // Create interview
  const result = await apiPost('/api/interviews', {
    ...interviewData,
    recruiterId: configData.recruiterId,
  });
  
  // Initialize LiveKit agent (agent ID and project ID are from env vars)
  await apiPost('/api/interviews/livekit-agent/initialize', {
    interviewId: result.interview.id,
  });
};
```

### Backend Integration

```typescript
// API example (Fastify)
// Configuration is validated at startup
const isLiveKitAgentConfigured = Boolean(
  server.config.LIVEKIT_URL && 
  server.config.LIVEKIT_API_KEY && 
  server.config.LIVEKIT_API_SECRET &&
  server.config.LIVEKIT_AGENT_ID &&
  server.config.LIVEKIT_PROJECT_ID
);

server.post('/interviews/livekit-agent/initialize', async (request, reply) => {
  if (!isLiveKitAgentConfigured) {
    return reply.code(503).send({ error: 'LiveKit agent not configured' });
  }
  
  const { interviewId } = request.body;
  
  // Agent and project IDs are loaded from environment
  const agentId = server.config.LIVEKIT_AGENT_ID;
  const projectId = server.config.LIVEKIT_PROJECT_ID;
  
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
  
  return { success: true, roomName, agentId, projectId };
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

### "LiveKit agent is not configured" Error

**Solution:** Ensure all LiveKit environment variables are set in `apps/api/.env`:
- `LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_AGENT_ID` (set to `ab_15cy5pu678o`)
- `LIVEKIT_PROJECT_ID` (set to `p_ds8e1g76bj2`)

Check the server logs on startup - there should be a warning if configuration is incomplete.

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
