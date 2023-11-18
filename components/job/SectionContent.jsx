"use client";
import job from "@/components/job/job.module.css";
import JobCard from "@/components/JobCard";
import {useEffect, useRef, useState} from "react";
import {categories, jobTypes, workSystems} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import FilterSection from "@/components/job/SectionFilter";
import FilterList from "@/components/job/filter/FilterList";
import useToggleFilter from "@/components/job/filter/useToggleFilter";
import {Sheet, SheetTrigger} from "@/components/ui/sheet";
import Detail from "@/components/job/detail/Detail";
import {getJobs} from "@/lib/actions";
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "use-debounce";
import React from "react";

const SectionContent = (props) => {
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
    sortField: 'createdAt',
    sortOrder: 'desc',
    category: null,
    type: null,
    workModel: null,
  });

  const [debounced] = useDebounce(params, 3000);

  const onSearchChange = (value) => {
    setParams({
      ...params,
      search: value,
    });
  };

  let paramsData = debounced
  if (params.search.length < 1) paramsData = params

  paramsData = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== null) { // Only add to acc if the value is not null
      acc[key] = value;
    }
    if (Array.isArray(value) && value.length > 0) { // convert into string
      acc[key] = value.join(',');
    }
    return acc;
  }, {});



  const { data: jobs, error, isLoading } = useQuery({
    queryKey: ['jobs', { paramsData }],
    queryFn: () => getJobs(paramsData),
  });

  const filters = [
    { title: "Category", content: <FilterList data={categories} setParams={setParams} filterFor={"category"} /> },
    { title: "Job Type", content: <FilterList data={jobTypes} setParams={setParams} filterFor={"type"} /> },
    { title: "Work System", content: <FilterList data={workSystems} setParams={setParams} filterFor={"workModel"} /> },
  ]

  const handleClickApply = () => {
    sheetRef.current.click();
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={job.content}>
      <div className={"flex flex-col gap-2"}>
        <div>
          <input type="text" onChange={(e) => onSearchChange(e.target.value)}/>
        </div>
        <div className={"hidden md:flex gap-4 items-center"}>
          <h1 className={"text-sm font-wotfardRegular"}>Filter By</h1>
        </div>
        <div className={job.filterContainer}>
          {filters.map(filter => (
            <FilterSection
              key={filter.title}
              title={filter.title}
              isOpen={isFilterOpen[filter.title.toLowerCase().replace(' ', '')]}
              toggleOpen={() => toggleFilter(filter.title.toLowerCase().replace(' ', ''))}
            >
              {filter.content}
            </FilterSection>
          ))}
        </div>
        <div className={"hidden lg:block"}>
          <Button variant={"destructive"} className={"w-full"}>Reset Filter</Button>
        </div>
      </div>
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-sm text-neutral-400 font-wotfardRegular"}>{jobs?.total} jobs found</h1>
        <div className={job.jobList}>
          {jobs?.data?.map((item, index) => (
            <React.Fragment key={index}>
              <JobCard job={item} buttonText={"Apply"} onHoverEffects={false} actionClick={handleClickApply} loading={isLoading} />
            </React.Fragment>
          ))}
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className={"hidden"} ref={sheetRef}></Button>
        </SheetTrigger>
        <Detail />
      </Sheet>
    </div>
  );
};

export default SectionContent;
