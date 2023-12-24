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
    const location = searchParams.get('location');
    const salaryRange = searchParams.get('salaryRange');
    // Filter parameters
    const level = searchParams.get('level');
    const type = searchParams.get('type');
    const workModel = searchParams.get('workModel');
    const categoryIds = searchParams.get('categoryIds');
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
        { salaryRange: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { employer: { user: { name: { contains: search, mode: 'insensitive' } } } },
      ];
    }
    if (location && location !== 'all') {
      whereCondition.location = { equals: location, mode: 'insensitive' };
    }

    // Add filter conditions if they are present
    if (level) {
      whereCondition.level = { in: level.split(",") };
    }
    if (type) {
      whereCondition.type = { in: type.split(",") };
    }
    if (workModel) {
      whereCondition.workModel = { in: workModel.split(",") };
    }
    if (categoryIds) {
      let arrayStringCategoryIds = categoryIds.split(",");
      let arrayIntCategoryIds = arrayStringCategoryIds.map(Number);

      whereCondition.categoryId = { in: arrayIntCategoryIds };
    }
    // Add employer ID condition if it is present
    if (employerId) {
      whereCondition.employerId = Number(employerId);
    }

    // Construct sort object
    let sortObject = {};
    if (sortField !== 'salaryMin' && sortField !== 'salaryMax') {
      sortObject[sortField] = sortOrder;
    }

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
        bookmarks: true,
      },
      cacheStrategy: { ttl: 60 },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: sortObject,
    });
    const totalJobs = await prisma.job.count();

    let filteredJobs = jobs;

    // Proceed with salary filtering only if salary parameter is provided
    if (salaryRange) {
      // Convert the user input salaryRange into a number
      const userSalary = parseInt(salaryRange.replace(/\D/g, ''));

      // Filter jobs based on the minimum salary range
      filteredJobs = jobs.filter(job => {
        if (!job.salaryRange) return false;

        // Extracting maximum salary from the job's salary range
        const maxSalaryString = job.salaryRange.split('-')[1].replace(/\D/g, '');
        const maxSalary = parseInt(maxSalaryString);

        // Check if the job's maximum salary is greater than or equal to the user's salary
        return maxSalary >= userSalary;
      });
    }

    // Custom Sorting Logic for Salary Range
    if (sortField === 'salaryMin' || sortField === 'salaryMax') {
      filteredJobs = filteredJobs.map(job => {
        if (!job.salaryRange) return { ...job, minSalary: null, maxSalary: null };

        const [minSalary, maxSalary] = job.salaryRange.replace(/[^\d-]/g, '').split('-').map(s => parseInt(s.trim()));
        return { ...job, minSalary, maxSalary };
      });

      const isAscending = sortOrder === 'asc';
      const salaryField = sortField === 'salaryMin' ? 'minSalary' : 'maxSalary';

      filteredJobs.sort((a, b) => {
        if (a[salaryField] === null) return isAscending ? 1 : -1;
        if (b[salaryField] === null) return isAscending ? -1 : 1;
        return isAscending ? a[salaryField] - b[salaryField] : b[salaryField] - a[salaryField];
      });
    }

    return NextResponse.json({ total: filteredJobs.length , data: filteredJobs, fromTotal: totalJobs });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}