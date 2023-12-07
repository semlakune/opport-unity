import {NextResponse} from "next/server";
import prisma from "@/lib/db";

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("id");

    const job = await prisma.job.findUnique({
      where: {
        id: Number(jobId),
      },
      include: {
        employer: {
          include: {
            user: true,
          },
        },
        category: true,
      },
    });

    if (!job)
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })

    const similarJobs = await prisma.job.findMany({
      where: {
        AND: [
          { categoryId: job.categoryId },
          { location: job.location },
          { level: job.level },
          { id: { not: job.id } }, // Exclude the current job
        ],
      },
      include: {
        employer: {
          include: {
            user: true,
          },
        },
        category: true,
      },
      take: 10, // Limit the number of similar jobs returned
    });

    return NextResponse.json({ job, similarJobs });
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const job = await prisma.job.create({
      data: {
        ...body,
      }
    });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("id");

    await prisma.jobApplication.deleteMany({
      where: { jobId: Number(jobId) },
    });

    const job = await prisma.job.delete({
      where: {
        id: Number(jobId),
      }
    });

    return NextResponse.json({ message: "Job deleted successfully", success: true, data: job});
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}