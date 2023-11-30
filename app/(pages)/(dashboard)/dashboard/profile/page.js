import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Profile from "@/components/dashboard/Profile";
import ProfileFallback from "@/components/dashboard/Fallbacks/ProfileFallback";
import {Suspense} from "react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "USER") {
    redirect("/dashboard")
  }
  return (
    <Suspense fallback={<ProfileFallback />}>
      <Profile />
    </Suspense>
  )
}