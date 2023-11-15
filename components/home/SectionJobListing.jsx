"use client";
import home from "@/components/home/home.module.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "@/components/JobCard";
import { Card } from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { create } from 'zustand'
import {useEffect, useState} from "react";
import {getJobs} from "@/lib/actions";
import {ArrowTopRightIcon} from "@radix-ui/react-icons";

const useJobs = create(set => ({
  jobs: null,
  setJobs: (jobs) => set({ jobs }),
}))
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
  const { jobs, setJobs } = useJobs()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const fetchedJobs = await getJobs({
          page: 1,
          pageSize: 9,
          sortField: 'createdAt',
          sortOrder: 'desc',
        });
        if (fetchedJobs && fetchedJobs.data) {
          setJobs(fetchedJobs.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <section className={home.jobListing}>
      <div className="container">
        <div className={"flex flex-col md:flex-row justify-between items-center"}>
          <h1 className={"text-2xl w-full md:w-auto text-center md:text-start md:text-3xl underline decoration-wavy md:no-underline"}>New Job Listing</h1>
          <Tabs defaultValue="all">
            <TabsList className={"text-primary bg-[#F1F6F3] hidden md:block"}>
              {tabs.map((tab, index) => (
                <TabsTrigger key={index} value={tab.value} className={"data-[state=active]:bg-primary data-[state=active]:text-white"}>
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className={"flex flex-wrap gap-6 items-center pt-10"}>
          {jobs?.map((job, index) => {
            return (
              <div key={index} className={"flex-grow basis-60 md:basis-56"}>
                <JobCard loading={loading} job={job} onHoverEffects={true} buttonText={"Details"} />
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
                  <ArrowTopRightIcon width={50} height={50} className={"text-6xl"} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className={"flex items-center justify-center"}>
        <div className={"text-center w-fit m-10 bg-[#F1F6F3] p-6 md:px-5 md:py-1 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-0 md:gap-2"}>
          <p className={"text-[14px]"}>Do you want to post a job for your company? <span className={"text-primary"}>We can help.</span></p>
          <Button variant={"link"} className={"pl-0"}>Click here</Button>
        </div>
      </div>
    </section>
  );
};

export default SectionJobListing;
