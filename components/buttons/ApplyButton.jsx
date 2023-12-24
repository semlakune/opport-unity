import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import {
  CheckCircledIcon, ExclamationTriangleIcon,
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
import Link from "next/link";

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
    onMutate: async () => {
      await queryClient.cancelQueries(["applied", jobId]);

      const previousApplied = queryClient.getQueryData(["applied", jobId]);

      return { previousApplied };
    },
    onSettled: async (data, error, variables, context) => {
      if (error) {
        // Revert to the previous state if there's an error
        queryClient.setQueryData(["applied", jobId], context.previousApplied);
      } else {
        // Invalidate the query to refresh the data
        await queryClient.invalidateQueries(["applied", jobId]);
      }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["applied", jobId], context.previousApplied);
      toast.error("Something went wrong");
    },
    onSuccess: (response) => {
      if (!response.error) {
        toast.success("Applied ;)", { position: "top-center" })
      } else {
        toast.error(response.error);
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
          <DialogHeader className={"flex flex-col gap-5 items-center justify-center"}>
            <ExclamationTriangleIcon className={"text-red-500 font-bold w-10 h-10"} />
            <DialogTitle>You need to <Link href={"/login"} className={"underline text-blue-500"}>login</Link> to apply this job</DialogTitle>
            <DialogDescription>
              Or <Link href={"/register"} className={"underline text-blue-500"}>register</Link> if you don&lsquo;t have an account
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
