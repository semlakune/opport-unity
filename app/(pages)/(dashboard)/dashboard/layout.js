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
        <div className={"fixed z-50 px-10 top-0 right-0"}>
          {/*<div className="flex items-center justify-end gap-5 pt-2 bg-transparent">*/}
          {/*  <Button className={"rounded-full"} size={"sm"}>*/}
          {/*    Post a job <ChevronRightIcon />*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
        <div className={"flex h-full overflow-y-scroll"}>
          {children}
        </div>
      </div>
    </div>
  );
}
