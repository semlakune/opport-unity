import {NextResponse} from "next/server";
import prisma from "@/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const data = await request.json()
    const { name, username, password, userType } = data
    const decryptedPassword = await bcrypt.hash(password, 10)

    const isUserExist = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if (isUserExist) {
      return NextResponse.json({ error: "User already exist" })
    }

    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: decryptedPassword,
        userType
      }
    })

    if (userType === "USER") {
      await prisma.userProfile.create({
        data: {
          userId: user.id
        }
      })
    }

    if (userType === "EMPLOYER") {
      const employer = await prisma.employer.create({
        data: {
          userId: user.id,
          companyInfo: null
        }
      })

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          employerId: employer.id
        }
      })
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}