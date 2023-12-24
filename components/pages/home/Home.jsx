import HomeHero from "@/components/pages/home/HomeHero";
import HomeCategories from "@/components/pages/home/HomeCategories";
import HomeJobListing from "@/components/pages/home/HomeJobListing";
import HomeTestimony from "@/components/pages/home/HomeTestimony";

export default function Home({data, loading: isLoading}) {
  return (
    <>
      <HomeHero categories={data?.categories} />
      <HomeCategories
        categories={data?.categories}
        loading={isLoading}
      />
      <HomeJobListing
        categories={data?.categories}
        jobs={data?.jobs?.data?.slice(0, 9)}
        totalJobs={data?.jobs?.fromTotal}
        loading={isLoading}
      />
      <HomeTestimony />
    </>
  )
}