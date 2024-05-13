"use client";
import * as React from "react";
import { ChevronsUpDown, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "./ui/checkbox";
import { useExpenses } from "./providers/ExpensesProvider";

export function Filter({
  options,
  label,
  placeholder,
}: {
  options: Option[];
  label: string;
  placeholder: string;
}) {
  const expensesContext = useExpenses();

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<Option[]>([]);

  React.useEffect(() => {
    expensesContext.setFilters((filters) =>
      filters.map((filter) => {
        if (filter.label === label.toLowerCase()) {
          return { ...filter, filters: activeFilters };
        }
        return filter;
      }),
    );
  }, [activeFilters, label]);

  React.useEffect(() => {
    if (
      expensesContext.filters.every((filter) => filter.filters.length === 0)
    ) {
      clearActiveFilters();
    }
  }, [
    expensesContext.filters.reduce(
      (acc, filter) => acc + filter.filters.length,
      0,
    ),
  ]);

  const handleFilterChange = (option: Option) => {
    setActiveFilters((prevActiveFilters) =>
      prevActiveFilters.find((filter) => filter.value === option.value)
        ? prevActiveFilters.filter((filter) => filter.value !== option.value)
        : [...prevActiveFilters, option],
    );
  };

  const clearActiveFilters = () => {
    setActiveFilters([]);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="justify-between gap-1 rounded-sm border-dashed border-brand-accent bg-brand-primary px-2 transition-all hover:border-primary-400 hover:bg-primary-400"
        >
          <CirclePlus className="h-4 w-4" />
          <div className={`flex gap-2`}>
            <span
              className={`${activeFilters.length > 0 ? "border-r-2 border-brand-accent pr-2" : ""}`}
            >
              {label}
            </span>
            <div className="flex gap-2">
              {activeFilters.length > 0 && activeFilters.length < 3
                ? activeFilters.map((filter) => (
                    <span
                      key={filter.value}
                      className="rounded-tiny bg-brand-accent px-1 text-brand-primary"
                    >
                      {filter.label}
                    </span>
                  ))
                : ""}
              {activeFilters.length >= 3 ? (
                <span className="rounded-tiny bg-brand-accent px-1 text-brand-primary">
                  {`${activeFilters.length} Selected`}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[200px] rounded-sm bg-brand-primary p-0 ring-1 ring-brand-accent"
      >
        <Command className="rounded-sm bg-brand-primary px-2 py-[1px]">
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleFilterChange(option)}
                  className="group cursor-pointer transition-all duration-100 aria-selected:bg-brand-accent aria-selected:text-brand-primary"
                >
                  <Checkbox
                    id={option.value}
                    checked={activeFilters.includes(option)}
                    className="mr-2 rounded-tiny group-aria-selected:border-brand-primary"
                    onChange={() => handleFilterChange(option)}
                  />
                  <label
                    className="cursor-pointer"
                    htmlFor={option.value}
                    onClick={() => handleFilterChange(option)}
                  >
                    {option.label}
                  </label>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {activeFilters.length > 0 && (
            <>
              <CommandSeparator className="my-[1px] bg-brand-accent/50" />
              <CommandList>
                <CommandGroup>
                  <Button
                    onClick={clearActiveFilters}
                    variant="outline"
                    className="w-full rounded-sm border-none bg-brand-primary p-0 text-center ring-0 hover:bg-brand-accent hover:text-brand-primary"
                  >
                    Clear filters
                  </Button>
                </CommandGroup>
              </CommandList>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
