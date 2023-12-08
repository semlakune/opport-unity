import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import {Suspense} from "react";
import AppliedJobs from "@/components/pages/dashboard/AppliedJobs";
import Loading from "@/components/Loading";

export default async function AppliedJobsPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "USER") {
    redirect("/dashboard")
  }
  return (
    <Suspense fallback={<Loading />}>
      <AppliedJobs />
    </Suspense>
  );
}