"use client";
import job from "@/components/job/job.module.css";
import JobCard from "@/components/JobCard";
import React, { useEffect, useRef, useState } from "react";
import { categories, jobTypes, workSystems } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import FilterSection from "@/components/job/JobFilterSection";
import FilterList from "@/components/job/filter/FilterList";
import useToggleFilter from "@/components/job/filter/useToggleFilter";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Detail from "@/components/job/detail/Detail";
import { getJobs } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import JobCardLoading from "@/components/JobCardLoading";
import SearchInput from "@/components/job/search/SearchInput";

const JobContentSection = (props) => {
  const sheetRef = useRef(null);
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
    category: null,
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

      return await getJobs(paramsData);
    },
  });

  const filters = [
    {
      title: "Category",
      content: (
        <FilterList
          data={categories}
          setParams={setParams}
          filterFor={"category"}
        />
      ),
    },
    {
      title: "Job Type",
      content: (
        <FilterList data={jobTypes} setParams={setParams} filterFor={"type"} />
      ),
    },
    {
      title: "Work System",
      content: (
        <FilterList
          data={workSystems}
          setParams={setParams}
          filterFor={"workModel"}
        />
      ),
    },
  ];

  const handleClickApply = () => {
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
          {filters.map((filter) => (
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
          ))}
        </div>
        <div className={"hidden lg:block"}>
          <Button variant={"destructive"} className={"w-full"}>
            Reset Filter
          </Button>
        </div>
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
            <div className={"w-full"}>
              <div className={"w-52"}>
                <JobCardLoading loadingCount={1} />
              </div>
            </div>
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
        <Detail />
      </Sheet>
    </div>
  );
};

export default JobContentSection;
