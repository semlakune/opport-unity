"use client"
import {Button} from "@/components/ui/button";
import styles from "./styles.module.css"
import {useEffect} from "react";

const Header = ({ isLanding = false }) => {

  useEffect(() => {
    if (!isLanding) return;
    const header = document.querySelector("header");
    const logo = document.querySelector(".logo");
    const dot = document.querySelector(".dot-logo");

    header.style.backgroundColor = 'transparent';

    const handleScroll = () => {

      if (window.scrollY > 0) {
        header.style.backgroundColor = 'white';
        header.style.boxShadow = '0 0 10px rgba(0, 0, 0, .1)';
        logo.style.opacity = '0';
        dot.style.transform = 'translateX(-134px) translateY(-9px) scale(4)';
        dot.style.boxShadow = 'rgb(173, 243, 72) 0px 0px 3px 0.5px';
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

  return (
    <header className={styles.header} id={"header"}>
      <div className={"flex items-center justify-between h-full px-8"}>
        <div className={"flex items-center"}>
          <h1 className={"text-2xl logo"}>OpportUnity</h1>
          <div className={"dot-logo"}></div>
        </div>
        <div className={"flex items-center gap-4"}>
          <Button variant={"ghost"}>Home</Button>
          <Button variant={"ghost"}>Job</Button>
          <Button variant={"ghost"}>Explore</Button>
          <Button variant={"ghost"}>Blog</Button>
        </div>
        <div className={"flex items-center gap-4"}>
          <Button variant={"outline"}>Sign in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  )
}

export default Header