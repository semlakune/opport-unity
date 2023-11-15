"use client";
import Header from "@/components/Header";
import SectionHero from "@/components/home/SectionHero";
import SectionFields from "@/components/home/SectionFields";
import SectionJobListing from "@/components/home/SectionJobListing";
import SectionTestimony from "@/components/home/SectionTestimony";
import Orbit from "@/components/Orbit";
import Footer from "@/components/Footer";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import {getProfile} from "@/lib/actions";
import {useSession} from "next-auth/react";
import {ArrowUpIcon} from "@radix-ui/react-icons";
import {useEffect} from "react";

export default function Home() {
  const { data, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      getProfile(data?.user?.username).then((res) => {
        console.log(res, "<<");
      })
    }
  }, []);

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
        <ArrowUpIcon className={"inline-block"} />
      </div>
    </div>
  );
}
