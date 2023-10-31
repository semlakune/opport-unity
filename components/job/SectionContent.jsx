"use client";
import job from "@/components/job/job.module.css";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import dummy from "@/components/dummy/job-dummy.json";
import JobCard from "@/components/JobCard";
import {useEffect, useRef, useState} from "react";
import { Checkbox } from "@/components/ui/checkbox"
import {Combobox} from "@/components/ui/combobox";
import {Slider} from "@/components/ui/slider";
import {Input} from "@/components/ui/input";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {categories, jobTypes, workSystems} from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const FilterList = ({ data }) => (
  <div className={"h-full flex flex-col gap-0"}>
    {data.map((item, index) => (
      <label htmlFor={item.value} key={index} className={"flex items-center justify-between gap-2 hover:bg-secondary py-2 px-3 rounded-full cursor-pointer select-none"}>
        <div className={"flex items-center gap-2"}>
          <Checkbox id={item.value} />
          <p>{item.name}</p>
        </div>
        <p className={"flex items-center justify-center text-sm font-wotfardRegular bg-primary text-white h-6 w-6 rounded-full"}>{item.count}</p>
      </label>
    ))}
  </div>
);

const useToggleFilter = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleFilter = (filterName) => {
    setIsOpen(prevState => ({ ...prevState, [filterName]: !prevState[filterName] }));
  };

  const collapseOrExpandAll = () => {
    const allOpen = Object.values(isOpen).every(value => value);
    setIsOpen(state => {
      const newState = {};
      for (let key in state) {
        newState[key] = !allOpen;
      }
      return newState;
    });
  };

  return [isOpen, toggleFilter, collapseOrExpandAll];
};

const FilterSection = ({ title, isOpen, toggleOpen, children }) => {
  const contentRef = useRef(null);

  const getDynamicHeight = (element) => {
    const currentDisplay = element.style.display;
    element.style.display = 'block';
    const height = element.scrollHeight;
    element.style.display = currentDisplay;
    return height;
  };

  useEffect(() => {
    const content = contentRef.current;

    if (isOpen) {
      const animation = gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height: getDynamicHeight(content), opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      ScrollTrigger.refresh();
    } else {
      gsap.fromTo(
        content,
        { height: getDynamicHeight(content), opacity: 1 },
        { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }
      );
    }
  }, [isOpen]);

  return (
    <>
      <div className={"flex justify-between w-full items-center"} onClick={toggleOpen}>
        <h1 className={"text-sm font-wotfardRegular"}>{title}</h1>
        {isOpen ? (
          <MinusCircledIcon className={"cursor-pointer"} />
        ) : (
          <PlusCircledIcon className={"cursor-pointer"} />
        )}
      </div>
      <div ref={contentRef} className="overflow-hidden">
        {children}
      </div>
      <Separator />
    </>
  );
};

const SectionContent = () => {
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
      </div>

      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-sm text-neutral-400 font-wotfardRegular"}>9 jobs found</h1>
        <div className={job.jobList}>
          {dummy.map((item, index) => (
            <div key={index} className={"basis-[315px]"}>
              <JobCard job={item} buttonText={"Apply"} onHoverEffects={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
