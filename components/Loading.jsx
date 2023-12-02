import gsap from "gsap";
import {useIsomorphicLayoutEffect} from "@/lib/useIsomorphicLayoutEffect";
export default function Loading({isLoading}) {
  const loader = () => {
    const tl = gsap.timeline({
      repeat: -1, // Loop the animation infinitely
      yoyo: true, // Make the timeline reverse on each iteration for a seamless loop
    });

    // Animate appearance without delay
    tl.from("#loader #text-container h1", {
      duration: 1,
      y: -40,
      skewY: 20,
      stagger: 0.2,
      ease: 'power3.inOut'
    });

    // Animate resting state
    tl.to("#loader #text-container h1", {
      duration: 0.5,
      y: 0,
      skewY: 0,
      stagger: 0.2,
      ease: 'power3.inOut'
    });

    // Animate disappearance
    tl.to("#loader #text-container h1", {
      duration: 1,
      y: 45,
      skewY: -20,
      stagger: 0.2,
      ease: 'power3.inOut'
    })
  }

  useIsomorphicLayoutEffect(() => {
    loader();
  }, [isLoading]);

  return (
    <div className="col-span-full w-full h-96 flex items-center justify-center" id={"loader"}>
      <div className="h-[40px] inline-flex overflow-hidden" id={"text-container"}>
        <h1>Opport</h1>
        <h1>Unity</h1>
      </div>
    </div>
  )
}