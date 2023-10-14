"use client"
import styles from "@/components/styles.module.css"
import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

import {useState} from "react";

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
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Select Category")

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={"h-screen flex justify-center items-center flex-col gap-4"}>
          <h1 className={"text-6xl w-[50%] text-center z-[2]"}>Find your job without any hassle.</h1>
          <p className={"text-xl text-neutral-800"}>Jobs & Job search. Find jobs in global. Executive jobs & work. </p>
          <div className={"py-4 px-8 rounded-[1rem] bg-white flex items-center gap-2 mt-5 z-[2]"}>
            <div>
              <label htmlFor="category" className={"text-neutral-400"}>Job Categories</label>
              <Menubar className={"custom-menubar"} onClick={() => console.log("click")}>
                <MenubarMenu>
                  <MenubarTrigger>{selectedOption}</MenubarTrigger>
                  <MenubarContent>
                    {categories.map((category, index) => (
                      <MenubarItem key={index} onClick={() => {
                        setSelectedOption(category.name)
                        setShowOptions(false)
                      }}>{category.name}</MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>

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