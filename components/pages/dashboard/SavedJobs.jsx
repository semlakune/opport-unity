"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {DataTable} from "@/components/pages/dashboard/table/data-table";
import {savedJobsColumns} from "@/components/pages/dashboard/table/columns/saved-jobs-columns";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function SavedJobs() {
  const { data: session } = useSession();
  const { user } = session || {};

  const {
    data: bookmarks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const response = await fetch(`/api/bookmarks/?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      return data?.bookmarks?.map((bookmark) => {
        return {
          id: bookmark.id,
          jobId: bookmark.jobId,
          userId: bookmark.userId,
          companyName: bookmark.job.employer.user.name,
          companyLogo: bookmark.job.employer.logo,
          title: bookmark.job.title,
          type: bookmark.job.type,
          location: bookmark.job.location,
          salaryRange: bookmark.job.salaryRange,
          workModel: bookmark.job.workModel,
        };
      });
    },
    enabled: !!user?.id,
  });
  if (isLoading || !user?.id) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div className={"space-y-6"}>
      <div className={"flex flex-col"}>
        <h3 className={"text-lg font-semibold"}>Saved Jobs</h3>
        <p className={"text-sm text-gray-400"}>Your bookmarked job</p>
      </div>
      <div>
        <DataTable data={bookmarks} columns={savedJobsColumns} userType={"USER"} />
      </div>
    </div>
  );
}