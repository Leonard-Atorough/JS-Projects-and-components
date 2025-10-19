import type { Expense } from "../models/expense";

export interface AppState {
  expenses: Expense[];
  isLoading: boolean;
  selectedCountry?: string;
}
