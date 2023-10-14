"use client"
import Header from "@/components/header";
import SectionHero from "@/components/home-page/section-hero";
import SectionFields from "@/components/home-page/section-fields";
import SectionJobListing from "@/components/home-page/section-job-listing";
import Orbit from "@/lib/orbit";

export default function Home() {

  return (
    <div>
      <Header isLanding={true} />
      <Orbit />
      <SectionHero />
      <SectionFields />
      <SectionJobListing />
    </div>
  )
}
