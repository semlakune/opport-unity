import Navbar from "@/components/Navbar";
import JobTopSection from "@/components/job/JobTopSection";
import JobContentSection from "@/components/job/JobContentSection";
import {Suspense} from "react";

export default async function JobsPage() {
  return (
    <div>
      <Navbar />
      <JobTopSection />
      <Suspense fallback={<div>Loading...</div>}>
        <JobContentSection />
      </Suspense>
    </div>
  );
}