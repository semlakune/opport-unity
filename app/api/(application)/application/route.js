import {NextResponse} from "next/server";
import prisma from "@/lib/db";

export const runtime = "edge";

export async function POST(request) {
  try {
    const body = await request.json();
    const application = await prisma.jobApplication.create({
      data: body
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const jobId = searchParams.get("jobId");

    const application = await prisma.jobApplication.findFirst({
      where: {
        userId: Number(userId),
        jobId: Number(jobId)
      },
    });

    if (!application) {
      return NextResponse.json({ success: false, data: null, isApplied: false });
    }

    return NextResponse.json({ success: true, data: application, isApplied: true });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}