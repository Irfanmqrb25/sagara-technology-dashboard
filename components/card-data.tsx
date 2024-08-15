import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  icon: string;
  dataCount: number;
  className?: string;
};

const CardData = ({ title, icon, dataCount, className }: Props) => {
  return (
    <div className="border-2 rounded-md bg-white px-4 py-3 w-full md:w-[335px] flex flex-col gap-4">
      <div className="flex justify-between">
        <h5 className="font-bold text-[#202224]">{title}</h5>
        <div className={cn("p-2 rounded-md", className)}>
          <Image src={icon} alt="icon" width={20} height={20} />
        </div>
      </div>
      <span className="text-2xl font-bold">{dataCount}</span>
      <div className="flex items-center gap-2">
        <Image src="/images/path.svg" alt="icon" width={16} height={16} />
        <p className="text-[#606060] leading-[19px]">
          <span className="text-[#00B87C]">8.5%</span> Up from yesterday
        </p>
      </div>
    </div>
  );
};

export default CardData;
