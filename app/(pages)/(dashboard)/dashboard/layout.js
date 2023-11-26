import { Toaster } from "sonner";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
export default function DashboardLayout({ children }) {
  return (
    <div className={"w-full flex overflow-hidden"}>
      <Toaster />
      <Sidebar />
      <div
        className={
          "relative w-full h-screen px-10 pt-16 pb-12 bg-emerald-50 rounded-l-[36px]"
        }
      >
        <div className={"flex h-full overflow-y-scroll"}>
          {children}
        </div>
      </div>
    </div>
  );
}
