import {Suspense} from "react";
import AccountSettings from "@/components/pages/dashboard/AccountSettings";
import AccountSettingsFallback from "@/components/pages/dashboard/fallbacks/AccountSettingsFallback";

export default async function AccountSettingsPage() {
  return (
    <Suspense fallback={<AccountSettingsFallback />}>
      <AccountSettings />
    </Suspense>
  )
}