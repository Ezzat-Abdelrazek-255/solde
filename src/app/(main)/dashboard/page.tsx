import DataTable from "@/components/DataTable";
import UpdateCard from "@/components/UpdateCard";
import { RECENT_BUDGET_HEADERS, RECENT_EXPENSES_HEADERS } from "@/constants";
import React from "react";
const DashboardPage = () => {
  const expense = {
    id: "1",
    description: "Grocery Shopping",
    amount: 100,
    date: "2023-05-01",
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
            expense={expense}
          />
          <UpdateCard
            className="col-span-3"
            title="Highest Expense"
            expense={expense}
          />
          <UpdateCard
            className="col-span-3"
            title="Highest Expense"
            expense={expense}
          />
        </div>
      </section>
      <div className="grid grid-cols-1 grid-rows-2 gap-8 xl:grid-cols-6 xl:grid-rows-1 xl:gap-32">
        <section className="col-span-4 flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Recent Expenses</h2>
          <DataTable
            headers={RECENT_EXPENSES_HEADERS}
            cells={[
              Object.values(expense),
              Object.values(expense),
              Object.values(expense),
            ]}
          />
        </section>
        <section className="col-span-2 flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Recent Budgets</h2>
          <DataTable
            headers={RECENT_BUDGET_HEADERS}
            cells={[
              Object.values(budget),
              Object.values(budget),
              Object.values(budget),
            ]}
          />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
