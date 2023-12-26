import {Suspense} from "react";
import AccountSettings from "@/components/pages/dashboard/AccountSettings";
import CompanyProfile from "@/components/pages/dashboard/CompanyProfile";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/components/pages/dashboard/Profile";
import {Separator} from "@/components/ui/separator";
import Loading from "@/components/Loading";

export default async function AccountSettingsPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  return (
    <div className={"flex flex-col gap-10 w-1/2"}>
      {userType === "EMPLOYER" && (
        <Suspense fallback={<Loading />}>
          <CompanyProfile />
        </Suspense>
      )}
      {userType === "USER" && (
        <Suspense fallback={<Loading />}>
          <Profile />
        </Suspense>
      )}
      <Separator />
      <Suspense fallback={<Loading />}>
        <AccountSettings />
      </Suspense>
    </div>
  )
}