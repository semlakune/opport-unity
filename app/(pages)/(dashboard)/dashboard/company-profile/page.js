import CompanyProfile from "@/components/dashboard/CompanyProfile";
import {Suspense} from "react";
import CompanyProfileFallback from "@/components/dashboard/Fallbacks/CompanyProfileFallback";

export default async function CompanyProfilePage() {
  return (
    <Suspense fallback={<CompanyProfileFallback />}>
      <CompanyProfile />
    </Suspense>
  )
}