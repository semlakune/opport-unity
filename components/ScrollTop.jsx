"use client"
import {useIsomorphicLayoutEffect} from "@/lib/useIsomorphicLayoutEffect";
import {ArrowUpIcon} from "@radix-ui/react-icons";

export default function ScrollTop() {
  useIsomorphicLayoutEffect(() => {
    const scrollBtn = document.querySelector(".scroll-top");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollBtn.style.opacity = "1";
      } else {
        scrollBtn.style.opacity = "0";
      }
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    return () => {
      window.removeEventListener("scroll", () => {});
      scrollBtn.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div className={"scroll-top"}>
      <ArrowUpIcon className={"inline-block"} />
    </div>
  )
}