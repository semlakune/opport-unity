import AccountSettings from "@/components/dashboard/AccountSettings";
import {Suspense} from "react";

export default async function AccountSettingsPage() {
  return (
    <div className={"w-full"}>
      <div className={"bg-white rounded-xl"}>
        <div className={"flex flex-col p-5"}>
          <div className={"flex flex-col"}>
            <h3 className={"text-lg font-semibold"}>Account Settings</h3>
            <p className={"text-sm text-gray-400"}>Update your password</p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <AccountSettings />
          </Suspense>
        </div>
      </div>
    </div>
  )
}