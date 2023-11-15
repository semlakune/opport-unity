import {Checkbox} from "@/components/ui/checkbox";

const FilterList = ({ data, setFilter }) => {
  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target.ariaChecked, e.target.value)
    if (e.target.ariaChecked === "false") {
      setFilter({
        category: null,
        jobType: null,
        workSystem: e.target.value,
      })
    }
  }
  return (
    <div className={"h-full flex flex-col gap-0"}>
      {data.map((item, index) => (
        <label htmlFor={item.value} key={index} className={"flex items-center justify-between gap-2 hover:bg-secondary py-2 px-3 rounded-full cursor-pointer select-none"}>
          <div className={"flex items-center gap-2"}>
            <Checkbox id={item.value} value={item.name} onClick={handleClick} />
            <p>{item.name}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

export default FilterList;