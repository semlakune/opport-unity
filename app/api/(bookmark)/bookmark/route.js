import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const jobId = searchParams.get("jobId");
    
    const bookmarks = await prisma.jobBookmark.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        job: true,
      },
    });
    
    const isBookmarked = bookmarks.some((bookmark) => bookmark.jobId === Number(jobId));
    const totalBookmarks = bookmarks.length;

    return NextResponse.json({ total: totalBookmarks, bookmarks, isBookmarked });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const isAlreadyBookmarked = await prisma.jobBookmark.findFirst({
      where: {
        jobId: body.jobId,
        userId: body.userId,
      },
    });

    if (isAlreadyBookmarked) {
      return NextResponse.json({ error: "Already bookmarked" });
    }

    const bookmark = await prisma.jobBookmark.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();

    const data = await prisma.jobBookmark.findFirst({
      where: {
        userId: body.userId,
        jobId: body.jobId,
      },
    });

    if (!data) {
      return NextResponse.json({ error: "Bookmark not found" });
    }

    const isAuthorized = data.userId === body.userId;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Not authorized" });
    }

    const bookmark = await prisma.jobBookmark.delete({
      where: {
        id: data.id,
        userId: body.userId,
      },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
