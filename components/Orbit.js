"use client";
import React, {useRef} from 'react';
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faCircle,
  faPlanetRinged
} from "@fortawesome/pro-solid-svg-icons";
import { faUfo } from "@fortawesome/pro-duotone-svg-icons";
import {useIsomorphicLayoutEffect} from "@/lib/useIsomorphicLayoutEffect";

gsap.registerPlugin(MotionPathPlugin);

export default function Orbit() {
  const main1Ref = useRef(null);
  const m1StageRef = useRef(null);
  const m1cGroupRefs = useRef([]);

  const setM1cGroupRef = el => {
    if (el && !m1cGroupRefs.current.includes(el)) {
      m1cGroupRefs.current.push(el);
    }
  };

  const timeline = useRef(gsap.timeline({ defaults: { duration: 45 } }));

  useIsomorphicLayoutEffect(() => {
    const mainRef = main1Ref.current
    const m1Stage = m1StageRef.current;
    const handleResize = () => {
      gsap.set(m1Stage, { x: '50%', opacity: 1 });
    };

    const handleMouseMove = (e) => {
      const xOffset = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const yOffset = (e.clientY - window.innerHeight / 2) / window.innerHeight;

      m1cGroupRefs.current.forEach((element, i) => {
        const magnitude = (m1cGroupRefs.current.length - i) * 30;
        gsap.to(element, {
          x: xOffset * magnitude,
          y: yOffset * magnitude,
          overwrite: 'auto',
          duration: 0.5
        });
      });
    };

    const handleClick = () => {
      if (gsap.getProperty('.m1_cGroup', 'scale') !== 1) return;
      m1cGroupRefs.current.forEach((element, i) => {
        gsap.fromTo(element, {
          transformOrigin: '50% 50%',
          scale: 1
        }, {
          duration: 0.7 - i / 25,
          scale: 0.9,
          ease: 'back.in(10)',
          yoyo: true,
          repeat: 1
        });
      });
    };

    if (mainRef) {
      mainRef.addEventListener('mousemove', handleMouseMove);
      mainRef.addEventListener('click', handleClick);
    }

    const tl = timeline.current;
    const ctx = gsap.context(() => {
      tl.from(mainRef, { duration: 1, autoAlpha: 0, ease: 'power1.inOut' }, 0)
        .fromTo('.m1_cGroup', {
          opacity: 0
        }, {
          duration: 0.3,
          opacity: 1,
          stagger: -0.1
        }, 0)
        .from('.m1_cGroup', {
          duration: 2.5,
          scale: -0.3,
          transformOrigin: '50% 50%',
          stagger: -0.05,
          ease: 'elastic'
        }, 0)
        .fromTo('.m1Bg', {
          opacity: 0
        }, {
          duration: 1,
          opacity: 1,
          ease: 'power2.inOut'
        }, 0.2)

        .add('orbs', 1.2)
        .fromTo('.orb1',
          { xPercent: -35, yPercent: -5 },
          {
            motionPath: {
              path: function() {
                return MotionPathPlugin.convertToPath('.c1_line1', false)[0]
              },
              start: 1.03,
              end: 1.22
            },
            ease: 'none', yoyo: true, repeat: -1
          }, 'orbs')

        .fromTo('.orb3', {
          xPercent: -50,
          yPercent: -15
        }, {
          motionPath: {
            path: function() {
              return MotionPathPlugin.convertToPath('.c1_line3', false)[0]
            },
            start: 1.06,
            end: 1.31
          },
          ease: 'none',
          yoyo: true,
          repeat: -1
        }, 'orbs')

        .fromTo('.orb3b', {
          xPercent: -50,
          yPercent: -25
        }, {
          motionPath: {
            path: function() {
              return MotionPathPlugin.convertToPath('.c1_line3', false)[0]
            },
            start: 1.49,
            end: 1.65
          },
          ease: 'none',
          yoyo: true,
          repeat: -1
        }, 'orbs')

        .fromTo('.orb3c', {
          xPercent: -45,
          yPercent: -15
        }, {
          motionPath: {
            path: function() {
              return MotionPathPlugin.convertToPath('.c1_line3', false)[0]
            },
            start: 0.95,
            end: 1.2
          },
          ease: 'none',
          yoyo: true,
          repeat: -1
        }, 'orbs')

        .fromTo('.orb4', {
          xPercent: -50,
          yPercent: -25
        }, {
          motionPath: {
            path: function() {
              return MotionPathPlugin.convertToPath('.c1_line4', false)[0]
            },
            start: 1.14,
            end: 1.26
          },
          ease: 'none',
          yoyo: true,
          repeat: -1
        }, 'orbs')

        .fromTo('.orb4b', {
          xPercent: -50,
          yPercent: -25
        }, {
          motionPath: {
            path: function() {
              return MotionPathPlugin.convertToPath('.c1_line4', false)[0]
            },
            start: 1.41,
            end: 1.6
          },
          ease: 'none',
          yoyo: true,
          repeat: -1
        }, 'orbs')

        .fromTo(".m1Orb", {
          scale: 0,
          transformOrigin: '50% 50%'
        }, {
          duration: 0.8,
          scale: 1.5,
          ease: 'back.out(3)',
          stagger: 0.15,
          overwrite: 'auto'
        }, 'orbs')
        .fromTo('.m1OrbBlank', {
          opacity: 0
        }, {
          duration: 0.8,
          opacity: function(i) {
            return 0.2 + i / 7
          },
          stagger: 0.1,
          overwrite: 'auto'
        }, 'orbs')
        .fromTo('.m1OrbBlank', {
          x: function(i) {
            return 620 - i / 4 * 380
          },
          transformOrigin: function(i) {
            return -(620 - i / 4 * 380) + 'px 0px'
          },
          rotation: function(i) {
            return [99, -10, 55, 110, 120][i]
          }
        }, {
          rotation: '+=75',
          yoyo: true,
          repeat: -1
        }, 'orbs')

    }, mainRef);

    handleResize()
    // document.addEventListener('load', handleResize);
    // document.addEventListener('resize', handleResize);

    return () => {
      if (mainRef) {
        mainRef.removeEventListener('mousemove', handleMouseMove);
        mainRef.removeEventListener('click', handleClick);
      }
      // document.removeEventListener('load', handleResize);
      // document.removeEventListener('resize', handleResize);
      ctx?.revert();
    };
  }, []);

  return (
    <div className={"absolute left-0 h-full w-full"}>
      <div className={"bg-transparent w-full h-full"}>
        <svg ref={main1Ref} className="main1" width="100%" height="100%">
          <defs>
            <linearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop
                offset="10%"
                style={{ stopColor: "rgb(255,255,0)", stopOpacity: "0.9" }}
              />
              <stop
                offset="99%"
                style={{ stopColor: "rgb(0,255,0)", stopOpacity: "0.1" }}
              />
            </linearGradient>
            <linearGradient id="grad2" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop
                offset="25%"
                style={{ stopColor: "rgb(0,255,200)", stopOpacity: "0.1" }}
              />
              <stop
                offset="99%"
                style={{ stopColor: "rgb(200,255,0)", stopOpacity: "0.2" }}
              />
            </linearGradient>
          </defs>
          <rect className="m1Bg" fill="url(#grad2)" width="100%" height="100%" />
          {/*translate(60%, 40%) scale(0.8)*/}
          <g className="m1_stage md:translate-y-1/2 md:translate-x-1/3 scale-[0.8]" ref={m1StageRef} opacity={0}>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle className="m1OrbBlank" cx={0} cy={50} r={50} fill="#1290ff" />
              <circle
                className="c1_line c1_line4"
                cx={0}
                cy={50}
                r={550}
                fill="none"
                strokeWidth={2}
                stroke="url(#grad1)"
                opacity="0.4"
              />
              <g className="m1Orb orb4b">
                <FontAwesomeIcon icon={faEarthAsia} width={30} height={30} color={"#106504"} opacity={0.6}  />
              </g>
              <g className="m1Orb orb4">
                <FontAwesomeIcon icon={faCircle} width={40} height={40} color={"#ca9100"} opacity={0.6} />
              </g>
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle className="m1OrbBlank" cx={0} cy={50} r={25} fill="#983334" />
              <circle
                className="c1_line c1_line3"
                cx={0}
                cy={50}
                r={430}
                fill="none"
                strokeWidth={2}
                stroke="url(#grad1)"
                opacity="0.4"
              />
              <g className="m1Orb orb3c">
                <FontAwesomeIcon icon={faCircle} width={20} height={20} color={"#390669"} opacity={0.3}  />
              </g>
              <g className="m1Orb orb3b">
                <FontAwesomeIcon icon={faPlanetRinged} width={40} height={40} color={"#064069"} opacity={0.3} />
              </g>
              <g className="m1Orb orb3">
                <FontAwesomeIcon icon={faUfo} width={50} height={50} opacity={0.6}   />
              </g>
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle className="m1OrbBlank" cx={0} cy={50} r={15} fill="#653997" />
              <circle
                className="c1_line c1_line2"
                cx={0}
                cy={50}
                r={360}
                fill="none"
                strokeWidth={2}
                stroke="url(#grad1)"
                opacity="0.5"
              />
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle className="m1OrbBlank" cx={50} cy={10} r={20} fill="#F8BDCE" />
              <circle
                className="m1OrbBlank"
                cx={0}
                cy={50}
                r={40}
                fill="rgba(125,200,32,0.19)"
              />
              <circle
                className="c1_solid"
                cx={0}
                cy={50}
                r={280}
                fill="url(#grad1)"
                opacity="0.2"
              />
              <circle
                className="c1_line c1_line1"
                cx={0}
                cy={50}
                r={279}
                fill="none"
                strokeWidth={3}
                stroke="url(#grad1)"
                opacity="0.5"
              />
              <g className="m1Orb orb1">
                <circle cx="12.5" cy={7} r={17} fill="#D1CCE3" />
                <circle cx="12.5" cy={7} r={20} fill="none" stroke="#D1CCE3" />
              </g>
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_solid"
                cx={0}
                cy={50}
                r={220}
                fill="url(#grad1)"
                opacity="0.4"
              />
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_solid"
                cx={0}
                cy={50}
                r={150}
                fill="url(#grad1)"
                opacity="0.5"
              />
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_solid"
                cx={0}
                cy={50}
                r={80}
                fill="#9e0"
                opacity="0.6"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}