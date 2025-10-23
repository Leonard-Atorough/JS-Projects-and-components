export interface ExpenseFilter {
  startDate?: string;
  endDate?: string;
  minAmountCents?: number;
  maxAmountCents?: number;
  category?: string;
  descriptionIncludes?: string;
}

export interface ExpenseSorter {
  sortBy: "date" | "amount" | "description" | "category";
  ascending: boolean;
}
