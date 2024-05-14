"use client";

import React from "react";
import DataTable from "./DataTable";
import { TableHeaderComboBox } from "./TableHeaderComboBox";
import { isToday, isWithinRange, toCamelCase } from "@/lib/utils";
import { useBudgets } from "./providers/BudgetProvider";
import { BudgetHeaderComboBox } from "./BudgetHeaderComboBox";

const BudgetsTable = () => {
  const budgetsContext = useBudgets();

  const sortBy = toCamelCase(
    budgetsContext.filteredHeaders
      .find((header) => header.isSortedBy)
      ?.label.toLowerCase(),
  );

  const budgets = budgetsContext.filteredBudgets
    .sort((a, b) => {
      if (!sortBy) return 0;

      const firstElement = a[sortBy as keyof Budget];
      const secondElement = b[sortBy as keyof Budget];

      if (
        typeof firstElement === "string" &&
        typeof secondElement === "string"
      ) {
        if (budgetsContext.sortType === "asc") {
          return firstElement.localeCompare(secondElement);
        } else {
          return secondElement.localeCompare(firstElement);
        }
      } else if (
        typeof firstElement === "number" &&
        typeof secondElement === "number"
      ) {
        if (budgetsContext.sortType === "asc") {
          return firstElement - secondElement;
        } else {
          return secondElement - firstElement;
        }
      } else if (
        firstElement instanceof Date &&
        secondElement instanceof Date
      ) {
        if (budgetsContext.sortType === "asc") {
          return firstElement.getTime() - secondElement.getTime();
        } else {
          return secondElement.getTime() - firstElement.getTime();
        }
      } else {
        if (budgetsContext.sortType === "asc") {
          return 1;
        } else {
          return -1;
        }
      }
    })
    .filter((budget) => {
      let condition = true;
      const startDateFilters = budgetsContext.filters.find(
        (filter) => filter.label === "startDate",
      );
      const endDateFilters = budgetsContext.filters.find(
        (filter) => filter.label === "endDate",
      );
      const categoryFilters = budgetsContext.filters.find(
        (filter) => filter.label === "category",
      );
      const amountFilters = budgetsContext.filters.find(
        (filter) => filter.label === "amount",
      );
      const spentFilters = budgetsContext.filters.find(
        (filter) => filter.label === "spent",
      );
      const remainingFilters = budgetsContext.filters.find(
        (filter) => filter.label === "remaining",
      );

      if (categoryFilters && categoryFilters.filters.length > 0) {
        condition =
          condition &&
          categoryFilters.filters.some(
            (filter) =>
              budget.category.toLowerCase() === filter.value.toLowerCase(),
          );
      }

      if (amountFilters && amountFilters.filters.length > 0) {
        let amountCondition = false;

        condition =
          condition &&
          amountFilters.filters.some((filter) => {
            switch (filter.value) {
              case "lessThan10":
                amountCondition = budget.amount < 10;
                break;
              case "10-49.99":
                amountCondition = budget.amount >= 10 && budget.amount < 50;
                break;
              case "50-99.99":
                amountCondition = budget.amount >= 50 && budget.amount < 100;
                break;
              case "100-499.99":
                amountCondition = budget.amount >= 100 && budget.amount < 500;
                break;
              case "500-999.99":
                amountCondition = budget.amount >= 500 && budget.amount < 1000;
                break;
              case "above1000":
                amountCondition = budget.amount >= 1000;
                break;
              default:
                break;
            }
            return amountCondition;
          });
      }

      if (spentFilters && spentFilters.filters.length > 0) {
        let spentCondition = false;

        condition =
          condition &&
          spentFilters.filters.some((filter) => {
            switch (filter.value) {
              case "lessThan10":
                spentCondition = budget.spent < 10;
                break;
              case "10-49.99":
                spentCondition = budget.spent >= 10 && budget.spent < 50;
                break;
              case "50-99.99":
                spentCondition = budget.spent >= 50 && budget.spent < 100;
                break;
              case "100-499.99":
                spentCondition = budget.spent >= 100 && budget.spent < 500;
                break;
              case "500-999.99":
                spentCondition = budget.spent >= 500 && budget.spent < 1000;
                break;
              case "above1000":
                spentCondition = budget.spent >= 1000;
                break;
              default:
                break;
            }
            return spentCondition;
          });
      }

      if (remainingFilters && remainingFilters.filters.length > 0) {
        let remainingCondition = false;

        condition =
          condition &&
          remainingFilters.filters.some((filter) => {
            switch (filter.value) {
              case "lessThan10":
                remainingCondition = budget.remaining < 10;
                break;
              case "10-49.99":
                remainingCondition =
                  budget.remaining >= 10 && budget.remaining < 50;
                break;
              case "50-99.99":
                remainingCondition =
                  budget.remaining >= 50 && budget.remaining < 100;
                break;
              case "100-499.99":
                remainingCondition =
                  budget.remaining >= 100 && budget.remaining < 500;
                break;
              case "500-999.99":
                remainingCondition =
                  budget.remaining >= 500 && budget.remaining < 1000;
                break;
              case "above1000":
                remainingCondition = budget.remaining >= 1000;
                break;
              default:
                break;
            }
            return remainingCondition;
          });
      }

      if (startDateFilters && startDateFilters.filters.length > 0) {
        let startDateCondition = false;
        const today = new Date();
        const sevenDaysAgo = new Date(
          today.getTime() - 7 * 24 * 60 * 60 * 1000,
        );
        const thirtyDaysAgo = new Date(
          today.getTime() - 30 * 24 * 60 * 60 * 1000,
        );
        const threemonthsAgo = new Date(
          today.getTime() - 90 * 24 * 60 * 60 * 1000,
        );
        const sixmonthsAgo = new Date(
          today.getTime() - 180 * 24 * 60 * 60 * 1000,
        );
        const startDate = budget.startDate;

        condition =
          condition &&
          startDateFilters.filters.some((filter) => {
            switch (filter.value) {
              case "today":
                startDateCondition = isToday(startDate, today);
                break;
              case "last7Days":
                startDateCondition = isWithinRange(
                  startDate,
                  sevenDaysAgo,
                  today,
                );
                break;
              case "last30Days":
                startDateCondition = isWithinRange(
                  startDate,
                  thirtyDaysAgo,
                  today,
                );
                break;
              case "last3Months":
                startDateCondition = isWithinRange(
                  startDate,
                  threemonthsAgo,
                  today,
                );
                break;
              case "last6Months":
                startDateCondition = isWithinRange(
                  startDate,
                  sixmonthsAgo,
                  today,
                );
                break;
              default:
                break;
            }

            return startDateCondition;
          });
      }

      if (endDateFilters && endDateFilters.filters.length > 0) {
        let endDateCondition = false;
        const today = new Date();
        const sevenDaysAgo = new Date(
          today.getTime() - 7 * 24 * 60 * 60 * 1000,
        );
        const thirtyDaysAgo = new Date(
          today.getTime() - 30 * 24 * 60 * 60 * 1000,
        );
        const threemonthsAgo = new Date(
          today.getTime() - 90 * 24 * 60 * 60 * 1000,
        );
        const sixmonthsAgo = new Date(
          today.getTime() - 180 * 24 * 60 * 60 * 1000,
        );
        const endDate = budget.endDate;

        condition =
          condition &&
          endDateFilters.filters.some((filter) => {
            switch (filter.value) {
              case "today":
                endDateCondition = isToday(endDate, today);
                break;
              case "last7Days":
                endDateCondition = isWithinRange(endDate, sevenDaysAgo, today);
                break;
              case "last30Days":
                endDateCondition = isWithinRange(endDate, thirtyDaysAgo, today);
                break;
              case "last3Months":
                endDateCondition = isWithinRange(
                  endDate,
                  threemonthsAgo,
                  today,
                );
                break;
              case "last6Months":
                endDateCondition = isWithinRange(endDate, sixmonthsAgo, today);
                break;
              default:
                break;
            }

            return endDateCondition;
          });
      }

      return condition;
    })
    .map((budget) => {
      const budgetCopy = { ...budget };
      budgetsContext.filteredHeaders.forEach((header) => {
        if (!header.visible)
          delete budgetCopy[header.label.toLowerCase() as keyof Budget];
      });
      return Object.values(budgetCopy);
    });

  const headers = budgetsContext.filteredHeaders
    .filter((header) => header.visible)
    .map((header) => (
      <BudgetHeaderComboBox
        key={header.label}
        header={header}
        options={[
          { label: "Asc", value: "asc" },
          { label: "Desc", value: "desc" },
        ]}
      />
    ));

  return <DataTable headers={headers} cells={budgets} />;
};

export default BudgetsTable;
