# Voice Interviewer Agent - Setup & Usage Guide

## Overview

The Voice Interviewer Agent is a functional AI-powered system that conducts voice interviews using text-to-speech (TTS) technology and manages interview questions. This document provides complete setup instructions and usage examples.

## Features

✅ **Voice Interviewer Agent**
- Text-to-speech powered interview questions
- Natural conversation flow (greeting → questions → acknowledgments → closing)
- Customizable interviewer voice
- Support for voice cloning (with ElevenLabs Pro+)

✅ **Question Management**
- Database of interview questions
- Filter by position, category, difficulty
- Bulk question upload
- Learning metrics (correlation scores, usage tracking)

✅ **Interview Flow**
- Start interview with personalized greeting
- Ask questions with natural TTS
- Acknowledge candidate responses
- End interview with closing message

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Voice Interviewer Agent                                 │
│  ┌───────────────────────────────────────────────────┐  │
│  │  VoiceInterviewerAgent                            │  │
│  │  - Orchestrates interview flow                    │  │
│  │  - Uses TTS for questions                         │  │
│  │  - Manages conversation state                     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Voice Management Package (@warmscreen/voice)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  LiveKit     │  │  Deepgram    │  │ ElevenLabs   │  │
│  │  (Voice)     │  │  (STT)       │  │ (TTS)        │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Database (PostgreSQL)                                   │
│  - Questions                                             │
│  - Interviews                                            │
│  - Scoring Models                                        │
│  - Agent Logs                                            │
└─────────────────────────────────────────────────────────┘
```

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Docker (for database)
- npm 10+

## Installation

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/wildhash/warmscreen.git
cd warmscreen
npm install
```

### 2. Start Database

```bash
docker compose up -d
```

This starts PostgreSQL and Redis.

### 3. Setup Database Schema

```bash
cd packages/database
cp .env.example .env
npm run db:generate
npm run db:push
```

### 4. Seed Database with Sample Questions

```bash
npm run db:seed
```

This creates:
- 1 test user
- 12 sample interview questions (Software Engineer, Senior, Data Scientist, Product Manager)
- 1 scoring model

### 5. Configure API Environment

```bash
cd ../../apps/api
cp .env.example .env
```

Edit `.env` file:

```env
PORT=3001
DATABASE_URL="postgresql://warmscreen:password@localhost:5432/warmscreen?schema=public"

# Required for TTS and Voice Cloning
ELEVENLABS_API_KEY="your_elevenlabs_api_key_here"

# Optional: Set a specific voice ID for the interviewer
INTERVIEWER_VOICE_ID="voice_id_here"

# Optional: LiveKit for real-time voice (not required for TTS-only)
LIVEKIT_URL=""
LIVEKIT_API_KEY=""
LIVEKIT_API_SECRET=""

# Optional: Deepgram for speech-to-text
DEEPGRAM_API_KEY=""
```

### 6. Start the API Server

```bash
npm run dev
```

The API will start on http://localhost:3001

## Getting an ElevenLabs API Key

1. Sign up at https://elevenlabs.io
2. Go to your profile settings
3. Navigate to API Keys section
4. Create a new API key
5. Copy it to your `.env` file

**Note:** Voice cloning requires ElevenLabs Pro+ subscription ($11/month minimum)

## Testing the System

Run the comprehensive test suite:

```bash
cd /path/to/warmscreen
node test-voice-interviewer.js
```

This will test:
1. ✅ API health check
2. ✅ Question management (list, filter)
3. ✅ TTS endpoints (if configured)
4. ✅ Voice list
5. ✅ Simulated interview flow
6. ✅ Bulk question upload

## API Endpoints

### Voice & TTS Endpoints

#### Convert Text to Speech
```bash
POST /api/voice/tts/speak
Content-Type: application/json

{
  "text": "Hello, this is a test",
  "voiceId": "optional_voice_id"
}

# Returns: audio/mpeg (MP3 audio data)
```

#### List Available Voices
```bash
GET /api/voice/tts/voices

# Returns:
{
  "voices": [
    {
      "voiceId": "21m00Tcm4TlvDq8ikWAM",
      "name": "Rachel",
      "category": "premade"
    }
  ]
}
```

### Interview Flow Endpoints

#### Start Interview (with Greeting)
```bash
POST /api/voice/interview/start
Content-Type: application/json

{
  "candidateName": "John Doe"
}

# Returns: audio/mpeg (MP3 greeting)
```

#### Ask a Question
```bash
POST /api/voice/interview/ask-question
Content-Type: application/json

{
  "question": {
    "id": "question_id",
    "content": "Tell me about your experience with React?",
    "category": "Technical",
    "difficulty": "MEDIUM"
  }
}

# Returns: audio/mpeg (MP3 question)
```

#### Acknowledge Response
```bash
POST /api/voice/interview/acknowledge
Content-Type: application/json

{
  "type": "positive"  # or "neutral" or "encouragement"
}

# Returns: audio/mpeg (MP3 acknowledgment)
```

#### End Interview
```bash
POST /api/voice/interview/end

# Returns: audio/mpeg (MP3 closing message)
```

#### Set Interviewer Voice
```bash
POST /api/voice/interview/set-voice
Content-Type: application/json

{
  "voiceId": "voice_id_from_elevenlabs"
}
```

### Question Management Endpoints

#### List All Questions
```bash
GET /api/questions

# Optional filters:
GET /api/questions?position=Software+Engineer
GET /api/questions?category=Technical
```

#### Get Single Question
```bash
GET /api/questions/:id
```

#### Create Question
```bash
POST /api/questions
Content-Type: application/json

{
  "content": "What is your experience with React?",
  "category": "Technical",
  "difficulty": "MEDIUM",
  "position": "Software Engineer",
  "skillTags": ["React", "JavaScript", "Frontend"]
}
```

#### Bulk Upload Questions
```bash
POST /api/questions/bulk-upload
Content-Type: application/json

{
  "questions": [
    {
      "content": "Question 1?",
      "category": "Technical",
      "difficulty": "MEDIUM",
      "position": "Software Engineer",
      "skillTags": ["Tag1", "Tag2"]
    },
    {
      "content": "Question 2?",
      "category": "Architecture",
      "difficulty": "HARD",
      "position": "Senior Software Engineer",
      "skillTags": ["Tag3", "Tag4"]
    }
  ]
}
```

## Usage Examples

### Example 1: Simple Interview Flow

```javascript
// 1. Get questions for position
const questions = await fetch('http://localhost:3001/api/questions?position=Software+Engineer')
  .then(r => r.json());

// 2. Start interview
const greetingAudio = await fetch('http://localhost:3001/api/voice/interview/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ candidateName: 'Jane Smith' })
}).then(r => r.arrayBuffer());

// Play greetingAudio...

// 3. Ask first question
const questionAudio = await fetch('http://localhost:3001/api/voice/interview/ask-question', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: questions.questions[0] })
}).then(r => r.arrayBuffer());

// Play questionAudio...
// Wait for candidate response via STT...

// 4. Acknowledge
const ackAudio = await fetch('http://localhost:3001/api/voice/interview/acknowledge', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'positive' })
}).then(r => r.arrayBuffer());

// 5. End interview
const closingAudio = await fetch('http://localhost:3001/api/voice/interview/end', {
  method: 'POST'
}).then(r => r.arrayBuffer());
```

### Example 2: Using cURL

```bash
# Start interview
curl -X POST http://localhost:3001/api/voice/interview/start \
  -H "Content-Type: application/json" \
  -d '{"candidateName": "John Doe"}' \
  --output greeting.mp3

# Play the audio
# mpg123 greeting.mp3  # Linux
# afplay greeting.mp3  # macOS
```

### Example 3: Bulk Upload Questions from JSON

```bash
cat > questions.json << 'EOF'
{
  "questions": [
    {
      "content": "Describe your experience with Docker and containerization.",
      "category": "DevOps",
      "difficulty": "MEDIUM",
      "position": "Software Engineer",
      "skillTags": ["Docker", "Containers", "DevOps"]
    },
    {
      "content": "How would you design a scalable microservices architecture?",
      "category": "Architecture",
      "difficulty": "HARD",
      "position": "Senior Software Engineer",
      "skillTags": ["Microservices", "Architecture", "Scalability"]
    }
  ]
}
EOF

curl -X POST http://localhost:3001/api/questions/bulk-upload \
  -H "Content-Type: application/json" \
  -d @questions.json
```

## Voice Cloning Setup

To clone a voice from someone at your company:

### Option 1: Via ElevenLabs Dashboard (Recommended)

1. Go to https://elevenlabs.io/voice-lab
2. Click "Add Voice" → "Instant Voice Cloning"
3. Upload 1-3 minutes of clear audio samples
4. Name the voice (e.g., "Company Interviewer")
5. Copy the Voice ID
6. Add to `.env`:
   ```
   INTERVIEWER_VOICE_ID=your_cloned_voice_id
   ```
7. Restart API server

### Option 2: Via API (Requires Pro+ and implementation)

The API endpoint exists but voice cloning via API requires:
- ElevenLabs Pro+ subscription
- High-quality audio samples (WAV or MP3)
- Manual voice profile setup

Currently, we recommend using the ElevenLabs dashboard for voice cloning.

## Database Schema

### Questions Table
- `content`: Question text
- `category`: Technical, Behavioral, etc.
- `difficulty`: EASY, MEDIUM, HARD, EXPERT
- `position`: Job position
- `skillTags`: Array of skill keywords
- `avgScore`: Average candidate score
- `timesAsked`: Usage count
- `correlationScore`: Correlation with successful hires

## Troubleshooting

### Issue: "TTS not configured"
**Solution:** Add `ELEVENLABS_API_KEY` to your `.env` file and restart the server.

### Issue: "Voice service not configured"
**Solution:** Ensure LiveKit and Deepgram credentials are set (if using real-time voice).

### Issue: Database connection error
**Solution:** Ensure PostgreSQL is running via `docker compose up -d`

### Issue: API not starting
**Solution:** Check logs, ensure port 3001 is available, check database connection.

## Next Steps

1. **Add Real-Time Voice**: Configure LiveKit for bidirectional audio
2. **Add Speech-to-Text**: Configure Deepgram to transcribe candidate responses
3. **Build Frontend**: Create UI for conducting interviews
4. **Integrate Agents**: Connect the 7-agent swarm for response analysis
5. **Add Proctoring**: Enable webcam-based candidate monitoring

## Support

For issues or questions:
- GitHub Issues: https://github.com/wildhash/warmscreen/issues
- Documentation: https://github.com/wildhash/warmscreen/wiki

## License

MIT License - see LICENSE file for details

---

Built with ❤️ using Next.js, Fastify, ElevenLabs, and TypeScript
