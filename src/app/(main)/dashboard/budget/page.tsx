import React from "react";
import ViewDropdown from "@/components/ViewDropdown";
import ExpensesSearch from "@/components/ExpensesSearch";
import { Filter } from "@/components/Filter";
import ExpensesTable from "@/components/ExpensesTable";
import ExpensesFilters from "@/components/ExpensesFilters";
import CreateExpense from "@/components/CreateExpense";
import CreateBudget from "@/components/CreateBudget";
import BudgetsTable from "@/components/BudgetsTable";
import BudgetViewDropdown from "@/components/BudgetViewDropdown";
import BudgetFilters from "@/components/BudgetFilters";

const BudgetPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-5xl font-bold">Budget</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ExpensesSearch />
          <BudgetFilters />
        </div>
        <div className="flex items-center gap-2">
          <CreateBudget />
          <BudgetViewDropdown />
        </div>
      </div>
      <BudgetsTable />
    </div>
  );
};

export default BudgetPage;
