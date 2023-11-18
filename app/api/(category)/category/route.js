import {NextResponse} from "next/server";


export async function POST(request) {
  try {
    const { name } = await request.json();

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}