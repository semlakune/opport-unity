import React from "react";
import job from "../job.module.css"
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
export default function SearchInput({ onSearchChange }) {

  return (
    <div className={job.search}>
      <MagnifyingGlassIcon className={"text-slate-400"}/>
      <input type="text" onChange={(e) => onSearchChange(e.target.value)} placeholder={"Search"}/>
    </div>
  )
}