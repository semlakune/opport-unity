"use client"
import {DotsHorizontalIcon, ReloadIcon, ResetIcon, TrashIcon} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {toast} from "sonner";
import {useRef, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function MyJobsRowActions({ row }) {
  const queryClient = useQueryClient()
  const dialogRef = useRef()
  const [isDeleting, setIsDeleting] = useState(false)

  const mutation = useMutation({
    mutationFn: async () => {
      setIsDeleting(true)
      const response = await fetch(`/api/job/?id=${row.original.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: ["jobs"] });
        toast.success(data.message);
        dialogRef.current.click()
      } else {
        toast.error(data.error);
      }
      setIsDeleting(false)
    },
  })

  return (
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
        <DropdownMenuItem onClick={() => console.log(row.original)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => dialogRef.current.click()}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog>
        <DialogTrigger ref={dialogRef} className={"hidden"}>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the job.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">

          </div>
          <DialogFooter>
            <Button variant={"outline"} disabled={isDeleting} type="button" onClick={() => dialogRef.current.click()}><ResetIcon className={"mr-2"} /> Cancel</Button>
            <Button variant={"destructive"} disabled={isDeleting} type="button" onClick={() => mutation.mutate()}>{isDeleting && <ReloadIcon className={"mr-2 animate-spin"} />}<TrashIcon className={"mr-2"} /> Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}