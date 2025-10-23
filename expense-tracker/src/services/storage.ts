import type { Expense } from "../models/expense";

const EXPENSE_KEY = "expenses";

export const loadExpenses = () => {
  const raw = localStorage.getItem(EXPENSE_KEY);
  return raw ? (JSON.parse(raw) as Expense[]) : [];
};

export const saveExpenses = (expenses: Expense[]): void => {
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

export const saveExpensesAsync = async (
  expenses: Expense[]
): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
      resolve(1);
    }, 0);
  });
};
