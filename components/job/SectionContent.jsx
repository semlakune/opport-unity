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
import {
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter
} from "@fortawesome/pro-duotone-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

gsap.registerPlugin(ScrollTrigger);

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
  const categories = [
    {
      name: "Development",
      value: "development",
      count: 3,
    },
    {
      name: "Data",
      value: "data",
      count: 2,
    },
    {
      name: "Accounting",
      value: "accounting",
      count: 1,
    },
    {
      name: "Design",
      value: "design",
      count: 4,
    },
    {
      name: "Marketing",
      value: "marketing",
      count: 5,
    },
    {
      name: "Writer",
      value: "writer",
      count: 6,
    },
    {
      name: "Product",
      value: "product",
      count: 7,
    },
  ]
  const jobTypes = [
    {
      name: "Full Time",
      value: "full-time",
      count: 3,
    },
    {
      name: "Part Time",
      value: "part-time",
      count: 2,
    },
    {
      name: "Freelance",
      value: "freelance",
      count: 1,
    },
    {
      name: "Internship",
      value: "internship",
      count: 4,
    },
    {
      name: "Temporary",
      value: "temporary",
      count: 5,
    },
  ]
  const workSystems = [
    {
      name: "Remote",
      value: "remote",
      count: 3,
    },
    {
      name: "On Site",
      value: "on-site",
      count: 2,
    },
    {
      name: "Hybrid",
      value: "hybrid",
      count: 1,
    },
  ]

  const [isFilterOpen, setIsFilterOpen] = useState({
    location: true,
    category: true,
    jobType: true,
    salary: true,
    workSystem: true,
  });
  const [sliderValue, setSliderValue] = useState([33, 67]);

  const toggleFilter = (filterName) => {
    setIsFilterOpen(prevState => ({ ...prevState, [filterName]: !prevState[filterName] }));
  };

  const collapseOrExpanAll = () => {
    if (Object.values(isFilterOpen).includes(true)) {
      setIsFilterOpen({
        location: false,
        category: false,
        jobType: false,
        salary: false,
        workSystem: false,
      });
    } else {
      setIsFilterOpen({
        location: true,
        category: true,
        jobType: true,
        salary: true,
        workSystem: true,
      });
    }
  }

  return (
    <div className={job.content}>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-sm font-wotfardRegular"}>Filter By</h1>
          <div className={"text-xs font-wotfardRegular cursor-pointer bg-primary text-white p-1 rounded-full"} onClick={collapseOrExpanAll}>{Object.values(isFilterOpen).includes(true) ? (
            <PlusCircledIcon className={"cursor-pointer"} />
          ) : (
            <MinusCircledIcon className={"cursor-pointer"} />
          )}</div>
        </div>
        <div className={job.filterContainer}>
          <FilterSection title="Location" isOpen={isFilterOpen.location} toggleOpen={() => toggleFilter('location')}>
            <div className={"h-full flex flex-col select-none"}>
              <Combobox />
            </div>
          </FilterSection>

          <FilterSection title="Category" isOpen={isFilterOpen.category} toggleOpen={() => toggleFilter('category')}>
            <div className={"h-full flex flex-col gap-0"}>
              {categories.map((category, index) => (
                <label htmlFor={category.value} key={index} className={"flex items-center justify-between gap-2 hover:bg-primary py-2 px-3 rounded-full cursor-pointer select-none"}>
                  <div className={"flex items-center gap-2"}>
                    <Checkbox id={category.value} className={"border-white"} />
                    <p>{category.name}</p>
                  </div>
                  <p className={"flex items-center justify-center text-sm font-wotfardRegular bg-white h-6 w-6 rounded-full text-primary"}>{category.count}</p>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Job Type" isOpen={isFilterOpen.jobType} toggleOpen={() => toggleFilter('jobType')}>
            <div className={"h-full flex flex-col gap-0"}>
              {jobTypes.map((type, index) => (
                <label htmlFor={type.value} key={index} className={"flex items-center justify-between gap-2 hover:bg-primary py-2 px-3 rounded-full cursor-pointer select-none"}>
                  <div className={"flex items-center gap-2"}>
                    <Checkbox id={type.value} className={"border-white"} />
                    <p>{type.name}</p>
                  </div>
                  <p className={"flex items-center justify-center text-sm font-wotfardRegular bg-white h-6 w-6 rounded-full text-primary"}>{type.count}</p>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Salary" isOpen={isFilterOpen.salary} toggleOpen={() => toggleFilter('salary')}>
            <div className={"flex flex-col gap-5"}>
              <div className={"flex justify-between items-center gap-4"}>
                <Input type={"number"} value={sliderValue[0]} onChange={(e) => setSliderValue((prev) => [e.target.value, prev[1]])} min={1} className={"select-none"} />
                <Separator className={"w-4"} />
                <Input type={"number"} value={sliderValue[1]} onChange={(e) => setSliderValue((prev) => [prev[0], e.target.value])} max={100} className={"select-none"} />
              </div>
              <Slider defaultValue={sliderValue} value={sliderValue} onValueChange={(e) => setSliderValue(e)} minStepsBetweenThumbs={1} />
            </div>
          </FilterSection>

          <FilterSection title="Work System" isOpen={isFilterOpen.workSystem} toggleOpen={() => toggleFilter('workSystem')}>
            <div className={"h-full flex flex-col gap-0"}>
              {workSystems.map((work, index) => (
                <label htmlFor={work.value} key={index} className={"flex items-center justify-between gap-2 hover:bg-primary py-2 px-3 rounded-full cursor-pointer select-none"}>
                  <div className={"flex items-center gap-2"}>
                    <Checkbox id={work.value} className={"border-white"} />
                    <p>{work.name}</p>
                  </div>
                  <p className={"flex items-center justify-center text-sm font-wotfardRegular bg-white h-6 w-6 rounded-full text-primary"}>{work.count}</p>
                </label>
              ))}
            </div>
          </FilterSection>
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
