import { Toaster } from "sonner";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
export default function DashboardLayout({ children }) {
  return (
    <div className={"w-full flex overflow-hidden"}>
      <Toaster richColors={true} />
      <Sidebar />
      <div
        className={
          "relative w-full h-screen px-8 py-8 shadow-lg"
        }
      >
        <div className={"flex h-full overflow-y-scroll"}>
          {children}
        </div>
      </div>
    </div>
  );
}
