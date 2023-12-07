import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET(request) {
  try {
    const body = await request.json();
    const applications = await prisma.jobApplication.findMany({
      data: body
    });

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}