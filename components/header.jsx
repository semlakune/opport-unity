"use client"
import {Button} from "@/components/ui/button";
import header from "./header.module.css"
import {useState} from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import {useIsomorphicLayoutEffect} from "@/lib/utils";

const Header = ({ isLanding = false }) => {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useIsomorphicLayoutEffect(() => {
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
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
    <header className={header.header} id={"header"}>
      <div className={`flex items-center justify-between h-full px-5 md:px-8`}>
        <div className={"flex items-center z-20"}>
          <Link href={"/"}><h1 className={"text-2xl logo cursor-pointer"}>OpportUnity</h1></Link>
          <div className={"dot-logo"}></div>
        </div>
        <div className={"hidden md:flex items-center gap-4"}>
          <Button variant={"ghost"} disabled={pathname === "/"}>
            <Link href={"/"}>Home</Link>
          </Button>
          <Button variant={"ghost"} disabled={pathname === "/job"}>
            <Link href={"/job"}>Job</Link>
          </Button>
          <Button variant={"ghost"} disabled={pathname === "/explore"}>
            <Link href={"/explore"}>Explore</Link>
          </Button>
          <Button variant={"ghost"} disabled={pathname === "/blog"}>
            <Link href={"/blog"}>Blog</Link>
          </Button>
        </div>
        <div className={`hidden md:flex items-center gap-4 ${!isLanding && 'md:hidden'}`}>
          <Button>
            <Link href={"/signin"}>Sign In</Link>
          </Button>
        </div>
        <div id={"nav-icon"} className={isMenuOpen ? 'open' : ''} onClick={handleOpenMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {/*MENU IN HAMBURGER*/}
      <div className={`${isMenuOpen ? header.slideEntered : header.slideExited} absolute top-0 w-full h-screen bg-white z-10`}>
        <div className={"flex flex-col items-center justify-between h-full py-28"}>
          <div className={"w-full h-full flex flex-col justify-center gap-4 px-5"}>
            <Button variant={"ghost"} className={"py-6"}>
              <Link href={"/"}>Home</Link>
            </Button>
            <Button variant={"ghost"} className={"py-6"}>
              <Link href={"/job"}>Job</Link>
            </Button>
            <Button variant={"ghost"} className={"py-6"}>
              <Link href={"/explore"}>Explore</Link>
            </Button>
            <Button variant={"ghost"} className={"py-6"}>
              <Link href={"/blog"}>Blog</Link>
            </Button>
          </div>
          <div className={`w-full flex flex-col gap-4 px-5 ${!isLanding && 'hidden'}`}>
            <Button className={"py-6"}>
              <Link href={"/signin"}>Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header