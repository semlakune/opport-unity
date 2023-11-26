import CompanyProfile from "@/components/dashboard/CompanyProfile";
import {Suspense} from "react";

export default async function CompanyProfilePage() {
  return (
    <div className={"w-full"}>
      <div className={"bg-white rounded-xl"}>
        <div className={"flex flex-col p-5"}>
          <div className={"flex flex-col"}>
            <h3 className={"text-lg font-semibold"}>Company Profile</h3>
            <p className={"text-sm text-gray-400"}>Update your company profile</p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <CompanyProfile />
          </Suspense>
        </div>
      </div>
    </div>
  )
}