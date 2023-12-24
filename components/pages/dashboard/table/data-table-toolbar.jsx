"use client"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import {DataTableFacetedFilter} from "@/components/pages/dashboard/table/data-table-faceted-filter";
import {applicationStatuses, jobType, statuses, workModel} from "@/lib/constants";

export function DataTableToolbar({ table, userType }) {
  const isFiltered = table.getState().columnFilters.length > 0
  const columns = table.getAllColumns()
  const title = columns.find(column => column.id === "title") ? table.getColumn("title") : table.getColumn("jobTitle")

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search jobs..."
          value={title?.getFilterValue() ?? ""}
          onChange={(event) =>
            title?.setFilterValue(event.target.value)
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
            options={userType === "USER" ? applicationStatuses : statuses}
          />
        )}
        {columns.find(column => column.id === "applicationStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("applicationStatus")}
            title="Application Status"
            options={applicationStatuses}
          />
        )}
        {columns.find(column => column.id === "jobStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("jobStatus")}
            title="Job Status"
            options={statuses}
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