"use client";
import {usePathname} from "next/navigation";
import {menu} from "@/lib/constants";

export default function DashboardTemplate({ children }) {
  const pathname = usePathname()
  const detailMenu = menu.find((item) => item.href === pathname)
  return (
    <div className={"w-full"}>
      <div className={"bg-white rounded-[20px] shadow"}>
        <div className={"flex flex-col p-5"}>
          <div className={"flex flex-col"}>
            <h3 className={"text-lg font-semibold"}>{detailMenu.name}</h3>
            <p className={"text-sm text-gray-400"}>{detailMenu.description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}