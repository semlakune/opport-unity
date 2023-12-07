import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import {
  CheckCircledIcon,
  ReloadIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ApplyButton({ jobId, className }) {
  const { data: session } = useSession();

  const dialogRef = useRef();
  const queryClient = useQueryClient();

  const { data: applied, isLoading } = useQuery({
    queryKey: ["applied", jobId],
    queryFn: async () => {
      if (!session) return false;
      const response = await fetch(
        `/api/application/?jobId=${jobId}&userId=${session?.user?.id}`,
      );
      const data = await response.json();
      return data.isApplied;
    },
  });

  const mutation = useMutation({
    mutationKey: ["apply"],
    mutationFn: async () => {
      const body = JSON.stringify({ jobId, userId: session?.user?.id });
      const response = await fetch("/api/application", {
        method: "POST",
        body,
      });
      return response.json();
    },
    onSettled: (data, error, variables, context) => {
      if (error) {
        // Revert to the previous state if there's an error
        queryClient.setQueryData(["applied", jobId], context.previousApplied);
        toast.error("Something went wrong :(", { position: "top-center" });
      } else {
        // Invalidate the query to refresh the data
        queryClient.invalidateQueries(["applied", jobId]);
        toast.success("Cool! you've applied to this job", {
          position: "top-center",
        });
      }
    },
  });

  const handleApply = () => {
    if (!session) {
      dialogRef.current.click();
      return;
    }


    mutation.mutate();
  };
  return (
    <>
      <Button
        onClick={handleApply}
        disabled={isLoading || applied || mutation.isPending}
        className={twMerge("whitespace-nowrap", className)}
      >
        {applied && <CheckCircledIcon className={"mr-2"} />}
        {!applied && !mutation.isPending && <RocketIcon className={"mr-2"} />}
        {!applied && mutation.isPending && (
          <ReloadIcon className={"mr-2 animate-spin"} />
        )}
        {!applied && !mutation.isPending && "Apply Now"}
        {!applied && mutation.isPending && "Applying..."}
        {applied && "Applied"}
      </Button>
      <Dialog>
        <DialogTrigger className={"hidden"} ref={dialogRef}></DialogTrigger>
        <DialogContent>
          <DialogHeader className={"flex flex-col items-center justify-center"}>
            <DialogTitle className={"text-red-500"}>
              Please login first
            </DialogTitle>
            <DialogDescription>
              You need to login to apply this job
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
