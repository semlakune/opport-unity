import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/pages/dashboard/table/data-table-column-header";
import Image from "next/image";
import {formatCurrency, formatSalary, textManipulation} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {SavedJobsRowActions} from "@/components/pages/dashboard/table/row-actions/saved-jobs-row-actions";
import {jobType, workModel} from "@/lib/constants";

export const savedJobsColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] ml-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] ml-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {/*<Badge variant="outline" className={"rounded"}>{textManipulation(row.original.type, "capitalize")}</Badge>*/}
          <Image src={row.original.companyLogo} alt={row.original.companyName} width={100} height={100} className={"rounded-2xl w-12 h-12"} />
          <div className={"flex flex-col"}>
            <span className="max-w-[500px] truncate font-custombold">
            {row.getValue("title")}
            </span>
            <span className="max-w-[500px] truncate font-medium">
            {row.original.companyName}
          </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "salaryRange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary Range" />
    ),
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p>{formatSalary(row.original.salaryRange)}</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{formatCurrency(row.original.salaryRange)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const valueA = parseInt(rowA.original[columnId].split("-")[1])
      const valueB = parseInt(rowB.original[columnId].split("-")[1])

      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = jobType.find((item) => item.value === row.getValue("type"))

      if (!type) return null

      return (
        <Badge variant="outline" className={"rounded"}>{textManipulation(row.original.type, "capitalize")}</Badge>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "workModel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Work Model" />
    ),
    cell: ({ row }) => {
      const model = workModel.find((item) => item.value === row.getValue("workModel"))

      if (!model) return null

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {textManipulation(row.original.workModel, "capitalize")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("location")}
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <SavedJobsRowActions row={row} />,
  },
]