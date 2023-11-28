import AccountSettings from "@/components/dashboard/AccountSettings";
import {Suspense} from "react";
import AccountSettingsFallback from "@/components/dashboard/Fallbacks/AccountSettingsFallback";

export default async function AccountSettingsPage() {
  return (
    <Suspense fallback={<AccountSettingsFallback />}>
      <AccountSettings />
    </Suspense>
  )
}