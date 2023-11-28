import {Skeleton} from "@/components/ui/skeleton";

export default function MyJobsFallback() {
  return (
    <div className={"space-y-4 mt-5"}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-56" />
        <div className={"flex gap-2"}>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
      <Skeleton className="h-48" />
      <div className="flex items-center justify-between px-2">
        <div className="flex-1">
          <Skeleton className={"h-5 w-36"} />
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Skeleton className={"h-5 w-24"} />
          <Skeleton className={"h-5 w-24"} />
          <Skeleton className={"h-5 w-24"} />
        </div>
      </div>
    </div>
  )
}