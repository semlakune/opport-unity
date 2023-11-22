import {Skeleton} from "@/components/ui/skeleton";

export default function JobCardLoading({ loadingCount = 3 }) {
  return (
    <>
      {[...Array(loadingCount)].map((_, index) => (
        <div key={index} className={"max-h-80"}>
          <Skeleton className={"rounded-[22px] h-80 m-5"} />
        </div>
      ))}
    </>
  )
}