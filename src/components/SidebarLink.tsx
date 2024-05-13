"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const SidebarLink = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        `${pathname === href ? " bg-brand-primary font-bold  text-brand-accent" : ""} flex items-center gap-2 rounded-sm p-4 text-lg transition-all hover:bg-brand-primary hover:text-brand-accent`,
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
