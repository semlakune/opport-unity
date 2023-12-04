"use client";
import { useQuery } from "@tanstack/react-query";
import detail from "@/components/styles/detail.module.css";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import { textManipulation } from "@/lib/utils";
import Loading from "@/components/Loading";
import {ArrowLeftIcon, BookmarkIcon, RocketIcon, Share1Icon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import JobCard from "@/components/JobCard";
import {toast} from "sonner";
import {useSession} from "next-auth/react";

export default function JobDetails({ id }) {
  const { data: session } = useSession();
  const router = useRouter()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetch(`/api/job/?id=${id}`).then((res) => res.json()),
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error</p>;

  const { job } = data;
  const day = moment(job.createdAt).fromNow();

  const handleShare = () => {
    console.log("share")
  }

  const handleBookmark = () => {
    if (!session) {
      toast.error("You must login to save this job", { position: "top-center" });
      return;
    }
    console.log("bookmark")
  }

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
            <Button className={"w-full py-6"}><RocketIcon className={"mr-2"} /> Apply Now</Button>
            <div className={"w-full flex gap-2"}>
              <Button variant={"outline"} className={"w-full py-6"} onClick={handleBookmark}>
                <BookmarkIcon className={"mr-2"} /> Save
              </Button>
              <Button variant={"outline"} className={"w-full py-6"} onClick={handleShare}>
                <Share1Icon className={"mr-2"} /> Share
              </Button>
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
          <div className={"flex flex-col gap-2 lg:hidden"}>
            <Button className={"w-full py-6"}><RocketIcon className={"mr-2"} /> Apply</Button>
            <Button variant={"outline"} className={"w-full py-6"} onClick={handleBookmark}>
              <BookmarkIcon className={"mr-2"} /> Save
            </Button>
            <Button variant={"outline"} className={"w-full py-6"} onClick={handleShare}>
              <Share1Icon className={"mr-2"} /> Share
            </Button>
          </div>
        </div>
      </div>
      { data.similarJobs.length > 0 && (
        <div className={"md:container pb-10"}>
          <Separator className={"my-5"} />
          <h2 className={"font-custombold text-2xl"}>Similar Jobs</h2>
          <div className={detail.similarjobs}>
            { data.similarJobs.map((job, index) => (
              <JobCard key={index} job={job} actionClick={() => router.push(`/job/${job.id}`)} buttonText={"Details"} />
            )) }
          </div>
        </div>
      ) }
    </div>
  );
}
