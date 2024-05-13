"use client";

import { EXPENSE_TABLE_HEADERS } from "@/constants";
import React from "react";
import { useContext, createContext, useReducer } from "react";

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
const mockExpenses = [
  {
    id: "1",
    description: "Weekly Groceries",
    amount: 75.99,
    date: new Date("2024-05-08"),
    category: "Groceries",
  },
  {
    id: "2",
    description: "Electricity Bill",
    amount: 120.25,
    date: new Date("2024-05-05"),
    category: "Utilities",
  },
  {
    id: "3",
    description: "Dining at Italian Restaurant",
    amount: 45.75,
    date: new Date("2024-05-03"),
    category: "Dining Out",
  },
  {
    id: "4",
    description: "Gas for Car",
    amount: 35.67,
    date: new Date("2024-05-07"),
    category: "Transportation",
  },
  {
    id: "5",
    description: "Gym Membership",
    amount: 60.0,
    date: new Date("2024-05-01"),
    category: "Health & Fitness",
  },
  {
    id: "6",
    description: "Movie Tickets",
    amount: 24.0,
    date: new Date("2024-05-06"),
    category: "Entertainment",
  },
  {
    id: "7",
    description: "Online Subscription",
    amount: 8.99,
    date: new Date("2024-05-13"),
    category: "Subscriptions",
  },
  {
    id: "8",
    description: "Birthday Gift",
    amount: 30.0,
    date: new Date("2024-05-02"),
    category: "Gifts",
  },
];

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
  const [FilteredExpenses, setFilteredExpenses] =
    React.useState<Expense[]>(mockExpenses);

  const [filteredHeaders, setFilteredHeaders] =
    React.useState<TableHeader[]>(headersInitialState);

  const [sortType, setSortType] = React.useState<SortType>("");
  const [filters, setFilters] = React.useState<Filter[]>(filtersInitialState);

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
      {children}
    </ExpensesTableContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesTableContext);
  if (!context) throw new Error("ExpensesProvider not found");
  return context;
};

export default ExpensesProvider;
