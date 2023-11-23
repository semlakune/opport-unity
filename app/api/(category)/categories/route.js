import {NextResponse} from "next/server";
import prisma from "@/db/prisma";
export async function GET(request) {
  try {
    const categories = await prisma.category.findMany();
    const jobs = await prisma.job.findMany({
      where: {
        categoryId: {
          in: categories.map((category) => category.id),
        },
      },
    });

    let categoriesWithJobsCount = categories.map((category) => {
      return {
        ...category,
        jobsCount: jobs.filter((job) => job.categoryId === category.id).length,
      }
    });
    return NextResponse.json(categoriesWithJobsCount);
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}