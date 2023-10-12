import styles from "@/components/styles.module.css"
import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SectionHero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={"h-screen flex justify-center items-center flex-col gap-4"}>
          <h1 className={"text-6xl w-[50%] text-center"}>Find your job without any hassle.</h1>
          <p className={"text-xl text-neutral-800"}>Jobs & Job search. Find jobs in global. Executive jobs & work. </p>
          <div className={"py-4 px-8 rounded-[1rem] bg-white flex items-center gap-2 mt-5"}>
            <div>
              <label htmlFor="category" className={"text-neutral-400"}>Job Categories</label>
              <Select>
                <SelectTrigger id={"category"} className={"pb-2 pr-5 w-[180px] rounded-none border-none outline-none shadow-none focus:ring-0 pl-0 pt-0"}>
                  <SelectValue placeholder="Select a Job Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="writer">Writer</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectGroup>
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