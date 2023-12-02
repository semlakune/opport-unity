export default function JobsNotFound() {
  return (
    <div className={"col-span-full"}>
      <div className={"flex flex-col items-center justify-center gap-2 h-96"}>
        <p className={"text-2xl font-custombold"}>No Jobs Found</p>
        <p className={"text-sm text-muted-foreground text-center"}>
          We couldn&lsquo;t find any jobs that match your search.
        </p>
      </div>
    </div>
  )
}