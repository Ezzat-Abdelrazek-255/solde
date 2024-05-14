"use client";

import React from "react";
import DataTable from "./DataTable";
import { TableHeaderComboBox } from "./TableHeaderComboBox";
import { useExpenses } from "./providers/ExpensesProvider";
import { isToday, isWithinRange } from "@/lib/utils";

const ExpensesTable = () => {
  const expensesContext = useExpenses();

  const sortBy = expensesContext.filteredHeaders
    .find((header) => header.isSortedBy)
    ?.label.toLowerCase();

  const expenses = expensesContext.FilteredExpenses.sort((a, b) => {
    if (!sortBy) return 0;

    const firstElement = a[sortBy as keyof Expense];
    const secondElement = b[sortBy as keyof Expense];
    if (typeof firstElement === "string" && typeof secondElement === "string") {
      if (expensesContext.sortType === "asc") {
        return firstElement.localeCompare(secondElement);
      } else {
        return secondElement.localeCompare(firstElement);
      }
    } else if (
      typeof firstElement === "number" &&
      typeof secondElement === "number"
    ) {
      if (expensesContext.sortType === "asc") {
        return firstElement - secondElement;
      } else {
        return secondElement - firstElement;
      }
    } else if (firstElement instanceof Date && secondElement instanceof Date) {
      if (expensesContext.sortType === "asc") {
        return firstElement.getTime() - secondElement.getTime();
      } else {
        return secondElement.getTime() - firstElement.getTime();
      }
    } else {
      if (expensesContext.sortType === "asc") {
        return 1;
      } else {
        return -1;
      }
    }
  })
    .filter((expense) => {
      let condition = true;
      const dateFilters = expensesContext.filters.find(
        (filter) => filter.label === "date",
      );
      const categoryFilters = expensesContext.filters.find(
        (filter) => filter.label === "category",
      );
      const amountFilters = expensesContext.filters.find(
        (filter) => filter.label === "amount",
      );

      const descriptionFilters = expensesContext.filters.find(
        (filter) => filter.label === "description",
      );

      if (descriptionFilters && descriptionFilters.filters.length > 0) {
        condition = expense.description
          .toLowerCase()
          .startsWith(descriptionFilters.filters[0].value.toLowerCase());
      }

      if (categoryFilters && categoryFilters.filters.length > 0) {
        condition =
          condition &&
          categoryFilters.filters.some(
            (filter) =>
              expense.category.toLowerCase() === filter.value.toLowerCase(),
          );
      }

      if (amountFilters && amountFilters.filters.length > 0) {
        let amountCondition = false;

        condition =
          condition &&
          amountFilters.filters.some((filter) => {
            switch (filter.value) {
              case "lessThan10":
                amountCondition = expense.amount < 10;
                break;
              case "10-49.99":
                amountCondition = expense.amount >= 10 && expense.amount < 50;
                break;
              case "50-99.99":
                amountCondition = expense.amount >= 50 && expense.amount < 100;
                break;
              case "100-499.99":
                amountCondition = expense.amount >= 100 && expense.amount < 500;
                break;
              case "500-999.99":
                amountCondition =
                  expense.amount >= 500 && expense.amount < 1000;
                break;
              case "above1000":
                amountCondition = expense.amount >= 1000;
                break;
              default:
                break;
            }
            return amountCondition;
          });
      }
      if (dateFilters && dateFilters.filters.length > 0) {
        let dateCondition = false;
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
        const expenseDate = expense.date;

        condition =
          condition &&
          dateFilters.filters.some((filter) => {
            switch (filter.value) {
              case "today":
                dateCondition = isToday(expenseDate, today);
                break;
              case "last7Days":
                dateCondition = isWithinRange(expenseDate, sevenDaysAgo, today);
                break;
              case "last30Days":
                dateCondition = isWithinRange(
                  expenseDate,
                  thirtyDaysAgo,
                  today,
                );
                break;
              case "last3Months":
                dateCondition = isWithinRange(
                  expenseDate,
                  threemonthsAgo,
                  today,
                );
                break;
              case "last6Months":
                dateCondition = isWithinRange(expenseDate, sixmonthsAgo, today);
                break;
              default:
                break;
            }

            return dateCondition;
          });
      }
      return condition;
    })
    .map((expense) => {
      const expenseCopy = { ...expense };
      expensesContext.filteredHeaders.forEach((header) => {
        if (!header.visible)
          delete expenseCopy[header.label.toLowerCase() as keyof Expense];
      });
      return Object.values(expenseCopy);
    });

  const headers = expensesContext.filteredHeaders
    .filter((header) => header.visible)
    .map((header) => (
      <TableHeaderComboBox
        key={header.label}
        header={header}
        options={[
          { label: "Asc", value: "asc" },
          { label: "Desc", value: "desc" },
        ]}
      />
    ));

  return <DataTable headers={headers} cells={expenses} />;
};

export default ExpensesTable;
