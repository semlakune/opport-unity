import {formatNumber} from "@/lib/utils";

const StatusCard = ({ count, label, IconComponent, bgClass }) => {
  return (
    <div className={"rounded-3xl border w-full p-5 flex gap-5 items-center justify-between shadow-inner"}>
      <div className={"flex flex-col"}>
        <h1>{formatNumber(count)}</h1>
        <p>{label}</p>
      </div>
      <div className={`p-5 rounded-full ${bgClass} text-white shadow-lg`}>
        <IconComponent className={"w-5 h-5"} />
      </div>
    </div>
  );
};

export default StatusCard;