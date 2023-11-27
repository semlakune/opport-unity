"use client";
import {DataTable} from "@/components/dashboard/table/data-table";
import {columns} from "@/components/dashboard/table/columns";
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";

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

  return (
    <div className={"mt-5"}>
      <DataTable data={jobs?.data} columns={columns} isLoading={isLoading || !user?.employerId} />
    </div>
  );
}