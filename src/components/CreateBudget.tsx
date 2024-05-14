"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CirclePlus } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { CATEGORIES } from "@/constants";
import { Button } from "./ui/button";
import Loader from "./Loader";
import { useAuth } from "./providers/AuthProvider";
import { useBudgets } from "./providers/BudgetProvider";
import { useExpenses } from "./providers/ExpensesProvider";

const CreateBudget = () => {
  const budgetContext = useBudgets();
  const expensesContext = useExpenses();
  const authContext = useAuth();
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const spent = expensesContext.FilteredExpenses.filter(
        (expense) => expense.category === category,
      ).reduce((acc, expense) => acc + expense.amount, 0);

      const remaining = amount - spent;

      const res = await fetch("/api/budget", {
        method: "POST",
        body: JSON.stringify({
          amount,
          startDate,
          endDate,
          spent,
          remaining,
          category,
          user: authContext.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const { data } = await res.json();
      const newBudget = {
        id: data._id,
        amount,
        spent,
        remaining,
        category,
        startDate,
        endDate,
      };

      budgetContext.addBudget(newBudget);
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogTrigger className="flex items-center gap-2 rounded-sm bg-brand-accent px-4 py-2 uppercase tracking-wide text-brand-primary transition-all hover:bg-brand-primary hover:text-brand-accent hover:ring-1 hover:ring-brand-accent">
        <CirclePlus className="h-4 w-4" />
        Add Budget
      </DialogTrigger>
      <DialogContent className="max-w-[40rem] bg-brand-primary p-8 text-neutral-10 sm:rounded-md">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wide">
            Add Budget
          </DialogTitle>
          <DialogDescription>
            Add Budgets to your account here. click add Budget when you are
            done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleFormSubmit}
            action="#"
            className="grid grid-cols-2 grid-rows-2 items-end gap-4"
          >
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                className="w-full rounded-tiny px-2 py-1 ring-1 ring-brand-accent"
                type="number"
                id="amount"
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount}
                required
              />
            </div>
            <div>
              <Select
                onValueChange={(value) => setCategory(value)}
                value={category}
                required
              >
                <SelectTrigger className="rounded-sm ring-1 ring-brand-accent">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="bg-brand-accent text-brand-primary">
                  <SelectGroup>
                    <SelectLabel className="text-base">Categories</SelectLabel>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="amount">Start Date</label>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                label="Pick a start date"
              />
            </div>

            <div>
              <label htmlFor="amount">End Date</label>

              <DatePicker
                date={endDate}
                setDate={setEndDate}
                label="Pick an end date"
              />
            </div>
            <Button
              type="submit"
              className="col-start-2 flex items-center gap-2 rounded-sm bg-brand-accent px-4 py-2 uppercase tracking-wide text-brand-primary transition-all hover:bg-brand-primary hover:text-brand-accent hover:ring-1 hover:ring-brand-accent"
            >
              Add Budget
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateBudget;
