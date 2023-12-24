import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {getJobsByEmployerId} from "@/lib/actions";
import MyJobs from "@/components/pages/dashboard/MyJobs";

export default async function MyJobsPage() {
  const session = await getServerSession(authOptions);
  const { user } = session || {};

  if (session && user?.userType !== "EMPLOYER") {
    redirect("/dashboard");
    return null;
  }


  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["jobs"],
    queryFn: async () => await getJobsByEmployerId(user.employerId),
  });

  const { data } = queryClient.getQueryData(["jobs"]) || {};
  const loading = queryClient.isFetching();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyJobs data={data} loading={loading} />
    </HydrationBoundary>
  );
}