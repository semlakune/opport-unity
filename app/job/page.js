import Header from "@/components/Header";
import SectionHero from "@/components/job/SectionHero";
import SectionContent from "@/components/job/SectionContent";
import { getJobs } from "@/lib/actions";

export default async function Job() {
  const jobs = await getJobs();
  return (
    <div>
      <Header />
      <SectionHero />
      <SectionContent jobs={jobs} />
    </div>
  );
}