import Dashboard from "@/components/pages/dashboard/Dashboard";
import {Suspense} from "react";
import Loading from "@/components/Loading";

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  )
}