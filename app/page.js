"use client";
import Header from "@/components/header";
import SectionHero from "@/components/home/section-hero";
import SectionFields from "@/components/home/section-fields";
import SectionJobListing from "@/components/home/section-job-listing";
import SectionTestimony from "@/components/home/section-testimony";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/pro-solid-svg-icons";
import Orbit from "@/components/orbit";
import Footer from "@/components/footer";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "@/lib/utils";

export default function Home() {
  useIsomorphicLayoutEffect(() => {
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

    return () => {
      window.removeEventListener("scroll", () => {});
      scrollBtn.removeEventListener("click", () => {});
    };
  }, []);
  return (
    <div>
      <Header isLanding={true} />
      <Orbit />
      <SectionHero />
      <SectionFields />
      <SectionJobListing />
      <SectionTestimony />
      <Footer />
      <div className={"scroll-top"}>
        <FontAwesomeIcon icon={faArrowUp} className={"text-sm"} />
      </div>
    </div>
  );
}
