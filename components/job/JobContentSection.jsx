"use client";
import job from "@/components/job/job.module.css";
import JobCard from "@/components/JobCard";
import React, { useEffect, useRef, useState } from "react";
import {jobType, workModel} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import FilterSection from "@/components/job/JobFilterSection";
import FilterList from "@/components/job/filter/FilterList";
import useToggleFilter from "@/components/job/filter/useToggleFilter";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Detail from "@/components/job/detail/Detail";
import {getCategories} from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import SearchInput from "@/components/job/search/SearchInput";
import {Skeleton} from "@/components/ui/skeleton";

const JobContentSection = (props) => {
  const sheetRef = useRef(null);
  const [jobDetail, setJobDetail] = useState(null);
  const [isFilterOpen, toggleFilter] = useToggleFilter({
    category: true,
    type: true,
    workModel: false,
  });

  const [params, setParams] = useState({
    search: "",
    page: 1,
    pageSize: 10,
    sortField: "createdAt",
    sortOrder: "desc",
    categoryId: null,
    type: null,
    workModel: null,
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const onSearchChange = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    if (search === "") {
      setParams((prev) => ({
        ...prev,
        search: "",
        page: 1,
      }));
    } else {
      setParams((prev) => ({
        ...prev,
        search: debouncedSearch,
        page: 1,
      }));
    }
  }, [search, debouncedSearch]);
  const {
    data: jobs,
    error,
    isLoading,
  } = useQuery({
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

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getCategories();
    },
  });

  const filters = [
    {
      title: "Category",
      content: (
        <FilterList
          data={!categoriesLoading && categories?.map((category) => ({
            value: category.id,
            name: category.name,
          }))}
          setParams={setParams}
          filterFor={"categoryId"}
        />
      ),
    },
    {
      title: "Job Type",
      content: (
        <FilterList data={jobType} setParams={setParams} filterFor={"type"} />
      ),
    },
    {
      title: "Work Model",
      content: (
        <FilterList
          data={workModel}
          setParams={setParams}
          filterFor={"workModel"}
        />
      ),
    },
  ];

  const handleClickApply = (detail) => {
    setJobDetail(detail)
    sheetRef.current.click();
  };

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={job.content}>
      <div className={"flex items-center md:items-start flex-col gap-2 w-full md:w-auto"}>
        <SearchInput onSearchChange={onSearchChange} />
        <div className={job.filterContainer}>
          {!categoriesLoading ? filters.map((filter) => (
            <FilterSection
              key={filter.title}
              title={filter.title}
              isOpen={isFilterOpen[filter.title.toLowerCase().replace(" ", "")]}
              toggleOpen={() =>
                toggleFilter(filter.title.toLowerCase().replace(" ", ""))
              }
            >
              {filter.content}
            </FilterSection>
          )) : (
            <div className={"space-y-2"}>
              <Skeleton className={"h-10"} />
              <Skeleton className={"h-10"} />
              <Skeleton className={"h-10"} />
              <Skeleton className={"h-10"} />
              <Skeleton className={"h-10"} />
            </div>
          )}
        </div>
        {/*<div className={"hidden lg:block w-full"}>*/}
        {/*  <Button variant={"destructive"} className={"w-full"}>*/}
        {/*    Reset Filter*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
      <div className={"flex flex-col gap-2"}>
        <div className={job.jobList}>
          {!isLoading && !error ? (
            jobs?.data?.map((item, index) => (
              <React.Fragment key={index}>
                <JobCard
                  job={item}
                  buttonText={"Apply"}
                  onHoverEffects={false}
                  actionClick={handleClickApply}
                />
              </React.Fragment>
            ))
          ) : (
            <>
              <Skeleton className={"h-[20rem] w-[18rem] md:w-[20rem] lg:w-[19rem] xl:w-[20rem]"} />
              <Skeleton className={"h-[20rem] w-[18rem] md:w-[20rem] lg:w-[19rem] xl:w-[20rem]"} />
              <Skeleton className={"h-[20rem] w-[18rem] md:w-[20rem] lg:w-[19rem] xl:w-[20rem]"} />
            </>
          )}
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className={"hidden"}
            ref={sheetRef}
          ></Button>
        </SheetTrigger>
        <Detail details={jobDetail} />
      </Sheet>
    </div>
  );
};

export default JobContentSection;
