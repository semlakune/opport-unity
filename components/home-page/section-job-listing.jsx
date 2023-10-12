"use client"
import styles from "@/components/styles.module.css"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import JobCard from "@/components/job-card";
import {Card} from "@/components/ui/card";
import dummy from "./dummy.json"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowUpRight} from "@fortawesome/pro-thin-svg-icons";

const SectionJobListing = () => {
  return (
    <section className={styles.jobListing}>
      <div className="container">
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-3xl"}>New Job Listing.</h1>
          <Tabs defaultValue="all">
            <TabsList className={"text-primary"}>
              <TabsTrigger value="all" className={"data-[state=active]:bg-primary data-[state=active]:text-white"}>All Categories</TabsTrigger>
              <TabsTrigger value="design" className={"data-[state=active]:bg-primary data-[state=active]:text-white"}>Design</TabsTrigger>
              <TabsTrigger value="developer" className={"data-[state=active]:bg-primary data-[state=active]:text-white"}>Developer</TabsTrigger>
              <TabsTrigger value="marketing" className={"data-[state=active]:bg-primary data-[state=active]:text-white"}>Marketing</TabsTrigger>
              <TabsTrigger value="business" className={"data-[state=active]:bg-primary data-[state=active]:text-white"}>Business</TabsTrigger>
            </TabsList>
          </Tabs>

        </div>
        <div className={"flex flex-wrap gap-6 items-center pt-10"}>
          {dummy.slice(0, 9).map((job, index) => {
            return (
              <div key={index} className={"flex-grow basis-60 md:basis-56"}>
                <JobCard job={job} />
              </div>
            )
          })}
          {/* BLANK CARD */}
          <div className={"flex-grow basis-60"}>
            <Card className={"p-4 rounded-[22px] w-[280] h-80 text-sm bg-primary text-white"}>
              <h1>13k+</h1>
              <p>Job already posted</p>
              <div className={"h-full pb-14 flex justify-end items-end"}>
                <FontAwesomeIcon
                  icon={faCircleArrowUpRight}
                  className={"text-6xl cursor-pointer transition-all duration-500 ease-in-out hover:text-[#d2f34c] hover:scale-110 transform origin-center"}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionJobListing