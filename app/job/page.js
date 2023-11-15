import Header from "@/components/Header";
import SectionHero from "@/components/job/SectionHero";
import SectionContent from "@/components/job/SectionContent";

export default async function Job() {
  return (
    <div>
      <Header />
      <SectionHero />
      <SectionContent />
    </div>
  );
}