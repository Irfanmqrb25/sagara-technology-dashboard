import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ChevronDown } from "lucide-react";
import { MobileSheet } from "./mobile-sheet";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-8 bg-white h-20 border-b-2 flex items-center w-full">
      <nav className="flex w-full items-center justify-between lg:justify-end">
        <MobileSheet />
        <div className="flex items-center gap-2">
          <div className="font-bold">
            <p className="text-sm">Thomas Anree</p>
            <p className="text-xs text-[#637381] flex justify-end">Admin</p>
          </div>
          <Avatar>
            <AvatarImage src="/images/user-profile.png" />
          </Avatar>
          <ChevronDown className="w-5 h-5 text-[#637381]" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
