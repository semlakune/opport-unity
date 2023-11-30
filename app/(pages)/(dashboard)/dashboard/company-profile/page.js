import CompanyProfile from "@/components/dashboard/CompanyProfile";
import {Suspense} from "react";
import ProfileFallback from "@/components/dashboard/Fallbacks/ProfileFallback";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function CompanyProfilePage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "EMPLOYER") {
    redirect("/dashboard")
  }
  return (
    <Suspense fallback={<ProfileFallback />}>
      <CompanyProfile />
    </Suspense>
  )
}