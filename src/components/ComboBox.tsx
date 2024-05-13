"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  value: string;
  label: string;
};

export function ComboBox({
  label,
  options,
}: {
  label: string;
  options: Option[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
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
            "w-[200px] justify-between",
            open
              ? "bg-brand-primary text-brand-accent/70 ring-1 ring-brand-accent/50 hover:text-brand-accent/70"
              : "hover:text-brand-accent",
            "rounded-sm border-none bg-transparent p-2 transition-all hover:bg-brand-primary hover:ring-1 hover:ring-brand-accent/50",
          )}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] rounded-sm bg-brand-primary p-0 ring-1 ring-brand-accent">
        <Command>
          <CommandList>
            <CommandGroup className="rounded-sm bg-brand-primary p-2">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  className="cursor-pointer transition-all aria-selected:bg-brand-accent aria-selected:text-brand-primary"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
