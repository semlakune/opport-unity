"use client";
import Preloader from "@/components/Preloader";
import HomeHero from "@/components/pages/home/HomeHero";
import HomeCategories from "@/components/pages/home/HomeCategories";
import HomeJobListing from "@/components/pages/home/HomeJobListing";
import HomeTestimony from "@/components/pages/home/HomeTestimony";
import {useQuery} from "@tanstack/react-query";
import {getCategories, getJobs} from "@/lib/actions";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", "categories"],
    queryFn: async () => {
      const categories = await getCategories();
      const jobs = await getJobs();
      return { categories, jobs };
    },
  })

  return (
    <>
      <Preloader loading={isLoading} />
      <HomeHero categories={data?.categories} />
      <HomeCategories
        categories={data?.categories}
        loading={isLoading}
        error={error}
      />
      <HomeJobListing
        categories={data?.categories}
        jobs={data?.jobs?.data?.slice(0, 9)}
        totalJobs={data?.jobs?.total}
        loading={isLoading}
        error={error}
      />
      <HomeTestimony />
    </>
  )
}