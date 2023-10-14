"use client";
import styles from "@/components/styles.module.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "@/components/job-card";
import { Card } from "@/components/ui/card";
import dummy from "./dummy/job-dummy.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUpRight } from "@fortawesome/pro-thin-svg-icons";
import {useState} from "react";
import {Button} from "@/components/ui/button";

const SectionJobListing = () => {
  const tabs = [
    {
      name: "All Categories",
      value: "all",
    },
    {
      name: "Development",
      value: "development",
    },
    {
      name: "Data",
      value: "data",
    },
    {
      name: "Accounting",
      value: "accounting",
    },
    {
      name: "Design",
      value: "design",
    }
  ];

  const [isLastCardHovered, setIsLastCardHovered] = useState(false);

  return (
    <section className={styles.jobListing}>
      <div className="container">
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-3xl"}>New Job Listing.</h1>
          <Tabs defaultValue="all">
            <TabsList className={"text-primary"}>
              {tabs.map((tab, index) => (
                <TabsTrigger key={index} value={tab.value} className={"data-[state=active]:bg-primary data-[state=active]:text-white"}>
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className={"flex flex-wrap gap-6 items-center pt-10"}>
          {dummy.slice(0, 9).map((job, index) => {
            return (
              <div key={index} className={"flex-grow basis-60 md:basis-56"}>
                <JobCard job={job} />
              </div>
            );
          })}
          {/* BLANK CARD */}
          <div className={"flex-grow basis-56 h-80 p-1 rounded-[22px] bg-white border"}>
            <Card
              className={"p-4 rounded-[16px] w-[280] h-full text-sm bg-primary text-white cursor-pointer transition-all duration-500 ease-in-out transform origin-center hover:scale-105"}
            >
              <h1>13k+</h1>
              <p>Job already posted</p>
              <div className={"relative h-4/5"}>
                <div className="absolute bottom-0 right-0">
                  <FontAwesomeIcon
                    icon={faCircleArrowUpRight}
                    className={"text-6xl"}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className={"flex items-center justify-center"}>
        <div className={"text-center w-fit m-10 bg-[#F1F6F3] px-5 py-1 rounded-full flex items-center gap-2"}>
          <p className={"text-[14px]"}>Do you want to post a job for your company? <span className={"text-primary"}>We can help.</span></p>
          <Button variant={"link"} className={"pl-0"}>Click here</Button>
        </div>
      </div>
    </section>
  );
};

export default SectionJobListing;
