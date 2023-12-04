import prisma from "@/lib/db";
import {compare, hash} from "bcrypt";
import {NextResponse} from "next/server";

export const runtime = 'edge'

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    let user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordValid = await compare(currentPassword, user.password);

    if (!isPasswordValid) throw new Error("Current password is incorrect!");

    const hashedPassword = await hash(newPassword, 10);

    await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}