"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <h3 className="font-serif text-[32px]">Sign in</h3>
      <p>Login to manage your expenses</p>
      <form action="#">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <p>Must have at least 8 characters</p>
          <Input type="password" id="password" min={8} />
        </div>
        <Button type="submit">Sign in</Button>
      </form>
      <p>Don&apos;t have an account yet?</p>
      <Link href="/sign-up">Sign up</Link>
    </div>
  );
};

export default LoginPage;
