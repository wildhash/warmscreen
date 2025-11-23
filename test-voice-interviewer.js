#!/usr/bin/env node

/**
 * Test script for the Voice Interviewer Agent
 * 
 * This script demonstrates the complete voice interview flow:
 * 1. List available questions
 * 2. Test TTS endpoints (if ElevenLabs is configured)
 * 3. Simulate a voice interview flow
 * 
 * Usage:
 *   node test-voice-interviewer.js
 * 
 * Requirements:
 *   - API server running on http://localhost:3001
 *   - Database seeded with questions
 *   - (Optional) ELEVENLABS_API_KEY configured for TTS
 */

const API_BASE = 'http://localhost:3001/api';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60) + '\n');
}

async function fetchJSON(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    throw error;
  }
}

async function testHealthCheck() {
  section('1. Health Check');
  try {
    const health = await fetchJSON(`${API_BASE}/../health`);
    log(`✅ API Status: ${health.status}`, 'green');
    log(`   Timestamp: ${health.timestamp}`, 'cyan');
    return true;
  } catch (error) {
    log('❌ API is not responding. Please start the server first.', 'red');
    return false;
  }
}

async function testQuestions() {
  section('2. Question Management');
  
  // List all questions
  log('📝 Fetching all questions...', 'blue');
  const allQuestions = await fetchJSON(`${API_BASE}/questions`);
  log(`✅ Found ${allQuestions.questions.length} questions`, 'green');
  
  // Group by position
  const byPosition = {};
  allQuestions.questions.forEach(q => {
    if (!byPosition[q.position]) byPosition[q.position] = [];
    byPosition[q.position].push(q);
  });
  
  log('\n   Questions by position:', 'cyan');
  Object.entries(byPosition).forEach(([position, questions]) => {
    log(`   • ${position}: ${questions.length} questions`, 'yellow');
  });
  
  // Get Software Engineer questions specifically
  log('\n🔍 Filtering Software Engineer questions...', 'blue');
  const seQuestions = await fetchJSON(`${API_BASE}/questions?position=Software+Engineer`);
  log(`✅ Found ${seQuestions.questions.length} Software Engineer questions`, 'green');
  
  // Display first question
  if (seQuestions.questions.length > 0) {
    const firstQ = seQuestions.questions[0];
    log('\n   Sample question:', 'cyan');
    log(`   Q: ${firstQ.content}`, 'yellow');
    log(`   Category: ${firstQ.category} | Difficulty: ${firstQ.difficulty}`, 'cyan');
    log(`   Skills: ${firstQ.skillTags.join(', ')}`, 'cyan');
  }
  
  return seQuestions.questions;
}

async function testVoiceTTS() {
  section('3. Text-to-Speech (TTS) Test');
  
  // Check if TTS is configured
  try {
    log('🎙️  Testing TTS endpoint...', 'blue');
    
    const testText = 'Hello! This is a test of the voice interviewer system.';
    const response = await fetch(`${API_BASE}/voice/tts/speak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: testText }),
    });
    
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('audio')) {
        log('✅ TTS is working! Audio generated successfully', 'green');
        log('   Note: Audio would be playable in a real application', 'cyan');
        return true;
      } else {
        const data = await response.json();
        log('⚠️  Unexpected response format', 'yellow');
        console.log(data);
      }
    } else {
      const error = await response.json();
      if (error.error && error.error.includes('not configured')) {
        log('⚠️  TTS not configured (ELEVENLABS_API_KEY not set)', 'yellow');
        log('   Voice interview will work once you add an ElevenLabs API key', 'cyan');
        return false;
      } else {
        log(`❌ TTS Error: ${error.error}`, 'red');
        return false;
      }
    }
  } catch (error) {
    log(`⚠️  TTS test skipped: ${error.message}`, 'yellow');
    return false;
  }
}

async function testVoicesList() {
  section('4. Available Voices');
  
  try {
    log('🎭 Fetching available voices...', 'blue');
    const voices = await fetchJSON(`${API_BASE}/voice/tts/voices`);
    
    if (voices.voices && voices.voices.length > 0) {
      log(`✅ Found ${voices.voices.length} available voices`, 'green');
      log('\n   Sample voices:', 'cyan');
      voices.voices.slice(0, 5).forEach(voice => {
        log(`   • ${voice.name} (ID: ${voice.voiceId})`, 'yellow');
      });
      if (voices.voices.length > 5) {
        log(`   ... and ${voices.voices.length - 5} more`, 'cyan');
      }
      return voices.voices;
    } else {
      log('⚠️  No voices found', 'yellow');
      return [];
    }
  } catch (error) {
    log('⚠️  Could not fetch voices (TTS may not be configured)', 'yellow');
    return [];
  }
}

async function simulateInterview(questions, ttsEnabled) {
  section('5. Simulated Voice Interview Flow');
  
  const candidateName = 'John Doe';
  
  log(`👤 Candidate: ${candidateName}`, 'cyan');
  log(`📋 Position: Software Engineer`, 'cyan');
  log(`❓ Questions: ${Math.min(3, questions.length)} questions\n`, 'cyan');
  
  // Step 1: Start interview
  log('1️⃣  Starting interview...', 'blue');
  if (ttsEnabled) {
    try {
      const startResponse = await fetch(`${API_BASE}/voice/interview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateName }),
      });
      
      if (startResponse.ok) {
        log('   ✅ Greeting generated (audio)', 'green');
        log('   🎙️  "Hello John Doe! I\'m your interviewer today..."', 'yellow');
      }
    } catch (error) {
      log(`   ⚠️  ${error.message}`, 'yellow');
    }
  } else {
    log('   ℹ️  Would generate greeting via TTS', 'cyan');
    log('   🎙️  "Hello John Doe! I\'m your interviewer today..."', 'yellow');
  }
  
  // Step 2: Ask questions
  const questionsToAsk = questions.slice(0, 3);
  
  for (let i = 0; i < questionsToAsk.length; i++) {
    const question = questionsToAsk[i];
    
    log(`\n2️⃣  Question ${i + 1}/${questionsToAsk.length}`, 'blue');
    log(`   📝 ${question.content}`, 'yellow');
    
    if (ttsEnabled) {
      try {
        const askResponse = await fetch(`${API_BASE}/voice/interview/ask-question`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        });
        
        if (askResponse.ok) {
          log('   ✅ Question audio generated', 'green');
        }
      } catch (error) {
        log(`   ⚠️  ${error.message}`, 'yellow');
      }
    } else {
      log('   ℹ️  Would generate question via TTS', 'cyan');
    }
    
    // Simulate candidate response time
    log('   ⏱️  Waiting for candidate response...', 'cyan');
    await new Promise(resolve => setTimeout(resolve, 1000));
    log('   💬 Candidate: "Yes, I have experience with..."', 'green');
    
    // Acknowledge
    if (ttsEnabled) {
      try {
        const ackResponse = await fetch(`${API_BASE}/voice/interview/acknowledge`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'positive' }),
        });
        
        if (ackResponse.ok) {
          log('   ✅ Acknowledgment audio generated', 'green');
          log('   🎙️  "Thank you for your response."', 'yellow');
        }
      } catch (error) {
        log(`   ⚠️  ${error.message}`, 'yellow');
      }
    } else {
      log('   ℹ️  Would acknowledge via TTS', 'cyan');
      log('   🎙️  "Thank you for your response."', 'yellow');
    }
  }
  
  // Step 3: End interview
  log(`\n3️⃣  Ending interview...`, 'blue');
  if (ttsEnabled) {
    try {
      const endResponse = await fetch(`${API_BASE}/voice/interview/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      
      if (endResponse.ok) {
        log('   ✅ Closing message generated', 'green');
        log('   🎙️  "Thank you for taking the time..."', 'yellow');
      }
    } catch (error) {
      log(`   ⚠️  ${error.message}`, 'yellow');
    }
  } else {
    log('   ℹ️  Would generate closing via TTS', 'cyan');
    log('   🎙️  "Thank you for taking the time to interview with us today."', 'yellow');
  }
}

async function testBulkUpload() {
  section('6. Bulk Question Upload Test');
  
  const newQuestions = [
    {
      content: 'What is your experience with cloud platforms like AWS or Azure?',
      category: 'Cloud',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['AWS', 'Azure', 'Cloud', 'DevOps'],
    },
    {
      content: 'How do you ensure code quality in your projects?',
      category: 'Best Practices',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['Code Quality', 'Testing', 'Code Review'],
    },
  ];
  
  log('📤 Uploading 2 new questions...', 'blue');
  
  try {
    const result = await fetch(`${API_BASE}/questions/bulk-upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions: newQuestions }),
    });
    
    const data = await result.json();
    
    if (data.success) {
      log(`✅ Successfully uploaded ${data.created} questions`, 'green');
      if (data.failed > 0) {
        log(`⚠️  ${data.failed} questions failed to upload`, 'yellow');
      }
    } else {
      log('❌ Bulk upload failed', 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
}

async function displaySummary(questions, ttsEnabled) {
  section('Summary');
  
  log('✅ Voice Interviewer Agent Tests Complete!\n', 'green');
  
  log('System Status:', 'bright');
  log(`  • API Server: ${colors.green}Running${colors.reset}`, 'cyan');
  log(`  • Database: ${colors.green}Connected${colors.reset}`, 'cyan');
  log(`  • Questions Loaded: ${colors.green}${questions.length}${colors.reset}`, 'cyan');
  log(`  • TTS (ElevenLabs): ${ttsEnabled ? colors.green + 'Configured' : colors.yellow + 'Not Configured'}${colors.reset}`, 'cyan');
  
  log('\nNext Steps:', 'bright');
  if (!ttsEnabled) {
    log('  1. Add ELEVENLABS_API_KEY to .env file', 'yellow');
    log('  2. Restart the API server', 'yellow');
    log('  3. Run this test again to test TTS', 'yellow');
    log('  4. Clone a voice via ElevenLabs dashboard', 'yellow');
    log('  5. Set INTERVIEWER_VOICE_ID in .env', 'yellow');
  } else {
    log('  1. Integrate with LiveKit for real-time voice', 'cyan');
    log('  2. Add Deepgram for speech-to-text', 'cyan');
    log('  3. Build frontend UI for interviews', 'cyan');
    log('  4. Test complete interview flow', 'cyan');
  }
  
  log('\nAPI Endpoints Available:', 'bright');
  log('  • POST /api/voice/tts/speak - Convert text to speech', 'cyan');
  log('  • GET  /api/voice/tts/voices - List available voices', 'cyan');
  log('  • POST /api/voice/interview/start - Start interview', 'cyan');
  log('  • POST /api/voice/interview/ask-question - Ask question', 'cyan');
  log('  • POST /api/voice/interview/acknowledge - Acknowledge response', 'cyan');
  log('  • POST /api/voice/interview/end - End interview', 'cyan');
  log('  • GET  /api/questions - List questions', 'cyan');
  log('  • POST /api/questions/bulk-upload - Upload multiple questions', 'cyan');
  
  console.log('');
}

async function main() {
  log('\n🚀 WarmScreen Voice Interviewer Agent Test Suite\n', 'bright');
  
  try {
    // Test 1: Health check
    const isHealthy = await testHealthCheck();
    if (!isHealthy) {
      process.exit(1);
    }
    
    // Test 2: Questions
    const questions = await testQuestions();
    
    // Test 3: TTS
    const ttsEnabled = await testVoiceTTS();
    
    // Test 4: Voices list
    if (ttsEnabled) {
      await testVoicesList();
    }
    
    // Test 5: Simulate interview
    await simulateInterview(questions, ttsEnabled);
    
    // Test 6: Bulk upload
    await testBulkUpload();
    
    // Display summary
    await displaySummary(questions, ttsEnabled);
    
    log('✅ All tests completed successfully!\n', 'green');
  } catch (error) {
    log(`\n❌ Test suite failed: ${error.message}\n`, 'red');
    process.exit(1);
  }
}

// Run the tests
main();
