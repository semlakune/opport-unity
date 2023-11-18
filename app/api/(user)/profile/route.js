import {NextResponse} from "next/server";
import {exclude} from "@/lib/utils";
import prisma from "@/db/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

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

    userData = exclude(userData, ['password, createdAt, updatedAt'])

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}