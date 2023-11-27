"use client"
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Logo} from "@/components/Navbar";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {ExitIcon, HomeIcon, ReloadIcon} from "@radix-ui/react-icons";
import {menu} from "@/lib/constants";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator";
import {usePathname, useRouter} from "next/navigation";
import UserInfo from "@/components/dashboard/UserInfo";

const Sidebar = () => {
  const router = useRouter()
  const { data, status, loading } = useSession()
  const { user } = data || {};
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/dashboard");

  const pathname = usePathname();

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

  return (
    <div className={"relative w-[21rem] top-0 bg-white"}>
      <div className="h-screen">
        <div className="w-full flex items-center justify-center py-4">
          <Logo />
        </div>
        <div
          className={
            "flex flex-col items-start justify-between pb-10 py-5 px-5 h-full"
          }
        >
          <div className={"flex w-full flex-col items-start justify-center"}>
            {user && !loading ? (
              <>
                <UserInfo />
                <Separator className={"w-full"} />
                <div className={"w-full"}>
                  {menu.filter(menuItem => menuItem.user.includes(user?.userType) && menuItem.name !== "Create Job").map((item, index) => {
                    return (
                      <Link href={item.href} key={index}>
                        <div className={`flex items-center hover:bg-emerald-50 p-3 my-2 rounded-md ${activeMenu === item.href && 'bg-primary hover:bg-primary text-white'} transition-all duration-500`}>
                          {item.icon}
                          <p>
                            {item.name}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <Skeleton className={"h-20 w-20 mx-auto rounded-full"} />
                <Skeleton className={"h-6 w-full my-5"} />
                {menu.slice(0, 5).map((item, index) => (
                  <Skeleton key={index} className={"h-10 w-full my-2"} />
                ))}
              </>
            )}
          </div>

          <div className={"mb-20 w-full"}>
            {user && !loading ? (
              <div className={"space-y-2"}>
                <Button
                  className={"w-full"}
                  variant={"outline"}
                  onClick={() => router.push("/")}
                >
                  <HomeIcon className={"mr-2 h-4 w-4"} />
                  Back to Home
                </Button>
                <Button
                  className={"w-full"}
                  variant={"destructive"}
                  onClick={() => {
                    setIsSigningOut(true);
                    signOut();
                  }}
                  disabled={isSigningOut}
                >
                  {!isSigningOut ? (
                    <ExitIcon className={"mr-2 h-4 w-4"} />
                  ) : (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Skeleton className={"h-10 w-full"} />
                <Skeleton className={"h-10 w-full"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;