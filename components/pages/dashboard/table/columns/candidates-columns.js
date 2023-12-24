"use client";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/pages/dashboard/table/data-table-column-header";
import Image from "next/image";
import {applicationStatuses, statuses} from "@/lib/constants";
import {CandidatesRowActions} from "@/components/pages/dashboard/table/row-actions/candidates-row-actions";

export const candidatesColumns = [
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
    accessorKey: "candidateName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Candidate Name" />
    ),
    cell: ({ row }) => {
      const candidatePhoto = row.original.candidatePhoto
      const candidateName = row.original.candidateName
      return (
        <div className="flex space-x-2 items-center">
          <Image src={candidatePhoto} alt={candidateName} width={100} height={100} className={"rounded-full w-10 h-10 object-cover"} />
          <p className="max-w-[500px] truncate font-custombold">
            {candidateName}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("jobTitle")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "applicationStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Status" />
    ),
    cell: ({ row }) => {
      const application = applicationStatuses.find((item) => item.value === row.original.applicationStatus)

      if (!application) return null

      return (
        <div
          className={`flex items-center space-x-2 ${application.value === "PENDING" ? 'text-amber-600' : application.value === "REJECTED" ? "text-red-600" : "text-green-600"} font-custombold`}>
          {application.icon && <application.icon className={`w-4 h-4`}/>}
          <span className="max-w-[500px] truncate">
            {application.label}
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
    accessorKey: "jobStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Status" />
    ),
    cell: ({ row }) => {
      const jobStatus = statuses.find((item) => item.value === row.original.jobStatus)

      if (!jobStatus) return null

      return (
        <div
          className={`flex items-center space-x-2 ${jobStatus.value === "PENDING" ? 'text-amber-600' : jobStatus.value === "REJECTED" ? "text-red-600" : "text-green-600"} font-custombold`}>
          {jobStatus.icon && <jobStatus.icon className={`w-4 h-4`}/>}
          <span className="max-w-[500px] truncate">
            {jobStatus.label}
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
    id: "actions",
    cell: ({ row }) => <CandidatesRowActions row={row} />,
  },
]