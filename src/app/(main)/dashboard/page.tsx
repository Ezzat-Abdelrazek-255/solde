"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { useBudgets } from "@/components/providers/BudgetProvider";
import { useExpenses } from "@/components/providers/ExpensesProvider";
import UpdateCard from "@/components/UpdateCard";
import { BUDGET_TABLE_HEADERS, EXPENSE_TABLE_HEADERS } from "@/constants";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const userId = localStorage.getItem("user-id");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getExpenses() {
      try {
        const res = await fetch(`/api/user/${userId}/expenses`);
        const { data } = await res.json();
        if (!data) return;
        const expenses = data.map(
          (expense: {
            _id: string;
            description: string;
            amount: number;
            date: string;
            category: string;
          }) => {
            return {
              id: expense._id,
              description: expense.description,
              amount: expense.amount,
              date: new Date(expense.date),
              category: expense.category,
            };
          },
        );

        setExpenses(expenses);
      } catch (error) {
        console.log(error);
      }
    }
    getExpenses();
  }, [userId]);

  useEffect(() => {
    async function getBudgets() {
      try {
        const res = await fetch(`/api/user/${userId}/budgets`);
        const { data } = await res.json();
        if (!data) return;
        const budgets = data.map(
          (budget: {
            _id: string;
            amount: number;
            startDate: string;
            endDate: string;
            spent: number;
            remaining: number;
            category: string;
          }) => {
            return {
              id: budget._id,
              amount: budget.amount,
              spent: budget.spent,
              remaining: budget.remaining,
              category: budget.category,
              startDate: new Date(budget.startDate),
              endDate: new Date(budget.endDate),
            };
          },
        );
        setBudgets(budgets);
      } catch (error) {
        console.log(error);
      }
    }
    getBudgets();
  }, [userId]);

  const recentExpenses = expenses
    .toSorted()
    .slice(0, 3)
    .map((expense) => Object.values(expense));

  const recentBudgets = budgets
    .toSorted()
    .slice(0, 3)
    .map((budget) => Object.values(budget));

  const highestExpense = expenses.toSorted().reverse()[0];
  const leastExpense = expenses.toSorted()[0];
  const latestExpense = expenses.toSorted((a, b) => {
    return b.date.getTime() - a.date.getTime();
  })[0];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-5xl font-bold">Dashboard</h1>
      {expenses.length > 0 && budgets.length > 0 ? (
        <>
          {expenses.length > 0 && (
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
          )}
          <div className="grid grid-cols-1 grid-rows-2 gap-8 ">
            {expenses.length > 0 && (
              <section className="col-span-4 flex flex-col gap-4">
                <h2 className="text-4xl font-bold">Recent Expenses</h2>
                <DataTable
                  headers={EXPENSE_TABLE_HEADERS}
                  cells={recentExpenses}
                />
              </section>
            )}
            {budgets.length > 0 && (
              <section className="col-span-2 flex flex-col gap-4">
                <h2 className="text-4xl font-bold">Recent Budgets</h2>
                <DataTable
                  headers={BUDGET_TABLE_HEADERS}
                  cells={recentBudgets}
                />
              </section>
            )}
          </div>
        </>
      ) : (
        <button
          className="mx-auto w-1/2  rounded-sm bg-brand-accent px-2 py-4 text-brand-primary"
          onClick={() => router.push("/dashboard/expenses")}
        >
          Click to add your first expense
        </button>
      )}
    </div>
  );
};

export default DashboardPage;
