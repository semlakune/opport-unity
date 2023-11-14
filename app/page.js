"use client";
import Header from "@/components/Header";
import SectionHero from "@/components/home/SectionHero";
import SectionFields from "@/components/home/SectionFields";
import SectionJobListing from "@/components/home/SectionJobListing";
import SectionTestimony from "@/components/home/SectionTestimony";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/pro-solid-svg-icons";
import Orbit from "@/components/Orbit";
import Footer from "@/components/Footer";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export default function Home() {

  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);

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
