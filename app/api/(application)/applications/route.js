import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const applications = await prisma.jobApplication.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        job: {
          include: {
            employer: {
              include: {
                user: true
              }
            }
          }
        },
      },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}