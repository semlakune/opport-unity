"use server";
import { PrismaClient } from "@prisma/client";
import { exclude } from "@/lib/utils";

const prisma = new PrismaClient();

export async function getUser(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) throw new Error("Wrong credentials!");

  let userData = null;

  if (user.userType === 'USER') {
    userData = await prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true }
    });
  } else if (user.userType === 'EMPLOYER') {
    userData = await prisma.user.findUnique({
      where: { id: user.id },
      include: { employer: true }
    });
  }
  userData = exclude(userData, ['password'])
  return userData;
}

export async function getJobs() {
  const jobs = await prisma.job.findMany({
    include: {
      employer: {
        include: {
          user: true,
        },
      },
    },
  });
  return jobs.map(job => ({
    ...job,
    companyName: job.employer.user.name
  }));
}

export async function updateUserPhoto(formData) {
  try {
    const response = await fetch("http://localhost:3000/api/s3upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}