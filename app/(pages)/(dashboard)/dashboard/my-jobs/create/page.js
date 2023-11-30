import {Suspense} from "react";
import CreateJob from "@/components/dashboard/CreateJob";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function CreateJobPage() {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType
  if (userType !== "EMPLOYER") {
    redirect("/dashboard")
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateJob />
    </Suspense>
  );
}