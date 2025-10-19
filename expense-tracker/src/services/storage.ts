import type { Expense } from "../models/expense";

const KEY = "expenses";

export const loadExpensesFromLocal = () => {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Expense[]) : [];
};

export const saveExpensesToLocal = (expenses: Expense[]): void => {
  const data = JSON.stringify(expenses);
  localStorage.setItem(KEY, data);
};
