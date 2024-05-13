"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, SlidersHorizontal } from "lucide-react";
import { useExpenses } from "./providers/ExpensesProvider";
import { cn } from "@/lib/utils";

const ViewDropdown = () => {
  const expensesContext = useExpenses();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-sm px-4 py-1 text-sm ring-1 ring-brand-accent transition-all hover:bg-primary-400 ">
        <SlidersHorizontal className="w-[16px]" />
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-sm border-none bg-brand-primary ring-1 ring-brand-accent"
      >
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-brand-accent/50" />
        {expensesContext.filteredHeaders.map((header) => {
          if (header.label === "Description") return null;
          return (
            <DropdownMenuItem
              onSelect={() => {
                expensesContext.setFilteredHeaders(
                  expensesContext.filteredHeaders.map((filteredHeader) =>
                    filteredHeader.label === header.label
                      ? { ...header, visible: !header.visible }
                      : filteredHeader,
                  ),
                );
              }}
              className="cursor-pointer focus:bg-brand-accent focus:text-brand-primary"
              key={header.label}
            >
              {
                <Check
                  className={cn("mr-2 h-4 w-4", !header.visible && "opacity-0")}
                />
              }
              {header.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ViewDropdown;
