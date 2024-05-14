"use client";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginPage = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    if (authContext.isLoggedIn) {
      router.push("/dashboard");
    }
  }, [authContext.isLoggedIn, router]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = {
      email,
      password,
    };
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = await res.json();
    setIsLoading(false);

    if (!user.data) return;
    console.log(user);

    authContext.setUsername(user.data.user.username);
    authContext.setEmail(user.data.user.email);
    authContext.setUserId(user.data.user._id);
    authContext.setIsLoggedIn(true);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-[32px]">Sign in</h3>
        <p className="text-neutral-9">Login to manage your expenses</p>
      </div>
      <form action="#" className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[20px]" htmlFor="email">
              Email
            </label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-[20px]" htmlFor="password">
                Password
              </label>
            </div>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              min={8}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-sm bg-brand-accent py-4 font-serif text-2xl text-background transition-all hover:bg-brand-accent/90"
        >
          {isLoading ? <Loader /> : "Sign in"}
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
