import {Skeleton} from "@/components/ui/skeleton";

export default function ProfileFallback() {
  return (
    <div className={"mt-5 space-y-6"}>
      <div className={"flex gap-2 items-center"}>
        <Skeleton className={"h-10 w-10 rounded-full"} />
        <Skeleton className={"h-9 w-32"} />
        <Skeleton className={"h-9 w-32"} />
      </div>
      <div className={"flex flex-col gap-2"}>
        <Skeleton className={"h-4 w-28"} />
        <Skeleton className={"h-9 w-full"}/>
      </div>
      <Skeleton className={"h-9 w-44"}/>
    </div>
  )
}