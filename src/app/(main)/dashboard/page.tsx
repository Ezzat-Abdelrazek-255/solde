"use client";
import DataTable from "@/components/DataTable";
import { useExpenses } from "@/components/providers/ExpensesProvider";
import UpdateCard from "@/components/UpdateCard";
import { RECENT_BUDGET_HEADERS, RECENT_EXPENSES_HEADERS } from "@/constants";
import React from "react";
const DashboardPage = () => {
  const expensesContext = useExpenses();

  const recentExpenses = expensesContext.FilteredExpenses.toSorted()
    .slice(0, 3)
    .map((expense) => Object.values(expense));

  const highestExpense =
    expensesContext.FilteredExpenses.toSorted().reverse()[0];
  const leastExpense = expensesContext.FilteredExpenses.toSorted()[0];
  const latestExpense = expensesContext.FilteredExpenses[0];

  const expense = {
    id: "1",
    description: "Grocery Shopping",
    amount: 100,
    date: new Date("2023-05-01"),
    category: "Groceries",
  };

  const budget = {
    category: "Groceries",
    totalBudget: 1000,
    spent: 500,
    remaining: 500,
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-5xl font-bold">Dashboard</h1>
      <section className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">Check latest updates</h2>
        <div className="grid grid-cols-10 gap-4">
          <UpdateCard
            className="col-span-4"
            title="Highest Expense"
            expense={highestExpense}
          />
          <UpdateCard
            className="col-span-3"
            title="Least Expense"
            expense={leastExpense}
          />
          <UpdateCard
            className="col-span-3"
            title="Latest Expense"
            expense={latestExpense}
          />
        </div>
      </section>
      <div className="grid grid-cols-1 grid-rows-2 gap-8 xl:grid-cols-6 xl:grid-rows-1 xl:gap-32">
        <section className="col-span-4 flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Recent Expenses</h2>
          <DataTable headers={RECENT_EXPENSES_HEADERS} cells={recentExpenses} />
        </section>
        {/* <section className="col-span-2 flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Recent Budgets</h2>
          <DataTable
            headers={RECENT_BUDGET_HEADERS}
            cells={[
              Object.values(budget),
              Object.values(budget),
              Object.values(budget),
            ]}
          />
        </section> */}
      </div>
    </div>
  );
};

export default DashboardPage;
