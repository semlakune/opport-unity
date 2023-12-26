"use client";
import React, {useState} from "react";
import {
  ArrowTopRightIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  RocketIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import JobCard from "@/components/JobCard";
import {useRouter} from "next/navigation";
import {formatNumber, getAppliedJobsData, getDatesForPeriod, textManipulation} from "@/lib/utils";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import StatusCard from "@/components/pages/dashboard/StatusCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardUser({ user }) {
  const router = useRouter();

  const { data: dashboard, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const application = await fetch(`/api/applications/?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      const jobs = await fetch("/api/jobs").then((res) => res.json());

      const recommendedJobs = jobs.data.filter((job) =>
        application.applications.every((app) => app.jobId !== job.id),
      );

      return {
        applied: application.applications.length,
        accepted: application.applications.filter((app) => app.status === "ACCEPTED").length,
        pending: application.applications.filter((app) => app.status === "PENDING").length,
        rejected: application.applications.filter((app) => app.status === "REJECTED").length,
        appliedJobs: application.applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        recommendedJobs,
      }
    },
    enabled: !!user?.id,
  })

  const [timePeriod, setTimePeriod] = useState('7days');

  const tabsOptions = [
    {
      name: '7 days',
      value: '7days',
    },
    {
      name: '1 month',
      value: '1month',
    },
    {
      name: '6 months',
      value: '6months',
    },
    {
      name: '1 year',
      value: '1year',
    },
  ];

  const dateArray = getDatesForPeriod(timePeriod);
  const appliedJobsData = dashboard ? getAppliedJobsData(dashboard.appliedJobs, dateArray) : [];

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: dateArray,
      tickPlacement: 'between'
    },
    fill: {
      type: "gradient",
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#8cf436', '#1ee92f', '#2cb027'],
    yaxis: {
      labels: {
        formatter: function(val) {
          return val.toFixed(0); // Format the value as a fixed-point notation
        }
      }
    },
  };

  const series = [
    {
      name: 'jobs',
      data: appliedJobsData,
    },
  ];

  const statusCards = [
    { count: dashboard?.applied, label: 'Applied', IconComponent: RocketIcon, bgClass: 'bg-gradient-to-t from-slate-700 to-slate-400 shadow-slate-400' },
    { count: dashboard?.accepted, label: 'Accepted', IconComponent: CheckCircledIcon, bgClass: 'bg-gradient-to-t from-primary to-secondary shadow-secondary' },
    { count: dashboard?.pending, label: 'Pending', IconComponent: TimerIcon, bgClass: 'bg-gradient-to-t from-amber-700 to-amber-400 shadow-amber-400' },
    { count: dashboard?.rejected, label: 'Rejected', IconComponent: CrossCircledIcon, bgClass: 'bg-gradient-to-t from-red-700 to-red-400 shadow-red-400' },
  ];

  if (isLoading || !user?.id) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div className={"flex flex-col gap-10"}>
      <div className={"grid grid-cols-4 gap-5 h-fit"}>
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            count={card.count}
            label={card.label}
            IconComponent={card.IconComponent}
            bgClass={card.bgClass}
          />
        ))}
      </div>
      <div className={"grid grid-cols-3 gap-10"}>
        <div className={"col-span-2 space-y-2"}>
          <div className={"flex items-center justify-between"}>
            <h1>Applied Jobs</h1>
            <Tabs defaultValue="7days">
              <TabsList
                className={
                  "bg-white border shadow-inner h-5 p-0"
                }
              >
                {tabsOptions.map((tab, index) => (
                  <TabsTrigger
                    key={index}
                    value={tab.value}
                    className={
                      "text-xs py-0 h-5 rounded-full data-[state=active]:bg-slate-500 data-[state=active]:text-white"
                    }
                    onClick={() => setTimePeriod(tab.value)}
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <Separator />
          <div className={"p-2 border rounded-lg shadow-inner"}>
            <Chart
              options={options}
              series={series}
              type={"line"}
              height={"350px"}
              width={"100%"}
            />
          </div>
        </div>
        <div className={"space-y-2"}>
          <h1>Recent Applied Jobs</h1>
          <Separator />
          <div className={"space-y-2 max-h-[386px] overflow-y-scroll pr-2"}>
            {dashboard?.appliedJobs?.slice(0, 10).map((job) => (
                  <RecentApplied
                    key={job.id}
                    job={job}
                    onClick={() => router.push(`/job/${job.job.id}`)}
                  />
                ))}
          </div>
        </div>

        <div
          className={`col-span-full space-y-2 ${
            dashboard?.recommendedJobs?.length < 1 && "hidden"
          }`}
        >
          <h1>Jobs for you</h1>
          <Separator />
          <div className={"grid grid-cols-4 gap-5"}>
            {dashboard?.recommendedJobs
                  ?.slice(0, 4)
                  .map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      buttonText={"Details"}
                      actionClick={() => router.push(`/job/${job.id}`)}
                    />
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const RecentApplied = ({ job, onClick }) => {
  return (
    <div className={"flex items-center justify-between w-full p-2 border rounded-lg shadow-inner"}>
      <div className={"flex items-start gap-2"}>
        <Image src={job.job.employer.logo} alt={job.job.title} width={100} height={100} className={"w-12 h-12 rounded-lg object-cover"} />
        <div className={"flex flex-col"}>
          <h1 className={"text-sm w-full line-clamp-1"}>{job.job.title}</h1>
          <p className={"text-sm"}>
            {textManipulation(job.job.type, "capitalize") + ", " + textManipulation(job.job.workModel, "capitalize")}
          </p>
        </div>
      </div>
      <Button size={"sm"} variant={"outline"} onClick={onClick}>
        <ArrowTopRightIcon className={"mr-2"} /> View
      </Button>
    </div>
  );
};
