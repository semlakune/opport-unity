"use client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/pro-solid-svg-icons";
import {useEffect} from "react";

export default function ScrollTop() {
  useEffect(() => {
    const scrollBtn = document.querySelector(".scroll-top");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        // scrollBtn.classList.add("active");
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
        // scrollBtn.classList.remove("active");
      }
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, []);
  return (
    <div className={"scroll-top"}>
      <FontAwesomeIcon icon={faArrowUp} className={"text-sm"} />
    </div>
  )
}