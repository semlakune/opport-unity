import home from "@/components/home/home.module.css";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import {
  faBullhorn,
  faCalculator,
  faPaintBrush,
  faShoppingCart,
  faCode,
  faPhone,
} from "@fortawesome/pro-light-svg-icons";
import { Separator } from "@/components/ui/separator";

const SectionFields = () => {
  const fields = [
    {
      name: "Development",
      icon: faCode,
      jobs: "7k+ Jobs",
    },
    {
      name: "Telemarketing",
      icon: faPhone,
      jobs: "31k+ Jobs",
    },
    {
      name: "Design",
      icon: faPaintBrush,
      jobs: "2k+ Jobs",
    },
    {
      name: "Sales",
      icon: faShoppingCart,
      jobs: "3k+ Jobs",
    },
    {
      name: "Marketing",
      icon: faBullhorn,
      jobs: "4k+ Jobs",
    },
    {
      name: "Accounting",
      icon: faCalculator,
      jobs: "6k+ Jobs",
    },
  ];
  return (
    <section className={home.field}>
      <div className="container">
        <div
          className={
            "flex flex-col md:flex-row justify-between items-center gap-8"
          }
        >
          <h1
            className={
              "text-2xl md:text-3xl underline decoration-wavy md:no-underline"
            }
          >
            Most Demanding Categories.
          </h1>
          <Button
            variant={"link"}
            className={
              "text-end text-sm md:text-lg font-bold whitespace-nowrap px-0 hidden md:block"
            }
          >
            Explore all fields{" "}
            <span className={"ml-2"}>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </Button>
        </div>
        <div
          className={
            "flex flex-wrap justify-evenly items-center py-10 md:py-20 mx-auto gap-6"
          }
        >
          {fields.map((field, index) => (
            <div key={index} className={home.cardField}>
              <div className={home.innerCardField}>
                <FontAwesomeIcon icon={field.icon} />
                <p>{field.name}</p>
                <p className={"text-neutral-400"}>{field.jobs}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant={"link"}
          className={
            "w-full text-center text-sm font-bold whitespace-nowrap px-0 md:hidden"
          }
        >
          Explore all fields{" "}
          <span className={"ml-2"}>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </Button>

        <div className={"flex items-center justify-center py-10 gap-10"}>
          <Separator className={"w-16 md:w-60"} />
          <h1 className={"text-center whitespace-nowrap text-2xl"}>
            How it’s Work?
          </h1>
          <Separator className={"w-16 md:w-60"} />
        </div>
        <div className={"flex flex-wrap justify-center items-start"}>
          <div
            className={
              "flex flex-grow basis-3 flex-col justify-center items-center text-center gap-4 px-5 md:px-20 mb-10"
            }
          >
            <p
              className={
                "bg-primary text-white py-2 px-3 w-fit rounded-2xl font-wotfardBold"
              }
            >
              01
            </p>
            <p className={"font-wotfardBold text-xl whitespace-nowrap"}>
              Create Account
            </p>
            <p className={"text-neutral-600"}>
              It’s very easy to open an account and start your journey.
            </p>
          </div>
          <div
            className={
              "flex flex-grow basis-3 flex-col justify-center items-center text-center gap-4 px-5 md:px-20 mb-10"
            }
          >
            <p
              className={
                "bg-primary text-white py-2 px-3 w-fit rounded-2xl font-wotfardBold"
              }
            >
              02
            </p>
            <p className={"font-wotfardBold text-xl whitespace-nowrap"}>
              Complete your profile
            </p>
            <p className={"text-neutral-600"}>
              Complete your profile with all the info to get attention of
              client.
            </p>
          </div>
          <div
            className={
              "flex flex-grow basis-3 flex-col justify-center items-center text-center gap-4 px-5 md:px-20 mb-10"
            }
          >
            <p
              className={
                "bg-primary text-white py-2 px-3 w-fit rounded-2xl font-wotfardBold"
              }
            >
              03
            </p>
            <p className={"font-wotfardBold text-xl whitespace-nowrap"}>
              Apply job
            </p>
            <p className={"text-neutral-600"}>
              Apply & get your preferable jobs with all the requirements and get
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFields;
