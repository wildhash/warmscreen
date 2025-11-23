# warmscreen
Self-evolving AI recruiter that learns from every interview—using 7-agent reflexion loops, LiveKit voice, and real-time candidate proctoring to auto-optimize hiring decisions.

## 🚀 Architecture

WarmScreen is built as a monorepo with the following structure:

### Apps
- **web** - Next.js 16 frontend application
- **api** - Fastify backend API

### Packages
- **database** - Prisma schema and database client
- **agents** - 7-agent swarm system with reflexion loops
- **shared** - Shared types, schemas, and utilities
- **voice** - LiveKit/Telnyx voice integration with Deepgram STT
- **proctoring** - Webcam-based proctoring with TensorFlow face detection

## 🧠 7-Agent Swarm System

The core of WarmScreen is a sophisticated multi-agent system:

1. **Analyzer Agent** - Analyzes interview responses for technical competency, communication, and depth
2. **Verifier Agent** - Verifies consistency and accuracy of other agents' outputs
3. **Planner Agent** - Plans interview flow and selects next questions adaptively
4. **Conductor Agent** - Orchestrates all agents and manages the interview process
5. **Tagger Agent** - Tags responses with skills, behaviors, and competencies
6. **Scorer Agent** - Calculates weighted scores using position-specific models
7. **Narrator Agent** - Generates human-readable explanations and decision reasoning

Each agent supports **reflexion loops** - they can self-improve by iterating on their outputs when confidence is low.

## 🎯 Key Features

### Real-time Learning
- **Q's Database**: Questions learn from interview outcomes
- **Auto-generation**: System generates new questions to fill gaps
- **Scoring Model Refinement**: Models update automatically based on hiring success
- **Feedback Loops**: Every interview improves future performance

### Voice Integration
- **LiveKit**: Real-time voice communication
- **Telnyx**: Alternative telephony provider
- **Deepgram**: State-of-the-art speech-to-text transcription
- **WebSocket**: Real-time transcript streaming

### Proctoring
- **Face Detection**: TensorFlow BlazeFace for candidate verification
- **Attention Tracking**: Monitors candidate focus throughout interview
- **Integrity Flags**: Detects multiple faces, phones, and suspicious activity
- **Snapshot History**: Records proctoring data for audit trails

### Self-Healing
- **Pattern Detection**: Identifies high-signal patterns in interview data
- **Pattern Amplification**: Automatically promotes successful patterns
- **Agent Performance Tracking**: Monitors and logs all agent actions
- **Continuous Improvement**: System evolves based on outcomes

### Observability
- **Sentry Integration**: Error tracking and performance monitoring
- **Agent Logs**: Complete audit trail of agent decisions
- **Feedback Loops**: Real-time system learning indicators
- **Analytics Dashboard**: Visualize system performance and patterns

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS 4, TypeScript
- **Backend**: Fastify, Node.js 20, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Voice**: LiveKit, Telnyx, Deepgram
- **AI/ML**: TensorFlow.js, OpenAI API
- **Monitoring**: Sentry
- **Dev Environment**: Daytona, Docker Compose
- **Build**: Turbo (monorepo)

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm 10+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wildhash/warmscreen.git
cd warmscreen
```

2. Install dependencies:
```bash
npm install
```

3. Start PostgreSQL (using Docker Compose):
```bash
docker-compose up -d
```

4. Setup database:
```bash
cd packages/database
cp .env.example .env
npm run db:generate
npm run db:push
```

5. Configure environment variables:
```bash
# API
cd apps/api
cp .env.example .env
# Edit .env with your credentials

# Web
cd ../web
cp .env.example .env
```

6. Start development servers:
```bash
# From root
npm run dev
```

This will start:
- Next.js web app on http://localhost:3000
- Fastify API on http://localhost:3001

### Using Daytona

WarmScreen includes a Daytona configuration for easy development environment setup:

```bash
daytona create warmscreen
```

## 📚 Usage

### Creating an Interview

```bash
curl -X POST http://localhost:3001/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "Jane Doe",
    "candidateEmail": "jane@example.com",
    "position": "Senior Software Engineer",
    "scheduledAt": "2024-01-15T10:00:00Z",
    "recruiterId": "user-id"
  }'
```

### Starting Voice Session

```bash
curl -X POST http://localhost:3001/api/voice/session/start \
  -H "Content-Type: application/json" \
  -d '{
    "interviewId": "interview-id",
    "participantName": "Jane Doe"
  }'
```

### Processing Response

```bash
curl -X POST http://localhost:3001/api/interviews/:id/responses \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "question-id",
    "transcript": "I have 5 years of experience with React...",
    "duration": 120
  }'
```

### Finalizing Interview

```bash
curl -X POST http://localhost:3001/api/interviews/:id/finalize
```

This triggers:
- Final scoring through all 7 agents
- Decision generation with explainability
- Learning from interview outcome
- Pattern detection and amplification
- Scoring model refinement

## 🗄️ Database Schema

Key models:
- `User` - Recruiters and admins
- `Interview` - Interview sessions
- `Question` - Q's Database with learning metrics
- `Response` - Candidate answers with agent analysis
- `AgentLog` - Complete agent action history
- `FeedbackLoop` - Real-time learning events
- `ScoringModel` - Position-specific scoring models
- `Pattern` - High-signal patterns for amplification

## 🤖 Agent System

### Reflexion Loops

Agents automatically enter reflexion loops when:
- Confidence score < 0.7
- Previous output needs refinement
- Maximum loops not reached (default: 3)

```typescript
// Example: Analyzer with reflexion
const output = await analyzer.execute({
  type: 'ANALYZER',
  context: { transcript, questionCategory },
  reflexionLoop: 0
});

// If confidence < 0.7, analyzer automatically refines
```

### Agent Orchestration

The Conductor coordinates all agents:

```typescript
// Process single response
const results = await conductor.processResponse({
  interviewId,
  questionId,
  transcript,
  questionCategory,
  position
});

// Finalize interview
const decision = await conductor.finalizeInterview({
  interviewId,
  responses,
  scoringModel,
  position,
  candidateName
});
```

## 📊 Analytics & Patterns

### Pattern Detection

System automatically detects patterns like:
- High confidence consensus across agents
- Strong candidate performance indicators
- Effective question characteristics
- Successful interview structures

### Pattern Amplification

High-strength patterns (>0.8) are amplified:
- Occurrence tracking
- Success rate calculation
- Automatic promotion
- Integration into future decisions

## 🔒 Security

- Input validation with Zod schemas
- Database queries via Prisma (SQL injection protection)
- Environment variable management
- Secure credential handling
- Sentry error tracking

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific package tests
cd packages/agents
npm test
```

## 📦 Building for Production

```bash
# Build all packages
npm run build

# Start production servers
npm start
```

## 🚢 Deployment

### Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `SENTRY_DSN` - Sentry project DSN (optional)
- `LIVEKIT_URL` - LiveKit server URL
- `LIVEKIT_API_KEY` - LiveKit API key
- `LIVEKIT_API_SECRET` - LiveKit API secret
- `DEEPGRAM_API_KEY` - Deepgram API key

### Docker Deployment

```bash
# Build images
docker build -t warmscreen-api apps/api
docker build -t warmscreen-web apps/web

# Run with docker-compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- OpenAI for LLM capabilities
- LiveKit for voice infrastructure
- Deepgram for speech-to-text
- TensorFlow for face detection
- Prisma for database ORM

## 📞 Support

For issues and questions:
- GitHub Issues: https://github.com/wildhash/warmscreen/issues
- Documentation: https://github.com/wildhash/warmscreen/wiki

---

Built with ❤️ by the WarmScreen team
