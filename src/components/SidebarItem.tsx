import React from "react";
import SidebarLink from "./SidebarLink";

const SidebarItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <SidebarLink href={href}>{children}</SidebarLink>
    </li>
  );
};

export default SidebarItem;
