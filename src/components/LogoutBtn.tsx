import React from "react";
import SidebarLink from "./SidebarLink";
import { ArrowLeft } from "lucide-react";

const LogoutBtn = () => {
  return (
    <SidebarLink
      href="/"
      className="hover:ring-3 bg-brand-primary text-brand-accent hover:bg-brand-accent hover:text-brand-primary hover:ring-brand-primary"
    >
      <ArrowLeft />
      Logout
    </SidebarLink>
  );
};

export default LogoutBtn;
