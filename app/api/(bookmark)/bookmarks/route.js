import {NextResponse} from "next/server";
import prisma from "@/lib/db";

export const runtime = "edge";
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const bookmarks = await prisma.jobBookmark.findMany({
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

    return NextResponse.json({ bookmarks });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}