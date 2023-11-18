"use client"
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";
import {signOut, useSession} from "next-auth/react";
import {Logo} from "@/components/Header";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

const Sidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      icon: "",
      href: "/dashboard",
    },
    {
      name: "Profile",
      icon: "",
      href: "/dashboard/profile",
    },
    {
      name: "Account Settings",
      icon: "",
      href: "/dashboard/account-account-settings",
    },
    {
      name: "Saved Jobs",
      icon: "",
      href: "/dashboard/saved-jobs",
    },
    {
      name: "Applied Jobs",
      icon: "",
      href: "/dashboard/applied-jobs",
    }
  ]
  const { data, status, loading } = useSession()
  const { user } = data || {};

  return (
    <div className={"w-1/5 h-screen fixed top-0"}>
      <div className="px-8 py-4">
        <Logo />
      </div>
      <div className={"flex flex-col items-start justify-between p-10 h-full"}>
        <div className={"flex flex-col items-start justify-center gap-10"}>
          {user && !loading ? (
            <>
              <Avatar className="h-20 w-20 shadow-xl border-2 border-emerald-500">
                <AvatarImage
                  src={user.userType === 'USER' ? user.profile.photo : user.employer.logo}
                  alt={user.name}
                  className={"object-cover"}
                />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <p className={"text-xl font-bold"}>{user.name}</p>
              {menu.map((item, index) => (
                <Link href={item.href} key={index}>
                  {item.name}
                </Link>
              ))}
            </>
          ) : (
            <>
              <Skeleton className={"h-20 w-20 rounded-full"} />
              <Skeleton className={"h-6 w-40"} />
              {menu.map((item, index) => (
                <Skeleton key={index} className={"h-6 w-40"} />
              ))}
            </>
          )}
        </div>

        <div className={"mb-20"}>
          {user && !loading ? (
            <Button variant={"ghost"} onClick={() => signOut()}>Sign Out</Button>
          ) : (
            <Skeleton className={"h-10 w-40"} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;