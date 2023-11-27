import {NextResponse} from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const application = await prisma.jobApplication.create({
      data: body
    });

    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}