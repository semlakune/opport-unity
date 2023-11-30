import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function SavedJobsPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "USER") {
    redirect("/dashboard")
  }
  return (
    <div>
      <h1>Saved Jobs Page</h1>
    </div>
  )
}