"use client"
import {Button} from "@/components/ui/button";
import styles from "./styles.module.css"
import {useEffect, useState} from "react";

const Header = ({ isLanding = false }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    if (!isLanding) return;
    const header = document.querySelector("header");
    const logo = document.querySelector(".logo");
    const dot = document.querySelector(".dot-logo");
    const navIcon = document.querySelector("#nav-icon");

    header.style.backgroundColor = 'transparent';

    const handleScroll = () => {

      if (window.scrollY > 0 && window.innerWidth > 768) {
        header.style.backgroundColor = 'white';
        header.style.boxShadow = '0 0 10px rgba(0, 0, 0, .1)';
        logo.style.opacity = '0';
        dot.style.transform = 'translateX(-134px) translateY(-9px) scale(4)';
        dot.style.boxShadow = 'rgb(173, 243, 72) 0px 0px 3px 0.5px';
      } else if (window.scrollY > 0 && window.innerWidth <= 768) {
        header.style.backgroundColor = 'white';
        header.style.boxShadow = '0 0 10px rgba(0, 0, 0, .1)';
      } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
        logo.style.opacity = '1';
        dot.style.transform = 'translateX(0) translateY(0) scale(1)';
        dot.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header} id={"header"}>
      <div className={`flex items-center justify-between h-full px-5 md:px-8`}>
        <div className={"flex items-center z-20"}>
          <h1 className={"text-2xl logo"}>OpportUnity</h1>
          <div className={"dot-logo"}></div>
        </div>
        <div className={"hidden md:flex items-center gap-4"}>
          <Button variant={"ghost"}>Home</Button>
          <Button variant={"ghost"}>Job</Button>
          <Button variant={"ghost"}>Explore</Button>
          <Button variant={"ghost"}>Blog</Button>
        </div>
        <div className={"hidden md:flex items-center gap-4"}>
          <Button variant={"outline"}>Sign in</Button>
          <Button>Sign up</Button>
        </div>
        <div id={"nav-icon"} className={isMenuOpen ? 'open' : ''} onClick={handleOpenMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'slide-entered' : 'slide-exited'} absolute top-0 w-full h-screen bg-white z-10`}>
        <div className={"flex flex-col items-center justify-between h-full py-5"}>
          <div className={"w-full h-full flex flex-col justify-center gap-4 px-5"}>
            <Button variant={"ghost"} className={"py-6"}>Home</Button>
            <Button variant={"ghost"} className={"py-6"}>Job</Button>
            <Button variant={"ghost"} className={"py-6"}>Explore</Button>
            <Button variant={"ghost"} className={"py-6"}>Blog</Button>
          </div>
          <div className={"w-full flex flex-col gap-4 px-5"}>
            <Button className={"py-6"} variant={"outline"}>Sign in</Button>
            <Button className={"py-6"}>Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header