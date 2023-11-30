"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function AuthTemplate({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={"relative top-1/2 -translate-y-1/2"}>
      <div className={"flex flex-col gap-5 justify-start items-center h-screen py-20"}>
        <div className={"flex gap-2"}>
          <h1>Hi, Welcome </h1>
          <h1 className={"rotate-45 animate-wave w-10 h-10"}>👋</h1>
        </div>
        <Tabs defaultValue={pathname.split("/")[1]} className="w-[280px] sm:w-[320px] md:w-[400px]">
          <TabsList className="grid w-full grid-cols-2 bg-white backdrop-blur bg-opacity-50">
            <TabsTrigger
              value="login"
              className={
                "data-[state=active]:bg-primary data-[state=active]:text-white w-full"
              }
              onMouseDown={() => router.push("/login")}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className={
                "data-[state=active]:bg-primary data-[state=active]:text-white w-full"
              }
              onMouseDown={() => router.push("/register")}
            >
              Register
            </TabsTrigger>
          </TabsList>
          <Suspense fallback={<Skeleton className={"w-full h-80 mt-2 rounded-2xl"} /> }>
            {children}
          </Suspense>
        </Tabs>
        <Link
          href={"/"}
          className={
            "text-sm text-primary flex items-center justify-between gap-2"
          }
        >
          <span>
            <ArrowLeftIcon />{" "}
          </span>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
