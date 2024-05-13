import { cn } from "@/lib/utils";
import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        "rounded-sm border-[1px] border-brand-accent p-4 outline-none focus:ring-2 focus:ring-brand-accent",
        props.className,
      )}
    />
  );
};

export default Input;
