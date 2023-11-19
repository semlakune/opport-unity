import {Card} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function JobCardLoading({ loadingCount = 3 }) {
  return (
    <div className={"flex justify-between flex-grow basis-60 md:basis-56 w-full"}>
      {[...Array(loadingCount)].map((_, index) => (
        <div key={index} className={"overflow-hidden max-h-80"}>
          <Card className={"p-1 rounded-[22px] w-64 md:w-72 h-80 text-sm"}>
            <Skeleton className={"w-full h-full"} />
          </Card>
        </div>
      ))}
    </div>
  )
}