import type { Expense } from "../models/expense";

// export interface ExpenseState {
//   expenses: Expense[];
// }

// export interface UIState {
//   isLoading: boolean;
//   selectedCountry?: string;
// }

export interface AppState {
  expenses: Expense[];
  isLoading: boolean;
  selectedCountry?: string;
}
