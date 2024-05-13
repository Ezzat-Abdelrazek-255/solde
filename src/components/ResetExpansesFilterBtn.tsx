"use client";

import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useExpenses } from "./providers/ExpensesProvider";

const ResetExpansesFilterBtn = () => {
  const { resetFilters } = useExpenses();

  return (
    <Button
      onClick={resetFilters}
      variant="outline"
      className="rounded-sm border-none bg-transparent ring-0 hover:bg-brand-accent hover:text-brand-primary"
    >
      Reset
      <X className="ml-1 h-4 w-4" />
    </Button>
  );
};

export default ResetExpansesFilterBtn;
