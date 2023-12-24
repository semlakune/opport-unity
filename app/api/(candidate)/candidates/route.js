import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export const runtime = "edge";

export async function GET(request) {
try {
    const { searchParams } = new URL(request.url);
    const employerId = searchParams.get("employerId");

    const candidates = await prisma.jobApplication.findMany({
      where: {
        job: {
          employerId: Number(employerId)
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile: true
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            status: true,
            employer: true
          }
        }
      }
    });

    const canddidatesMapped = candidates.map(candidate => {
      return {
        id: candidate.id,
        applicationStatus: candidate.status,
        candidateId: candidate.user.id,
        candidateName: candidate.user.name,
        candidatePhoto: candidate.user.profile.photo,
        jobId: candidate.job.id,
        jobTitle: candidate.job.title,
        jobStatus: candidate.job.status,
        employerId: candidate.job.employer.id,
      }
    })

    return NextResponse.json({ success: true, candidates: canddidatesMapped });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}