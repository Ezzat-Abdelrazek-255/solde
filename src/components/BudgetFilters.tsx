"use client";

import { CATEGORIES } from "@/constants";
import { Filter } from "./Filter";
import ResetExpansesFilterBtn from "./ResetExpansesFilterBtn";
import { useBudgets } from "./providers/BudgetProvider";
const startDateOptions = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last7Days" },
  { label: "Last 30 Days", value: "last30Days" },
  { label: "Last 3 Months", value: "last3Months" },
  { label: "Last 6 Months", value: "last6Months" },
];
const endDateOptions = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last7Days" },
  { label: "Last 30 Days", value: "last30Days" },
  { label: "Last 3 Months", value: "last3Months" },
  { label: "Last 6 Months", value: "last6Months" },
];
const amountOptions = [
  { value: "lessThan10", label: "Less than $10" },
  { value: "10-49.99", label: "$10 - $49.99" },
  { value: "50-99.99", label: "$50 - $99.99" },
  { value: "100-499.99", label: "$100 - $499.99" },
  { value: "500-999.99", label: "$500 - $999.99" },
  { value: "above1000", label: "$1000 and above" },
];

const BudgetFilters = () => {
  const budgetsContext = useBudgets();

  return (
    <>
      <Filter
        placeholder="Start Date"
        options={startDateOptions}
        label="Start Date"
      />
      <Filter
        placeholder="End Date"
        options={endDateOptions}
        label="End Date"
      />
      <Filter placeholder="Amount" options={amountOptions} label="Amount" />
      <Filter placeholder="Category" options={CATEGORIES} label="Category" />
      {budgetsContext.filters.some((filter) => filter.filters.length > 0) && (
        <ResetExpansesFilterBtn />
      )}
    </>
  );
};

export default BudgetFilters;
