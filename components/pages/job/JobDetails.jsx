"use client";
import { useQuery } from "@tanstack/react-query";
import detail from "@/components/styles/detail.module.css";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import { textManipulation } from "@/lib/utils";
import Loading from "@/components/Loading";
import {ArrowLeftIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import JobCard from "@/components/JobCard";
import ShareButton from "@/components/buttons/ShareButton";
import BookmarkButton from "@/components/buttons/BookmarkButton";
import ApplyButton from "@/components/buttons/ApplyButton";

export default function JobDetails({ id }) {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetch(`/api/job/?id=${id}`).then((res) => res.json()),
  });
  if (isLoading) return <Loading />;
  if (isError) return (
    <div className={"absolute translate-y-[-50%] top-1/2 left-1/2 translate-x-[-50%]"}>
      <h1>Something went wrong :(</h1>
    </div>
  )
  if (data.error === "Job not found" || !/^\d+$/.test(id)) return (
    <div className={"flex flex-col gap-2 w-full items-center justify-center h-[80vh]"}>
      <h1 className={"text-6xl"}>404</h1>
      <h1>Job not found</h1>
      <Button onClick={() => router.push("/jobs")} variant={"link"} className={"px-0 md:px-[2rem] pt-[2rem] text-black font-custombold"}><ArrowLeftIcon className={"mr-1"} /> Back</Button>
    </div>
  )

  const { job } = data;
  const day = moment(job.createdAt).fromNow();

  return (
    <div>
      <Button onClick={() => router.back()} variant={"link"} className={"px-0 md:px-[2rem] pt-[2rem] text-black font-custombold"}><ArrowLeftIcon className={"mr-1"} /> Back</Button>
      <div className={detail.layout}>
        <div className={detail.innerlayout}>
          <div className={"flex gap-5 items-center md:items-start"}>
            <Image
              src={job?.employer?.logo}
              alt={job?.employer?.user.name}
              width={100}
              height={100}
              className={"rounded-full w-20 h-20"}
            />
            <div>
              <p className={"font-custombold"}>{job?.employer?.user.name}</p>
              <h1 className={"text-3xl line-clamp-2 w-full"}>{job?.title}</h1>
              <p className={"text-muted-foreground"}>{day}</p>
            </div>
          </div>
          <Separator className={"my-2"} />
          <div>
            <h1>Overview</h1>
            <div className={detail.borderedbox}>
              <p>{job?.description}</p>
            </div>
          </div>
          <div>
            <h1>Qualifications</h1>
            <div className={detail.borderedbox}>
              <ul>
                {job?.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h1>Responsibilities</h1>
            <div className={detail.borderedbox}>
              <ul>
                {job?.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={detail.innerlayout}>
          <div className={"hidden lg:flex flex-col gap-2"}>
            <ApplyButton jobId={job?.id} className={"w-full py-6"} />
            <div className={"grid grid-cols-2 gap-2"}>
              <BookmarkButton job={job} className={"w-full py-6"} withText={true} buttonVariant={"outline"} />
              <ShareButton withText/>
            </div>
          </div>
          <div className={detail.borderedbox}>
            <h1>Job Information</h1>
            <div className={"flex flex-col gap-5 mt-5"}>
              <div className={detail.jobinformation}>
                <p className={"text-muted-foreground"}>Job Type</p>
                <p>{textManipulation(job?.type, "capitalize")}</p>
              </div>
              <div className={detail.jobinformation}>
                <p className={"text-muted-foreground"}>Work Model</p>
                <p>{textManipulation(job?.workModel, "capitalize")}</p>
              </div>
              <div className={detail.jobinformation}>
                <p className={"text-muted-foreground"}>Category</p>
                <p>{job?.category?.name}</p>
              </div>
              <div className={detail.jobinformation}>
                <p className={"text-muted-foreground"}>Level</p>
                <p>{textManipulation(job?.level, "capitalize")}</p>
              </div>
              <div className={detail.jobinformation}>
                <p className={"text-muted-foreground"}>Salary Range</p>
                <p>{job?.salaryRange}</p>
              </div>
              <div className={detail.jobinformation}>
                <p className={"text-muted-foreground"}>Location</p>
                <p>{job?.location}</p>
              </div>
            </div>
          </div>
          <div className={"grid grid-rows-3 gap-2 lg:hidden"}>
            <ApplyButton jobId={job?.id} className={"w-full py-6"} />
            <BookmarkButton job={job} className={"w-full py-6"} withText={true} buttonVariant={"outline"} />
            <ShareButton withText/>
          </div>
        </div>
      </div>
      { data.similarJobs.length > 0 && (
        <div className={"md:container pb-10"}>
          <Separator className={"my-5"} />
          <h2 className={"font-custombold text-2xl"}>Similar Jobs</h2>
          <div className={detail.similarjobs}>
            {data.similarJobs?.slice(0, 4).map((job, index) => (
              <JobCard key={index} job={job} actionClick={() => router.push(`/job/${job.id}`)} buttonText={"Details"} />
            )) }
          </div>
        </div>
      ) }
    </div>
  );
}
