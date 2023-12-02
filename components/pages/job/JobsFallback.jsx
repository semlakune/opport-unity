import job from "@/components/styles/job.module.css";
import {Skeleton} from "@/components/ui/skeleton";

export default function JobsFallback() {
  return (
    <div className={job.layout}>
      <Skeleton />
      <div className={"flex flex-col gap-5"}>
        <Skeleton className={"h-20"} />
        <Skeleton className={"h-20"} />
        <Skeleton className={"h-full"} />
      </div>
    </div>
  )
}