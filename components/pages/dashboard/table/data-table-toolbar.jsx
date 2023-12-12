"use client"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import {DataTableFacetedFilter} from "@/components/pages/dashboard/table/data-table-faceted-filter";
import {applicationStatuses, jobType, workModel} from "@/lib/constants";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0
  const columns = table.getAllColumns()

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search jobs..."
          value={(table.getColumn("title")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {columns.find(column => column.id === "workModel") && (
          <DataTableFacetedFilter
            column={table.getColumn("workModel")}
            title="Work Model"
            options={workModel}
          />
        )}
        {columns.find(column => column.id === "type")&& (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Job Type"
            options={jobType}
          />
        )}
        {columns.find(column => column.id === "status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={applicationStatuses}
          />
        )}
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
      <DataTableViewOptions table={table} />
    </div>
  )
}