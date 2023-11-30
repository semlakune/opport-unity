import MyJobs from "@/components/dashboard/MyJobs";
import {Suspense} from "react";
import MyJobsFallback from "@/components/dashboard/Fallbacks/MyJobsFallback";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'

export default async function MyJobsPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "EMPLOYER") {
   redirect("/dashboard")
  }
  return (
    <Suspense fallback={<MyJobsFallback />}>
      <MyJobs />
    </Suspense>
  )
}