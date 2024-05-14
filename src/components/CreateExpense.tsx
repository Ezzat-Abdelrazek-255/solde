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
import { useExpenses } from "./providers/ExpensesProvider";
import Loader from "./Loader";
import { useAuth } from "./providers/AuthProvider";

const CreateExpense = () => {
  const expensesContext = useExpenses();
  const authContext = useAuth();
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch("/api/expense", {
        method: "POST",
        body: JSON.stringify({
          description,
          amount,
          date,
          category,
          user: authContext.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      const newExpense = {
        id: data._id,
        description,
        amount,
        date,
        category,
      };

      expensesContext.addExpense(newExpense);
      setDialogOpen(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogTrigger className="flex items-center gap-2 rounded-sm bg-brand-accent px-4 py-2 uppercase tracking-wide text-brand-primary transition-all hover:bg-brand-primary hover:text-brand-accent hover:ring-1 hover:ring-brand-accent">
        <CirclePlus className="h-4 w-4" />
        Add Expense
      </DialogTrigger>
      <DialogContent className="max-w-[40rem] bg-brand-primary p-8 text-neutral-10 sm:rounded-md">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wide">
            Add Expense
          </DialogTitle>
          <DialogDescription>
            Add Expenses to your account here. click add expense when you are
            done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleFormSubmit}
            action="#"
            className="grid grid-cols-2 grid-rows-2 gap-4"
          >
            <div>
              <label htmlFor="description">Description</label>
              <input
                className="w-full rounded-tiny px-2 py-1 ring-1 ring-brand-accent"
                type="text"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>
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
              <DatePicker date={date} setDate={setDate} />
            </div>
            <Button
              type="submit"
              className="col-start-2 flex items-center gap-2 rounded-sm bg-brand-accent px-4 py-2 uppercase tracking-wide text-brand-primary transition-all hover:bg-brand-primary hover:text-brand-accent hover:ring-1 hover:ring-brand-accent"
            >
              Add Expense
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpense;
