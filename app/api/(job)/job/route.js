import {NextResponse} from "next/server";
import prisma from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("id");

    const job = await prisma.job.findUnique({
      where: {
        id: Number(jobId),
      },
      include: {
        employer: true,
      }
    });

    return NextResponse.json(job);
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