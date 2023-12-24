"use client"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {ArrowTopRightIcon, DotsHorizontalIcon} from "@radix-ui/react-icons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

export function CandidatesRowActions({ row }) {
  return (
    <div className={"flex space-x-2 items-center"}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={"p-2 bg-neutral-50 border rounded-md"}
              // onClick={() => router.push(`/job/${row.original.jobId}`)}
            >
              <ArrowTopRightIcon />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Candidate Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className={"font-bold cursor-pointer text-green-600"} onClick={() => console.log(row.original)}>Accept</DropdownMenuItem>
          <DropdownMenuItem className={"font-bold cursor-pointer text-red-600"} onClick={() => console.log(row.original)}>Reject</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}