"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

type AuthContextType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContextInitialState = {
  username: "",
  setUsername: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  userId: "",
  setUserId: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

const AuthContext = createContext<AuthContextType>(AuthContextInitialState);
const publicPaths = ["/", "/sign-up"];
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("is-logged-in", false, {
    initializeWithValue: false,
  });
  const [username, setUsername] = useLocalStorage("username", "", {
    initializeWithValue: false,
  });
  const [email, setEmail] = useLocalStorage("email", "", {
    initializeWithValue: false,
  });
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useLocalStorage("user-id", "", {
    initializeWithValue: false,
  });
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      if (!publicPaths.includes(pathname)) router.push("/");
      else router.push(pathname);
    } else {
      if (pathname === "/") router.push("/dashboard");
      else router.push(pathname);
    }
  }, [isLoggedIn, router, pathname]);

  if (!isLoggedIn && !publicPaths.includes(pathname)) return null;

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        setIsLoggedIn,
        isLoggedIn,
        password,
        setPassword,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = function () {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthProvider not found");
  return context;
};
