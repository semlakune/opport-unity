import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function AppliedJobsPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "USER") {
    redirect("/dashboard")
  }
  return (
    <div>
      <h1>Applied Jobs</h1>
    </div>
  );
}