"use client"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import {MixerHorizontalIcon, PlusCircledIcon} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {Skeleton} from "@/components/ui/skeleton";
import {useRouter} from "next/navigation";

export function DataTableViewOptions({table, isLoading}) {
  const router = useRouter()
  return (
    <DropdownMenu>
      {isLoading ? (
        <>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-32" />
        </>
      ) : (
        <>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" && column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
          <Button size={"sm"} className={"ml-2"} onClick={() => router.push("/dashboard/my-jobs/create")}>
            <PlusCircledIcon className={"h-4 w-4 mr-2"} />
            Create Job
          </Button>
        </>
      )}
    </DropdownMenu>
  )
}