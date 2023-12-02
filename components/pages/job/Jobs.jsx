"use client";
import job from "@/components/styles/job.module.css";
import JobsFilter from "@/components/pages/job/Filter";
import {useQuery} from "@tanstack/react-query";
import {useRef, useState} from "react";
import SearchInput from "@/components/pages/job/SearchInput";
import {Button} from "@/components/ui/button";
import JobCard from "@/components/JobCard";
import {Sheet, SheetTrigger} from "@/components/ui/sheet";
import JobsNotFound from "@/components/pages/job/JobsNotFound";
import JobDetails from "@/components/pages/job/JobDetails";
import Loading from "@/components/Loading";
export default function Jobs() {
  const sheetRef = useRef(null);

  const [search, setSearch] = useState("");
  const [params, setParams] = useState({
    search: "",
    page: 1,
    pageSize: 10,
    sortField: "createdAt",
    sortOrder: "desc",
    level: null,
    type: null,
    workModel: null,
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
    console.log(e)
    const { keyword, location, salary } = e;
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

  return (
    <div className={job.layout}>
      {/*FILTER SECTION*/}
      <JobsFilter setParams={setParams} />
      {/*CONTENT SECTION*/}
      <div className={"flex flex-col gap-3 w-full"}>
        {/*SEARCH SECTION*/}
        <SearchInput handleClickSearch={handleClickSearch} locations={locations} />
        <div className={"flex items-center justify-between text-base"}>
          {!isLoading ? <p>Showing {jobs?.total} Jobs Results</p> : <p>Showing ...</p>}
          <div className="flex items-center gap-5">
            <p>Sort by:</p>
            <Button variant={"outline"}>Newest</Button>
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
            <Loading isLoading={isLoading} />
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
        <JobDetails details={jobDetail} />
      </Sheet>
    </div>
  )
}