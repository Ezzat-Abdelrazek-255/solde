import { ArrowLeft, Calculator, Home, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";
import SidebarItem from "./SidebarItem";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <aside className=" flex h-full w-[300px] flex-col justify-between rounded-lg bg-brand-accent px-4 py-14 text-brand-primary">
      <div className="flex flex-col gap-12">
        <p className="font-cosiAzure self-center text-4xl text-white">Solde</p>
        <nav>
          <ul className="flex flex-col gap-4">
            <SidebarItem href="/dashboard">
              <Home />
              Home
            </SidebarItem>
            <SidebarItem href="/dashboard/expenses">
              <Wallet />
              Expenses
            </SidebarItem>

            <SidebarItem href="/dashboard/budget">
              <Calculator />
              Budget
            </SidebarItem>
          </ul>
        </nav>
      </div>
      <div>
        <SidebarLink
          href="/"
          className="bg-brand-primary text-brand-accent hover:bg-brand-accent hover:text-brand-primary hover:ring-2 hover:ring-brand-primary"
        >
          <ArrowLeft />
          Logout
        </SidebarLink>
      </div>
    </aside>
  );
};

export default Sidebar;
