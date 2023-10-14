"use client"
import styles from "@/components/styles.module.css"
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

const SectionHero = () => {
  const categories = [
    {
      name: "Development",
      value: "development",
    },
    {
      name: "Data",
      value: "data",
    },
    {
      name: "Accounting",
      value: "accounting",
    },
    {
      name: "Design",
      value: "design",
    },
    {
      name: "Marketing",
      value: "marketing",
    },
    {
      name: "Writer",
      value: "writer",
    },
    {
      name: "Product",
      value: "product",
    }
  ]

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={"h-screen flex justify-center items-center flex-col gap-4"}>
          <h1 className={"text-6xl w-[50%] text-center z-[2]"}>Find your job without any hassle.</h1>
          <p className={"text-xl text-neutral-800 z-[2]"}>Jobs & Job search. Find jobs in global. Executive jobs & work. </p>
          <div className={"py-4 px-8 rounded-[1rem] bg-white flex items-center gap-2 mt-5 z-[2]"}>
            <div>
              <label htmlFor="category" className={"text-neutral-400"}>Job Categories</label>
              <Select>
                <SelectTrigger className="w-[180px] border-none px-0 shadow-none focus:ring-0 rounded-none">
                  <SelectValue placeholder="Select Job Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.value}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator orientation={"vertical"} className={"mx-4"} />
            <div>
              <label htmlFor="keyword" className={"text-neutral-400"}>Keyword or Title</label>
              <Input type="text" id="keyword" placeholder="Design, Frontend" className={"pb-2 pr-5 w-[180px] rounded-none border-none outline-none shadow-none focus-visible:ring-0 pl-0 pt-0"} />
            </div>
            <Button size={"lg"} className={"py-6"}>SEARCH</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionHero;