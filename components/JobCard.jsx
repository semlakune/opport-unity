import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {useState} from "react";
import getColorFromImg from "@/lib/getColor";
import {useIsomorphicLayoutEffect} from "@/lib/useIsomorphicLayoutEffect";
import {formatSalary, getInitials, textManipulation} from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import BookmarkButton from "@/components/buttons/BookmarkButton";
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {CheckCircledIcon} from "@radix-ui/react-icons";

const JobCard = ({ job, onHoverEffects = false, buttonText = "Apply", actionClick, }) => {
  const { employer, title, workModel, type, level, location, salaryRange, createdAt } = job;
  let logo = employer?.logo;
  let companyName = employer?.user?.name;
  let category = job?.category?.name;
  const jobId = job?.id;

  const jobTag = [workModel, type, level, category];

  const [bgColor, setBgColor] = useState("hsl(var(--muted))");
  const [isHovered, setIsHovered] = useState(false);

  const { data: session } = useSession();

  const { data: applied, isLoading } = useQuery({
    queryKey: ["applied", jobId],
    queryFn: async () => {
      if (!session) return false;
      const response = await fetch(
        `/api/application/?jobId=${jobId}&userId=${session?.user?.id}`,
      );
      const data = await response.json();
      return data.isApplied;
    },
  });

  useIsomorphicLayoutEffect(() => {
    if (logo) {
      getColorFromImg({ src: logo, pastel: true }) // this will make bg color of card is from dominant color of logo and convert it to pastel
        .then((color) => {
          setBgColor(color);
        })
        .catch((err) => console.error("Error fetching dominant color:", err));
    }
  }, [job, logo]);

  return (
    <div className={"overflow-hidden max-h-80"}>
      <Card
        className={"p-1 rounded-[22px] h-80 text-sm"}
        onMouseOver={() => onHoverEffects && setIsHovered(true)}
        onMouseLeave={() => onHoverEffects && setIsHovered(false)}
      >
        <div
          style={{ backgroundColor: bgColor }}
          className={`rounded-[16px] h-[80%] w-full ${onHoverEffects ? (isHovered ? "lg:h-[80%]" : "lg:h-full") : "lg:h-[80%]"} p-4 flex flex-col gap-4 transition-all duration-500 ease-in-out`}
        >
          <div className="flex justify-between items-center">
            <p
              className={
                "px-4 py-1.5 bg-white rounded-full text-[12px] text-center"
              }
            >
              {moment(createdAt).format("DD MMM, YYYY")}
            </p>
            <BookmarkButton job={job} className={"rounded-full px-2.5 py-1.5 h-8"} />
          </div>
          <p>{companyName}</p>
          <div className={"flex-1 flex flex-col justify-start"}>
            <div className={"flex items-center justify-between gap-5"}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                    <h1 className={`text-[20px] text-left leading-[1.5] line-clamp-2 ${!onHoverEffects && 'cursor-pointer'}`}>
                      {title}
                    </h1>
                    </TooltipTrigger>
                    <TooltipContent>
                      {title}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              <Avatar>
                <AvatarImage
                  src={logo ?? null}
                  alt={companyName}
                  className={"object-cover w-auto h-auto"}
                />
                <AvatarFallback>{getInitials(companyName)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div
            className={
              "flex flex-col justify-start text-neutral-700 text-xs line-clamp-2"
            }
          >
            <div className={"flex max-h-[56px] flex-wrap gap-1"}>
              {jobTag.map((tag, index) => (
                <p
                  key={index}
                  className={"rounded-full px-3 py-1 border border-neutral-500"}
                >
                  {textManipulation(tag, 'capitalize')}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div
        className={`relative bottom-16 p-1 opacity-100 ${onHoverEffects ? (isHovered ? "lg:opacity-100 lg:duration-1000" : "lg:opacity-0 lg:duration-200") : 'lg:opacity-100'} md:transition-all`}
        onMouseOver={() => onHoverEffects && setIsHovered(true)}
        onMouseLeave={() => onHoverEffects && setIsHovered(false)}
      >
        <div className={`w-full h-[20%] flex justify-between items-center p-2`}>
          <div className="flex flex-col gap-2">
            <h1 className={"text-[14px] leading-none line-clamp-1"}>{formatSalary(salaryRange)}</h1>
            <p className={"text-neutral-400 leading-none line-clamp-1"}>{location}</p>
          </div>
          <Button variant={applied ? "outline" : "default"} disabled={isLoading} className={"rounded-full font-custombold"} onClick={() => actionClick(job) ?? null}>{applied && <CheckCircledIcon className={"mr-2"} />} {applied ? "Applied" : buttonText}</Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
