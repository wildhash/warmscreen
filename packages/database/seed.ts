import { PrismaClient } from '@warmscreen/database';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a recruiter user
  const recruiter = await prisma.user.upsert({
    where: { email: 'recruiter@warmscreen.com' },
    update: {},
    create: {
      email: 'recruiter@warmscreen.com',
      name: 'Alice Recruiter',
      role: 'RECRUITER',
    },
  });

  console.log('✅ Created recruiter:', recruiter.name);

  // Create questions for Software Engineer position
  const questions = [
    {
      content: 'Tell me about a challenging bug you encountered and how you resolved it.',
      category: 'Technical',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['debugging', 'problem-solving', 'technical'],
      createdById: recruiter.id,
    },
    {
      content: 'How do you approach designing a scalable system architecture?',
      category: 'System Design',
      difficulty: 'HARD',
      position: 'Software Engineer',
      skillTags: ['architecture', 'scalability', 'design'],
      createdById: recruiter.id,
    },
    {
      content: 'Describe your experience with agile development methodologies.',
      category: 'Process',
      difficulty: 'EASY',
      position: 'Software Engineer',
      skillTags: ['agile', 'teamwork', 'process'],
      createdById: recruiter.id,
    },
    {
      content: 'What is your approach to code review and ensuring code quality?',
      category: 'Best Practices',
      difficulty: 'MEDIUM',
      position: 'Software Engineer',
      skillTags: ['code-review', 'quality', 'collaboration'],
      createdById: recruiter.id,
    },
    {
      content: 'How do you stay updated with the latest technology trends?',
      category: 'Learning',
      difficulty: 'EASY',
      position: 'Software Engineer',
      skillTags: ['learning', 'growth', 'curiosity'],
      createdById: recruiter.id,
    },
  ];

  for (const q of questions) {
    const existing = await prisma.question.findFirst({
      where: {
        content: q.content,
        position: q.position,
      },
    });

    if (!existing) {
      await prisma.question.create({
        data: q,
      });
    }
  }

  console.log('✅ Created', questions.length, 'questions');

  // Create sample interviews
  const interviews = [
    {
      candidateId: 'cand-001',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@example.com',
      position: 'Software Engineer',
      status: 'SCHEDULED' as const,
      scheduledAt: new Date(Date.now() + 86400000), // Tomorrow
      recruiterId: recruiter.id,
    },
    {
      candidateId: 'cand-002',
      candidateName: 'Jane Smith',
      candidateEmail: 'jane.smith@example.com',
      position: 'Software Engineer',
      status: 'SCHEDULED' as const,
      scheduledAt: new Date(Date.now() + 172800000), // 2 days from now
      recruiterId: recruiter.id,
    },
    {
      candidateId: 'cand-003',
      candidateName: 'Bob Johnson',
      candidateEmail: 'bob.johnson@example.com',
      position: 'Software Engineer',
      status: 'COMPLETED' as const,
      scheduledAt: new Date(Date.now() - 86400000), // Yesterday
      startedAt: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 82800000),
      score: 8.5,
      decision: 'HIRE' as const,
      recruiterId: recruiter.id,
      explainability: {
        summary: 'Strong technical skills with excellent problem-solving abilities. Demonstrates good communication and teamwork.',
        strengths: [
          'Deep understanding of system architecture',
          'Strong debugging skills',
          'Great cultural fit',
          'Continuous learner',
        ],
        weaknesses: [
          'Limited experience with distributed systems',
          'Could improve on time estimation',
        ],
        scoringBreakdown: {
          technical: 9.0,
          communication: 8.5,
          problemSolving: 8.8,
          culturalFit: 8.2,
        },
      },
    },
  ];

  for (const interview of interviews) {
    await prisma.interview.create({
      data: interview,
    });
  }

  console.log('✅ Created', interviews.length, 'sample interviews');

  // Create a scoring model
  await prisma.scoringModel.create({
    data: {
      position: 'Software Engineer',
      version: 1,
      weights: {
        technical: 0.35,
        communication: 0.20,
        problemSolving: 0.30,
        culturalFit: 0.15,
      },
      thresholds: {
        strongHire: 8.5,
        hire: 7.0,
        noHire: 5.0,
      },
      isActive: true,
      performanceMetrics: {
        accuracy: 0.85,
        precision: 0.82,
        recall: 0.88,
      },
      createdById: recruiter.id,
    },
  });

  console.log('✅ Created scoring model');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
