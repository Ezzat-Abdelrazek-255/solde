import React from "react";
import ViewDropdown from "@/components/ViewDropdown";
import ExpensesSearch from "@/components/ExpensesSearch";
import { Filter } from "@/components/Filter";
import ExpensesTable from "@/components/ExpensesTable";
import ExpensesFilters from "@/components/ExpensesFilters";
import CreateExpense from "@/components/CreateExpense";

const ExpensesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-5xl font-bold">Expenses</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ExpensesSearch />
          <ExpensesFilters />
        </div>
        <div className="flex items-center gap-2">
          <CreateExpense />
          <ViewDropdown />
        </div>
      </div>
      <ExpensesTable />
    </div>
  );
};

export default ExpensesPage;
