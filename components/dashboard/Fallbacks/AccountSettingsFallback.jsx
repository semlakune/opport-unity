import {Skeleton} from "@/components/ui/skeleton";

export default function AccountSettingsFallback() {
  return (
    <div className={"mt-5 space-y-6"}>
      {[...Array(3)].map((_, i) => (
        <div className={"flex flex-col gap-2"} key={i}>
          <Skeleton className={"w-28 h-4"} />
          <Skeleton className={"w-full h-9"} />
        </div>
      ))}
      <Skeleton className={"w-36 h-9"} />
    </div>
  )
}