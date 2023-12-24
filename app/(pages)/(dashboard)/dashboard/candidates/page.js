import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Candidates from "@/components/pages/dashboard/Candidates";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {getCandidatesByEmployerId} from "@/lib/actions";

export default async function CandidatesPage() {
  const session = await getServerSession(authOptions)
  const { user } = session || {};

  if (session && user?.userType !== "EMPLOYER") {
    redirect("/dashboard");
    return null;
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["candidates"],
    queryFn: async () => await getCandidatesByEmployerId(user.employerId),
  });

  const { candidates } = queryClient.getQueryData(["candidates"]) || {};
  const loading = queryClient.isFetching();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Candidates data={candidates} loading={loading} />
    </HydrationBoundary>
  )
}