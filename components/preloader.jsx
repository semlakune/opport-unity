"use client"

import {useEffect} from "react";
import gsap from "gsap";

export default function Preloader() {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".preloader .text-container h1", {
      y: 0,
      skewY: 0,
      stagger: 0.2,
      ease: 'power3.inOut'
    })
      .to(".preloader .text-container h1", {
        duration: 1,
        y: 70,
        skewY: -20,
        stagger: 0.2,
        ease: 'power3.inOut'
      })
      .to(".preloader", {
        duration: 1,
        height: "0vh",
        ease: 'power3.inOut'
      })
      .to(
        "body",
        {
          overflow: "auto"
        },
        "-=2"
      )
      .to(".preloader", {
        display: "none"
      });
  }, []);
  return (
    <div className="preloader">
      <div className="text-container">
        <h1>Opport</h1>
        <h1>Unity</h1>
      </div>
    </div>
  )
}