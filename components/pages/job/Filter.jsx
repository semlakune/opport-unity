import job from "@/components/styles/job.module.css";
import { Separator } from "@/components/ui/separator";
import FilterList from "@/components/pages/job/FilterList";
import { jobsFilter } from "@/lib/constants";
import RssArea from "@/components/pages/job/RssArea";
import {useState} from "react";

export default function JobsFilter({ setParams }) {
  const [onReset, setOnReset] = useState(false);

  const resetFilter = () => {
    setParams((prev) => ({
      ...prev,
      categoryId: null,
      type: null,
      workModel: null,
    }));

    setOnReset(true);
    setTimeout(() => {
      setOnReset(false);
    }, 1000);
  }
  return (
    <div className={job.filter}>
      {/* RSS Section */}
      <RssArea />
      {/* Filter Section */}
      <div className={"flex justify-between text-black"}>
        <p className={"font-custombold"}>Filter</p>
        <p onClick={resetFilter} className={"text-red-500 font-custombold cursor-pointer"}>Reset</p>
      </div>
      {jobsFilter.map((filter) => {
        return (
          <div
            key={filter.id}
            className={"flex flex-col justify-between items-start gap-5"}
          >
            <Separator />
            <p className={"font-custombold text-black"}>{filter.title}</p>
            <FilterList
              data={filter.data}
              setParams={setParams}
              id={filter.id}
              onReset={onReset}
            />
          </div>
        );
      })}
    </div>
  );
}
