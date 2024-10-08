"use client";
import gsap from "gsap";
import {useEffect} from "react";
import {twMerge} from "tailwind-merge";
export default function Loading({ className }) {
  const loader = () => {
    const tl = gsap.timeline({
      repeat: -1, // Loop the animation infinitely
      yoyo: true, // Make the timeline reverse on each iteration for a seamless loop
    });

    tl.to("#loader #text-container h1", {
      duration: 1,
      y: 45,
      skewY: -20,
      stagger: 0.2,
      ease: 'power3.inOut'
    })
  }

  useEffect(() => {
    loader();
  }, []);

  return (
    <div className={twMerge("col-span-full w-full h-[60vh] flex items-center justify-center", className)} id={"loader"}>
      <div className="h-[40px] inline-flex overflow-hidden" id={"text-container"}>
        <h1>Opport</h1>
        <h1>Unity</h1>
      </div>
    </div>
  )
}