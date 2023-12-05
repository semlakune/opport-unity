"use client"
import {Checkbox} from "@/components/ui/checkbox";
import {statuses} from "@/lib/constants";
import {MyJobsRowActions} from "@/components/pages/dashboard/table/row-actions/my-jobs-row-actions";
import {DataTableColumnHeader} from "@/components/pages/dashboard/table/data-table-column-header";

export const myJobsColumns = [
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
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      // Format the date
      const formattedDate = date.toLocaleDateString("en-US", {
        day: '2-digit', // Numeric, 2-digit
        month: 'short', // Short month name
        year: 'numeric', // Numeric, 4-digit year
      });
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formattedDate}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "applications",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Applicants" />
    ),
    cell: ({ row }) => {
      const totalApplicants = row.getValue("applications")?.length
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {totalApplicants}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className={`flex w-[100px] items-center ${status.value === "CLOSED" ? "text-red-600" : "text-green-600"}`}>
          {status.icon && (
            <status.icon className={`mr-2 h-4 w-4 ${status.value === "CLOSED" ? "text-red-600" : "text-green-600"}`} />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <MyJobsRowActions row={row} />,
  },
]