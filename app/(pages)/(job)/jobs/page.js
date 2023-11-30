import Navbar from "@/components/Navbar";
import JobContentSection from "@/components/job/JobContentSection";
import {Suspense} from "react";

export default async function JobsPage() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <JobContentSection />
      </Suspense>
    </div>
  );
}