type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
};

type Budget = {
  id: string;
  amount: number;
  spent: number;
  remaining: number;
  category: string;
  startDate: Date;
  endDate: Date;
};
type Option = {
  label: string;
  value: string;
};

type TableHeader = {
  label: string;
  visible: boolean;
  isSortedBy: boolean;
};
type SortType = "asc" | "desc" | "";

type Filter = {
  label: string;
  filters: Option[];
};
