/**
 * seed.js — Idempotent Database Seed Script
 *
 * Usage:
 *   node seed.js
 *   npm run seed (from the backend directory)
 *
 * Safely creates default admin/faculty accounts and sample published/draft courses
 * without duplicating records or deleting existing user data.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Course = require('./models/Course');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/faculty_upgradation';

async function seed() {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully.');

    // ── 1. Seed Users ────────────────────────────────────────────────────────
    const salt = await bcrypt.genSalt(12);

    let adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      const hashedAdminPassword = await bcrypt.hash('admin123', salt);
      adminUser = await User.create({
        name: 'System Administrator',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        role: 'admin',
        isActive: true,
      });
      console.log('✅ Created default admin user: admin@example.com / admin123');
    } else {
      console.log('ℹ️ Admin user already exists: admin@example.com');
    }

    let facultyUser = await User.findOne({ email: 'faculty@example.com' });
    if (!facultyUser) {
      const hashedFacultyPassword = await bcrypt.hash('faculty123', salt);
      facultyUser = await User.create({
        name: 'Dr. Ramesh Kumar',
        email: 'faculty@example.com',
        password: hashedFacultyPassword,
        role: 'faculty',
        department: 'Computer Science & Engineering',
        designation: 'Associate Professor',
        isActive: true,
      });
      console.log('✅ Created default faculty user: faculty@example.com / faculty123');
    } else {
      console.log('ℹ️ Faculty user already exists: faculty@example.com');
    }

    // ── 2. Seed Sample Courses ───────────────────────────────────────────────
    const sampleCourses = [
      {
        title: 'Advanced Pedagogy & Active Learning Strategies',
        description: 'Comprehensive course on modern active-learning frameworks, flipped classroom designs, and student engagement methods tailored for higher education faculty.',
        category: 'Pedagogy',
        provider: 'NPTEL',
        instructor: 'Prof. Ananya Sharma',
        difficulty: 'intermediate',
        duration: 30,
        credits: 4,
        tags: ['Pedagogy', 'Flipped Classroom', 'Assessment', 'Active Learning'],
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=60',
        externalUrl: 'https://nptel.ac.in',
        isPublished: true,
        isActive: true,
        createdBy: adminUser._id,
        modules: [
          {
            title: 'Module 1: Fundamentals of Active Learning',
            description: 'Introduction to outcome-based education and active learning taxonomies.',
            duration: 120,
            order: 1,
            resourceUrl: 'https://nptel.ac.in/courses',
          },
          {
            title: 'Module 2: Flipped Classroom Design',
            description: 'Designing interactive pre-class activities and in-class problem solving sessions.',
            duration: 180,
            order: 2,
            resourceUrl: 'https://nptel.ac.in/courses',
          },
          {
            title: 'Module 3: Formative Assessment Techniques',
            description: 'Using digital rubrics and peer evaluations for effective assessment.',
            duration: 150,
            order: 3,
            resourceUrl: 'https://nptel.ac.in/courses',
          },
        ],
      },
      {
        title: 'AI & Machine Learning for Higher Education',
        description: 'Explore practical artificial intelligence and machine learning concepts, tools for research, and ethical generative AI integration in coursework.',
        category: 'Technology',
        provider: 'Coursera',
        instructor: 'Dr. Rajesh Gupta',
        difficulty: 'advanced',
        duration: 40,
        credits: 5,
        tags: ['AI', 'Machine Learning', 'Generative AI', 'Education Tech'],
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
        externalUrl: 'https://www.coursera.org',
        isPublished: true,
        isActive: true,
        createdBy: adminUser._id,
        modules: [
          {
            title: 'Module 1: AI Essentials for Academicians',
            description: 'Understanding key concepts of ML, LLMs, and neural networks.',
            duration: 180,
            order: 1,
            resourceUrl: 'https://www.coursera.org',
          },
          {
            title: 'Module 2: Prompt Engineering & Teaching Assistants',
            description: 'Leveraging AI for lesson planning, grading assistance, and content generation.',
            duration: 210,
            order: 2,
            resourceUrl: 'https://www.coursera.org',
          },
          {
            title: 'Module 3: Ethical AI & Plagiarism Policies',
            description: 'Formulating institutional policies on generative AI usage.',
            duration: 150,
            order: 3,
            resourceUrl: 'https://www.coursera.org',
          },
        ],
      },
      {
        title: 'Research Methodology & Grant Writing',
        description: 'Step-by-step guidance on structuring high-impact research papers, navigating peer reviews, and submitting successful research grant proposals.',
        category: 'Research',
        provider: 'Internal',
        instructor: 'Dr. Sunita Rao',
        difficulty: 'intermediate',
        duration: 25,
        credits: 3,
        tags: ['Research', 'Grant Writing', 'Publications', 'Academic Writing'],
        thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60',
        externalUrl: 'https://example.edu/research-office',
        isPublished: true,
        isActive: true,
        createdBy: adminUser._id,
        modules: [
          {
            title: 'Module 1: Formulating Hypotheses & Research Design',
            description: 'Selecting research methods, sample sizes, and quantitative analysis tools.',
            duration: 150,
            order: 1,
            resourceUrl: 'https://example.edu/research-office',
          },
          {
            title: 'Module 2: Drafting Research Grant Proposals',
            description: 'Budgeting, objective mapping, and submitting to funding agencies.',
            duration: 180,
            order: 2,
            resourceUrl: 'https://example.edu/research-office',
          },
        ],
      },
      {
        title: 'Cybersecurity Awareness for Academic Institutions',
        description: 'Essential cybersecurity best practices, data protection protocols, and secure online teaching environment configuration for faculty members.',
        category: 'Cybersecurity',
        provider: 'Internal',
        instructor: 'Prof. Vikram Singh',
        difficulty: 'beginner',
        duration: 15,
        credits: 2,
        tags: ['Cybersecurity', 'Data Privacy', 'Online Safety'],
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
        externalUrl: '',
        isPublished: true,
        isActive: true,
        createdBy: adminUser._id,
        modules: [
          {
            title: 'Module 1: Password Hygiene & Phishing Defense',
            description: 'Identifying phishing attempts, MFA configuration, and credentials safety.',
            duration: 90,
            order: 1,
            resourceUrl: '',
          },
          {
            title: 'Module 2: Securing Student Records & Research Data',
            description: 'Data encryption, access controls, and compliance guidelines.',
            duration: 90,
            order: 2,
            resourceUrl: '',
          },
        ],
      },
      {
        title: 'Draft Course: Digital Assessment Tools & Analytics',
        description: 'Upcoming draft course covering digital examination platforms and learning analytics dashboards.',
        category: 'Technology',
        provider: 'Internal',
        instructor: 'Dr. Meera Patel',
        difficulty: 'beginner',
        duration: 10,
        credits: 2,
        tags: ['Assessment', 'Analytics', 'Draft'],
        thumbnail: '',
        externalUrl: '',
        isPublished: false, // Draft course for testing admin publish workflow
        isActive: true,
        createdBy: adminUser._id,
        modules: [
          {
            title: 'Module 1: Introduction to Quiz Platforms',
            description: 'Creating automated quizzes and objective tests.',
            duration: 60,
            order: 1,
            resourceUrl: '',
          },
        ],
      },
    ];

    let createdCount = 0;
    for (const courseData of sampleCourses) {
      const exists = await Course.findOne({ title: courseData.title });
      if (!exists) {
        await Course.create(courseData);
        createdCount++;
        console.log(`✅ Seeded course: "${courseData.title}" (${courseData.isPublished ? 'Published' : 'Draft'})`);
      } else {
        console.log(`ℹ️ Course already exists: "${courseData.title}"`);
      }
    }

    console.log(`Seeding complete! ${createdCount} new course(s) created.`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
