import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            WarmScreen
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Self-evolving AI recruiter with 7-agent swarm intelligence
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/interviews"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
            >
              View Interviews
            </Link>
            <Link
              href="/dashboard"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">7-Agent Swarm</h3>
            <p className="text-gray-600">
              Analyzer, Verifier, Planner, Conductor, Tagger, Scorer, and Narrator working in reflexion loops
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Real-time Learning</h3>
            <p className="text-gray-600">
              Q&apos;s Database with feedback loops, auto-generating better questions and refining scoring models
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-bold mb-2">Voice & Proctoring</h3>
            <p className="text-gray-600">
              LiveKit/Telnyx voice integration, Deepgram STT, and webcam proctoring for comprehensive assessment
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Explainability</h3>
            <p className="text-gray-600">
              Export offers/rejects with detailed reasoning, agent contributions, and scoring breakdown
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-2">Self-Healing</h3>
            <p className="text-gray-600">
              High-signal pattern detection and amplification for continuous system improvement
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-2">Observability</h3>
            <p className="text-gray-600">
              Sentry integration for monitoring, error tracking, and performance optimization
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">✓ Adaptive Question Selection</h4>
              <p className="text-sm text-gray-600">Questions chosen based on candidate performance and correlation scores</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">✓ Multi-dimensional Scoring</h4>
              <p className="text-sm text-gray-600">Technical, communication, problem-solving, and cultural fit assessment</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">✓ Reflexion Loops</h4>
              <p className="text-sm text-gray-600">Agents self-improve through iterative refinement cycles</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">✓ Attention Tracking</h4>
              <p className="text-sm text-gray-600">Webcam-based monitoring for interview integrity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
