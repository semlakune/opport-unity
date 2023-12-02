import {Suspense} from "react";
import Jobs from "@/components/pages/job/Jobs";
import JobsFallback from "@/components/pages/job/JobsFallback";

export default async function JobsPage() {
  return (
    <Suspense fallback={<JobsFallback />}>
      <Jobs />
    </Suspense>
  );
}