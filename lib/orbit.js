"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function Orbit() {
  const main1Ref = useRef(null);
  const m1cGroupRefs = useRef([]);

  const setM1cGroupRef = el => {
    if (el && !m1cGroupRefs.current.includes(el)) {
      m1cGroupRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.set('.m1_stage', { x: '50%', opacity: 1 });

    const handleMouseMove = (e) => {
      gsap.to(m1cGroupRefs.current, {
        duration: 1,
        x: (i) => (e.clientX / window.innerWidth) / (i + 1) * 150,
        y: (i) => i * -20 * (e.clientY / window.innerHeight),
        rotation: Math.random() * 0.1,
        overwrite: 'auto'
      });

      gsap.to('.c1_solid, .c1_line', {
        duration: 1,
        attr: { opacity: 1.1 - 0.75 * (e.clientY / window.innerHeight) }
      });
    };

    const handleClick = (e) => {
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

    if (main1Ref.current) {
      main1Ref.current.addEventListener('mousemove', handleMouseMove);
      main1Ref.current.addEventListener('click', handleClick);
    }

    const handleResize = () => {
      gsap.set('.m1_stage', { x: '50%', opacity: 1 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (main1Ref.current) {
        main1Ref.current.removeEventListener('mousemove', handleMouseMove);
        main1Ref.current.removeEventListener('click', handleClick);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-screen">
      <div className={"w-[100%] h-[100%] overflow-hidden bg-transparent"}>
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
          </defs>

          <g className="m1_stage translate-y-1/3 translate-x-1/2" opacity={0}>

            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_line c1_line3"
                cx={0}
                cy={50}
                r={350}
                fill="none"
                strokeWidth={2}
                stroke="url(#grad1)"
                opacity="0.4"
              />
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_line c1_line2"
                cx={0}
                cy={50}
                r={260}
                fill="none"
                strokeWidth={2}
                stroke="url(#grad1)"
                opacity="0.5"
              />
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_solid"
                cx={0}
                cy={50}
                r={180}
                fill="url(#grad1)"
                opacity="0.2"
              />
              <circle
                className="c1_line c1_line1"
                cx={0}
                cy={50}
                r={179}
                fill="none"
                strokeWidth={3}
                stroke="url(#grad1)"
                opacity="0.5"
              />
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_solid"
                cx={0}
                cy={50}
                r={120}
                fill="url(#grad1)"
                opacity="0.4"
              />
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_solid"
                cx={0}
                cy={50}
                r={50}
                fill="url(#grad1)"
                opacity="0.5"
              />
            </g>
            <g className="m1_cGroup" ref={setM1cGroupRef}>
              <circle
                className="c1_solid"
                cx={0}
                cy={50}
                r={60}
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