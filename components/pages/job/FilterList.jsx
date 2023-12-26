import {Checkbox} from "@/components/ui/checkbox";
import {useEffect, useState} from "react";

export default function FilterList({ data, setParams, id, onReset }) {
  const [checkedFilter, setCheckedFilter] = useState([]);

  useEffect(() => {
    if (onReset) {
      setCheckedFilter([]);
    }
  }, [onReset]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      [id]: checkedFilter.length > 0 ? checkedFilter : null,
    }));
  }, [checkedFilter, setParams, id]);

  const handleCheckboxChange = (itemValue, isChecked) => {
    setCheckedFilter((prev) => {
      if (isChecked) {
        // Add the checked value if it's not already in the array
        return prev.includes(itemValue)
          ? prev
          : [...prev, itemValue];
      } else {

        return prev.filter((value) => value !== itemValue);
      }
    });
  };

  return (
    <div className={"grid grid-cols-2 gap-3 w-full"}>
      {data.map((item) => (
        <label
          htmlFor={item.value}
          key={item.value}
          className={
            "cursor-pointer select-none"
          }
        >
          <div className={"flex items-center gap-2"}>
            <Checkbox
              id={item.value}
              value={item.value}
              checked={checkedFilter.includes(item.value)}
              onCheckedChange={(isChecked) => {
                handleCheckboxChange(item.value, isChecked);
              }}
            />
            <p>{item.label}</p>
          </div>
        </label>
      ))}
    </div>
  )
}
