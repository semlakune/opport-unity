"use client"
import Link from "next/link";
import {signOut} from "next-auth/react";
import {Logo} from "@/components/Navbar";
import {Button} from "@/components/ui/button";
import {BackpackIcon, ExitIcon, PlusCircledIcon, ReloadIcon} from "@radix-ui/react-icons";
import {menu} from "@/lib/constants";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator";
import {usePathname, useRouter} from "next/navigation";
import UserInfo from "@/components/pages/dashboard/UserInfo";
import {logout} from "@/lib/features/auth/authSlice";
import {useAppDispatch, useAppSelector} from "@/lib/reduxHooks";

const Sidebar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/dashboard");

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard/my-jobs/create") {
      setActiveMenu("/dashboard/my-jobs");
    } else {
      setActiveMenu(pathname);
    }
  }, [pathname]);

  return (
    <div className={"relative w-[21rem] top-0 bg-slate-100"}>
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
            <>
              <UserInfo />
              <Separator className={"w-full"} />
              <div className={"w-full"}>
                {menu.filter(menuItem => menuItem.user.includes(user?.userType) && menuItem.name !== "Create Job").map((item, index) => {
                  return (
                    <Link href={item.href} key={index}>
                      <div className={`flex items-center p-3 my-2 rounded-md transition-all duration-500 ${activeMenu === item.href ? 'shadow-md bg-white' : 'hover:bg-white'}`}>
                        {item.icon}
                        {pathname === "/dashboard/my-jobs/create" && item.name === "My Jobs" ? (
                          <>
                            <p>My Jobs /</p>
                            <p className={"ml-1"}>
                              Create Job
                            </p>
                          </>
                        ) : (
                          <p>{item.name}</p>
                        )}
                      </div>
                    </Link>

                  );
                })}
              </div>
            </>
          </div>

          <div className={"mb-20 w-full"}>
            <div className={"space-y-2"}>
              {user?.userType === "USER" && (
                <Button
                  className={"w-full"}
                  onClick={() => router.push("/")}
                >
                  <BackpackIcon className={"mr-2 h-4 w-4"}/>
                  Find Jobs
                </Button>
              )}
              {user?.userType === "EMPLOYER" && (
                <Button
                  className={"w-full"}
                  onClick={() => router.push("/dashboard/my-jobs/create")}
                >
                  <PlusCircledIcon className={"mr-2 h-4 w-4"}/>
                  Create New Job
                </Button>
              )}
              <Button
                className={"w-full"}
                variant={"destructive"}
                onClick={async (e) => {
                  e.preventDefault();
                  setIsSigningOut(true);
                  await signOut();
                  await dispatch(logout());
                }}
                disabled={isSigningOut}
              >
                {!isSigningOut ? (
                  <ExitIcon className={"mr-2 h-4 w-4"}/>
                ) : (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                )}{" "}
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;