import JobDetails from "@/components/pages/job/JobDetails";
import {Suspense} from "react";
import Loading from "@/components/Loading";

export default function DetailJob({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <JobDetails id={params.id} />
    </Suspense>
  );
}