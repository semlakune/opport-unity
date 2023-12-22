"use client";
import home from "@/components/styles/home.module.css";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRightIcon,
  CodeIcon,
  MagicWandIcon,
  Pencil1Icon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import {Skeleton} from "@/components/ui/skeleton";
import {useRouter} from "next/navigation";

const HomeCategories = ({ categories, loading }) => {
  const router = useRouter();
  const icons = [
    {
      name: "Development",
      icon: <CodeIcon />,
    },
    {
      name: "Design",
      icon: <MagicWandIcon />,
    },
    {
      name: "Sales",
      icon: <PersonIcon />,
    },
    {
      name: "Marketing",
      icon: <RocketIcon />,
    },
    {
      name: "Writer",
      icon: <Pencil1Icon />,
    },
  ];
  const fields = categories?.slice(0, 5).map((category) => ({
    id: category.id,
    name: category.name,
    icon: icons.find((icon) => icon.name === category.name)?.icon,
    jobs: category.jobsCount,
  }));

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
              "text-2xl md:text-3xl text-center"
            }
          >
            Most Demanding Categories.
          </h1>
          <div className={"flex items-center cursor-pointer"}  onClick={() => router.push("/jobs")}>
            <p
              className={
                "text-sm md:text-lg font-bold whitespace-nowrap px-0 hidden md:block text-primary"
              }
            >
              Explore all fields
            </p>
            <ChevronRightIcon
              width={20}
              height={20}
              className={"text-primary hidden md:block"}
            />
          </div>
        </div>
        <div
          className={
            "flex flex-wrap justify-evenly items-center py-10 md:py-20 mx-auto gap-6"
          }
        >
          {!loading ? fields?.map((field, index) => (
            <div key={index} className={home.cardField} onClick={() => router.push(`/jobs?categoryIds=${field.id}`)}>
              <div className={home.innerCardField}>
                {field.icon}
                <p>{field.name}</p>
                <p className={"text-neutral-400"}>{field.jobs} jobs</p>
              </div>
            </div>
          )) : (
            [...Array(5)].map((_, index) => (
              <div key={index} className={home.cardField}>
                <Skeleton className={`${home.innerCardField} h-48`} />
              </div>
            ))
          )}
        </div>
        <div className={"flex items-center justify-center w-full gap-0"} onClick={() => router.push("/jobs")}>
          <p
            className={
              "text-center text-primary text-sm font-bold whitespace-nowrap px-0 md:hidden"
            }
          >
            Explore all fields
          </p>
          <ChevronRightIcon
            width={20}
            height={20}
            className={"text-primary md:hidden"}
          />
        </div>

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
                "bg-primary text-white py-2 px-3 w-fit rounded-2xl font-custombold"
              }
            >
              01
            </p>
            <p className={"font-custombold text-xl whitespace-nowrap"}>
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
                "bg-primary text-white py-2 px-3 w-fit rounded-2xl font-custombold"
              }
            >
              02
            </p>
            <p className={"font-custombold text-xl whitespace-nowrap"}>
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
                "bg-primary text-white py-2 px-3 w-fit rounded-2xl font-custombold"
              }
            >
              03
            </p>
            <p className={"font-custombold text-xl whitespace-nowrap"}>
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

export default HomeCategories;
