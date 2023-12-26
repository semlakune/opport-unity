"use client";
import {
  CrossCircledIcon, ListBulletIcon, PersonIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import StatusCard from "@/components/pages/dashboard/StatusCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardEmployer({ user }) {
  const statusCards = [
    { count: 9, label: 'Jobs Listed', IconComponent: ListBulletIcon, bgClass: 'bg-gradient-to-t from-slate-700 to-slate-400 shadow-slate-400' },
    { count: 3, label: 'Candidates', IconComponent: PersonIcon, bgClass: 'bg-gradient-to-t from-sky-700 to-sky-400 shadow-sky-400' },
    { count: 2, label: 'Pending', IconComponent: TimerIcon, bgClass: 'bg-gradient-to-t from-amber-700 to-amber-400 shadow-amber-400' },
    { count: 4, label: 'Rejected', IconComponent: CrossCircledIcon, bgClass: 'bg-gradient-to-t from-red-700 to-red-400 shadow-red-400' },
  ];

  return (
    <div className={"flex flex-col gap-10"}>
      <div className={"grid grid-cols-4 gap-5 h-fit"}>
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            count={card.count}
            label={card.label}
            IconComponent={card.IconComponent}
            bgClass={card.bgClass}
          />
        ))}
      </div>
      <div className={"grid grid-cols-3 gap-10"}>

      </div>
    </div>
  );
}