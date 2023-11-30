import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function CandidatesPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "EMPLOYER") {
    redirect("/dashboard")
  }
  return (
    <div>
      <h1>Candidates</h1>
    </div>
  )
}