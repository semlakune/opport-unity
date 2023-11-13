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
          companyInfo: 'Company Information',
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
          bio: 'A passionate job seeker',
          resume: 'Link to resume or resume text',
          // Other profile fields can be created here
        },
      },
    },
  });

  // Create a Job
  const job = await prisma.job.create({
    data: {
      title: 'Software Engineer',
      description: 'Job description here',
      location: 'Remote',
      salaryRange: '50,000 - 70,000',
      employer: {
        connect: { id: employerUser.id },
      },
    },
  });

  // Create a Job Application
  const jobApplication = await prisma.jobApplication.create({
    data: {
      job: {
        connect: { id: job.id },
      },
      user: {
        connect: { id: normalUser.id },
      },
      status: 'PENDING',
    },
  });

  // Create a Job Bookmark
  const jobBookmark = await prisma.jobBookmark.create({
    data: {
      job: {
        connect: { id: job.id },
      },
      user: {
        connect: { id: normalUser.id },
      },
    },
  });

  console.log({ employerUser, normalUser, job, jobApplication, jobBookmark });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
