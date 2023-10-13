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
      <SectionHero />
      <SectionFields />
      <SectionJobListing />
      <div className={"absolute w-full bottom-0 right-0 z-[1]"}>
        <Orbit />
      </div>
    </div>
  )
}
