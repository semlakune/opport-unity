import {Checkbox} from "@/components/ui/checkbox";

const FilterList = ({ data }) => (
  <div className={"h-full flex flex-col gap-0"}>
    {data.map((item, index) => (
      <label htmlFor={item.value} key={index} className={"flex items-center justify-between gap-2 hover:bg-secondary py-2 px-3 rounded-full cursor-pointer select-none"}>
        <div className={"flex items-center gap-2"}>
          <Checkbox id={item.value} />
          <p>{item.name}</p>
        </div>
      </label>
    ))}
  </div>
);

export default FilterList;