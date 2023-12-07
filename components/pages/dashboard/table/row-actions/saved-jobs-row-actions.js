"use client"
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ArrowTopRightIcon, ReloadIcon, TrashIcon} from "@radix-ui/react-icons";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useRouter} from "next/navigation";

export function SavedJobsRowActions({ row }) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/bookmark`, {
        method: "DELETE",
        body: JSON.stringify({
            jobId: row.original.jobId,
            userId: row.original.userId
          }),
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
            <div
              className={"p-3 bg-neutral-50 border rounded-md"}
              onClick={() => {
                if (mutation.isPending) return;
                mutation.mutate();
              }}
            >
              {mutation.isPending ? <ReloadIcon className={"animate-spin"} /> : <TrashIcon className={"text-red-500"} />}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete bookmark</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={"p-3 bg-neutral-50 border rounded-md"}
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