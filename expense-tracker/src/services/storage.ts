import type { Expense } from "../models/expense";

const EXPENSE_KEY = "expenses";

export const loadExpensesFromLocal = () => {
  const raw = localStorage.getItem(EXPENSE_KEY);
  return raw ? (JSON.parse(raw) as Expense[]) : [];
};

export const saveExpensesToLocal = (expenses: Expense[]): void => {
  const data = JSON.stringify(expenses);
  localStorage.setItem(EXPENSE_KEY, data);
};

export const loadExpenseAsync = async (): Promise<Expense[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const raw = localStorage.getItem(EXPENSE_KEY);
      const parsed = raw ? (JSON.parse(raw) as Expense[]) : [];
      resolve(parsed);
    }, 0);
  });
};
