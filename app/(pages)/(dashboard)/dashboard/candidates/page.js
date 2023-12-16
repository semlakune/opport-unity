import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Loading from "@/components/Loading";
import {Suspense} from "react";
import Candidates from "@/components/pages/dashboard/Candidates";

export default async function CandidatesPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "EMPLOYER") {
    redirect("/dashboard")
  }
  return (
    <Suspense fallback={<Loading />}>
      <Candidates />
    </Suspense>
  )
}