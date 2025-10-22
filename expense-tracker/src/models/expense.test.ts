import { describe, it, expect } from "vitest";
import type { Expense } from "./expense";
import { createExpenseModel } from "./expense";

describe("createExpenseModel", () => {
  it("should create an Expense object from FormData", () => {
    const id = "test-id";
    const formData = new FormData();
    formData.append("desc", "Test Expense");
    formData.append("amount", "12.34");
    formData.append("date", "2024-06-15");
    formData.append("category", "Food");

    const expense: Expense = createExpenseModel(id, formData);

    expect(expense).toEqual({
      id: "test-id",
      description: "Test Expense",
      amountCents: 1234,
      date: "2024-06-15",
      category: "Food",
    });
  });

  it("should handle missing optional category", () => {
    const id = "test-id-2";
    const formData = new FormData();
    formData.append("desc", "Another Expense");
    formData.append("amount", "56.78");
    formData.append("date", "2024-06-16");

    const expense: Expense = createExpenseModel(id, formData);

    expect(expense).toEqual({
      id: "test-id-2",
      description: "Another Expense",
      amountCents: 5678,
      date: "2024-06-16",
      category: undefined,
    });
  });
});
