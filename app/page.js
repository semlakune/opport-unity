"use client"
import Header from "@/components/header";
import SectionHero from "@/components/home-page/section-hero";
import SectionFields from "@/components/home-page/section-fields";
import SectionJobListing from "@/components/home-page/section-job-listing";
import SectionTestimony from "@/components/home-page/section-testimony";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/pro-solid-svg-icons";
import {useEffect} from "react";
import Orbit from "@/components/orbit";
import Footer from "@/components/footer";
import gsap from "gsap";

export default function Home() {
  useEffect(() => {
    const scrollBtn = document.querySelector(".scroll-top");

    const tl = gsap.timeline();

    tl.from(".preloader .text-container h1", {
      y: 0,
      skewY: 0,
      stagger: 0.2,
      ease: 'power3.inOut'
    })
      .to(".preloader .text-container h1", {
        duration: 1,
        y: 70,
        skewY: -20,
        stagger: 0.2,
        ease: 'power3.inOut'
      })
      .to(".preloader", {
        duration: 1,
        height: "0vh",
        ease: 'power3.inOut'
      })
      .to(
        "body",
        {
          overflow: "auto"
        },
        "-=2"
      )
      .to(".preloader", {
        display: "none"
      });

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
    }
  }, []);
  return (
    <div>
      <Header />
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
  )
}
