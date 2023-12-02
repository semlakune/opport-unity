"use client";
import { Button } from "@/components/ui/button";
import styles from "@/components/styles/Navbar.module.css";
import {useState} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import {useSession} from "next-auth/react";
import UserNav from "@/components/UserNav";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar({ isLanding = false }) {
  const pathname = usePathname();

  const { data, status } = useSession();
  const { user } = data || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useIsomorphicLayoutEffect(() => {
    if (!isLanding) return;
    const navbar = document.getElementById("navbar");

    navbar.style.backgroundColor = "transparent";
    navbar.style.color = "black";

    const handleScroll = () => {
      if (window.scrollY > 0 && window.innerWidth > 768) {
        navbar.style.backgroundColor = "white";
        navbar.style.boxShadow = "0 0 10px rgba(0, 0, 0, .1)";
      } else if (window.scrollY > 0 && window.innerWidth <= 768) {
        navbar.style.backgroundColor = "white";
        navbar.style.boxShadow = "0 0 10px rgba(0, 0, 0, .1)";
      } else {
        navbar.style.backgroundColor = "transparent";
        navbar.style.boxShadow = "none";
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
    <header className={styles.navbar} id={"navbar"}>
      <div className={`flex items-center justify-between h-full px-5 md:px-8`}>
        <div className="flex gap-5 items-center">
          <Logo />
          {status === "loading" ? (
            <div className={"hidden md:flex gap-2"}>
              <Skeleton className={"w-20 h-4 bg-white"} />
              <Skeleton className={"w-20 h-4 bg-white"} />
              <Skeleton className={"w-20 h-4 bg-white"} />
            </div>
          ) : (
            <div className={"hidden md:flex"}>
              <Button variant={"link"} className={!isLanding ? "text-white" : "text-black"}>
                <Link href={"/jobs"}>Find Jobs</Link>
              </Button>
              {status === "authenticated" && (
                <>
                  <Button variant={"link"} className={!isLanding ? "text-white" : "text-black"}>
                    <Link href={"/jobs"}>Applications</Link>
                  </Button>
                  <Button variant={"link"} className={!isLanding ? "text-white" : "text-black"}>
                    <Link href={"/jobs"}>Saved Jobs</Link>
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
        <div className={`hidden md:flex items-center gap-4`}>
          {status === "authenticated" ? (
            <UserNav user={user} />
          ) : status === "unauthenticated" ? (
            <Link href={"/login"}>
              <Button>Sign In</Button>
            </Link>
          ) : (
            <Skeleton className={"h-8 w-8 rounded-full bg-white"} />
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
          isMenuOpen ? styles.slideEntered : styles.slideExited
        } absolute top-0 w-full h-screen bg-white z-10`}
      >
        <div
          className={
            "flex flex-col items-center justify-between h-full py-28 gap-5"
          }
        >
          <div className={"w-full h-full flex flex-col justify-end gap-4 px-5"}>
            <Link href={"/jobs"}>
              <Button variant={"secondary"} className={"py-6 w-full"}>
                Find Jobs
              </Button>
            </Link>
          </div>
          <div className={`w-full flex flex-col gap-4 px-5`}>
            <Link href={"/login"}>
              <Button className={"py-6 w-full"}>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Logo = ({ isHidden }) => {
  return (
    <Link href={"/"} className={isHidden && "hidden"}>
      <div className={"flex items-end z-20"}>
        <h1 className={"text-2xl logo cursor-pointer"}>OpportUnity</h1>
        <div className={"dot-logo"}></div>
      </div>
    </Link>
  )
}


