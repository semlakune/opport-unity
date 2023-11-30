"use client";
import Preloader from "@/components/Preloader";
import HomeHero from "@/components/home/HomeHero";
import HomeCategories from "@/components/home/HomeCategories";
import HomeJobListing from "@/components/home/HomeJobListing";
import HomeTestimony from "@/components/home/HomeTestimony";
import {useQuery} from "@tanstack/react-query";
import {getCategories} from "@/lib/actions";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", "categories"],
    queryFn: async () => {
      const categories = await getCategories();
      const jobs = await fetch("/api/jobs").then((res) => res.json());
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