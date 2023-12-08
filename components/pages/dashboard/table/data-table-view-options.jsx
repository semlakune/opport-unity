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
import {usePathname, useRouter} from "next/navigation";
import {camelCaseToTitle} from "@/lib/utils";

export function DataTableViewOptions({table}) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <DropdownMenu>
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
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {camelCaseToTitle(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
      { pathname === "/dashboard/my-jobs" &&
        <Button
          size={"sm"}
          className={"ml-2"}
          onClick={() => router.push("/dashboard/my-jobs/create")}
        >
          <PlusCircledIcon className={"h-4 w-4 mr-2"} />
          Create Job
        </Button>
      }
    </DropdownMenu>
  );
}