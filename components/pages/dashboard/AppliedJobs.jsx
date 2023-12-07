"use client";
import {useSession} from "next-auth/react";

export default function AppliedJobs() {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <div className={"space-y-6"}>
      <div className={"flex flex-col"}>
        <h3 className={"text-lg font-semibold"}>Applied Jobs</h3>
        <p className={"text-sm text-gray-400"}>Jobs you have applied</p>
      </div>
    </div>
  )
}