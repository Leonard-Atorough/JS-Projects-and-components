import type { Expense } from "../models/expense";

// export interface ExpenseState {
//   expenses: Expense[];
// }

// export interface UIState {
//   isLoading: boolean;
//   selectedCountry?: string;
// }

type CreateMode = "create" | "edit";

export interface AppState {
  expenses: Expense[];
  isLoading: boolean;
  mode: CreateMode;
  selectedExpenseId?: string | null;
  selectedCountry?: string;
}
