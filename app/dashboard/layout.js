import { Toaster } from 'sonner'
import Sidebar from "@/components/dashboard/Sidebar";
import {Button} from "@/components/ui/button";
import {ChevronRightIcon} from "@radix-ui/react-icons";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
export default function DashboardLayout({ children }) {
  return (
    <section>
      <Toaster />
      <Sidebar />
      <div className={"min-h-screen pl-[20%]"}>
        <div className={"fixed z-50 container w-[80%]"}>
          <div className="flex items-center justify-end py-4 bg-[#B7E9D5]">
            <Button className={"rounded-full"}>Post a job <ChevronRightIcon /></Button>
          </div>
        </div>
        <div className="relative container pt-20 pb-10 bg-[#B7E9D5] rounded-l-[36px]">
          {children}
        </div>
      </div>
    </section>
  )
}