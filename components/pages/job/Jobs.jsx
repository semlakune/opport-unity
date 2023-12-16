"use client";
import job from "@/components/styles/job.module.css";
import JobsFilter from "@/components/pages/job/Filter";
import {useQuery} from "@tanstack/react-query";
import React, {useRef, useState} from "react";
import JobSearch from "@/components/pages/job/JobSearch";
import {Button} from "@/components/ui/button";
import JobCard from "@/components/JobCard";
import {Sheet, SheetTrigger} from "@/components/ui/sheet";
import JobsNotFound from "@/components/pages/job/JobsNotFound";
import JobPreview from "@/components/pages/job/JobPreview";
import Loading from "@/components/Loading";
import RssArea from "@/components/pages/job/RssArea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {sortOptions} from "@/lib/constants";
import {useRouter, useSearchParams} from "next/navigation";
export default function Jobs() {
  const sheetRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryIds = searchParams.get("categoryIds");
  const q = searchParams.get("q");

  const [params, setParams] = useState({
    search: q ? q : "",
    page: 1,
    pageSize: 10,
    sortField: "createdAt",
    sortOrder: "desc",
    level: null,
    type: null,
    workModel: null,
    categoryIds: categoryIds ? categoryIds.split(",") : null,
  });

  const [jobDetail, setJobDetail] = useState(null);

  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["jobs", { params }],
    queryFn: async () => {
      const paramsData = Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== null) {
          acc[key] = Array.isArray(value) && value.length > 0 ? value.join(',') : value;
        }
        return acc;
      }, {});

      return await fetch(`/api/jobs?${new URLSearchParams(paramsData)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.json());
    },
  });

  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            country: "Indonesia"
          })
        })

      const locations = await response.json();

      return locations.data.states.map((state) => {
        return {
          label: state.name,
          value: `${state.name}, Indonesia`
        }
      })
    },
  })

  const handleClickSearch = (e) => {
    const { keyword, location, salary } = e;
    if (keyword.length > 0) {
      router.replace(`/jobs?q=${keyword}`)
    }
    setParams((prev) => ({
      ...prev,
      search: keyword,
      salaryRange: salary,
      location: location,
      page: 1,
    }));
  }

  const handleClickApply = (detail) => {
    setJobDetail(detail)
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
  }

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
        <JobSearch handleClickSearch={handleClickSearch} locations={locations} />
        <div className={`${!isLoading ? 'opacity-100' : 'opacity-0'} flex items-center justify-between text-base`}>
          <p className={"text-xs md:text-base"}>Showing {jobs?.total} Jobs Results</p>
          <div className="flex items-center gap-2 md:gap-5">

            <p className={"text-xs md:text-base w-full"}>Sort by :</p>
            {/*<Button variant={"outline"}>Newest</Button>*/}
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
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/*LIST OF JOBS SECTION*/}
        <div className={job.jobList}>
          {!isLoading && !isError ? jobs?.total > 0 ? (
            jobs?.data?.map((item, index) => (
              <JobCard
                job={item}
                buttonText={"Apply"}
                onHoverEffects={false}
                actionClick={handleClickApply}
                key={index}
              />
            ))
          ) : (
            <JobsNotFound />
          ) : (
            <Loading />
          )}
        </div>
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
  )
}