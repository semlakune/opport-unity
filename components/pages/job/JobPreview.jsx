import { Button } from "@/components/ui/button"
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import {BookmarkIcon, Share1Icon} from "@radix-ui/react-icons";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useRef, useState} from "react";
import {toast, Toaster} from "sonner";
import {textManipulation} from "@/lib/utils";
import moment from "moment";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function JobPreview({ details }) {
  const { data: session } = useSession();
  const router = useRouter();
  const applyButtonRef = useRef(null);
  const [isApplying, setIsApplying] = useState(false);
  const tags = [details?.type, details?.workModel, details?.category.name, details?.level, details?.salaryRange];
  const day = moment(details?.createdAt).fromNow();
  const handleApply = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    // do something here
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      applyButtonRef.current.click();
      toast.success("Applied!");
    }, 3000);
  };

  const handleShare = () => {
    console.log("share")
  }

  const handleBookmark = () => {
    if (!session) {
      toast.error("You must login to save this job", { position: "top-center" });
      return;
    }
    console.log("bookmark")
  }

  return (
    <SheetContent className={"md:rounded-l-3xl"}>
      <Toaster richColors />
      <SheetHeader className={"border-b border-b-slate-200 pb-5"}>
        <div>
          <div className="flex items-center gap-2 w-full justify-between">
            <div className={"flex items-start gap-2"}>
              <Image src={details?.employer.logo} alt={details?.employer.user.name} width={100} height={100} className={"w-12 md:w-20 h-12 md:h-20 rounded-full object-cover"} />
              <div className={"flex flex-col items-start gap-3"}>
                <SheetTitle
                  className={
                    "text-3xl line-clamp-1 text-ellipsis overflow-hidden"
                  }
                >
                  {details?.title}
                </SheetTitle>
                <div
                  className={
                    "flex flex-wrap items-center justify-start lg:pr-5"
                  }
                >
                  <p
                    className={
                      "text-sm line-clamp-1 text-ellipsis overflow-hidden"
                    }
                  >
                    {details?.employer.user.name}
                  </p>
                  <Separator
                    orientation={"horizontal"}
                    className={"mx-2 w-2 h-2 rounded-full"}
                  />
                  <p className={"text-sm"}>{details?.location}</p>
                  <Separator
                    orientation={"horizontal"}
                    className={"mx-2 w-2 h-2 rounded-full"}
                  />
                  <p className={"text-sm"}>{day}</p>
                </div>
                <div
                  className={
                    "flex max-h-[56px] flex-wrap gap-1 line-clamp-2 pr-5"
                  }
                >
                  {details && tags?.map((tag, index) => (
                    <p
                      className={
                        "text-xs rounded-full px-3 py-1 border border-neutral-500"
                      }
                      key={index}
                    >
                      {tag.includes("IDR") ? tag : textManipulation(tag, 'capitalize')}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className={"hidden lg:flex lg:pr-5 flex-col justify-end gap-3"}>
              <div className="flex items-center gap-2">
                <Button variant={"outline"} disabled={isApplying} onClick={handleBookmark}>
                  <BookmarkIcon />
                </Button>
                <Button variant={"outline"} disabled={isApplying} onClick={handleShare}>
                  <Share1Icon />
                </Button>
              </div>
              <Button
                className={"whitespace-nowrap"}
                onClick={() => router.push(`/job/${details?.id}`)}
                variant={"outline"}
              >
                See Details
              </Button>
              <Button
                className={"whitespace-nowrap"}
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? "Applying..." : "Apply Now"}
              </Button>
              <SheetClose
                ref={applyButtonRef}
                className={"hidden"}
              ></SheetClose>
            </div>
          </div>
        </div>
        <div className={"lg:hidden flex flex-col justify-end gap-3 pt-5"}>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              disabled={isApplying}
              className={"w-full"}
              onClick={handleBookmark}
            >
              <BookmarkIcon />
            </Button>
            <Button
              variant={"outline"}
              disabled={isApplying}
              className={"w-full"}
              onClick={handleShare}
            >
              <Share1Icon />
            </Button>
          </div>
          <Button
            className={"whitespace-nowrap"}
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Apply Now"}
          </Button>
          <Button
            className={"whitespace-nowrap"}
            onClick={() => router.push(`/job/${details?.id}`)}
            variant={"outline"}
          >
            See Details
          </Button>
          <SheetClose ref={applyButtonRef} className={"hidden"}></SheetClose>
        </div>
      </SheetHeader>
      <ScrollArea className="h-full py-4">
        <div className={"flex flex-col gap-5 items-start justify-center"}>
          <div>
            <h1 className={"text-xl font-custombold"}>Overview</h1>
            <p className={"text-slate-500 mt-2"}>
              {details?.description}
            </p>
          </div>
          <div>
            <h1 className={"text-xl font-custombold"}>Qualification</h1>
            <ul className={"text-slate-500 mt-2 ml-6 list-disc"}>
              {details?.qualifications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={"text-xl font-custombold"}>Responsibilities</h1>
            <ul className={"text-slate-500 mt-2 pb-40 ml-6 list-disc"}>
              {details?.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollArea>
    </SheetContent>
  );
};