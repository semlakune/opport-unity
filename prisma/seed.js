const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('demo123', 10);
  // Create a User of type EMPLOYER
  const employerUser = await prisma.user.create({
    data: {
      username: 'employer-demo',
      password: password, // In a real-world scenario, you should hash passwords before storing them
      name: 'Employer Company',
      userType: 'EMPLOYER',
      employer: {
        create: {
          companyInfo: 'Innovative Tech Solutions',
          // Other employer fields can be created here
        },
      },
    },
  });

  // Create a User of type USER
  const normalUser = await prisma.user.create({
    data: {
      username: 'user-demo',
      password: password, // Hashed in production
      name: 'John Doe',
      userType: 'USER',
      profile: {
        create: {
          bio: 'Enthusiastic developer with a passion for coding.',
          skills: ['JavaScript', 'React', 'Prisma']
        }
      },
    },
  });

  const jobTitles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'DevOps Engineer',
    'Product Manager',
    'UI/UX Designer',
    'Mobile App Developer',
    'Cloud Architect',
    'Security Analyst'
  ];

  const location = [
    'Jakarta',
    'Bandung',
    'Surabaya',
    'Semarang',
    'Yogyakarta',
    'Malang',
    'Bali',
    'Medan',
    'Makassar',
    'Palembang'
  ];

  const salaryRange = [
    '10.000.000-15.000.000',
    '15.000.000-20.000.000',
    '20.000.000-25.000.000',
    '25.000.000-30.000.000',
    '30.000.000-35.000.000',
    '35.000.000-40.000.000',
    '5.000.000-10.000.000',
    '40.000.000-45.000.000',
    '45.000.000-50.000.000',
    '50.000.000-55.000.000'
  ]

  const level = [
    'Junior',
    'Intermediate',
    'Senior',
    'Junior',
    'Intermediate',
    'Senior',
    'Intermediate',
    'Senior',
    'Junior',
    'Intermediate',
    'Senior'
  ]

  const workModel = [
    'Remote',
    'Remote',
    'Hybrid',
    'Remote',
    'Remote',
    'Off-Site',
    'Remote',
    'Remote',
    'Hybrid',
    'Remote'
  ]

  for (let i = 0; i < jobTitles.length; i++) {
    await prisma.job.create({
      data: {
        title: jobTitles[i],
        description: 'Exciting opportunity as a ' + jobTitles[i],
        location: location[i],
        salaryRange: salaryRange[i],
        level: level[i],
        type: 'Full-Time',
        workModel: 'Remote',
        qualifications: ['Degree in Computer Science', 'Degree in Computer Engineering', 'Degree in Information Technology'],
        responsibilities: ['Develop and maintain software applications', 'Develop and maintain software applications', 'Develop and maintain software applications'],
        employer: {
          connect: { id: employerUser.id }
        }
      }
    });
  }

  console.log({ employerUser, normalUser, });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
