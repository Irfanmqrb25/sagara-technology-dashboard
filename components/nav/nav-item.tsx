"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface Props {
  href: string;
  label: string;
  className?: string;
  children?: React.ReactNode;
}

const NavItem = ({ href, label, children, className }: Props) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex w-full items-center p-2 rounded-md gap-2 hover:bg-brand hover:text-white transition-all ease-in-out duration-300",
          pathname === href
            ? "bg-brand font-semibold"
            : "text-[#9E9E9E] font-medium",
          className
        )}
      >
        <span>{children}</span>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
