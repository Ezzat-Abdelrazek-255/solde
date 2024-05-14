import { ArrowLeft, Calculator, Home, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";
import SidebarItem from "./SidebarItem";
import SidebarLink from "./SidebarLink";
import LogoutBtn from "./LogoutBtn";

const Sidebar = () => {
  return (
    <aside className=" flex h-full w-[300px] flex-col justify-between rounded-lg bg-brand-accent px-4 py-14 text-brand-primary">
      <div className="flex flex-col gap-12">
        <p className="self-center font-cosiAzure text-4xl text-white">Solde</p>
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
        <LogoutBtn />
      </div>
    </aside>
  );
};

export default Sidebar;
