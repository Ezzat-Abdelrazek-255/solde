import { cn } from "@/lib/utils";
import React from "react";
import { formatDate } from "@/lib/utils";
const UpdateCard = ({
  title,
  expense,
  className,
}: {
  title: string;
  expense: Expense;
  className?: string;
}) => {
  return (
    <article
      className={cn(
        "flex flex-col gap-6 rounded-md bg-mesh-background-2 bg-cover bg-center px-6 py-8 text-white",
        className,
      )}
    >
      <h3 className="text-3xl font-bold">{title}</h3>
      <ul className="flex flex-col gap-2">
        <li>
          Description: <strong>{expense.description}</strong>
        </li>
        <li>
          Date: <strong>{formatDate(expense.date)}</strong>
        </li>
        <li>
          Amount: <strong>{expense.amount}$</strong>
        </li>
        <li>
          Category: <strong>{expense.category}</strong>
        </li>
      </ul>
    </article>
  );
};

export default UpdateCard;
