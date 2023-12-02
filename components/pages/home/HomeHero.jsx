"use client"
import home from "@/components/styles/home.module.css"
import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const HomeHero = ({ categories }) => {

  return (
    <section className={home.hero}>
      <div className="container">
        <div className={"flex justify-center items-center flex-col gap-4"}>
          <h1 className={"text-4xl md:text-6xl w-full md:w-1/2 text-center z-[2]"}>Find your job without any hassle.</h1>
          <p className={"text-xl text-neutral-800 z-[2] text-center"}>Jobs & Job search. Find jobs in global. Executive jobs & work. </p>
          <div className={"py-6 md:py-4 px-6 md:px-8 rounded-[1rem] bg-white flex flex-col md:flex-row items-center gap-2 mt-5 z-[2] w-full md:w-max"}>
            <div className={"w-full flex flex-col md:flex-row mb-5 md:mb-0"}>
              <div>
                <label className={"text-neutral-400"}>Job Categories</label>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px] border-none px-0 shadow-none focus:ring-0 rounded-none">
                    <SelectValue placeholder="Select Job Category" aria-label={"Job Category"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator orientation={"vertical"} className={"mx-4 hidden md:block"} />
              <Separator orientation={"horizontal"} className={"my-3 md:hidden"} />
              <div>
                <label htmlFor="keyword" className={"text-neutral-400"}>Keyword or Title</label>
                <Input type="text" id="keyword" placeholder="Design, Frontend" className={"py-2 pr-5 w-[180px] rounded-none border-none outline-none shadow-none focus-visible:ring-0 pl-0"} />
              </div>
            </div>
            <Button size={"lg"} className={"py-6 w-full md:w-auto"}>SEARCH</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;