import {NextResponse} from "next/server";

export async function GET(request) {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}