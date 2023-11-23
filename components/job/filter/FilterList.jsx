import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

const FilterList = ({ data, setParams, filterFor }) => {
  const [checkedValues, setCheckedValues] = useState([]);

  // This effect updates the filter when checkedValues change
  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      [filterFor]: checkedValues.length > 0 ? checkedValues : null,
    }));
  }, [checkedValues, setParams, filterFor]);

  // Handler for checkbox change
  const handleCheckboxChange = (itemValue, isChecked) => {
    setCheckedValues((prevCheckedValues) => {
      if (isChecked) {
        // Add the checked value if it's not already in the array
        return prevCheckedValues.includes(itemValue)
          ? prevCheckedValues
          : [...prevCheckedValues, itemValue];
      } else {

        return prevCheckedValues.filter((value) => value !== itemValue);
      }
    });
  };

  return (
    <div className={"h-full flex flex-col gap-0"}>
      {data.map((item) => (
        <label
          htmlFor={item.value}
          key={item.value}
          className={
            "flex items-center justify-between gap-2 hover:bg-secondary py-2 px-3 rounded-full cursor-pointer select-none"
          }
        >
          <div className={"flex items-center gap-2"}>
            <Checkbox
              id={item.value}
              value={item.value}
              checked={checkedValues.includes(item.value)}
              onCheckedChange={(isChecked) => {
                handleCheckboxChange(item.value, isChecked);
              }}
            />
            <p>{item.name}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default FilterList;