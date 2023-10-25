import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/components/styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/pro-solid-svg-icons";
import {Card} from "@/components/ui/card"
import {useRef} from "react";
import dummy from "./dummy/testimony-dummy.json"
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";


export default function SectionTestimony() {
  const sliderRef = useRef(null)

  const settingsWeb = {
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  }

  const settingsMobile = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <section className={styles.testimony}>
      <div className={"container"}>
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-2xl md:text-3xl"}>Trusted by leading startups.</h1>
          <div className={"flex items-center gap-2 text-2xl"}>
            <FontAwesomeIcon icon={faArrowLeft} className={"py-2.5 px-3 hover:bg-[#d2f34c] rounded-[50%] cursor-pointer"} onClick={() => sliderRef?.current?.slickPrev()} />
            <FontAwesomeIcon icon={faArrowRight} className={"py-2.5 px-3 hover:bg-[#d2f34c] rounded-[50%] cursor-pointer"} onClick={() => sliderRef?.current?.slickNext()} />
          </div>
        </div>
        <div className={"pt-10 pb-20 hidden md:block"}>
          <Slider ref={sliderRef} {...settingsWeb}>
            {dummy.map((data, index) => (
              <div key={index} className={"px-2"}>
                <Card className={"p-10 bg-gradient-to-tl from-[#15a95152] to-slate-100 rounded-[22px] h-[300px] w-[340px] lg:w-[640px] flex flex-col justify-between"}>
                  <div>
                    <Image src={data.companyLogo} alt={"company-logo"} width={140} height={140} className={"mix-blend-multiply object-none relative bottom-8"} />
                    <q className={"font-spicy mb-5"}>{data.text}</q>
                  </div>
                  <p>{data.testiName}, {data.position}</p>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
        <div className={"pt-10 pb-20 md:hidden"}>
          <Slider ref={sliderRef} {...settingsMobile}>
            {dummy.map((data, index) => (
              <div key={index} className={"px-1"}>
                <Card className={"p-6 bg-gradient-to-tl from-[#15a95152] to-slate-100 rounded-[22px] h-[300px] w-full flex flex-col justify-between"}>
                  <div>
                    <Image src={data.companyLogo} alt={"company-logo"} width={140} height={140} className={"mix-blend-multiply object-none relative bottom-2"} />
                    <q className={"font-spicy mb-5"}>{data.text}</q>
                  </div>
                  <p>{data.testiName}, {data.position}</p>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
        <div className={"gap-1.5"}>
          <Separator />
          <div className={"flex flex-col md:flex-row justify-between items-center py-20 gap-10 md:gap-0"}>
            <div>
              <h1 className={"text-3xl text-center md:text-left"}>Most complete job portal.</h1>
              <p className={"text-center md:text-left"}>Signup and start find your job or talents.</p>
            </div>
            <div className={"flex flex-col md:flex-row w-full md:w-auto gap-5 md:gap-2"}>
              <Button className={"py-6 md:py-2"} variant={"outline"}>Looking for job?</Button>
              <Button className={"py-6 md:py-2"}>Post a job</Button>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </section>
  )
}