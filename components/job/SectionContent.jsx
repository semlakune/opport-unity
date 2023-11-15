"use client";
import job from "@/components/job/job.module.css";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
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
import { create } from 'zustand'

const useJobs = create(set => ({
  jobs: null,
  setJobs: (jobs) => set({ jobs }),
}))

const SectionContent = (props) => {
  const { jobs, setJobs } = useJobs()

  const sheetRef = useRef(null);
  const [isFilterOpen, toggleFilter, collapseOrExpandAll] = useToggleFilter({
    category: true,
    jobType: true,
    workSystem: false,
  });
  const [filter, setFilter] = useState({
    category: null,
    jobType: null,
    workSystem: null,
  });
  const [params, setParams] = useState({
    search: '',
    page: 1,
    pageSize: 5,
    sortField: 'createdAt',
    sortOrder: 'desc',
    ...filter,
  });
  console.log(params)
  console.log(filter)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetFilters = async () => {
    setFilter({
      category: null,
      jobType: null,
      workSystem: null,
    });
  };

  const filters = [
    { title: "Category", content: <FilterList data={categories} setFilter={setFilter} /> },
    { title: "Job Type", content: <FilterList data={jobTypes} setFilter={setFilter} /> },
    { title: "Work System", content: <FilterList data={workSystems} setFilter={setFilter} /> },
  ]

  const handleClickApply = () => {
    sheetRef.current.click();
  }

  const loadJobs = async () => {
    try {
      setLoading(true);
      const fetchedJobs = await getJobs(params);
      if (fetchedJobs && fetchedJobs.data) {
        setJobs(fetchedJobs);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(filter)
    loadJobs();
  }, [filter, params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={job.content}>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex gap-4 items-center"}>
          <h1 className={"text-sm font-wotfardRegular"}>Filter By</h1>
          <div className={"text-xs font-wotfardRegular cursor-pointer"} onClick={collapseOrExpandAll}>{Object.values(isFilterOpen).every(val => val === true) ? (
            <MinusCircledIcon className={"cursor-pointer"} />
          ) : (
            <PlusCircledIcon className={"cursor-pointer"} />
          )}</div>
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
        <div>
          <Button variant={"destructive"} className={"w-full"}>Reset Filter</Button>
        </div>
      </div>

      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-sm text-neutral-400 font-wotfardRegular"}>{jobs?.total} jobs found</h1>
        <div className={job.jobList}>
          {jobs?.data?.map((item, index) => (
            <div key={index} className={"basis-[315px]"}>
              <JobCard job={item} buttonText={"Apply"} onHoverEffects={false} actionClick={handleClickApply} />
            </div>
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
