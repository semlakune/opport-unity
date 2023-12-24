"use client"
import {ArrowTopRightIcon} from "@radix-ui/react-icons";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useRouter} from "next/navigation";

export function AppliedJobsRowActions({ row }) {
  const router = useRouter()

  return (
    <div className={"flex space-x-2"}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={"p-2 bg-neutral-50 border rounded-md"}
              onClick={() => router.push(`/job/${row.original.jobId}`)}
            >
              <ArrowTopRightIcon />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Job Detail</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}