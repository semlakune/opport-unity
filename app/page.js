"use client";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import HomeCategories from "@/components/home/HomeCategories";
import HomeJobListing from "@/components/home/HomeJobListing";
import HomeTestimony from "@/components/home/HomeTestimony";
import Orbit from "@/components/Orbit";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getJobs } from "@/lib/actions";
import Preloader from "@/components/Preloader";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", "categories"],
    queryFn: async () => {
      const categories = await getCategories();
      const jobs = await getJobs({});
      return { categories, jobs };
    },
  })

  return (
    <div>
      <Preloader loading={isLoading} />
      <Navbar isLanding={true} />
      <Orbit />
      <HomeHero categories={data?.categories} />
      <HomeCategories
        categories={data?.categories}
        loading={isLoading}
        error={error}
      />
      <HomeJobListing
        categories={data?.categories}
        jobs={data?.jobs}
        loading={isLoading}
        error={error}
      />
      <HomeTestimony />
      <Footer />
    </div>
  );
}
