import { useState, useEffect } from 'react';
import {cn} from "@/lib/utils";

export default function TagsInput({ value, onChange, placeholder, className }) {
  const [tags, setTags] = useState([]);

  // Update local tags when the value changes from the outside
  useEffect(() => {
    if (value) {
      setTags(value);
    }
  }, [value]);

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onChange(newTags); // Propagate changes to useForm
  };

  const addTag = (tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    onChange(newTags); // Propagate changes to useForm
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !tags.includes(value)) {
        addTag(value);
        e.target.value = ''; // Clear input
      }
    } else if (e.key === 'Backspace' && !e.target.value) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tags.map((tag, index) => (
        <div key={index} className="flex max-w-full break-all items-center gap-1 bg-secondary text-black text-sm px-2 py-1 rounded">
          {tag}
          <button
            type="button"
            className="text-primary hover:text-lime-500 focus:outline-none"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        placeholder={placeholder || 'Type something and press enter or comma'}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
    </div>
  );
}