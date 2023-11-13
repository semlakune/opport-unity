import { Button } from "@/components/ui/button"
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import {BookmarkIcon, Share1Icon} from "@radix-ui/react-icons";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useRef, useState} from "react";
import {toast, Toaster} from "sonner";

const Detail = (details) => {
  const applyButtonRef = useRef(null)
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = () => {
    // do something here
    setIsApplying(true)
    setTimeout(() => {
      setIsApplying(false)
      applyButtonRef.current.click()
      toast.success("Applied!")
    }, 3000)
  }
  return (
    <SheetContent className={"rounded-l-3xl"}>
      <Toaster richColors />
      <SheetHeader className={"border-b border-b-slate-200 pb-5"}>
        <SheetDescription>
          <div class="flex items-center gap-2 w-full justify-between">
            <div className={"flex items-start gap-2"}>
              <Image src={"/images/gojek.webp"} alt={"Gojek"} width={100} height={100} className={"rounded-full object-contain"} />
              <div className={"flex flex-col gap-3"}>
                <SheetTitle className={"text-3xl line-clamp-1 text-ellipsis overflow-hidden"}>UI/UX Designer </SheetTitle>
                <div className={"flex flex-wrap items-center pr-5"}>
                  <h1 className={"text-sm line-clamp-1 text-ellipsis overflow-hidden"}>PT. Aplikasi Anak Bangsa Maju Bersama Merdeka Raya</h1>
                  <Separator orientation={"horizontal"} className={"mx-2 w-2 h-2 rounded-full"} />
                  <h1 className={"text-sm"}>Jakarta, Indonesia</h1>
                  <Separator orientation={"horizontal"} className={"mx-2 w-2 h-2 rounded-full"} />
                  <h1 className={"text-sm"}>3 Days Ago</h1>
                </div>
                <div className={"flex max-h-[56px] flex-wrap gap-1 line-clamp-2 pr-5"}>
                  <p className={"text-xs rounded-full px-3 py-1 border border-neutral-500"}>Full time</p>
                  <p className={"text-xs rounded-full px-3 py-1 border border-neutral-500"}>Remote</p>
                  <p className={"text-xs rounded-full px-3 py-1 border border-neutral-500"}>Fresh Graduate</p>
                  <p className={"text-xs rounded-full px-3 py-1 border border-neutral-500"}>IDR 10.000.000 - IDR 15.000.000</p>
                </div>
              </div>
            </div>
            <div className={"flex flex-col justify-end gap-3"}>
              <div className="flex items-center gap-2">
                <Button variant={"outline"} disabled={isApplying} ><BookmarkIcon /></Button>
                <Button variant={"outline"} disabled={isApplying} ><Share1Icon /></Button>
              </div>
              <Button className={"whitespace-nowrap"} onClick={handleApply} disabled={isApplying} >{isApplying ? "Applying..." : "Apply Now"}</Button>
              <SheetClose ref={applyButtonRef} className={"hidden"}>
              </SheetClose>
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-full py-4">
        <div className={"flex flex-col gap-5 items-start justify-center"}>
          <div>
            <p className={"text-xl"}>Overview</p>
            <p className={"text-slate-500 mt-2"}>As an UI/UX Dedigner on Gojek, you&lsquo;ll focus on design user-friendly on several platform (web, mobile, dashboard, etc) to our users needs. Your innovative solution will enhance the user experience on several platforms. Join us and let&lsquo;s making impact on user engagement at Gojek.</p>
          </div>
          <div>
            <p className={"text-xl"}>Qualification</p>
            <ul className={"text-slate-500 mt-2 ml-6 list-disc"}>
              <li>At least 2-4 years of relevant experience in product design or related roles</li>
              <li>Knowledge of design validation, either through quantitative or qualitative research</li>
              <li>Have good knowledge using Figma and Figjam</li>
              <li>Experience with analytics tools to gather data from users</li>
            </ul>
          </div>
          <div>
            <p className={"text-xl"}>Responsibilities</p>
            <ul className={"text-slate-500 mt-2 pb-40 ml-6 list-disc"}>
              <li>Create design and user journey on every features and product/business units across multiples devices (Web+App)</li>
              <li>Identifying design problems through user journey and devising elegant solutions</li>
              <li>Develop low and hi-fidelity designs, user experience flow and prototype, translate it into highly-polished visual composites following style and brand guidelines</li>
              <li>Brainstorm and works together with Design Lead, UX Engineers, and PMs to execute a design sprint on specific story or task</li>
            </ul>
          </div>
        </div>
      </ScrollArea>
    </SheetContent>
  )
}

export default Detail