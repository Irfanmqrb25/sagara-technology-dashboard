import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";
import Image from "next/image";
import NavItem from "./nav-item";
import { GraduationCap, LayoutGrid } from "lucide-react";

export function MobileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#1C1C1C] border-b-0">
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
      </SheetContent>
    </Sheet>
  );
}
