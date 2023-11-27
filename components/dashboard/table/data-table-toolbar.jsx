"use client"

import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import {Skeleton} from "@/components/ui/skeleton";

export function DataTableToolbar({ table, isLoading }) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      {isLoading ? (
        <Skeleton className="h-8 w-56" />
      ) : (
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter jobs..."
            value={(table.getColumn("title")?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      <DataTableViewOptions table={table} isLoading={isLoading} />
    </div>
  )
}