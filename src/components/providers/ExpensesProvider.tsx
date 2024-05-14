"use client";

import { EXPENSE_TABLE_HEADERS } from "@/constants";
import React, { useEffect, useState } from "react";
import { useContext, createContext, useReducer } from "react";
import Loader from "../Loader";

type ExpensesContextType = {
  FilteredExpenses: Expense[];
  setFilteredExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  filteredHeaders: TableHeader[];
  setFilteredHeaders: React.Dispatch<React.SetStateAction<TableHeader[]>>;
  sortType: SortType;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  resetFilters: () => void;
  addExpense: (expense: Expense) => void;
};

const ExpensesTableContext = createContext<ExpensesContextType>({
  FilteredExpenses: [],
  setFilteredExpenses: () => {},
  filteredHeaders: [],
  setFilteredHeaders: () => {},
  sortType: "",
  setSortType: () => {},
  filters: [],
  setFilters: () => {},
  resetFilters: () => {},
  addExpense: () => {},
});

const headersInitialState: TableHeader[] = EXPENSE_TABLE_HEADERS.map(
  (header) => {
    return { label: header, visible: true, isSortedBy: false };
  },
);

const filtersInitialState: Filter[] = [
  { label: "date", filters: [] },
  { label: "category", filters: [] },
  { label: "amount", filters: [] },
  { label: "description", filters: [] },
];

const ExpensesProvider = ({ children }: { children: React.ReactNode }) => {
  const [FilteredExpenses, setFilteredExpenses] = React.useState<Expense[]>([]);

  const [filteredHeaders, setFilteredHeaders] =
    React.useState<TableHeader[]>(headersInitialState);

  const [sortType, setSortType] = React.useState<SortType>("");
  const [filters, setFilters] = React.useState<Filter[]>(filtersInitialState);

  const [isLoading, setIsLoading] = React.useState(false);

  const [userId, setUserId] = React.useState(() => {
    if (localStorage) return localStorage.getItem("user-id");
    else "";
  });
  useEffect(() => {
    async function getExpenses() {
      try {
        setIsLoading(true);

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

        setFilteredExpenses(expenses);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getExpenses();
  }, [userId]);

  const resetFilters = () => {
    setFilters(filtersInitialState);
  };

  const addExpense = (expense: Expense) => {
    setFilteredExpenses([expense, ...FilteredExpenses]);
  };

  return (
    <ExpensesTableContext.Provider
      value={{
        FilteredExpenses,
        setFilteredExpenses,
        filteredHeaders,
        setFilteredHeaders,
        sortType,
        setSortType,
        filters,
        setFilters,
        resetFilters,
        addExpense,
      }}
    >
      {isLoading ? (
        <div className="grid min-h-screen place-content-center bg-brand-primary">
          <Loader size={12} />
        </div>
      ) : (
        children
      )}
    </ExpensesTableContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesTableContext);
  if (!context) throw new Error("ExpensesProvider not found");
  return context;
};

export default ExpensesProvider;
