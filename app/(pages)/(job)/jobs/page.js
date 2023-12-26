import {Suspense} from "react";
import Jobs from "@/components/pages/job/Jobs";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import {getJobs, getLocations} from "@/lib/actions";
import Loading from "@/components/Loading";

export default async function JobsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "locations"],
    queryFn: async () => {
      await getJobs()
      const locations = await getLocations()
      return {locations}
    },
  })
  const { locations } = queryClient.getQueryData(["jobs", "locations"]) || {};

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <Jobs locations={locations} />
      </Suspense>
    </HydrationBoundary>
  );
}