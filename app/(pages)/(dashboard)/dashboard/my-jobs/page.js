import MyJobs from "@/components/dashboard/MyJobs";
import {Suspense} from "react";
import MyJobsFallback from "@/components/dashboard/Fallbacks/MyJobsFallback";

export default async function MyJobsPage() {
  return (
    <Suspense fallback={<MyJobsFallback />}>
      <MyJobs />
    </Suspense>
  )
}