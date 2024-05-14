"use client";
import { BUDGET_TABLE_HEADERS } from "@/constants";
import React, { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import Loader from "../Loader";

type BudgetContextType = {
  filteredBudgets: Budget[];
  setFilteredBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  filteredHeaders: TableHeader[];
  setFilteredHeaders: React.Dispatch<React.SetStateAction<TableHeader[]>>;
  sortType: SortType;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  resetFilters: () => void;
  addBudget: (budget: Budget) => void;
};

const BudgetContext = createContext<BudgetContextType>({
  filteredBudgets: [],
  setFilteredBudgets: () => {},
  filteredHeaders: [],
  setFilteredHeaders: () => {},
  sortType: "",
  setSortType: () => {},
  filters: [],
  setFilters: () => {},
  resetFilters: () => {},
  addBudget: () => {},
});

const headersInitialState: TableHeader[] = BUDGET_TABLE_HEADERS.map(
  (header) => {
    return { label: header, visible: true, isSortedBy: false };
  },
);

const filtersInitialState: Filter[] = [
  { label: "startDate", filters: [] },
  { label: "endDate", filters: [] },
  { label: "category", filters: [] },
  { label: "amount", filters: [] },
  { label: "spent", filters: [] },
  { label: "remaining", filters: [] },
];

const BudgetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]);
  const [filteredHeaders, setFilteredHeaders] =
    useState<TableHeader[]>(headersInitialState);
  const [sortType, setSortType] = useState<SortType>("");
  const [filters, setFilters] = useState<Filter[]>(filtersInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("user-id");

  useEffect(() => {
    async function getBudgets() {
      try {
        setIsLoading(true);
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
        setFilteredBudgets(budgets);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getBudgets();
  }, [userId]);

  const resetFilters = () => {
    setFilters(filtersInitialState);
  };

  const addBudget = (budget: Budget) => {
    setFilteredBudgets([budget, ...filteredBudgets]);
  };

  return (
    <BudgetContext.Provider
      value={{
        filteredBudgets,
        setFilteredBudgets,
        filteredHeaders,
        setFilteredHeaders,
        sortType,
        setSortType,
        filters,
        setFilters,
        resetFilters,
        addBudget,
      }}
    >
      {isLoading ? (
        <div className="grid min-h-screen place-content-center bg-brand-primary">
          <Loader size={12} />
        </div>
      ) : (
        children
      )}
    </BudgetContext.Provider>
  );
};

export const useBudgets = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error("BudgetsProvider not found");
  return context;
};

export default BudgetsProvider;
