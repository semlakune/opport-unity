"use client";
import Header from "@/components/Header";
import SectionHero from "@/components/home/SectionHero";
import SectionFields from "@/components/home/SectionFields";
import SectionJobListing from "@/components/home/SectionJobListing";
import SectionTestimony from "@/components/home/SectionTestimony";
import Orbit from "@/components/Orbit";
import Footer from "@/components/Footer";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import {ArrowUpIcon} from "@radix-ui/react-icons";
import {useQuery} from "@tanstack/react-query";
import {getCategories, getJobs} from "@/lib/actions";
export default function Home() {
  const { data: categories, error: errorCategories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  })
  const { data: jobs, error: errorJobs, isLoading: loadingJobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => await getJobs({}),
  });

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
      <SectionHero categories={categories}/>
      <SectionFields categories={categories} loading={loadingCategories} error={errorCategories} />
      <SectionJobListing categories={categories} jobs={jobs} loading={loadingJobs} error={errorJobs}/>
      <SectionTestimony />
      <Footer />
      <div className={"scroll-top"}>
        <ArrowUpIcon className={"inline-block"} />
      </div>
    </div>
  );
}
