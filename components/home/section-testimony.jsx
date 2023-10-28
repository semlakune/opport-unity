import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import home from "@/components/home/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import dummy from "./dummy/testimony-dummy.json";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
          className={`p-6 bg-gradient-to-tl from-[#fff] to-slate-100 rounded-[22px] h-[300px] w-full flex flex-col justify-between`}
        >
          <div>
            <Image
              src={data.companyLogo}
              alt="company-logo"
              width={70}
              height={70}
              className={`h-auto w-auto`}
            />
            <q className="font-spicy mb-5">{data.text}</q>
          </div>
          <p>{`${data.testiName}, ${data.position}`}</p>
        </Card>
      </div>
    ))}
  </Slider>
))

export default function SectionTestimony() {
  const sliderRefWeb = useRef(null);
  const sliderRefMobile = useRef(null);

  return (
    <section className={home.testimony}>
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl">Trusted by leading startups.</h1>
          <div className="flex items-center gap-2 text-2xl">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="py-2.5 px-3 hover:bg-[#d2f34c] rounded-[50%] cursor-pointer"
              onClick={() => {
                if (window.innerWidth > 768) {
                  sliderRefWeb.current?.slickPrev();
                } else {
                  sliderRefMobile.current?.slickPrev();
                }
              }}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className="py-2.5 px-3 hover:bg-[#d2f34c] rounded-[50%] cursor-pointer"
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
              <h1 className="text-3xl text-center md:text-left">Most complete job portal.</h1>
              <p className="text-center md:text-left">Signup and start find your job or talents.</p>
            </div>
            <div className="flex flex-col md:flex-row w-full md:w-auto gap-5 md:gap-2">
              <Button className="py-6 md:py-2" variant="outline">Looking for job?</Button>
              <Button className="py-6 md:py-2">Post a job</Button>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </section>
  );
}
