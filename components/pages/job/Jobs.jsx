"use client";
import job from "@/components/styles/job.module.css";
import JobsFilter from "@/components/pages/job/Filter";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import JobSearch from "@/components/pages/job/JobSearch";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/JobCard";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import JobsNotFound from "@/components/pages/job/JobsNotFound";
import JobPreview from "@/components/pages/job/JobPreview";
import Loading from "@/components/Loading";
import RssArea from "@/components/pages/job/RssArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

export default function Jobs({ locations }) {
  const sheetRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryIds = searchParams.get("categoryIds");
  const q = searchParams.get("q");

  const [params, setParams] = useState({
    search: q ? q : "",
    page: 1,
    pageSize: 8,
    sortField: "createdAt",
    sortOrder: "desc",
    level: null,
    type: null,
    workModel: null,
    categoryIds: categoryIds ? categoryIds.split(",") : null,
  });

  const [jobDetail, setJobDetail] = useState(null);

  const fetchJobs = async ({ pageParam = 1 }) => {
    const paramsData = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] =
          Array.isArray(value) && value.length > 0 ? value.join(",") : value;
      }
      return acc;
    }, {});

    return await fetch(
      `/api/jobs?${new URLSearchParams({
        ...paramsData,
        page: pageParam,
      })}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    ).then((res) => res.json());
  };

  const {
    data: jobsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["jobs", { params }],
    queryFn: fetchJobs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < params.pageSize) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });

  const handleClickSearch = (e) => {
    const { keyword, location, salary } = e;
    if (keyword.length > 0) {
      router.replace(`/jobs?q=${keyword}`);
    }
    setParams((prev) => ({
      ...prev,
      search: keyword,
      salaryRange: salary,
      location: location,
      page: 1,
    }));
  };

  const handleClickApply = (detail) => {
    setJobDetail(detail);
    sheetRef.current.click();
  };

  const handleChangeSort = (value) => {
    switch (value) {
      case "NEWEST":
        setParams((prev) => ({
          ...prev,
          sortField: "createdAt",
          sortOrder: "desc",
          page: 1,
        }));
        break;
      case "OLDEST":
        setParams((prev) => ({
          ...prev,
          sortField: "createdAt",
          sortOrder: "asc",
          page: 1,
        }));
        break;
      case "HIGHEST_SALARY":
        setParams((prev) => ({
          ...prev,
          sortField: "salaryMax",
          sortOrder: "desc",
          page: 1,
        }));
        break;
      case "LOWEST_SALARY":
        setParams((prev) => ({
          ...prev,
          sortField: "salaryMin",
          sortOrder: "asc",
          page: 1,
        }));
        break;
      default:
        setParams((prev) => ({
          ...prev,
          sortField: "createdAt",
          sortOrder: "desc",
          page: 1,
        }));
        break;
    }
  };

  useEffect(() => {
    const getUserDeviceWidth = () => {
      return window.innerWidth;
    };

    const handleResize = () => {
      const width = getUserDeviceWidth();
      if (width >= 768) {
        setParams((prev) => ({
          ...prev,
          pageSize: 10,
        }));
      }
      if (width > 1024 && width < 1440) {
        setParams((prev) => ({
          ...prev,
          pageSize: 9,
        }));
      }
      if (width >= 1440) {
        setParams((prev) => ({
          ...prev,
          pageSize: 8,
        }));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={job.layout}>
      {/*FILTER SECTION*/}
      <div className={"flex flex-col gap-5"}>
        <JobsFilter setParams={setParams} />
        <RssArea />
      </div>
      {/*CONTENT SECTION*/}
      <div className={"flex flex-col gap-3 w-full"}>
        {/*SEARCH SECTION*/}
        <JobSearch
          handleClickSearch={handleClickSearch}
          locations={locations}
        />
        <div
          className={`${
            !isLoading ? "opacity-100" : "opacity-0"
          } flex items-center justify-between text-base`}
        >
          <p className={"text-xs md:text-base"}>

          </p>
          <div className="flex items-center gap-2 md:gap-5">
            <p className={"text-xs md:text-base w-full"}>Sort by :</p>
            <Select defaultValue={"NEWEST"} onValueChange={handleChangeSort}>
              <SelectTrigger className="w-full whitespace-nowrap gap-3 text-xs md:text-base">
                <SelectValue placeholder="Location" aria-label={"Location"} />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((sort, index) => {
                  return (
                    <SelectItem key={index} value={sort.value}>
                      {sort.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/*LIST OF JOBS SECTION*/}
        <div className={job.jobList}>
          {!isLoading && !isError ? (
            jobsData?.pages.length > 0 ? (
              jobsData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group?.data?.map((job, index) => (
                    <JobCard
                      job={job}
                      buttonText={"Apply"}
                      onHoverEffects={false}
                      actionClick={handleClickApply}
                      key={index}
                    />
                  ))}
                </React.Fragment>
              ))
            ) : (
              <JobsNotFound />
            )
          ) : (
            <Loading />
          )}
        </div>
        {/*PAGINATION SECTION*/}
        {!isLoading && !isError && hasNextPage && (
          <div className={"flex justify-center"}>
            {isFetchingNextPage ? (
              <Loading className={"h-auto my-10"} />
            ) : (
              <Button
                variant="outline"
                className={"text-sm md:text-base my-10"}
                onClick={() => fetchNextPage()}
              >
                Load More
              </Button>
            )}
          </div>
        )}
      </div>
      {/*PREVIEW DETAIL*/}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className={"hidden"}
            ref={sheetRef}
          ></Button>
        </SheetTrigger>
        <JobPreview details={jobDetail} />
      </Sheet>
    </div>
  );
}