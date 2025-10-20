import { beforeEach, vi, describe, it, expect, afterEach } from "vitest";
import type { Expense } from "../models/expense";
import { loadExpenseAsync, loadExpensesFromLocal, saveExpensesToLocal } from "./storage";
import { createInMemoryLocalStorage } from "../__mocks__/createInMemoryLocalStorage";

const key = "expenses";

beforeEach(() => {
  const mockLocalStorage = createInMemoryLocalStorage();
  vi.stubGlobal("localStorage", mockLocalStorage);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("saveExpenses", () => {
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

describe("loadExpenses", () => {
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

    localStorage.setItem(key, JSON.stringify(expense));

    const loaded = loadExpensesFromLocal();
    expect(loaded).toEqual(expense);
  });
});

describe("loadExpensesAsync", () => {
  const expense: Expense[] = [
    {
      id: "1",
      description: "Coffee",
      amountCents: 450,
      date: "2025-10-01",
    },
  ];
  it("returns a promise object", () => {
    localStorage.setItem(key, JSON.stringify(expense));

    const promise = loadExpenseAsync();

    expect(promise).toBeInstanceOf(Promise);
  });

  it("returns a promise which resolves the saved expense", () => {
    localStorage.setItem(key, JSON.stringify(expense));

    const promise = loadExpenseAsync();

    expect(promise).resolves.toEqual(expense);
  });

  it("returns a promise which resolves to an empty object when no saved expense", () => {
    const promise = loadExpenseAsync();

    expect(promise).resolves.toEqual([]);
  });
});
