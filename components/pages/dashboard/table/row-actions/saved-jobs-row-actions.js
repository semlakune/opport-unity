"use client"
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "@radix-ui/react-icons";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export function SavedJobsRowActions({ row }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/bookmark`, {
        method: "DELETE",
        body: {
          jobId: row.original.jobId,
          userId: row.original.userId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    },
  })

  return (
    <div className={"flex space-x-2"}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant={"outline"}><TrashIcon className={"text-red-500"} /></Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete bookmark</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button variant={"outline"}>View</Button>
    </div>
  )
}