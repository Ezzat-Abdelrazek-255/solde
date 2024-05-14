"use client";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
const SignUpPage = () => {
  const authContext = useAuth();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authContext.setUsername(username);
    authContext.setEmail(email);
    authContext.setPassword(password);
    setIsLoading(true);
    const formData = {
      username,
      email,
      password,
    };

    const res = await fetch("/api/sign-up", {
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

    authContext.setUserId(user.data.user._id);
    authContext.setIsLoggedIn(true);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-[32px]">Sign up</h3>
        <p className="text-neutral-9">
          Create an account to manage your expenses
        </p>
      </div>
      <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[20px]" htmlFor="username">
              username
            </label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
              id="username"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[20px]" htmlFor="email">
              Email
            </label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              id="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-[20px]" htmlFor="password">
                Password
              </label>
              <ul className="list-disc px-8">
                <li className="text-sm font-bold text-neutral-9">
                  Must have at least 8 characters
                </li>
              </ul>
            </div>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              value={password}
              min={8}
              required
            />
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full rounded-sm bg-brand-accent py-4 font-serif text-2xl text-background transition-all hover:bg-brand-accent/90"
        >
          {isLoading ? <Loader /> : "Sign up"}
        </button>
      </form>
      <div className="flex justify-center gap-2">
        <p>Already have an account?</p>
        <Link
          href="/"
          className="font-bold  transition-all hover:text-blue-600 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
