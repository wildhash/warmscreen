import { PrismaClient } from '@warmscreen/database';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting database seed...\n');

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'interviewer@warmscreen.com' },
    update: {},
    create: {
      email: 'interviewer@warmscreen.com',
      name: 'AI Interviewer',
      role: 'RECRUITER',
    },
  });

  console.log('✅ Created user:', user.name);

  // Sample questions for different positions
  const questions = [
    // Software Engineer Questions
    {
      content: 'Can you describe your experience with modern JavaScript frameworks like React or Vue?',
      category: 'Technical',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['JavaScript', 'React', 'Vue', 'Frontend'],
    },
    {
      content: 'Tell me about a challenging bug you encountered and how you resolved it.',
      category: 'Problem Solving',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['Debugging', 'Problem Solving', 'Critical Thinking'],
    },
    {
      content: 'How do you approach writing unit tests for your code?',
      category: 'Best Practices',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['Testing', 'Unit Tests', 'Quality Assurance'],
    },
    {
      content: 'Explain the concept of RESTful APIs and how you have implemented them.',
      category: 'Technical',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['REST', 'API Design', 'Backend'],
    },
    {
      content: 'What experience do you have with version control systems like Git?',
      category: 'Tools',
      difficulty: 'EASY',
      position: 'Software Engineer',
      skillTags: ['Git', 'Version Control', 'Collaboration'],
    },
    // Senior Software Engineer Questions
    {
      content: 'Describe your experience with system architecture and design patterns.',
      category: 'Architecture',
      difficulty: 'HARD',
      position: 'Senior Software Engineer',
      skillTags: ['Architecture', 'Design Patterns', 'System Design'],
    },
    {
      content: 'How do you mentor junior developers and review their code?',
      category: 'Leadership',
      difficulty: 'HARD',
      position: 'Senior Software Engineer',
      skillTags: ['Mentorship', 'Code Review', 'Leadership'],
    },
    {
      content: 'Explain how you would optimize a slow database query in production.',
      category: 'Performance',
      difficulty: 'HARD',
      position: 'Senior Software Engineer',
      skillTags: ['Database', 'Performance', 'Optimization'],
    },
    // Data Scientist Questions
    {
      content: 'What machine learning algorithms are you most familiar with?',
      category: 'Technical',
      difficulty: 'MEDIUM',
      position: 'Data Scientist',
      skillTags: ['Machine Learning', 'Algorithms', 'ML'],
    },
    {
      content: 'Describe a data analysis project you have worked on from start to finish.',
      category: 'Experience',
      difficulty: 'MEDIUM',
      position: 'Data Scientist',
      skillTags: ['Data Analysis', 'Project Management', 'Analytics'],
    },
    // Product Manager Questions
    {
      content: 'How do you prioritize features in a product roadmap?',
      category: 'Strategy',
      difficulty: 'MEDIUM',
      position: 'Product Manager',
      skillTags: ['Product Strategy', 'Prioritization', 'Roadmap'],
    },
    {
      content: 'Tell me about a time you had to make a difficult product decision.',
      category: 'Decision Making',
      difficulty: 'MEDIUM',
      position: 'Product Manager',
      skillTags: ['Decision Making', 'Product Management', 'Leadership'],
    },
  ];

  console.log('\n📝 Creating questions...');
  
  // Clear existing questions to avoid duplicates
  await prisma.question.deleteMany({});
  
  for (const question of questions) {
    const created = await prisma.question.create({
      data: {
        ...question,
        createdById: user.id,
      },
    });
    console.log(`   ✓ ${question.position}: ${question.content.substring(0, 50)}...`);
  }

  // Create a sample scoring model
  console.log('\n🎯 Creating scoring model...');
  
  await prisma.scoringModel.create({
    data: {
      position: 'Software Engineer',
      weights: {
        technical: 0.4,
        communication: 0.2,
        problemSolving: 0.3,
        experience: 0.1,
      },
      thresholds: {
        strongHire: 8.5,
        hire: 7.0,
        noHire: 5.0,
      },
      createdById: user.id,
    },
  });

  console.log('   ✓ Software Engineer scoring model created');

  // Get statistics
  const userCount = await prisma.user.count();
  const questionCount = await prisma.question.count();
  const modelCount = await prisma.scoringModel.count();

  console.log('\n📊 Database Statistics:');
  console.log(`   Users: ${userCount}`);
  console.log(`   Questions: ${questionCount}`);
  console.log(`   Scoring Models: ${modelCount}`);
  
  console.log('\n✅ Seed completed successfully!\n');
}

seed()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
