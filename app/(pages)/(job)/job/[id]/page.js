import JobDetails from "@/components/pages/job/JobDetails";
import {Suspense} from "react";
import Loading from "@/components/Loading";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import {getJob} from "@/lib/actions";

export default async function DetailJob({ params }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["job", params.id],
    queryFn: async () => await getJob(params.id),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <JobDetails id={params.id} />
      </Suspense>
    </HydrationBoundary>
  );
}