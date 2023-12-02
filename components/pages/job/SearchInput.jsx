import React, {useState} from "react";
import job from "@/components/styles/job.module.css";
import {Cross2Icon, MagnifyingGlassIcon, SewingPinIcon} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TbWallet } from "react-icons/tb";

export default function SearchInput({ locations, handleClickSearch }) {
  const [searchForm, setSearchForm] = useState({
    keyword: "",
    location: "",
    salary: "",
  });

  const formatNumber = (value) => {
    let numericValue = value.replace(/[^0-9]/g, "");
    numericValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return numericValue;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "salary" ? e.target.value = formatNumber(value) : value;
    setSearchForm(prev => ({ ...prev, [name]: formattedValue }));
  }

  const handleClear = (e, name) => {
    e.preventDefault();
    setSearchForm(prev => ({ ...prev, [name]: "" }));
    handleClickSearch({...searchForm, [name]: ""})
  }
  const onSubmit = (e) => {
    e.preventDefault();
    handleClickSearch(searchForm);
  };

  return (
    <form onSubmit={onSubmit} className={job.search}>
      <div className={"flex items-center gap-1 ml-2 w-full"}>
        <MagnifyingGlassIcon className={"text-slate-400"} />
        <input
          type="text"
          name={"keyword"}
          id={"keyword"}
          value={searchForm.keyword}
          onChange={handleChange}
          placeholder={"Job Title or Companies"}
        />
        {searchForm.keyword && <Cross2Icon onClick={(e) => handleClear(e, "keyword")} className={"text-slate-400 cursor-pointer"} />}
      </div>
      <Separator orientation={"vertical"} className={"h-[60%] hidden md:flex"} />
      <div className={"hidden md:flex items-center gap-1 ml-2 w-full"}>
        <SewingPinIcon className={"text-slate-400"} />
        <Select name={"location"} value={searchForm.location} onValueChange={(value) => handleChange({
          target: {
            name: "location",
            value: value,
          }
        })}>
          <SelectTrigger className="w-full border-none px-0 shadow-none focus:ring-0 rounded-none">
            <SelectValue placeholder="Location" aria-label={"Location"} />
          </SelectTrigger>
          <SelectContent className={"max-h-60"}>
            {locations && [{ label: "All Location", value: "all" }, ...locations]?.map((location, index) => {
              return (
                <SelectItem key={index} value={location.value}>
                  {location.label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        {searchForm.location && <Cross2Icon onClick={(e) => handleClear(e, "location")} className={"text-slate-400 cursor-pointer"} />}
      </div>
      <Separator orientation={"vertical"} className={"h-[60%] hidden md:flex"} />
      <div className={"hidden md:flex items-center gap-1 ml-2 w-full"}>
        <TbWallet className={"text-slate-400"} />
        <input
          type="text"
          name={"salary"}
          id={"salary"}
          min="1"
          value={searchForm.salary}
          onChange={handleChange}
          placeholder={"Salary"}
        />
        {searchForm.salary && <Cross2Icon onClick={(e) => handleClear(e, "salary")} className={"text-slate-400 cursor-pointer"} />}
      </div>
      <Separator orientation={"vertical"} className={"h-[60%] hidden md:flex"} />
      <Button className={"text-white px-10 py-5"} type={"submit"}>Search</Button>
    </form>
  );
}