"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "./providers/AuthProvider";

const LogoutBtn = () => {
  const authContext = useAuth();

  const handleLogout = () => {
    authContext.setIsLoggedIn(false);
    authContext.setUserId("");
    authContext.setUsername("");
    authContext.setEmail("");
    authContext.setPassword("");
  };
  return (
    <button
      onClick={handleLogout}
      className="hover:ring-3 flex w-full items-center gap-2 rounded-sm bg-brand-primary p-4 text-lg text-brand-accent transition-all hover:bg-brand-accent hover:text-brand-primary hover:ring-1 hover:ring-brand-primary"
    >
      <ArrowLeft />
      Logout
    </button>
  );
};

export default LogoutBtn;
