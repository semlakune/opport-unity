import {useState} from "react";

const useToggleFilter = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleFilter = (filterName) => {
    setIsOpen(prevState => ({ ...prevState, [filterName]: !prevState[filterName] }));
  };

  const collapseOrExpandAll = () => {
    const allOpen = Object.values(isOpen).every(value => value);
    setIsOpen(state => {
      const newState = {};
      for (let key in state) {
        newState[key] = !allOpen;
      }
      return newState;
    });
  };

  return [isOpen, toggleFilter, collapseOrExpandAll];
};

export default useToggleFilter;