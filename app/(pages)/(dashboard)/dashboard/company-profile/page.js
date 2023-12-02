import {Suspense} from "react";
import CompanyProfile from "@/components/pages/dashboard/CompanyProfile";
import ProfileFallback from "@/components/pages/dashboard/fallbacks/ProfileFallback";
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