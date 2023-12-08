import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import SavedJobs from "@/components/pages/dashboard/SavedJobs";
import {Suspense} from "react";
import Loading from "@/components/Loading";

export default async function SavedJobsPage() {
  const session = await getServerSession(authOptions)
  const { userType } = session?.user;
  if (userType !== "USER") {
    redirect("/dashboard")
  }
  return (
    <Suspense fallback={<Loading />}>
      <SavedJobs />
    </Suspense>
  )
}