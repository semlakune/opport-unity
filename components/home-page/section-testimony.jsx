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

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <section className={styles.testimony}>
      <div className={"container"}>
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-3xl"}>Trusted by leading startups.</h1>
          <div className={"flex items-center gap-2 text-2xl"}>
            <FontAwesomeIcon icon={faArrowLeft} className={"py-2.5 px-3 hover:bg-[#d2f34c] rounded-[50%] cursor-pointer"} onClick={() => sliderRef?.current?.slickPrev()} />
            <FontAwesomeIcon icon={faArrowRight} className={"py-2.5 px-3 hover:bg-[#d2f34c] rounded-[50%] cursor-pointer"} onClick={() => sliderRef?.current?.slickNext()} />
          </div>
        </div>
        <div className={"pt-10 pb-20"}>
          <Slider ref={sliderRef} {...settings}>
            {dummy.map((data, index) => (
              <div key={index} className={"px-2"}>
                <Card className={"p-10 bg-gradient-to-tl from-[#15a95152] to-slate-100 rounded-[22px] h-[300px] w-[400px] flex flex-col justify-between"}>
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
        <div className={"gap-1.5"}>
          <Separator />
          <div className={"flex justify-between items-center py-20"}>
            <div>
              <h1 className={"text-3xl"}>Most complete job portal.</h1>
              <p>Signup and start find your job or talents.</p>
            </div>
            <div className={"flex gap-2"}>
              <Button className={"rounded-[6px]"} variant={"outline"}>Looking for job?</Button>
              <Button className={"rounded-[6px]"}>Post a job</Button>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </section>
  )
}