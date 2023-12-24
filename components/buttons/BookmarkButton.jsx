"use client";
import {BookmarkFilledIcon, BookmarkIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {twMerge} from "tailwind-merge";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {useRef} from "react";
import {useSession} from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import Link from "next/link";

export default function BookmarkButton({ buttonVariant = "ghost", job, className, withText = false, isDisabled = false }) {
  const { data: session } = useSession();

  const dialogRef = useRef();
  const queryClient = useQueryClient()

  const { data: bookmarked } = useQuery({
    queryKey: ["bookmarked", job?.id],
    queryFn: async () => {
      if (!session) return false;
      const response = await fetch(`/api/bookmark/?jobId=${job?.id}&userId=${session?.user?.id}`);
      const data = await response.json();
      return data.isBookmarked;
    },
  })

  const mutation = useMutation({
    mutationKey: ["bookmark"],
    mutationFn: async () => {
      const body = JSON.stringify({ jobId: job?.id, userId: session?.user?.id });
      const method = bookmarked ? "DELETE" : "POST";
      const response = await fetch("/api/bookmark", { method, body });
      return response.json();
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["bookmarked", job?.id]);

      const previousBookmarked = queryClient.getQueryData(["bookmarked", job?.id]);

      // Immediately update the UI to reflect the new state
      queryClient.setQueryData(["bookmarked", job?.id], !bookmarked);

      !previousBookmarked ? toast.success("Cool! you've add a job to Saved Jobs", { position: "top-center" }) : toast.info("Bookmark Removed!", { position: "top-center" });

      return { previousBookmarked };
    },
    onSettled: (data, error, variables, context) => {
      if (error) {
        // Revert to the previous state if there's an error
        queryClient.setQueryData(["bookmarked", job?.id], context.previousBookmarked);
      } else {
        // Invalidate the query to refresh the data
        queryClient.invalidateQueries(["bookmarked", job?.id]);
      }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["bookmarked", job?.id], context.previousBookmarked);
      toast.error("Something went wrong");
    },
    onSuccess: (response) => {
      if (!response.error) {
        // toast.success("Success!");
        console.log("Success")
      } else {
        toast.error(response.error);
      }
    },
  });

  const handleBookmark = () => {
    if (!session) {
      dialogRef.current.click();
      return;
    }
    mutation.mutate();
  }

  return (
    <>
      <Button
        className={twMerge("bg-white", className)}
        variant={buttonVariant}
        onClick={handleBookmark}
        disabled={isDisabled}
      >
        {bookmarked ? (
          <>
            <BookmarkFilledIcon className={"hover:scale-110 text-primary"} />
            {withText && <span className={"ml-2"}>Saved</span>}
          </>
        ) : (
          <>
            <BookmarkIcon className={"hover:scale-110"} />
            {withText && <span className={"ml-2"}>Save</span>}
          </>
        )}
      </Button>
      <Dialog>
        <DialogTrigger className={"hidden"} ref={dialogRef}></DialogTrigger>
        <DialogContent>
          <DialogHeader className={"flex flex-col gap-5 items-center justify-center"}>
            <ExclamationTriangleIcon className={"text-red-500 font-bold w-10 h-10"} />
            <DialogTitle>You need to <Link href={"/login"} className={"underline text-blue-500"}>login</Link> to bookmark this job</DialogTitle>
            <DialogDescription>
              Or <Link href={"/register"} className={"underline text-blue-500"}>register</Link> if you don&lsquo;t have an account
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}