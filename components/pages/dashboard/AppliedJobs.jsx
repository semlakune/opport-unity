"use client";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {DataTable} from "@/components/pages/dashboard/table/data-table";
import {appliedJobsColumns} from "@/components/pages/dashboard/table/columns/applied-jobs-columns";
import {applicationStatuses} from "@/lib/constants";

export default function AppliedJobs() {
  const { data: session } = useSession();
  const { user } = session || {};

  const { data: applications, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await fetch(`/api/applications/?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      return data?.applications?.map((application) => {
        return {
          id: application.id,
          jobId: application.jobId,
          userId: application.userId,
          status: application.status,
          companyName: application.job.employer.user.name,
          companyLogo: application.job.employer.logo,
          title: application.job.title,
          type: application.job.type,
          location: application.job.location,
          salaryRange: application.job.salaryRange,
          workModel: application.job.workModel,
        };
      });
    },
    enabled: !!user?.id,
  })

  if (isLoading || !user?.id) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={"space-y-6"}>
      <div className={"flex flex-col"}>
        <h3 className={"text-lg font-semibold"}>Applied Jobs</h3>
        <p className={"text-sm text-gray-400"}>Jobs you have applied</p>
      </div>
      <div>
        <DataTable data={applications} columns={appliedJobsColumns} />
      </div>
    </div>
  )
}