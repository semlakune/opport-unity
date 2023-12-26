"use client";
import home from "@/components/styles/home.module.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "@/components/JobCard";
import { Card } from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowTopRightIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {formatNumber} from "@/lib/utils";

const HomeJobListing = ({categories, jobs, totalJobs, loading}) => {
  const router = useRouter()
  let tabs = [
    {
      name: "All Categories",
      value: "all",
    },
  ]

  if (categories) {
    tabs = [
      ...tabs,
      ...categories.slice(0, 4).map((category) => ({
        name: category.name,
        value: category.name,
      })),
    ]
  }

  const handleClickJob = (job) => {
    router.push(`/job/${job.id}`)
  }

  return (
    <section className={home.jobListing}>
      <div className="container">
        <div className={"flex flex-col md:flex-row justify-between items-center"}>
          <h1 className={"text-2xl w-full md:w-auto text-center md:text-start md:text-3xl"}>New Job Listing</h1>
          <Tabs defaultValue="all">
            <TabsList className={"text-primary bg-white border shadow-inner h-auto hidden md:block"}>
              {tabs.map((tab, index) => (
                <TabsTrigger key={index} value={tab.value} onClick={() => console.log(tab.value)} className={"data-[state=active]:bg-primary data-[state=active]:text-white"}>
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className={"flex flex-wrap gap-6 items-center pt-10"}>
          {!loading&& jobs?.slice(0, 9).map((job, index) => {
            return (
              <div key={index} className={"flex-grow basis-56"}>
                <JobCard job={job} onHoverEffects={true} buttonText={"Details"} actionClick={handleClickJob} />
              </div>
            );
          })}
          {/* BLANK CARD */}
          {!loading && (
            <div className={"flex-grow basis-56 h-80 p-1 rounded-[22px] bg-white border"} onClick={() => router.push("/jobs")}>
              <Card
                className={"p-4 rounded-[16px] w-[280] h-full text-sm bg-primary text-white cursor-pointer transition-all duration-500 ease-in-out transform origin-center hover:scale-105"}
              >
                <h1>{formatNumber(totalJobs)}</h1>
                <p>Job already posted</p>
                <div className={"relative h-4/5"}>
                  <div className="absolute bottom-0 right-0">
                    <ArrowTopRightIcon width={50} height={50} className={"text-6xl"} />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      <div className={"flex items-center justify-center"}>
        <div className={"text-center w-fit m-10 bg-[#F1F6F3] p-6 md:px-5 md:py-1 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-0 md:gap-2"}>
          <p className={"text-[14px]"}>Do you want to post a job for your company? <span className={"text-primary"}>We can help.</span></p>
          <Button variant={"link"} className={"pl-0"} onClick={() => router.push("/register")}>Click here</Button>
        </div>
      </div>
    </section>
  );
};

export default HomeJobListing;
