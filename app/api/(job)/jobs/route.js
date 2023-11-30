import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const runtime = 'edge'
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const pageSize = parseInt(searchParams.get('pageSize'), 10) || 10;

    // Search parameter
    const search = searchParams.get('search') || '';
    // Filter parameters
    const categoryId = searchParams.get('categoryId');
    const type = searchParams.get('type');
    const workModel = searchParams.get('workModel');
    // Sort parameters
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    // By Employer ID parameter
    const employerId = searchParams.get('employerId');

    // Construct where condition for filtering and searching
    let whereCondition = {};

    if (search) {
      whereCondition.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    // Add filter conditions if they are present
    if (categoryId) {
      whereCondition.categoryId = { in: categoryId.split(",").map(id => Number(id)) };
    }
    if (type) {
      whereCondition.type = { in: type.split(",") };
    }
    if (workModel) {
      whereCondition.workModel = { in: workModel.split(",") };
    }
    // Add employer ID condition if it is present
    if (employerId) {
      whereCondition.employerId = Number(employerId);
    }

    // Construct sort object
    let sortObject = {};
    sortObject[sortField] = sortOrder;

    const jobs = await prisma.job.findMany({
      where: whereCondition,
      include: {
        employer: {
          include: {
            user: {
              select: {
                username: true,
                name: true,
              },
            },
          },
        },
        category: true,
        applications: true,
      },
      cacheStrategy: { ttl: 60 },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: sortObject,
    });

    // Get the total count of records for pagination
    const totalRecords = jobs.length;

    return NextResponse.json({ total: totalRecords , data: jobs,});
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}