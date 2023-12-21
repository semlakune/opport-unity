import {Suspense} from "react";
import Jobs from "@/components/pages/job/Jobs";
import JobsFallback from "@/components/pages/job/JobsFallback";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import {getJobs} from "@/lib/actions";


export default async function JobsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<JobsFallback />}>
        <Jobs />
      </Suspense>
    </HydrationBoundary>
  );
}