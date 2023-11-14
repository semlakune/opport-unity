import { PrismaClient } from '@prisma/client';
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {

  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}