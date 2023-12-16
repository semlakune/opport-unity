import {Suspense} from "react";
import MyJobs from "@/components/pages/dashboard/MyJobs";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'
import Loading from "@/components/Loading";

export default async function MyJobsPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "EMPLOYER") {
   redirect("/dashboard")
  }
  return (
    <Suspense fallback={<Loading />}>
      <MyJobs />
    </Suspense>
  )
}