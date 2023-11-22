import React, { useState, useEffect, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

const InputList = forwardRef(
  ({ value, onChange, placeholder, className, ...props }, ref) => {
    const [lists, setLists] = useState([]);
    const [isCollapse, setIsCollapse] = useState(false);

    useEffect(() => {
      if (value) {
        setLists(value);
      }
    }, [value]);

    const removeList = (indexToRemove) => {
      const newList = lists.filter((_, index) => index !== indexToRemove);
      setLists(newList);
      onChange(newList);
    };

    const addTag = (list) => {
      const newList = [...lists, list];
      setLists(newList);
      onChange(newList);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const value = e.target.value.trim();
        if (value && !lists.includes(value)) {
          addTag(value);
          e.target.value = ""; // Clear input
        }
      } else if (e.key === "Backspace" && !e.target.value) {
        removeList(lists.length - 1);
      }
    };

    return (
      <div className={cn("flex flex-col", className)}>
        <div
          className={`w-full flex items-center justify-center cursor-pointer ${
            lists.length < 1 && "hidden"
          }`}
          onClick={() => setIsCollapse(!isCollapse)}
        >
          {isCollapse ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </div>
        <ul className={`list-disc space-y-2 ${isCollapse && "hidden"}`}>
          {lists.map((list, index) => (
            <li
              key={index}
              className="flex items-center justify-between break-all gap-5 text-sm bg-secondary rounded-md px-3 py-2"
            >
              {list}
              <button
                type="button"
                className="text-primary hover:text-lime-500 focus:outline-none"
                onClick={() => removeList(index)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder || "Type something and press enter or comma"}
          onKeyDown={handleKeyDown}
          className={cn(
            `h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-sm ${
              lists.length > 0 && "mt-2"
            }`,
            className,
          )}
        />
      </div>
    );
  },
);

InputList.displayName = "InputList";

export default InputList;
