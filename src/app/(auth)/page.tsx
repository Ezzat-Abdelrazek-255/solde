"use client";
import Input from "@/components/input";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-[32px]">Sign in</h3>
        <p className="text-neutral-9">Login to manage your expenses</p>
      </div>
      <form action="#" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[20px]" htmlFor="email">
              Email
            </label>
            <Input type="email" id="email" />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-[20px]" htmlFor="password">
                Password
              </label>
            </div>
            <Input type="password" id="password" min={8} />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-sm bg-brand-accent py-4 font-serif text-2xl text-background transition-all hover:bg-brand-accent/90"
        >
          Sign in
        </button>
      </form>
      <div className="flex justify-center gap-2">
        <p>Don&apos;t have an account yet?</p>
        <Link
          href="/sign-up"
          className="font-bold  transition-all hover:text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
