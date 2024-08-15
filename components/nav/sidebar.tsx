import Image from "next/image";
import NavItem from "./nav-item";
import { GraduationCap, LayoutGrid } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-[280px] bg-[#1C1C1C] fixed left-0 lg:flex flex-col hidden h-full z-50">
      <div className="py-10 px-6">
        <div className="relative w-[178px] h-[64px] mb-12">
          <Image src="/images/logo-with-text.svg" alt="logo" fill />
        </div>
        <div className="space-y-4 text-white">
          <span className="font-medium text-sm leading-5 text-[#9E9E9E]">
            MENU
          </span>
          <ul className="flex flex-col space-y-3">
            <NavItem href="/" label="Dashboard">
              <LayoutGrid size={18} />
            </NavItem>
            <NavItem href="/students" label="Students">
              <GraduationCap size={20} />
            </NavItem>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
