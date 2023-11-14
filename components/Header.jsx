"use client";
import { Button } from "@/components/ui/button";
import header from "./header.module.css";
import {useEffect, useState} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import {useSession} from "next-auth/react";
import UserNav from "@/components/UserNav";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {getUser} from "@/lib/actions";
import useUserStore from "@/store/useUserStore";

const Header = ({ isLanding = false }) => {
  const pathname = usePathname();
  const { setUserDetails } = useUserStore();

  const { data, status } = useSession()
  const { user } = data || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUser(user?.username).then((res) => {
        setUserDetails(res);
      });
    }
  }, [status]);

  useIsomorphicLayoutEffect(() => {
    const header = document.querySelector("header");

    header.style.backgroundColor = "transparent";

    const handleScroll = () => {
      if (window.scrollY > 0 && window.innerWidth > 768) {
        header.style.backgroundColor = "white";
        header.style.boxShadow = "0 0 10px rgba(0, 0, 0, .1)";
      } else if (window.scrollY > 0 && window.innerWidth <= 768) {
        header.style.backgroundColor = "white";
        header.style.boxShadow = "0 0 10px rgba(0, 0, 0, .1)";
      } else {
        header.style.backgroundColor = "transparent";
        header.style.boxShadow = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className={header.header} id={"header"}>
      <div className={`flex items-center justify-between h-full px-5 md:px-8`}>
        <Logo />
        <div className={`hidden md:flex items-center gap-4`}>
          {pathname === "/" ? (
            <Link href={"/job"}>
              <Button variant={"secondary"}>Find Jobs</Button>
            </Link>
          ) : (
            <Button variant={"outline"} className={"pr-10 hover:pr-20 transition-all duration-500"}><MagnifyingGlassIcon className={"mr-2"} /> Search</Button>
          )}
          {status === "authenticated" ? (
            <UserNav user={user} />
          ) : (
            <Link href={"/login"}>
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
        <div
          id={"nav-icon"}
          className={isMenuOpen ? "open" : ""}
          onClick={handleOpenMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {/*MENU IN HAMBURGER*/}
      <div
        className={`${
          isMenuOpen ? header.slideEntered : header.slideExited
        } absolute top-0 w-full h-screen bg-white z-10`}
      >
        <div
          className={"flex flex-col items-center justify-between h-full py-28"}
        >
          <div
            className={"w-full h-full flex flex-col justify-center gap-4 px-5"}
          >
            <Link href={"/"}>
              <Button variant={"ghost"} className={"py-6"}>
                Home
              </Button>
            </Link>

            <Link href={"/job"}>
              <Button variant={"ghost"} className={"py-6"}>
                Job
              </Button>
            </Link>
          </div>
          <div className={`w-full flex flex-col gap-4 px-5`}>
            <Link href={"/login"}>
              <Button className={"py-6"}>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const Logo = ({ isHidden }) => {
  return (
    <Link href={"/"} className={isHidden && "hidden"}>
      <div className={"flex items-center z-20"}>
        <h1 className={"text-2xl logo cursor-pointer"}>OpportUnity</h1>
        <div className={"dot-logo"}></div>
      </div>
    </Link>
  )
}

export default Header;
