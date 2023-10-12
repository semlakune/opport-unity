
import Header from "@/components/header";
import SectionHero from "@/components/home-page/section-hero";
import SectionFields from "@/components/home-page/section-fields";
import SectionJobListing from "@/components/home-page/section-job-listing";


export default function Home() {

  return (
    <div>
      <Header isLanding={true} />
      <SectionHero />
      <SectionFields />
      <SectionJobListing />
    </div>
  )
}
