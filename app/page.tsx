import BarChart from "@/components/bar-chart";
import CardData from "@/components/card-data";
import { Calendar, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="border-2 rounded bg-white px-4 py-3 flex items-center gap-2 text-sm text-[#64748B]">
          <Calendar size={16} />
          Dec 29, 2023 - Jan 4, 2024
        </div>
        <div className="border-2 rounded bg-white px-4 py-3 flex items-center gap-2 text-sm text-[#64748B]">
          Daily
          <ChevronDown size={16} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <CardData
          title="Total Students"
          dataCount={513}
          icon="/images/two-user.svg"
          className="bg-[#2758C1]/20"
        />
        <CardData
          title="Total Certified Students "
          dataCount={489}
          icon="/images/box.svg"
          className="bg-[#791229]/20 "
        />
        <CardData
          title="Average Certification Score"
          dataCount={489}
          icon="/images/chart.svg"
          className="bg-[#4AD991]/20 "
        />
      </div>

      <BarChart />
    </div>
  );
}
