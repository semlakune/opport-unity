"use client";
import {BookmarkFilledIcon, BookmarkIcon} from "@radix-ui/react-icons";
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

export default function BookmarkButton({ buttonVariant = "ghost", job, className, withText = false, isDisabled = false }) {
  const { data: session } = useSession();

  const dialogRef = useRef();
  const queryClient = useQueryClient()

  const { data: bookmarked } = useQuery({
    queryKey: ["bookmark", job?.id],
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
      await queryClient.cancelQueries(["bookmark", job?.id]);

      const previousBookmarked = queryClient.getQueryData(["bookmark", job?.id]);

      // Immediately update the UI to reflect the new state
      queryClient.setQueryData(["bookmark", job?.id], !bookmarked);

      !previousBookmarked ? toast.success("Cool! you've add a job to Saved Jobs", { position: "top-center" }) : toast.info("Bookmark Removed!", { position: "top-center" });

      return { previousBookmarked };
    },
    onSettled: (data, error, variables, context) => {
      if (error) {
        // Revert to the previous state if there's an error
        queryClient.setQueryData(["bookmark", job?.id], context.previousBookmarked);
      } else {
        // Invalidate the query to refresh the data
        queryClient.invalidateQueries(["bookmark", job?.id]);
      }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["bookmark", job?.id], context.previousBookmarked);
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
          <DialogHeader className={"flex flex-col items-center justify-center"}>
            <DialogTitle className={"text-red-500"}>Please login first</DialogTitle>
            <DialogDescription>
              You need to login to bookmark this job
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}