"use client";
"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useState } from "react";
import getColorFromImg from "@/lib/getColor";
import { useIsomorphicLayoutEffect } from "@/lib/utils";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { Toaster, toast } from "sonner";

const JobCard = ({ job, onHoverEffects = false, buttonText = "Apply" }) => {
  const { companyName, companyLogo, jobTitle, jobTag, salary, location } = job;
  const [pastelColor, setPastelColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (companyLogo) {
      getColorFromImg({ src: companyLogo, pastel: true })
        .then((color) => {
          setPastelColor(color);
        })
        .catch((err) => console.error("Error fetching dominant color:", err));
    }
  }, [job, companyLogo]);

  useIsomorphicLayoutEffect(() => {
    if (isBookmarked) {
      toast.success("Job bookmarked!");
    } else {
      toast.error("Bookmark removed!");
    }
  }, [isBookmarked]);

  return (
    <div className={"overflow-hidden max-h-80"}>
      <Toaster richColors />
      <Card
        className={"p-1 rounded-[22px] w-[280] h-80 text-sm"}
        onMouseOver={() => onHoverEffects && setIsHovered(true)}
        onMouseLeave={() => onHoverEffects && setIsHovered(false)}
      >
        <div
          style={{ backgroundColor: pastelColor || "rgb(253, 230, 138)" }}
          className={`rounded-[16px] h-[80%] w-full ${onHoverEffects ? (isHovered ? "lg:h-[80%]" : "lg:h-full") : "lg:h-[80%]"} p-4 flex flex-col gap-4 transition-all duration-500 ease-in-out`}
        >
          <div className="flex justify-between">
            <p
              className={
                "pt-1.5 px-4 bg-white rounded-full text-[12px] text-center"
              }
            >
              {moment().format("DD MMM, YYYY")}
            </p>
            <div
              className={"bg-white rounded-full p-2 cursor-pointer"}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              {isBookmarked ? (
                <BookmarkFilledIcon className={"hover:scale-110"} />
              ) : (
                <BookmarkIcon className={"hover:scale-110"} />
              )}
            </div>
          </div>
          <p>{companyName}</p>
          <div className={"flex-1 flex flex-col justify-start"}>
            <div className={"flex items-center justify-between gap-5"}>
              <h1 className={"text-[20px] leading-[1.5] line-clamp-2"}>
                {jobTitle}
              </h1>
              <Avatar>
                <AvatarImage
                  src={companyLogo}
                  alt={companyName}
                  className={"object-cover w-auto h-auto"}
                />
                <AvatarFallback>OU</AvatarFallback>
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
                  {tag}
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
            <h1 className={"text-[14px] leading-none"}>{salary}</h1>
            <p className={"text-neutral-400 leading-none"}>{location}</p>
          </div>
          <Button className={"rounded-full"}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
