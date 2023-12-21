import DashboardUser from "@/components/pages/dashboard/DashboardUser";
import DashboardEmployer from "@/components/pages/dashboard/DashboardEmployer";
import {Suspense} from "react";
import Loading from "@/components/Loading";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  const { user } = session || {};
  return (
    <Suspense fallback={<Loading />}>
      {userType === "USER" && <DashboardUser user={user} />}
      {userType === "EMPLOYER" && <DashboardEmployer user={user} />}
    </Suspense>
  )
}