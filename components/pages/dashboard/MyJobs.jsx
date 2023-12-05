"use client";
import {DataTable} from "@/components/pages/dashboard/table/data-table";
import {myJobsColumns} from "@/components/pages/dashboard/table/columns/my-jobs-columns";
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import MyJobsFallback from "@/components/pages/dashboard/fallbacks/MyJobsFallback";

export default function MyJobs() {
  const { data: session } = useSession()
  const { user } = session || {};

  const fetchJobs = async () => {
    if (!user?.employerId) {
      return null;
    }

    const response = await fetch(`/api/jobs/?employerId=${user.employerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    enabled: !!user?.employerId,
  });

  if (isLoading || !user?.employerId) {
    return <MyJobsFallback />
  }
  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={"mt-5"}>
      <DataTable data={jobs?.data} columns={myJobsColumns} />
    </div>
  );
}