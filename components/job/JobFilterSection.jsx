import {gsap} from "gsap";
import {MinusCircledIcon, PlusCircledIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import {useEffect, useRef} from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const JobFilterSection = ({ title, isOpen, toggleOpen, children }) => {
  const contentRef = useRef(null);

  const getDynamicHeight = (element) => {
    const currentDisplay = element.style.display;
    element.style.display = 'block';
    const height = element.scrollHeight;
    element.style.display = currentDisplay;
    return height;
  };

  useEffect(() => {
    const content = contentRef.current;

    if (isOpen) {
      const animation = gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height: getDynamicHeight(content), opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      ScrollTrigger.refresh();
    } else {
      gsap.fromTo(
        content,
        { height: getDynamicHeight(content), opacity: 1 },
        { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }
      );
    }
  }, [isOpen]);

  return (
    <>
      <div className={"flex justify-between w-full items-center"} onClick={toggleOpen}>
        <h1 className={"text-sm font-wotfardRegular"}>{title}</h1>
        {isOpen ? (
          <MinusCircledIcon className={"cursor-pointer"} />
        ) : (
          <PlusCircledIcon className={"cursor-pointer"} />
        )}
      </div>
      <div ref={contentRef} className="overflow-hidden">
        {children}
      </div>
      <Separator />
    </>
  );
};

export default JobFilterSection;