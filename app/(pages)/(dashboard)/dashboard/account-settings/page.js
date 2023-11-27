import AccountSettings from "@/components/dashboard/AccountSettings";
import {Suspense} from "react";

export default async function AccountSettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountSettings />
    </Suspense>
  )
}