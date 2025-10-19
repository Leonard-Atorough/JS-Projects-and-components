import { beforeEach, vi, describe, it, expect, afterEach } from "vitest";
import type { Expense } from "../models/expense";
import { loadExpensesFromLocal, saveExpensesToLocal } from "./storage";
import { createInMemoryLocalStorage } from "../__mocks__/createInMemoryLocalStorage";

const key = "expenses";

beforeEach(() => {
  const mockLocalStorage = createInMemoryLocalStorage();
  vi.stubGlobal("localStorage", mockLocalStorage);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("saveExpensesToLocal", () => {
  it("writes a json string under the correct key", () => {
    const sampleExpenses: Expense[] = [
      {
        id: "1",
        description: "Coffee",
        amountCents: 450,
        date: "2025-10-01",
      },
      {
        id: "2",
        description: "Book",
        amountCents: 1299,
        date: "2025-10-02",
      },
    ];
    saveExpensesToLocal(sampleExpenses);

    const raw = localStorage.getItem(key);
    expect(raw).not.toBeNull();

    const parsedExpenses = JSON.parse(raw as string);
    expect(parsedExpenses).toEqual(sampleExpenses);
  });

  it("overwrites previous data", () => {
    const firstExpense: Expense[] = [
      {
        id: "1",
        description: "Coffee",
        amountCents: 450,
        date: "2025-10-01",
      },
    ];
    const secondExpense: Expense[] = [
      {
        id: "2",
        description: "Book",
        amountCents: 1299,
        date: "2025-10-02",
      },
    ];

    saveExpensesToLocal(firstExpense);
    expect(JSON.parse(localStorage.getItem(key) as string)).toEqual(firstExpense);

    saveExpensesToLocal(secondExpense);
    expect(JSON.parse(localStorage.getItem(key) as string)).toEqual(secondExpense);
  });
});

describe("loadExpensesFromLocal", () => {
  it("returns and empty array when nothing is stored", () => {
    const result = loadExpensesFromLocal();
    expect(result).toEqual([]);
  });

  it("correctly parses previously saved expenses data", () => {
    const expense: Expense[] = [
      {
        id: "1",
        description: "Coffee",
        amountCents: 450,
        date: "2025-10-01",
      },
    ];

    localStorage.setItem("expenses", JSON.stringify(expense));

    const loaded = loadExpensesFromLocal();
    expect(loaded).toEqual(expense);
  });
});
