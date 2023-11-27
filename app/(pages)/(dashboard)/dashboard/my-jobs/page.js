import MyJobs from "@/components/dashboard/MyJobs";
import {Suspense} from "react";

export default async function MyJobsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyJobs />
    </Suspense>
  )
}