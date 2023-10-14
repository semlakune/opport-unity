"use client"
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SlidingBox = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(null);
  const [currentImgProps, setCurrentImgProps] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const boxesRef = useRef([]);



  return (
    <div className={"absolute overflow-hidden max-h-[880px] top-0"}>
      <div className="main">
        <div className="mainBoxes fs" />
      </div>
    </div>
  )
}

export default SlidingBox