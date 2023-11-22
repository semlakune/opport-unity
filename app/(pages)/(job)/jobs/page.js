import Navbar from "@/components/Navbar";
import JobTopSection from "@/components/job/JobTopSection";
import JobContentSection from "@/components/job/JobContentSection";

export default async function Job() {
  return (
    <div>
      <Navbar />
      <JobTopSection />
      <JobContentSection />
    </div>
  );
}