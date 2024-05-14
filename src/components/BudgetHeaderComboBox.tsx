"use client";
import * as React from "react";
import { Check, ChevronsUpDown, EyeOff, MoveDown, MoveUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBudgets } from "./providers/BudgetProvider";

type Option = {
  value: string;
  label: string;
};

export function BudgetHeaderComboBox({
  header,
  options,
  className,
}: {
  header: TableHeader;
  options: Option[];
  className?: string;
}) {
  const budgetsContext = useBudgets();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(header.isSortedBy ? value : "");
  }, [header.isSortedBy, value]);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    budgetsContext.setSortType(
      currentValue === value ? "" : (currentValue as SortType),
    );
    budgetsContext.setFilteredHeaders((prevHeaders) =>
      prevHeaders.map((prevHeader) => {
        if (prevHeader.label === header.label)
          return { ...prevHeader, isSortedBy: true };
        else return { ...prevHeader, isSortedBy: false };
      }),
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between",
            open
              ? "bg-brand-primary text-brand-accent/70 ring-1 ring-brand-accent/50 hover:text-brand-accent/70"
              : "hover:text-brand-accent",
            "rounded-sm border-none bg-transparent p-2 transition-all hover:bg-brand-primary hover:ring-1 hover:ring-brand-accent/50",
            className,
          )}
        >
          {header.label}
          {!value && (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
          {header.isSortedBy &&
            value &&
            (value === "asc" ? (
              <MoveUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            ) : (
              <MoveDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[150px] rounded-sm bg-brand-primary p-0 ring-1 ring-brand-accent"
      >
        <Command className="rounded-sm bg-brand-primary px-2 py-[1px]">
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  className={cn(
                    "cursor-pointer transition-all aria-selected:bg-brand-accent aria-selected:text-brand-primary",
                  )}
                >
                  {option.value === "asc" ? (
                    <MoveUp className="mr-2 h-4 w-4" />
                  ) : (
                    <MoveDown className="mr-2 h-4 w-4" />
                  )}
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator className="my-[1px] bg-brand-accent/50" />
          <CommandList>
            <CommandGroup>
              <Button
                className="h-auto w-full rounded-sm border-none bg-brand-primary px-0 py-2 text-center ring-0 hover:bg-brand-accent hover:text-brand-primary"
                variant="outline"
                onClick={() =>
                  budgetsContext.setFilteredHeaders((prevHeaders) =>
                    prevHeaders.map((prevHeader) => {
                      if (prevHeader.label === header.label)
                        return { ...header, visible: false };
                      else return prevHeader;
                    }),
                  )
                }
              >
                <EyeOff className="mr-2 h-4 w-4" />
                Hide
              </Button>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
