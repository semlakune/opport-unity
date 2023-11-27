import CompanyProfile from "@/components/dashboard/CompanyProfile";
import {Suspense} from "react";

export default async function CompanyProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompanyProfile />
    </Suspense>
  )
}