"use client";

import React from "react";
import { useExpenses } from "./providers/ExpensesProvider";

const ExpensesSearch = () => {
  const expensesContext = useExpenses();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    expensesContext.setFilters((prevFilters) => {
      return prevFilters.map((prevFilter) => {
        if (prevFilter.label === "description") {
          return {
            ...prevFilter,
            filters: [{ value: event.target.value, label: event.target.value }],
          };
        } else {
          return prevFilter;
        }
      });
    });
  };
  return (
    <div>
      <input
        onChange={changeHandler}
        type="type"
        placeholder="Search expenses by description..."
        className="w-[300px] rounded-tiny bg-brand-primary px-4 py-1 text-sm text-brand-accent outline-none ring-1 ring-brand-accent/80 placeholder:text-accent-400 focus:ring-2 focus:ring-brand-accent "
      />
    </div>
  );
};

export default ExpensesSearch;
