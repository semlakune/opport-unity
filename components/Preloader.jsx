"use client"

import gsap from "gsap";
import {usePathname, useSearchParams} from 'next/navigation';
import {useIsomorphicLayoutEffect} from "@/lib/useIsomorphicLayoutEffect";

export default function Preloader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const runPreloader = () => {
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
  }

  useIsomorphicLayoutEffect(() => {
    runPreloader();
  }, [pathname, searchParams]);
  return (
    <div className="preloader">
      <div className="text-container">
        <h1>Opport</h1>
        <h1>Unity</h1>
      </div>
    </div>
  )
}