"use client"
import Header from "@/components/header";
import SectionHero from "@/components/home-page/section-hero";
import SectionFields from "@/components/home-page/section-fields";
import SectionJobListing from "@/components/home-page/section-job-listing";
import Orbit from "@/lib/orbit";
import SectionTestimony from "@/components/home-page/section-testimony";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/pro-solid-svg-icons";
import {useEffect} from "react";

export default function Home() {
  useEffect(() => {
    const scrollBtn = document.querySelector(".scroll-top");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollBtn.style.opacity = "1";
      } else {
        scrollBtn.style.opacity = "0";
      }
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, []);
  return (
    <div>
      {/*<SlidingBox />*/}
      <Header isLanding={true} />
      <Orbit />
      <SectionHero />
      <SectionFields />
      <SectionJobListing />
      <SectionTestimony />
      <div className={"scroll-top"}>
        <FontAwesomeIcon icon={faArrowUp} className={"text-sm"} />
      </div>
    </div>
  )
}
