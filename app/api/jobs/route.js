import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const pageSize = parseInt(searchParams.get('pageSize'), 10) || 10;

    // Search parameter
    const search = searchParams.get('search') || '';

    // Filter parameters
    const type = searchParams.get('type');
    const level = searchParams.get('level');
    const workModel = searchParams.get('workModel');

    // Sort parameters
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Construct where condition for filtering and searching
    let whereCondition = {};

    if (search) {
      whereCondition.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add filter conditions if they are present
    if (type) {
      whereCondition.type = type;
    }
    if (level) {
      whereCondition.level = level;
    }
    if (workModel) {
      whereCondition.workModel = workModel;
    }

    // Construct sort object
    let sortObject = {};
    sortObject[sortField] = sortOrder;

    const jobs = await prisma.job.findMany({
      where: whereCondition,
      include: {
        employer: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: sortObject,
    });

    // Get the total count of records for pagination
    const totalRecords = await prisma.job.count({ where: whereCondition });

    return NextResponse.json({ data: jobs, total: totalRecords });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
