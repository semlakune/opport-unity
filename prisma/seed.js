const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('demo123', 10);

  const user = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: password, // In a real scenario, ensure you hash passwords
      name: 'John Doe',
      userType: 'USER',
      profile: {
        create: {
          bio: 'A passionate individual with a love for technology.',
          resume: 'link-to-resume.pdf',
          skills: ['JavaScript', 'React', 'Prisma'],
          photo: 'link-to-photo.jpg',
        },
      },
    },
  });

  const employerUser = await prisma.user.create({
    data: {
      username: 'tech_company',
      password: password, // In a real scenario, ensure you hash passwords
      name: 'Tech Company HR',
      userType: 'EMPLOYER',
      employer: {
        create: {
          companyInfo: 'We are a leading tech company in the AI space.',
          logo: 'link-to-logo.png',
        },
      },
    },
  });

  const job = await prisma.job.create({
    data: {
      title: 'Senior Software Engineer',
      description: 'We are looking for a Senior Software Engineer to join our team.',
      location: 'Jakarta, Indonesia',
      level: 'MID_LEVEL',
      salaryRange: '10000000-12000000',
      type: 'FULL_TIME',
      workModel: 'REMOTE',
      employer: {
        connect: {
          userId: employerUser.id,
        },
      },
    },
  });

  console.log({ user, employerUser, job });
}


main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })