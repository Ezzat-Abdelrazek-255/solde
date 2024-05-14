import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen bg-brand-primary p-6">
      <div className="relative z-20 flex h-full gap-12">
        <Sidebar />
        <main className="w-full py-[72px] text-neutral-10">{children}</main>
      </div>
      <div className="absolute inset-0 bg-noise-background opacity-50 mix-blend-overlay"></div>
    </div>
  );
};

export default DashboardLayout;
