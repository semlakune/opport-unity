"use client";
import job from "@/components/job/job.module.css";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import dummy from "@/components/dummy/job-dummy.json";
import JobCard from "@/components/JobCard";
import {useRef, useState} from "react";
import {Combobox} from "@/components/ui/combobox";
import {Slider} from "@/components/ui/slider";
import {Input} from "@/components/ui/input";
import {categories, jobTypes, workSystems} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import FilterSection from "@/components/job/SectionFilter";
import FilterList from "@/components/job/filter/FilterList";
import useToggleFilter from "@/components/job/filter/useToggleFilter";
import {Sheet, SheetTrigger} from "@/components/ui/sheet";
import Detail from "@/components/job/detail/Detail";

const SectionContent = () => {
  const sheetRef = useRef(null);
  const [isFilterOpen, toggleFilter, collapseOrExpandAll] = useToggleFilter({
    location: true,
    category: true,
    jobType: true,
    salary: false,
    workSystem: false,
  });
  const [sliderValue, setSliderValue] = useState([0, 100]);

  const filters = [
    { title: "Location", content: <Combobox /> },
    { title: "Category", content: <FilterList data={categories} /> },
    { title: "Job Type", content: <FilterList data={jobTypes} /> },
    {
      title: "Salary",
      content: (
        <div className={"flex flex-col gap-5"}>
          <div className={"flex justify-between items-center gap-2"}>
            <Input type={"number"} value={sliderValue[0]} onChange={(e) => setSliderValue((prev) => [e.target.value, prev[1]])} min={1} className={"select-none m-1"} />
            <Separator className={"w-4"} />
            <Input type={"number"} value={sliderValue[1]} onChange={(e) => setSliderValue((prev) => [prev[0], e.target.value])} max={100} className={"select-none m-1"} />
          </div>
          <Slider defaultValue={sliderValue} value={sliderValue} min={0} max={100} step={1} onValueChange={(e) => setSliderValue(e)} minStepsBetweenThumbs={1} />
        </div>
      )
    },
    { title: "Work System", content: <FilterList data={workSystems} /> },
  ]

  const handleClickApply = () => {
    sheetRef.current.click();
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
        <h1 className={"text-sm text-neutral-400 font-wotfardRegular"}>9 jobs found</h1>
        <div className={job.jobList}>
          {dummy.map((item, index) => (
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
