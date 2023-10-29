"use client";
import job from "@/components/job/job.module.css";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import dummy from "@/components/dummy/job-dummy.json";
import JobCardSecondary from "@/components/JobCardSecondary";
import { useState } from "react";

const SectionContent = () => {
  const [isFilterOpen, setIsFilterOpen] = useState({
    category: true,
    location: false,
    jobType: false,
    salary: false,
  });
  return (
    <div className={job.content}>
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-sm"}>Filter By</h1>
        <div className={job.filterContainer}>
          <div
            className={"flex justify-between w-full items-center"}
            onClick={() =>
              setIsFilterOpen({
                ...isFilterOpen,
                category: !isFilterOpen.category,
              })
            }
          >
            <h1 className={"text-sm font-wotfardRegular"}>Category</h1>
            {isFilterOpen.category ? (
              <MinusCircledIcon className={"cursor-pointer"} />
            ) : (
              <PlusCircledIcon className={"cursor-pointer"} />
            )}
          </div>
          {isFilterOpen.category && <div className={"h-20"}>category</div>}
          <Separator />
          <div
            className={"flex justify-between w-full items-center"}
            onClick={() =>
              setIsFilterOpen({
                ...isFilterOpen,
                location: !isFilterOpen.location,
              })
            }
          >
            <h1 className={"text-sm font-wotfardRegular"}>Location</h1>
            {isFilterOpen.location ? (
              <MinusCircledIcon className={"cursor-pointer"} />
            ) : (
              <PlusCircledIcon className={"cursor-pointer"} />
            )}
          </div>
          {isFilterOpen.location && <div className={"h-20"}>location</div>}
          <Separator />
          <div
            className={"flex justify-between w-full items-center"}
            onClick={() =>
              setIsFilterOpen({
                ...isFilterOpen,
                jobType: !isFilterOpen.jobType,
              })
            }
          >
            <h1 className={"text-sm font-wotfardRegular"}>Job Type</h1>
            {isFilterOpen.jobType ? (
              <MinusCircledIcon className={"cursor-pointer"} />
            ) : (
              <PlusCircledIcon className={"cursor-pointer"} />
            )}
          </div>
          {isFilterOpen.jobType && <div className={"h-20"}>jobType</div>}
          <Separator />
          <div
            className={"flex justify-between w-full items-center"}
            onClick={() =>
              setIsFilterOpen({
                ...isFilterOpen,
                salary: !isFilterOpen.salary,
              })
            }
          >
            <h1 className={"text-sm font-wotfardRegular"}>Salary</h1>
            {isFilterOpen.salary ? (
              <MinusCircledIcon className={"cursor-pointer"} />
            ) : (
              <PlusCircledIcon className={"cursor-pointer"} />
            )}
          </div>
          {isFilterOpen.salary && <div className={"h-20"}>salary</div>}
          <Separator />
        </div>
      </div>
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-sm text-neutral-400 font-wotfardRegular"}>
          9 jobs found
        </h1>
        <div className={job.jobList}>
          {dummy.map((item, index) => {
            return (
              <div key={index} className={"basis-[320px]"}>
                <JobCardSecondary job={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
