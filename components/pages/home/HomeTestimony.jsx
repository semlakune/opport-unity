"use client"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import home from "@/components/styles/home.module.css";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import dummy from "@/lib/dummy/testimony-dummy.json";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";

const SLIDER_SETTINGS = {
  infinite: true,
  speed: 1000,
  autoplay: true,
};

const WEB_SETTINGS = {
  ...SLIDER_SETTINGS,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const MOBILE_SETTINGS = {
  ...SLIDER_SETTINGS,
  slidesToShow: 1,
  slidesToScroll: 1,
};

// eslint-disable-next-line react/display-name
const TestimonySlider = React.forwardRef(({ settings }, ref) => (
  <Slider ref={ref} {...settings}>
    {dummy.map((data, index) => (
      <div key={index} className={settings === WEB_SETTINGS ? "px-2" : "px-1"}>
        <Card
          className={`p-6 bg-white rounded-[22px] h-[300px] w-full flex flex-col justify-between`}
        >
          <div>
            <Image
              src={"/vercel.svg"}
              alt="company-logo"
              width={20}
              height={20}
              className={`h-20 w-20`}
              priority={false}
            />
            <q className="font-customitalic mb-5">{data.text}</q>
          </div>
          <p>{`${data.testiName}, ${data.position}`}</p>
        </Card>
      </div>
    ))}
  </Slider>
))

export default function HomeTestimony() {
  const sliderRefWeb = useRef(null);
  const sliderRefMobile = useRef(null);
  const router = useRouter();

  return (
    <section className={home.testimony}>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl text-center md:text-start">
            Trusted by leading startups.
          </h1>
          <div className="hidden md:flex items-center gap-2 text-2xl">
            <ArrowLeftIcon
              color={"#09090B"}
              width={30}
              height={30}
              className={"hover:bg-[#d2f34c] rounded-[50%] cursor-pointer"}
              onClick={() => {
                if (window.innerWidth > 768) {
                  sliderRefWeb.current?.slickPrev();
                } else {
                  sliderRefMobile.current?.slickPrev();
                }
              }}
            />
            <ArrowRightIcon
              color={"#09090B"}
              width={30}
              height={30}
              className={"hover:bg-[#d2f34c] rounded-[50%] cursor-pointer"}
              onClick={() => {
                if (window.innerWidth > 768) {
                  sliderRefWeb.current?.slickNext();
                } else {
                  sliderRefMobile.current?.slickNext();
                }
              }}
            />
          </div>
        </div>
        <div className="pt-10 pb-20 hidden md:block">
          <TestimonySlider ref={sliderRefWeb} settings={WEB_SETTINGS} />
        </div>
        <div className="pt-10 pb-20 md:hidden">
          <TestimonySlider ref={sliderRefMobile} settings={MOBILE_SETTINGS} />
        </div>
        <div className="gap-1.5">
          <Separator />
          <div className="flex flex-col md:flex-row justify-between items-center py-20 gap-10 md:gap-0">
            <div>
              <h1 className="text-3xl text-center md:text-left">
                Most complete job portal.
              </h1>
              <p className="text-center md:text-left pt-5 md:pt-0">
                Signup and start find your job or talents.
              </p>
            </div>
            <div className="flex flex-col md:flex-row w-full md:w-auto gap-5 md:gap-2">
              <Button
                onClick={() => router.push("/jobs")}
                className="py-6 md:py-2"
                variant="outline"
              >
                Looking for job?
              </Button>
              <Button
                onClick={() => router.push("/dashboard/my-jobs/create")}
                className="py-6 md:py-2"
              >
                Post a job
              </Button>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </section>
  );
}
