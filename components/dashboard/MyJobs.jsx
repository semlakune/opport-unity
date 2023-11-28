"use client";
import {DataTable} from "@/components/dashboard/table/data-table";
import {columns} from "@/components/dashboard/table/columns";
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import MyJobsFallback from "@/components/dashboard/Fallbacks/MyJobsFallback";

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

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    enabled: !!user?.employerId,
  });

  if (isLoading || !user?.employerId) {
    return <MyJobsFallback />
  }

  return (
    <div className={"mt-5"}>
      <DataTable data={jobs?.data} columns={columns} />
    </div>
  );
}